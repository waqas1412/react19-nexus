import { useEffect } from 'react';

/**
 * React 19 introduces new resource preloading APIs:
 * - preinit(): Load and execute a script or stylesheet
 * - preload(): Preload a resource (font, image, etc.)
 * - preconnect(): Establish early connection to an origin
 * - prefetchDNS(): Resolve DNS for a domain
 * 
 * These can be used in components or called directly
 */

export function ResourcePreloading() {
  useEffect(() => {
    // Note: In React 19, these would be imported from 'react-dom'
    // For demonstration, we'll show the API usage pattern
    
    // Preconnect to external domains
    if (typeof window !== 'undefined') {
      // Create link elements for preconnect (React 19 will handle this automatically)
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnectLink);

      const dnsPrefetchLink = document.createElement('link');
      dnsPrefetchLink.rel = 'dns-prefetch';
      dnsPrefetchLink.href = 'https://api.example.com';
      document.head.appendChild(dnsPrefetchLink);
    }
  }, []);

  return (
    <div className="card max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">
        Resource Preloading
        <span className="ml-3 text-sm font-normal text-primary-400">
          React 19 APIs
        </span>
      </h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-white mb-3">preinit()</h3>
          <p className="text-slate-300 mb-3">
            Load and execute a script or stylesheet with high priority.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
            <code className="text-green-400">
              {`import { preinit } from 'react-dom';

// Preinitialize a stylesheet
preinit('https://example.com/styles.css', {
  as: 'style',
  precedence: 'high'
});

// Preinitialize a script
preinit('https://example.com/analytics.js', {
  as: 'script'
});`}
            </code>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-3">preload()</h3>
          <p className="text-slate-300 mb-3">
            Preload a resource that will be needed soon (fonts, images, etc.).
          </p>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
            <code className="text-blue-400">
              {`import { preload } from 'react-dom';

// Preload a font
preload('https://example.com/font.woff2', {
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous'
});

// Preload an image
preload('https://example.com/hero.jpg', {
  as: 'image'
});`}
            </code>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-3">preconnect()</h3>
          <p className="text-slate-300 mb-3">
            Establish an early connection to an origin you expect to load resources from.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
            <code className="text-yellow-400">
              {`import { preconnect } from 'react-dom';

// Preconnect to an API server
preconnect('https://api.example.com');

// Preconnect with crossOrigin
preconnect('https://cdn.example.com', {
  crossOrigin: 'anonymous'
});`}
            </code>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-3">prefetchDNS()</h3>
          <p className="text-slate-300 mb-3">
            Resolve DNS for a domain you expect to load resources from.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
            <code className="text-purple-400">
              {`import { prefetchDNS } from 'react-dom';

// Prefetch DNS for external domains
prefetchDNS('https://analytics.example.com');
prefetchDNS('https://cdn.example.com');`}
            </code>
          </div>
        </section>

        <section className="bg-primary-600/10 border border-primary-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary-300 mb-2">
            💡 When to Use
          </h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary-400 mt-1">▸</span>
              <span><strong>preinit()</strong> - Critical CSS/JS that should load immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400 mt-1">▸</span>
              <span><strong>preload()</strong> - Resources needed soon (fonts, images above fold)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400 mt-1">▸</span>
              <span><strong>preconnect()</strong> - External origins you'll fetch from</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400 mt-1">▸</span>
              <span><strong>prefetchDNS()</strong> - Domains for lower-priority resources</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-3">Benefits</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-green-400 font-semibold mb-1">⚡ Faster Loading</div>
              <p className="text-sm text-slate-300">Resources load in parallel with page</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-blue-400 font-semibold mb-1">🎯 Better UX</div>
              <p className="text-sm text-slate-300">Reduced layout shifts and delays</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-yellow-400 font-semibold mb-1">📊 SEO Boost</div>
              <p className="text-sm text-slate-300">Improved Core Web Vitals scores</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="text-purple-400 font-semibold mb-1">🔧 Simple API</div>
              <p className="text-sm text-slate-300">No manual link tag management</p>
            </div>
          </div>
        </section>
      </div>

      {/* Demonstrate actual preloading with link tags */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://api.example.com" />
    </div>
  );
}
