"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Loader2, Disc } from "lucide-react";

export default function VoiceIntro() {
  const [voiceState, setVoiceState] = useState<"idle" | "loading" | "playing" | "error">("idle");
  const [barsCount] = useState(16);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Stop voice on component unmount
  useEffect(() => {
    return () => {
      stopAllVoice();
    };
  }, []);

  const stopAllVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setVoiceState("idle");
  };

  const playBrowserSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setVoiceState("error");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const introText = "Hi, I'm Uday's neural voice avatar. Welcome to my next-generation cinematic portfolio. Explore my full-stack projects, interactive AI tools, and creative experiences. Let's build the future together.";
    const utterance = new SpeechSynthesisUtterance(introText);
    
    // Attempt to pick a modern, neural English voice (like Microsoft David, Google US English, etc.)
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith("en-US") && v.name.toLowerCase().includes("natural")) ||
                        voices.find(v => v.lang.startsWith("en")) ||
                        voices[0];

    if (englishVoice) utterance.voice = englishVoice;
    utterance.pitch = 0.92; // Slightly deeper, futuristic feel
    utterance.rate = 1.02;  // Natural speaking rate

    utterance.onstart = () => {
      setVoiceState("playing");
    };

    utterance.onend = () => {
      setVoiceState("idle");
    };

    utterance.onerror = (err) => {
      console.error("SpeechSynthesis error:", err);
      setVoiceState("error");
    };

    window.speechSynthesis.speak(utterance);
  };

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
        // Server triggered fallback or returned error
        if (data.fallback || data.error) {
          playBrowserSpeech();
          return;
        }
      }

      // We have raw audio binary stream! Play using Audio element
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
        // Fallback to browser SpeechSynthesis if binary playback fails
        playBrowserSpeech();
      };

      await audioRef.current.play();
    } catch (err) {
      console.warn("Server TTS failed, falling back to Web Speech API...", err);
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
          <span className="font-mono text-[10px] text-cyan-400 tracking-wider">
            {voiceState === "playing"
              ? "PLAYING NEURAL INTRODUCTION"
              : voiceState === "loading"
              ? "ESTABLISHING TELEMETRY LINK..."
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
