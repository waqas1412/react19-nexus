import { useEffect } from 'react';

/**
 * React 19 improves support for Custom Elements (Web Components)
 * - Better property passing
 * - Event handling improvements
 * - Ref support
 * - SSR compatibility
 */

// TypeScript declaration for custom element
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-clock': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export function CustomElements() {
  useEffect(() => {
    // Load the custom element script
    const script = document.createElement('script');
    script.src = '/x-clock.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">
        Custom Elements Integration
        <span className="ml-3 text-sm font-normal text-primary-400">
          Web Components in React 19
        </span>
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Live Demo: &lt;x-clock&gt;
          </h3>
          
          <p className="text-slate-300 mb-4">
            Below is a custom web component that displays a live clock. React 19 handles it seamlessly.
          </p>

          <div className="flex justify-center mb-6">
            {/* Custom element - React 19 handles it natively */}
            {/* @ts-expect-error - Custom element not in JSX types */}
            <x-clock />
          </div>

          <div className="bg-primary-600/10 border border-primary-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-primary-300 mb-2">
              💡 What's Happening
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-primary-400 mt-1">▸</span>
                <span>Custom element defined in <code className="bg-slate-900 px-1 rounded">/public/x-clock.js</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 mt-1">▸</span>
                <span>React 19 renders it like any other HTML element</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 mt-1">▸</span>
                <span>Shadow DOM encapsulation keeps styles isolated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 mt-1">▸</span>
                <span>Component lifecycle managed by browser</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            React 19 Improvements
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">✅ Better Property Passing</h4>
              <p className="text-sm text-slate-300 mb-2">
                React 19 correctly passes properties to custom elements, not just attributes.
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-green-400">
                {`<my-element data={{obj}} />`}
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">✅ Event Handling</h4>
              <p className="text-sm text-slate-300 mb-2">
                Custom events work seamlessly with React's event system.
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-blue-400">
                {`<my-element onCustomEvent={fn} />`}
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">✅ Ref Support</h4>
              <p className="text-sm text-slate-300 mb-2">
                Access custom element instances with refs.
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-yellow-400">
                {`<my-element ref={elementRef} />`}
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">✅ SSR Compatible</h4>
              <p className="text-sm text-slate-300 mb-2">
                Custom elements work with server-side rendering.
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-purple-400">
                {`renderToString(<my-element />)`}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Usage Example
          </h3>

          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-300">
              <div className="text-gray-500">// Define custom element</div>
              <div className="text-blue-400">class</div> <div className="text-yellow-400">XClock</div> <div className="text-blue-400">extends</div> <div className="text-yellow-400">HTMLElement</div> {'{'}
              <div className="ml-4">
                <div className="text-green-400">connectedCallback</div>() {'{'}
                <div className="ml-4 text-gray-400">// Component mounted</div>
                {'}'}
              </div>
              {'}'}
              <br />
              <div className="text-gray-500">// Register it</div>
              <div className="text-yellow-400">customElements</div>.<div className="text-green-400">define</div>(<div className="text-orange-400">'x-clock'</div>, <div className="text-yellow-400">XClock</div>);
              <br /><br />
              <div className="text-gray-500">// Use in React</div>
              <div className="text-blue-400">function</div> <div className="text-yellow-400">App</div>() {'{'}
              <div className="ml-4">
                <div className="text-blue-400">return</div> {'<'}<div className="text-green-400">x-clock</div> /{'>'};
              </div>
              {'}'}
            </code>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            When to Use Custom Elements
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Framework-Agnostic Components</h5>
                <p className="text-sm text-slate-300">
                  Share components across React, Vue, Angular, or vanilla JS.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">🔒</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Style Encapsulation</h5>
                <p className="text-sm text-slate-300">
                  Shadow DOM prevents style leakage and conflicts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">📦</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Third-Party Widgets</h5>
                <p className="text-sm text-slate-300">
                  Integrate external components without framework coupling.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">🔧</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Micro-Frontends</h5>
                <p className="text-sm text-slate-300">
                  Build independent, deployable UI components.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Best Practices
          </h3>

          <div className="space-y-2 text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Use kebab-case names (e.g., <code className="bg-slate-900 px-1 rounded">x-clock</code>)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Include a hyphen in the name (required by spec)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Clean up in <code className="bg-slate-900 px-1 rounded">disconnectedCallback()</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Use Shadow DOM for style encapsulation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Emit custom events for communication</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
