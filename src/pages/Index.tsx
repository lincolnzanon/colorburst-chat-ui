
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from '@/components/Header';
import AppSidebar from '@/components/AppSidebar';
import ChatInterface from '@/components/ChatInterface';
import WorkflowInterface from '@/components/WorkflowInterface';

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'workflows'>('chat');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('');

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setActiveView('workflows');
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
          <Header />
          <div className="flex-1 bg-white">
            {activeView === 'chat' ? (
              <ChatInterface />
            ) : (
              <WorkflowInterface selectedWorkflowId={selectedWorkflowId} />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
