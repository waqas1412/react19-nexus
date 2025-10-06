export function AboutPage() {
  return (
    <div className="card max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">About This Showcase</h2>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-slate-300 mb-4">
          This application demonstrates the latest features in React 19.2.0, including:
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <FeatureCard
            title="Actions & Forms"
            description="useActionState and useFormStatus for seamless form handling"
          />
          <FeatureCard
            title="Optimistic UI"
            description="useOptimistic for instant user feedback"
          />
          <FeatureCard
            title="Suspense & use()"
            description="Modern data fetching with automatic loading states"
          />
          <FeatureCard
            title="Document Metadata"
            description="Built-in <title> and <meta> tag management"
          />
          <FeatureCard
            title="Custom Elements"
            description="Seamless Web Components integration"
          />
          <FeatureCard
            title="useEffectEvent"
            description="Stable event handlers without dependencies"
          />
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tech Stack</h3>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-primary-400">▸</span>
            <strong>React 19.2.0</strong> - Latest stable release
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary-400">▸</span>
            <strong>TypeScript</strong> - Strict type safety
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary-400">▸</span>
            <strong>Vite</strong> - Lightning-fast build tool
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary-400">▸</span>
            <strong>Tailwind CSS</strong> - Utility-first styling
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary-400">▸</span>
            <strong>Vitest & RTL</strong> - Comprehensive testing
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Principles</h3>
        <p className="text-slate-300 mb-4">
          This project follows modern software engineering principles:
        </p>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <strong>SOLID</strong> - Single Responsibility, Open/Closed, etc.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <strong>DRY</strong> - Don't Repeat Yourself
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <strong>Accessibility</strong> - WCAG 2.1 AA compliant
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <strong>Scalability</strong> - Micro-frontend ready
          </li>
        </ul>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
