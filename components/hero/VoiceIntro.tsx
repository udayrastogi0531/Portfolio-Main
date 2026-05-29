"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Loader2, AlertCircle } from "lucide-react";

export default function VoiceIntro() {
  const [voiceState, setVoiceState] = useState<"idle" | "loading" | "playing" | "error">("idle");
  const [barsCount] = useState(16);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // ── Pre-load Speech Synthesis Voices Asynchronously ───────────
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoices = () => {
      try {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          voicesRef.current = v;
        }
      } catch (err) {
        // Silent catch to prevent any console noise
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // ── Auto-recover from error state after 3 seconds ────────────
  useEffect(() => {
    if (voiceState === "error") {
      const t = setTimeout(() => setVoiceState("idle"), 3000);
      return () => clearTimeout(t);
    }
  }, [voiceState]);

  const stopAllVoice = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (err) {
      // Safe cleanup
    }
    setVoiceState("idle");
  }, []);

  // ── Safe Unmount Cleanup ───────────────────────────────────────
  useEffect(() => {
    return () => {
      stopAllVoice();
    };
  }, [stopAllVoice]);

  // ── Web Speech API SpeechSynthesis Fallback ───────────────────
  const playBrowserSpeech = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setVoiceState("error");
      return;
    }

    try {
      // Cancel previous utterances before starting
      window.speechSynthesis.cancel();

      const introText = "Hi, I'm Uday's neural voice avatar. Welcome to my next-generation cinematic portfolio. Explore my full-stack projects, interactive AI tools, and creative experiences. Let's build the future together.";
      const utterance = new SpeechSynthesisUtterance(introText);

      // Dynamically query voices if ref is empty
      let voices = voicesRef.current;
      if (!voices || voices.length === 0) {
        voices = window.speechSynthesis.getVoices();
        voicesRef.current = voices;
      }

      // Pick high-quality en-US voices, falling back cleanly
      const englishVoice =
        voices.find((v) => v.lang.startsWith("en-US") && v.name.toLowerCase().includes("natural")) ||
        voices.find((v) => v.lang.startsWith("en-US") && v.name.toLowerCase().includes("google")) ||
        voices.find((v) => v.lang.startsWith("en-US")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.pitch = 0.95; // Futuristic tone
      utterance.rate = 1.0;   // Natural speaking pace

      utterance.onstart = () => {
        setVoiceState("playing");
      };

      utterance.onend = () => {
        setVoiceState("idle");
      };

      utterance.onerror = (e) => {
        // Interrupted/removed are triggered normally when calling .cancel()
        const errType = e.error as string;
        if (errType !== "interrupted" && errType !== "removed" && errType !== "canceled") {
          setVoiceState("error");
        } else {
          setVoiceState("idle");
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setVoiceState("error");
    }
  }, []);

  // ── Master Play Handler — Triggered ONLY by User Interaction ──
  const handleVoiceIntro = async () => {
    if (voiceState === "playing" || voiceState === "loading") {
      stopAllVoice();
      return;
    }

    setVoiceState("loading");

    try {
      const res = await fetch("/api/voice-intro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "Hi, I am Uday's neural voice avatar. Welcome to my cinematic portfolio website. Explore my full-stack projects, real-time AI tools, and creative experiences. Let's engineer the future together.",
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data.fallback || data.error) {
          playBrowserSpeech();
          return;
        }
      }

      // We have raw audio binary stream! Play using safe HTML5 Audio elements
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = audioUrl;
      audioRef.current.onplay = () => {
        setVoiceState("playing");
      };
      audioRef.current.onended = () => {
        setVoiceState("idle");
      };
      audioRef.current.onerror = () => {
        playBrowserSpeech();
      };

      await audioRef.current.play();
    } catch (err) {
      // Graceful fallback to SpeechSynthesis, zero user console noise
      playBrowserSpeech();
    }
  };

  return (
    <div className="flex items-center gap-4 py-2 mt-4 select-none">
      {/* Visualizer Node Button */}
      <motion.button
        onClick={handleVoiceIntro}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-all duration-300 overflow-hidden
          ${
            voiceState === "playing"
              ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              : voiceState === "loading"
              ? "border-purple-500 bg-purple-500/10"
              : voiceState === "error"
              ? "border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50"
              : "border-cyan-500/20 bg-white/5 hover:border-cyan-500/40"
          }
        `}
      >
        <AnimatePresence mode="wait">
          {voiceState === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={20} className="text-purple-400" />
            </motion.div>
          ) : voiceState === "playing" ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              <Volume2 size={20} className="text-cyan-400 animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-8 h-8 border border-dashed border-cyan-400/30 rounded-full scale-125"
              />
            </motion.div>
          ) : voiceState === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle size={20} className="text-rose-400" />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VolumeX size={20} className="text-slate-400 group-hover:text-cyan-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Visualizer Sound Waves and Title */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className={`font-mono text-[10px] tracking-wider transition-colors duration-300 ${
              voiceState === "error" ? "text-rose-400" : "text-cyan-400"
            }`}
          >
            {voiceState === "playing"
              ? "PLAYING NEURAL INTRODUCTION"
              : voiceState === "loading"
              ? "ESTABLISHING TELEMETRY LINK..."
              : voiceState === "error"
              ? "VOICE UNAVAILABLE"
              : "AI VOCALIZER CORE"}
          </span>
          {voiceState === "playing" && (
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
          )}
        </div>

        {/* Audio sound wave visualizer bars */}
        <div className="h-6 flex items-end gap-0.5">
          {Array.from({ length: barsCount }).map((_, i) => {
            const isMiddle = i >= 4 && i <= 11;
            const animDuration = 0.5 + Math.random() * 0.8;
            return (
              <motion.div
                key={i}
                className={`w-[2.5px] rounded-full transition-all duration-300
                  ${
                    voiceState === "playing"
                      ? "bg-gradient-to-t from-cyan-400 to-purple-500"
                      : voiceState === "error"
                      ? "bg-rose-500/20"
                      : "bg-slate-700"
                  }
                `}
                animate={
                  voiceState === "playing"
                    ? { height: [4, isMiddle ? 22 : 12, 4] }
                    : { height: 4 }
                }
                transition={{
                  duration: animDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.05,
                }}
                style={{ height: "4px" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
