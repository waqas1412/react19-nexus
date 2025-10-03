import { Layout } from './components/Layout';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to React 19.2.0
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Explore the latest features and modern development practices
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm font-medium">
              Actions & useActionState
            </span>
            <span className="px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm font-medium">
              useOptimistic
            </span>
            <span className="px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm font-medium">
              use() API
            </span>
            <span className="px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm font-medium">
              Document Metadata
            </span>
            <span className="px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm font-medium">
              Custom Elements
            </span>
          </div>
        </section>

        <section className="card animate-slide-up mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Getting Started</h3>
          <p className="text-slate-300 mb-4">
            This showcase application demonstrates React 19.2.0's powerful new features
            including Actions, optimistic updates, the use() API, and more.
          </p>
          <p className="text-slate-300">
            Each feature is implemented following SOLID principles and modern best practices
            for scalability, reliability, and maintainability.
          </p>
        </section>

        <TodoList />
      </div>
    </Layout>
  );
}

export default App;
