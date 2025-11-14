
import React from 'react';
import PitchGenerator from './components/PitchGenerator';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <PitchGenerator />
      </main>
       <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
