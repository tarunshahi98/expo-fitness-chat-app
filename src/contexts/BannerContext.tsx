import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { BannerOptions, BannerType, BannerContextType } from "@/types";

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [banner, setBanner] = useState<BannerOptions | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const hideBanner = useCallback(() => {
    clearTimer();
    setBanner(null);
  }, [clearTimer]);

  const showBanner = useCallback(
    (input: BannerOptions | string, explicitType?: BannerType) => {
      const options: BannerOptions =
        typeof input === "string"
          ? { message: input, type: explicitType || "error" }
          : input;

      clearTimer();
      setBanner(options);

      // Explicit duration resolution:
      // - undefined => default to 3000ms auto-dismiss
      // - null => persistent (stays open until explicitly dismissed or reconnected)
      // - number > 0 => custom auto-dismiss timeout
      const duration = options.duration === undefined ? 3000 : options.duration;
      if (typeof duration === "number" && duration > 0) {
        timerRef.current = setTimeout(() => {
          hideBanner();
        }, duration);
      }
    },
    [clearTimer, hideBanner],
  );

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const value = useMemo(
    () => ({
      banner,
      showBanner,
      hideBanner,
    }),
    [banner, showBanner, hideBanner]
  );

  return (
    <BannerContext.Provider value={value}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBanner() {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
}

