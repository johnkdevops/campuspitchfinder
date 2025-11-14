
import React, { useState, useCallback } from 'react';
import { generatePitch } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const PitchGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState<string>('fast delivery, cheap prices, late-night study fuel');
  const [pitch, setPitch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePitch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPitch('');
    try {
      const generatedPitch = await generatePitch(keywords);
      setPitch(generatedPitch);
    } catch (err) {
      setError('Failed to generate pitch. Please check your connection or API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [keywords]);

  const renderFormattedPitch = (text: string) => {
    const sections = text.split('\n').filter(line => line.trim() !== '');
    return sections.map((section, index) => {
      if (section.startsWith('**') && section.endsWith('**')) {
        return <h3 key={index} className="text-xl font-semibold text-indigo-300 mt-4 mb-2">{section.replace(/\*\*/g, '')}</h3>;
      }
      return <p key={index} className="mb-3 text-gray-300 leading-relaxed">{section}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-50 rounded-2xl shadow-2xl shadow-indigo-900/20 p-6 md:p-10 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Craft the Perfect Pitch</h2>
        <p className="text-lg text-gray-400">Enter keywords to tailor your AI-generated app pitch.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">
            Keywords (comma-separated)
          </label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., healthy options, rewards program, eco-friendly"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
          />
        </div>

        <button
          onClick={handleGeneratePitch}
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Generating...
            </>
          ) : (
            'Generate Pitch'
          )}
        </button>
      </div>

      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">{error}</div>}

      {(isLoading || pitch) && (
        <div className="mt-10 pt-8 border-t border-gray-700">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">Your Generated Pitch</h3>
            <div className="bg-gray-900/70 p-6 rounded-lg min-h-[200px] flex items-center justify-center transition-opacity duration-500">
                {isLoading ? (
                    <div className="text-center text-gray-400">
                        <LoadingSpinner />
                        <p className="mt-2">Our AI is brewing up a great pitch...</p>
                    </div>
                ) : (
                    <div className="prose prose-invert max-w-none">
                        {renderFormattedPitch(pitch)}
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default PitchGenerator;
