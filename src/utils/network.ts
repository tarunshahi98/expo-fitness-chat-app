import * as Network from "expo-network";
import { IS_WEB } from "./platform";

export const PROBE_ENDPOINT = "https://www.google.com/generate_204";
export const DEFAULT_NETWORK_TIMEOUT_MS = 3000;
export const DEFAULT_OFFLINE_MSG = "Please check your internet connection.";

let inFlightProbe: Promise<boolean> | null = null;

/**
 * Checks internet connectivity across Web and Native platforms.
 * Coalesces concurrent in-flight probes into a single request.
 * - On Native (iOS/Android): Queries OS-level hardware reachability via expo-network
 *   (instant, 0 battery impact, 0 cellular radio wakeups).
 * - On Web: Fast-fails if navigator.onLine is false; otherwise runs a lightweight
 *   HEAD probe with mode: "no-cors" and cache-busting to bypass captive portals and dead routers.
 */
export async function checkNetworkStatus(
  timeoutMs: number = DEFAULT_NETWORK_TIMEOUT_MS,
  endpoint: string = PROBE_ENDPOINT
): Promise<boolean> {
  if (inFlightProbe) return inFlightProbe;

  inFlightProbe = (async () => {
    // 1. NATIVE: OS-level reachability query
    if (!IS_WEB) {
      try {
        const networkState = await Network.getNetworkStateAsync();
        return Boolean(
          networkState.isConnected && networkState.isInternetReachable !== false
        );
      } catch {
        return false;
      }
    }

    // 2. WEB: Fast-fail if browser detects disconnected interface
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      return false;
    }

    // 3. WEB: Probe to verify true end-to-end internet connectivity (with no-cors for CORS bypass)
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    try {
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      await fetch(`${endpoint}?t=${Date.now()}`, {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
        cache: "no-store",
      });

      return true;
    } catch {
      return false;
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  })().finally(() => {
    inFlightProbe = null;
  });

  return inFlightProbe;
}

/**
 * Verifies network connectivity.
 * @returns true if online and ready to proceed; false if offline.
 */
export async function ensureOnline(): Promise<boolean> {
  return checkNetworkStatus();
}


