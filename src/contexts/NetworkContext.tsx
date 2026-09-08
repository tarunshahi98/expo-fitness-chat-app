import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Network from "expo-network";
import { useBanner } from "./BannerContext";
import { IS_WEB } from "@/utils/platform";
import { checkNetworkStatus, DEFAULT_OFFLINE_MSG } from "@/utils/network";
import type { NetworkContextType } from "@/types";

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const { showBanner, hideBanner } = useBanner();

  const checkConnection = useCallback(
    async (customMessage?: string): Promise<boolean> => {
      const isOnline = await checkNetworkStatus();
      setIsOffline(!isOnline);
      if (!isOnline) {
        showBanner({
          message: customMessage || DEFAULT_OFFLINE_MSG,
          type: "offline",
          duration: null,
        });
        return false;
      }
      hideBanner();
      return true;
    },
    [showBanner, hideBanner]
  );

  useEffect(() => {
    // Initial connectivity probe on mount
    let isMounted = true;
    checkNetworkStatus().then((isOnline) => {
      if (!isMounted) return;
      setIsOffline(!isOnline);
      if (!isOnline) {
        showBanner({
          message: DEFAULT_OFFLINE_MSG,
          type: "offline",
          duration: null,
        });
      }
    });

    if (IS_WEB && typeof window !== "undefined") {
      const handleOnline = () => {
        setIsOffline(false);
        hideBanner();
      };
      const handleOffline = () => {
        setIsOffline(true);
        showBanner({
          message: DEFAULT_OFFLINE_MSG,
          type: "offline",
          duration: null,
        });
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        isMounted = false;
        if (typeof window !== "undefined") {
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline);
        }
      };
    } else if (!IS_WEB) {
      const subscription = Network.addNetworkStateListener((state) => {
        const isOnline = Boolean(
          state.isConnected && state.isInternetReachable !== false
        );
        if (!isOnline) {
          setIsOffline(true);
          showBanner({
            message: DEFAULT_OFFLINE_MSG,
            type: "offline",
            duration: null,
          });
        } else {
          setIsOffline(false);
          hideBanner();
        }
      });

      return () => {
        isMounted = false;
        subscription.remove();
      };
    }

    return () => {
      isMounted = false;
    };
  }, [showBanner, hideBanner]);

  const contextValue = useMemo(
    () => ({
      isOffline,
      checkConnection,
    }),
    [isOffline, checkConnection]
  );

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
}

