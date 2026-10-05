import React from 'react';
import { EmissionsTracker } from './components/inventory/EmissionsTracker';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <header className="max-w-4xl mx-auto px-6 mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
          Plataforma EcoTrack
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Monitorización en tiempo real de tu huella de carbono
        </p>
      </header>
      <main>
        <EmissionsTracker />
      </main>
    </div>
  );
};

export default App;
