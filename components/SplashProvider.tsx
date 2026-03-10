"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface SplashContextValue {
  splashComplete: boolean;
  setSplashComplete: (v: boolean) => void;
}

const SplashContext = createContext<SplashContextValue>({
  splashComplete: false,
  setSplashComplete: () => {},
});

export function useSplash() {
  return useContext(SplashContext);
}

export function SplashProvider({ children }: { children: ReactNode }) {
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("v384-splash") === "done") {
        setSplashComplete(true);
      }
    } catch {
      // sessionStorage unavailable — let splash play
    }
  }, []);

  const handleComplete = (v: boolean) => {
    setSplashComplete(v);
    if (v) {
      try {
        sessionStorage.setItem("v384-splash", "done");
      } catch {
        // sessionStorage unavailable — ignore
      }
    }
  };

  return (
    <SplashContext.Provider
      value={{ splashComplete, setSplashComplete: handleComplete }}
    >
      {children}
    </SplashContext.Provider>
  );
}
