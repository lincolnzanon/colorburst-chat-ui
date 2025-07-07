
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import ChatInterface from '@/components/ChatInterface';
import WorkflowInterface from '@/components/WorkflowInterface';
import RemindersInterface from '@/components/RemindersInterface';
import LoginDialog from '@/components/LoginDialog';
import MobileHeader from '@/components/MobileHeader';
import { companyConfig } from '@/config/company';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'workflows' | 'reminders'>('chat');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('');
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [chatUpdateTrigger, setChatUpdateTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [reminderCount, setReminderCount] = useState(0);
  const isMobile = useIsMobile();

  // Initialize user data on component mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);
    if (!user) {
      localStorage.setItem('currentUser', 'demo-user');
      setCurrentUser('demo-user');
    }
  }, []);

  // Update reminder count
  useEffect(() => {
    const updateReminderCount = () => {
      const currentUser = localStorage.getItem('currentUser') || 'demo-user';
      const savedReminders = localStorage.getItem(`userReminders_${currentUser}`);
      if (savedReminders) {
        const reminders = JSON.parse(savedReminders);
        setReminderCount(reminders.length);
      } else {
        setReminderCount(0);
      }
    };

    updateReminderCount();
    const interval = setInterval(updateReminderCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setActiveView('workflows');
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    if (chatId && activeView !== 'chat') {
      setActiveView('chat');
    }
  };

  const handleChatUpdate = () => {
    setChatUpdateTrigger(prev => prev + 1);
  };

  const handleNewChat = () => {
    setSelectedChatId('');
    setActiveView('chat');
  };

  const handleLogin = () => {
    const user = 'demo-user';
    localStorage.setItem('currentUser', user);
    setCurrentUser(user);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return (
          <ChatInterface 
            selectedChatId={selectedChatId} 
            onChatUpdate={handleChatUpdate}
          />
        );
      case 'workflows':
        return <WorkflowInterface selectedWorkflowId={selectedWorkflowId} />;
      case 'reminders':
        return <RemindersInterface onWorkflowSelect={handleWorkflowSelect} />;
      default:
        return (
          <ChatInterface 
            selectedChatId={selectedChatId} 
            onChatUpdate={handleChatUpdate}
          />
        );
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MobileHeader 
          activeView={activeView}
          onViewChange={setActiveView}
          onNewChat={handleNewChat}
          reminderCount={reminderCount}
        />
        <div className="h-[calc(100vh-73px)] overflow-hidden">
          {renderContent()}
        </div>
        
        <LoginDialog 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
          onWorkflowSelect={handleWorkflowSelect}
          onChatSelect={handleChatSelect}
          onNewChat={handleNewChat}
          selectedChatId={selectedChatId}
          chatUpdateTrigger={chatUpdateTrigger}
        />
        <div className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-capital-light-blue/30 dark:border-gray-600 p-6 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <img 
                src={companyConfig.logo}
                alt={`${companyConfig.name} Logo`} 
                className="h-16 w-auto"
              />
            </div>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-capital-dark-blue dark:text-white">{currentUser}</span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-capital-blue/30 text-capital-dark-blue hover:bg-capital-blue/10 dark:border-gray-600 dark:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsLoginOpen(true)}
                className="border-capital-blue/30 text-capital-dark-blue hover:bg-capital-blue/10 dark:border-gray-600 dark:text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
          
          <div className="flex-1 bg-white dark:bg-gray-800 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
      
      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </SidebarProvider>
  );
};

export default Index;
