import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEffectEvent } from '../useEffectEvent';

describe('useEffectEvent', () => {
  it('returns a stable function reference', () => {
    const handler = vi.fn();
    const { result, rerender } = renderHook(() => useEffectEvent(handler));

    const firstRef = result.current;
    rerender();
    const secondRef = result.current;

    expect(firstRef).toBe(secondRef);
  });

  it('calls the latest handler', () => {
    let count = 0;
    const { result, rerender } = renderHook(() => 
      useEffectEvent(() => count)
    );

    const eventHandler = result.current;
    
    // First call
    expect(eventHandler()).toBe(0);

    // Update count
    count = 1;
    rerender();

    // Should call latest handler
    expect(eventHandler()).toBe(1);
  });

  it('preserves function identity across rerenders', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    
    const { result, rerender } = renderHook(
      ({ handler }) => useEffectEvent(handler),
      { initialProps: { handler: handler1 } }
    );

    const stableRef = result.current;

    // Change handler
    rerender({ handler: handler2 });

    // Reference should be stable
    expect(result.current).toBe(stableRef);

    // But should call new handler
    result.current();
    expect(handler2).toHaveBeenCalled();
    expect(handler1).not.toHaveBeenCalled();
  });
});
