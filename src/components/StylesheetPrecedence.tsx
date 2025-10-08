/**
 * React 19 introduces stylesheet precedence and better async script handling
 * 
 * Stylesheet Precedence:
 * - Control the order stylesheets are applied
 * - Prevent CSS conflicts
 * - Better for SSR/streaming
 * 
 * Async Scripts:
 * - Scripts with async attribute load without blocking
 * - React 19 handles deduplication automatically
 */

export function StylesheetPrecedence() {
  return (
    <div className="card max-w-4xl mx-auto">
      {/* Demonstrate stylesheet precedence */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        precedence="high"
      />

      <h2 className="text-3xl font-bold text-white mb-6">
        Stylesheet Precedence & Async Scripts
        <span className="ml-3 text-sm font-normal text-primary-400">
          React 19 Features
        </span>
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Stylesheet Precedence
          </h3>
          
          <p className="text-slate-300 mb-4">
            React 19 allows you to control the order in which stylesheets are applied using the{' '}
            <code className="bg-slate-900 px-2 py-1 rounded text-primary-400">precedence</code> attribute.
          </p>

          <div className="bg-slate-900 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-green-400">
              {`// High precedence - loaded first
<link
  rel="stylesheet"
  href="/reset.css"
  precedence="high"
/>

// Medium precedence - loaded second
<link
  rel="stylesheet"
  href="/theme.css"
  precedence="medium"
/>

// Low precedence - loaded last
<link
  rel="stylesheet"
  href="/overrides.css"
  precedence="low"
/>`}
            </code>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">✅ Benefits</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Predictable CSS order</li>
                <li>• No specificity wars</li>
                <li>• Better for SSR</li>
                <li>• Component-level control</li>
              </ul>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">🎯 Use Cases</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• CSS resets (high)</li>
                <li>• Theme styles (medium)</li>
                <li>• Component styles (low)</li>
                <li>• Utility classes (low)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Async Script Handling
          </h3>
          
          <p className="text-slate-300 mb-4">
            React 19 automatically handles async scripts, preventing duplicates and ensuring proper loading order.
          </p>

          <div className="bg-slate-900 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-blue-400">
              {`// React 19 handles async scripts automatically
<script
  async
  src="https://analytics.example.com/script.js"
/>

// Multiple components can reference the same script
// React ensures it's only loaded once
function ComponentA() {
  return (
    <>
      <script async src="https://example.com/lib.js" />
      {/* Component content */}
    </>
  );
}

function ComponentB() {
  return (
    <>
      <script async src="https://example.com/lib.js" />
      {/* Component content */}
    </>
  );
}`}
            </code>
          </div>

          <div className="bg-primary-600/10 border border-primary-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-primary-300 mb-2">
              💡 Automatic Deduplication
            </h4>
            <p className="text-sm text-slate-300">
              React 19 automatically deduplicates scripts with the same <code className="bg-slate-900 px-1 rounded">src</code>.
              Even if multiple components render the same script tag, it will only be loaded once.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            SSR & Streaming Benefits
          </h3>
          
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">🌊 Streaming SSR</h4>
              <p className="text-sm text-slate-300 mb-2">
                With stylesheet precedence, React can stream HTML to the client while ensuring
                stylesheets are loaded in the correct order.
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-green-400">
                Server → Client (streaming) → Styles load in order → No FOUC
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">⚡ Batched Updates</h4>
              <p className="text-sm text-slate-300 mb-2">
                React 19 batches stylesheet and script insertions, reducing DOM operations
                and improving performance.
              </p>
              <div className="bg-slate-900 rounded px-3 py-2 text-xs font-mono text-blue-400">
                Multiple &lt;link&gt; tags → Batched → Single DOM update
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="font-semibold text-white mb-2">🎨 No FOUC</h4>
              <p className="text-sm text-slate-300">
                Flash of Unstyled Content is prevented because React ensures critical
                stylesheets are loaded before rendering content.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Best Practices
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">1️⃣</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Use Precedence for Critical CSS</h5>
                <p className="text-sm text-slate-300">
                  Set <code className="bg-slate-900 px-1 rounded">precedence="high"</code> for
                  resets and critical styles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">2️⃣</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Async for Non-Critical Scripts</h5>
                <p className="text-sm text-slate-300">
                  Use <code className="bg-slate-900 px-1 rounded">async</code> for analytics,
                  ads, and other non-critical scripts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">3️⃣</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Let React Handle Deduplication</h5>
                <p className="text-sm text-slate-300">
                  Don't worry about multiple components loading the same resource.
                  React handles it automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl">4️⃣</span>
              <div>
                <h5 className="font-semibold text-white mb-1">Combine with Suspense</h5>
                <p className="text-sm text-slate-300">
                  Use Suspense boundaries to ensure styles are loaded before rendering content.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Demonstrate async script loading */}
      <script
        async
        src="https://cdn.example.com/demo-script.js"
        onLoad={() => console.log('Demo script loaded')}
      />
    </div>
  );
}
