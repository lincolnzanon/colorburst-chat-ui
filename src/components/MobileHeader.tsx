
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Menu, MessageSquare, Workflow, Bell, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { companyConfig } from '@/config/company';
import SettingsDialog from './SettingsDialog';
import LoginDialog from './LoginDialog';

interface MobileHeaderProps {
  activeView: 'chat' | 'workflows' | 'reminders';
  onViewChange: (view: 'chat' | 'workflows' | 'reminders') => void;
  onNewChat: () => void;
  reminderCount: number;
}

const MobileHeader = ({ activeView, onViewChange, onNewChat, reminderCount }: MobileHeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const handleLogin = () => {
    // Simulate login
    const user = 'demo-user';
    localStorage.setItem('currentUser', user);
    setCurrentUser(user);
    setIsLoginOpen(false);
  };

  const handleNewChat = () => {
    onViewChange('chat');
    onNewChat();
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border-b border-capital-light-blue/30 dark:border-gray-600 p-4 flex justify-between items-center">
        {/* Left Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={handleNewChat}>
              <MessageSquare className="h-4 w-4 mr-2" />
              New Chat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange('workflows')}>
              <Workflow className="h-4 w-4 mr-2" />
              Workflows
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange('reminders')}>
              <Bell className="h-4 w-4 mr-2" />
              Reminders
              {reminderCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {reminderCount}
                </span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Center Logo */}
        <div className="flex justify-center flex-1">
          <img 
            src={companyConfig.logo}
            alt={`${companyConfig.name} Logo`} 
            className="h-8 w-auto md:h-12"
          />
        </div>

        {/* Right Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {currentUser ? (
              <>
                <DropdownMenuItem disabled>
                  <User className="h-4 w-4 mr-2" />
                  {currentUser}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => setIsLoginOpen(true)}>
                <User className="h-4 w-4 mr-2" />
                Login
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SettingsDialog 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      
      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin}
      />
    </>
  );
};

export default MobileHeader;
