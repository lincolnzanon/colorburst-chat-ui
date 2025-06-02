
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import LoginDialog from './LoginDialog';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-6 bg-white">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/b896dd65-439e-45a9-b30b-3cd296e40436.png" 
            alt="Capital Consult Logo" 
            className="h-16 w-auto"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setIsLoginOpen(true)}
          className="border-capital-blue/30 text-capital-dark-blue hover:bg-capital-blue/10"
        >
          <User className="h-4 w-4 mr-2" />
          Login
        </Button>
      </div>
      
      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
};

export default Header;
