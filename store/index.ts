"use client";

import { create } from "zustand";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "first_visit",    title: "Neural Link",        description: "Entered the neural interface",   icon: "🧠", unlocked: false },
  { id: "chat_used",      title: "AI Initiate",        description: "Opened ARIA AI assistant",       icon: "🤖", unlocked: false },
  { id: "terminal_open",  title: "Shell Access",       description: "Opened the neural terminal",     icon: "💻", unlocked: false },
  { id: "matrix_mode",    title: "Red Pill",           description: "Activated matrix rain mode",     icon: "🟥", unlocked: false },
  { id: "konami",         title: "Cheat Code",         description: "Found the Konami code easter egg",icon: "🎮", unlocked: false },
  { id: "all_rooms",      title: "Full Tour",          description: "Visited all 8 sections",           icon: "🌌", unlocked: false },
  { id: "contact_open",   title: "Uplink Established", description: "Reached the contact section",   icon: "📡", unlocked: false },
  { id: "resume_dl",      title: "File Retrieved",     description: "Downloaded the resume",          icon: "📄", unlocked: false },
  { id: "stay_2min",      title: "Deep Dive",          description: "Explored for 2+ minutes",        icon: "⏱️", unlocked: false },
  { id: "palette_open",   title: "Command Master",     description: "Used the AI command palette",    icon: "⚡", unlocked: false },
];

interface PortfolioStore {
  // Loader
  isLoaded: boolean;
  loadingProgress: number;
  setIsLoaded: (v: boolean) => void;
  setLoadingProgress: (v: number) => void;

  // Terminal
  isTerminalOpen: boolean;
  setIsTerminalOpen: (v: boolean) => void;
  toggleTerminal: () => void;

  // AI Chat
  isChatOpen: boolean;
  setIsChatOpen: (v: boolean) => void;
  toggleChat: () => void;

  // Matrix Mode
  isMatrixMode: boolean;
  setIsMatrixMode: (v: boolean) => void;
  toggleMatrixMode: () => void;

  // Command Palette
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (v: boolean) => void;

  // Active Section
  activeSection: string;
  setActiveSection: (v: string) => void;

  // Theme
  theme: "dark" | "cyber" | "aurora";
  setTheme: (v: "dark" | "cyber" | "aurora") => void;

  // Cursor
  cursorVariant: "default" | "hover" | "click" | "text";
  cursorPosition: { x: number; y: number };
  setCursorVariant: (v: "default" | "hover" | "click" | "text") => void;
  setCursorPosition: (x: number, y: number) => void;

  // ── VIRAL: Konami Easter Egg ──────────────────────────────
  isKonamiActive: boolean;
  setIsKonamiActive: (v: boolean) => void;

  // ── VIRAL: Achievements ───────────────────────────────────
  achievements: Achievement[];
  pendingAchievement: Achievement | null;
  unlockAchievement: (id: string) => void;
  clearPendingAchievement: () => void;
  visitedRooms: Set<string>;
  markRoomVisited: (room: string) => void;

  // ── VIRAL: Recruiter Mode ─────────────────────────────────
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;

  // ── VIRAL: Film Grain ─────────────────────────────────────
  isFilmGrain: boolean;
  toggleFilmGrain: () => void;

  // ── VIRAL: Cinema Mode ────────────────────────────────────
  isCinemaMode: boolean;
  toggleCinemaMode: () => void;
}

export const useStore = create<PortfolioStore>((set, get) => ({
  // Loader
  isLoaded: false,
  loadingProgress: 0,
  setIsLoaded: (v) => set({ isLoaded: v }),
  setLoadingProgress: (v) => set({ loadingProgress: v }),

  // Terminal
  isTerminalOpen: false,
  setIsTerminalOpen: (v) => set({ isTerminalOpen: v }),
  toggleTerminal: () => set((s) => ({ isTerminalOpen: !s.isTerminalOpen })),

  // AI Chat
  isChatOpen: false,
  setIsChatOpen: (v) => set({ isChatOpen: v }),
  toggleChat: () => set((s) => ({ isChatOpen: !s.isChatOpen })),

  // Matrix Mode
  isMatrixMode: false,
  setIsMatrixMode: (v) => set({ isMatrixMode: v }),
  toggleMatrixMode: () => set((s) => ({ isMatrixMode: !s.isMatrixMode })),

  // Command Palette
  isCommandPaletteOpen: false,
  setIsCommandPaletteOpen: (v) => set({ isCommandPaletteOpen: v }),

  // Active Section
  activeSection: "hero",
  setActiveSection: (v) => set({ activeSection: v }),

  // Theme
  theme: "dark",
  setTheme: (v) => set({ theme: v }),

  // Cursor
  cursorVariant: "default",
  cursorPosition: { x: 0, y: 0 },
  setCursorVariant: (v) => set({ cursorVariant: v }),
  setCursorPosition: (x, y) => set({ cursorPosition: { x, y } }),

  // ── Konami ─────────────────────────────────────────────────
  isKonamiActive: false,
  setIsKonamiActive: (v) => set({ isKonamiActive: v }),

  // ── Achievements ───────────────────────────────────────────
  achievements: DEFAULT_ACHIEVEMENTS,
  pendingAchievement: null,
  unlockAchievement: (id) => {
    const { achievements } = get();
    const ach = achievements.find((a) => a.id === id);
    if (!ach || ach.unlocked) return;
    const updated = achievements.map((a) =>
      a.id === id ? { ...a, unlocked: true, unlockedAt: new Date() } : a
    );
    set({ achievements: updated, pendingAchievement: { ...ach, unlocked: true } });
  },
  clearPendingAchievement: () => set({ pendingAchievement: null }),
  visitedRooms: new Set<string>(),
  markRoomVisited: (room) => {
    const { visitedRooms, unlockAchievement } = get();
    const updated = new Set(visitedRooms);
    updated.add(room);
    set({ visitedRooms: updated });
    if (updated.size >= 8) unlockAchievement("all_rooms");
  },

  // ── Recruiter Mode ─────────────────────────────────────────
  isRecruiterMode: false,
  toggleRecruiterMode: () => set((s) => ({ isRecruiterMode: !s.isRecruiterMode })),

  // ── Film Grain — TODO: wire to a UI toggle if needed ────────
  isFilmGrain: true,
  toggleFilmGrain: () => set((s) => ({ isFilmGrain: !s.isFilmGrain })),

  // ── Cinema Mode — TODO: wire to a UI toggle if needed ───────
  isCinemaMode: false,
  toggleCinemaMode: () => set((s) => ({ isCinemaMode: !s.isCinemaMode })),
}));
