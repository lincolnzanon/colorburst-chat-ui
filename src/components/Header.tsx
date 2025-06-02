
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/b896dd65-439e-45a9-b30b-3cd296e40436.png" 
          alt="Capital Consult Logo" 
          className="h-12 w-auto"
        />
        <div className="ml-4">
          <h1 className="text-xl font-semibold text-capital-dark-blue">
            AI Assistant
          </h1>
          <p className="text-sm text-gray-600">
            Professional Consulting Support
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
