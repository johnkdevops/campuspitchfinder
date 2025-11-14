
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 bg-black bg-opacity-20 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          Campus PitchCrafter
        </h1>
      </div>
    </header>
  );
};

export default Header;
