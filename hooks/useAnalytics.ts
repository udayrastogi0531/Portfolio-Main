"use client";

import { useCallback, useEffect, useRef } from "react";

// Stable session ID (per browser tab, regenerated on reload)
function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const key = "__portfolio_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

type EventCategory =
  | "navigation"
  | "interaction"
  | "easter_egg"
  | "achievement"
  | "performance"
  | "error";

interface TrackOptions {
  category: EventCategory;
  properties?: Record<string, unknown>;
  room?: string;
}

/**
 * useAnalytics — lightweight client-side event tracker.
 * Sends events to /api/analytics which persists to Supabase.
 * Fire-and-forget: never blocks UI.
 */
export function useAnalytics() {
  const sessionId = useRef<string>("");
  const queue = useRef<Array<() => Promise<void>>>([]);
  const processing = useRef(false);

  useEffect(() => {
    sessionId.current = getSessionId();
  }, []);

  const flush = useCallback(async () => {
    if (processing.current || queue.current.length === 0) return;
    processing.current = true;
    while (queue.current.length > 0) {
      const task = queue.current.shift();
      if (task) {
        try { await task(); } catch { /* silently ignore */ }
      }
    }
    processing.current = false;
  }, []);

  const track = useCallback(
    (eventName: string, options: TrackOptions) => {
      const sid = sessionId.current;
      if (!sid) return; // not hydrated yet

      const task = async () => {
        try {
          await fetch("/api/analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: sid,
              event_name: eventName,
              event_category: options.category,
              properties: options.properties ?? {},
              room: options.room ?? null,
            }),
          });
        } catch {
          // Never throw — analytics must not affect UX
        }
      };

      queue.current.push(task);
      // Use requestIdleCallback if available, else setTimeout
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => flush(), { timeout: 3000 });
      } else {
        setTimeout(flush, 500);
      }
    },
    [flush]
  );

  return { track, sessionId: sessionId.current };
}

/**
 * usePageAnalytics — automatically tracks page load + room changes.
 */
export function usePageAnalytics(room?: string) {
  const { track } = useAnalytics();
  const prevRoom = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (room && room !== prevRoom.current) {
      prevRoom.current = room;
      track("room_view", {
        category: "navigation",
        room,
        properties: { from: prevRoom.current ?? "initial" },
      });
    }
  }, [room, track]);
}
