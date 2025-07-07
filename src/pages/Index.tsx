
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import ChatInterface from '@/components/ChatInterface';
import WorkflowInterface from '@/components/WorkflowInterface';
import RemindersInterface from '@/components/RemindersInterface';
import LoginDialog from '@/components/LoginDialog';
import { companyConfig } from '@/config/company';

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'workflows' | 'reminders'>('chat');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setActiveView('workflows');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return <ChatInterface />;
      case 'workflows':
        return <WorkflowInterface selectedWorkflowId={selectedWorkflowId} />;
      case 'reminders':
        return <RemindersInterface onWorkflowSelect={handleWorkflowSelect} />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
          onWorkflowSelect={handleWorkflowSelect}
        />
        <div className="flex-1 flex flex-col">
          {/* Company Logo Header with Login */}
          <div className="bg-white dark:bg-gray-800 border-b border-capital-light-blue/30 dark:border-gray-600 p-6 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <img 
                src={companyConfig.logo}
                alt={`${companyConfig.name} Logo`} 
                className="h-40 w-auto"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setIsLoginOpen(true)}
              className="border-capital-blue/30 text-capital-dark-blue hover:bg-capital-blue/10 dark:border-gray-600 dark:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
          
          <div className="flex-1 bg-white dark:bg-gray-800">
            {renderContent()}
          </div>
        </div>
      </div>
      
      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </SidebarProvider>
  );
};

export default Index;
