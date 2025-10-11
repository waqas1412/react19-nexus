import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * useEffectEvent - React 19.2 experimental hook
 * 
 * Creates a stable function reference that always has access to the latest values
 * without triggering effect re-runs when dependencies change.
 * 
 * This is useful for event handlers inside useEffect that need access to
 * current props/state but shouldn't cause the effect to re-run.
 * 
 * Note: This is a polyfill implementation. React 19.2 provides this natively.
 */
export function useEffectEvent<T extends (...args: any[]) => any>(
  handler: T
): T {
  const handlerRef = useRef<T>(handler);

  // Update the ref on every render to capture latest values
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  // Return a stable function that calls the latest handler
  return useCallback(
    ((...args: any[]) => {
      const fn = handlerRef.current;
      return fn(...args);
    }) as T,
    []
  );
}
