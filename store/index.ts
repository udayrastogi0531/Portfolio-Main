"use client";

import { create } from "zustand";

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
}

export const useStore = create<PortfolioStore>((set) => ({
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
}));
