
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-capital-yellow via-capital-dark-blue to-capital-dark-blue px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
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
        
        <Button
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
        >
          <User className="h-4 w-4 mr-2" />
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
