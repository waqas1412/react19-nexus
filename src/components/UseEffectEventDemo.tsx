import { useState, useEffect } from 'react';
import { useEffectEvent } from '../hooks/useEffectEvent';

/**
 * Demonstrates useEffectEvent hook
 * 
 * Problem: Event handlers in useEffect can cause unnecessary re-runs
 * Solution: useEffectEvent creates stable handlers with access to latest values
 */

export function UseEffectEventDemo() {
  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">
        useEffectEvent
        <span className="ml-3 text-sm font-normal text-primary-400">
          Stable Event Handlers
        </span>
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            The Problem
          </h3>
          
          <p className="text-slate-300 mb-4">
            When you have an event handler inside <code className="bg-slate-900 px-2 py-1 rounded text-primary-400">useEffect</code> that
            needs access to current props/state, you face a dilemma:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">❌ Option 1: Add to Dependencies</h4>
              <p className="text-sm text-slate-300 mb-2">
                Effect re-runs on every change, causing performance issues
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-red-400">
                useEffect(() =&gt; {'{'}...{'}'}, [handler])
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">❌ Option 2: Omit from Dependencies</h4>
              <p className="text-sm text-slate-300 mb-2">
                Handler has stale values, causing bugs
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-red-400">
                useEffect(() =&gt; {'{'}...{'}'}, []) // Stale!
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            The Solution: useEffectEvent
          </h3>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-green-400 mb-2">✅ Best of Both Worlds</h4>
            <p className="text-sm text-slate-300 mb-3">
              Stable function reference + access to latest values
            </p>
            <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-green-400">
              {`const onEvent = useEffectEvent((data) => {
  // Always has latest props/state
  console.log(currentValue);
});

useEffect(() => {
  // Effect doesn't re-run when currentValue changes
  socket.on('message', onEvent);
}, []); // No dependencies needed!`}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Interactive Demo
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <WithoutUseEffectEvent />
            <WithUseEffectEvent />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Common Use Cases
          </h3>

          <div className="space-y-3">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h5 className="font-semibold text-white mb-2">1. WebSocket Event Handlers</h5>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-slate-300">
                {`const onMessage = useEffectEvent((msg) => {
  setMessages(prev => [...prev, msg]);
  notify(userPreferences); // Latest preferences
});

useEffect(() => {
  socket.on('message', onMessage);
  return () => socket.off('message', onMessage);
}, []); // Doesn't re-run when userPreferences changes`}
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h5 className="font-semibold text-white mb-2">2. Timer Callbacks</h5>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-slate-300">
                {`const onTick = useEffectEvent(() => {
  console.log('Current count:', count); // Latest count
});

useEffect(() => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}, []); // Interval not recreated on count change`}
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h5 className="font-semibold text-white mb-2">3. Animation Callbacks</h5>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-slate-300">
                {`const onFrame = useEffectEvent(() => {
  updatePosition(velocity); // Latest velocity
});

useEffect(() => {
  const id = requestAnimationFrame(onFrame);
  return () => cancelAnimationFrame(id);
}, []); // Animation loop stable`}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Benefits
          </h3>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-green-400 font-semibold mb-1">⚡ Better Performance</div>
              <p className="text-sm text-slate-300">Fewer effect re-runs</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-blue-400 font-semibold mb-1">🐛 No Stale Closures</div>
              <p className="text-sm text-slate-300">Always latest values</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-yellow-400 font-semibold mb-1">🎯 Cleaner Code</div>
              <p className="text-sm text-slate-300">Simpler dependencies</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-purple-400 font-semibold mb-1">🔒 Type Safe</div>
              <p className="text-sm text-slate-300">Full TypeScript support</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Demo component WITHOUT useEffectEvent
function WithoutUseEffectEvent() {
  const [count, setCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);

  useEffect(() => {
    setEffectRuns((prev) => prev + 1);
    
    const interval = setInterval(() => {
      // This captures the initial count value (stale closure)
      console.log('Without useEffectEvent:', count);
    }, 2000);

    return () => clearInterval(interval);
  }, [count]); // Must include count, causing effect to re-run

  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
      <h4 className="font-semibold text-red-400 mb-3">
        ❌ Without useEffectEvent
      </h4>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-slate-400 mb-2">Count: <span className="text-white font-bold text-2xl">{count}</span></p>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="btn-secondary text-sm px-3 py-1"
          >
            Increment
          </button>
        </div>
        <div className="bg-slate-900 rounded px-3 py-2">
          <p className="text-xs text-slate-400">Effect runs: <span className="text-red-400 font-bold">{effectRuns}</span></p>
          <p className="text-xs text-slate-500 mt-1">
            Effect re-runs every time count changes!
          </p>
        </div>
      </div>
    </div>
  );
}

// Demo component WITH useEffectEvent
function WithUseEffectEvent() {
  const [count, setCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);

  const logCount = useEffectEvent(() => {
    console.log('With useEffectEvent:', count);
  });

  useEffect(() => {
    setEffectRuns((prev) => prev + 1);
    
    const interval = setInterval(() => {
      logCount(); // Always logs latest count
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No dependencies needed!

  return (
    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
      <h4 className="font-semibold text-green-400 mb-3">
        ✅ With useEffectEvent
      </h4>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-slate-400 mb-2">Count: <span className="text-white font-bold text-2xl">{count}</span></p>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="btn-primary text-sm px-3 py-1"
          >
            Increment
          </button>
        </div>
        <div className="bg-slate-900 rounded px-3 py-2">
          <p className="text-xs text-slate-400">Effect runs: <span className="text-green-400 font-bold">{effectRuns}</span></p>
          <p className="text-xs text-slate-500 mt-1">
            Effect runs only once! ✨
          </p>
        </div>
      </div>
    </div>
  );
}
