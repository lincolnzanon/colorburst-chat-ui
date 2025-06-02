
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import ChatInterface from '@/components/ChatInterface';
import WorkflowInterface from '@/components/WorkflowInterface';
import RemindersInterface from '@/components/RemindersInterface';
import { companyConfig } from '@/config/company';

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'workflows' | 'reminders'>('chat');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('');

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
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
          onWorkflowSelect={handleWorkflowSelect}
        />
        <div className="flex-1 flex flex-col">
          {/* Company Logo Header */}
          <div className="bg-white border-b border-capital-light-blue/30 p-4 flex justify-center">
            <img 
              src={companyConfig.logo}
              alt={`${companyConfig.name} Logo`} 
              className="h-20 w-auto"
            />
          </div>
          
          <div className="flex-1 bg-white">
            {renderContent()}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
