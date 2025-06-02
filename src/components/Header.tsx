
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-capital-yellow via-capital-dark-blue to-capital-dark-blue px-6 py-4 shadow-lg">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/b896dd65-439e-45a9-b30b-3cd296e40436.png" 
          alt="Capital Consult Logo" 
          className="h-12 w-auto"
        />
        <div className="ml-4">
          <h1 className="text-xl font-semibold text-white">
            AI Assistant
          </h1>
          <p className="text-sm text-capital-yellow/90">
            Professional Consulting Support
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
