
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from '@/components/Header';
import AppSidebar from '@/components/AppSidebar';
import ChatInterface from '@/components/ChatInterface';
import WorkflowInterface from '@/components/WorkflowInterface';

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'workflows'>('chat');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 bg-white border-b border-capital-light-blue/30">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="text-capital-blue hover:text-capital-dark-blue" />
                <h2 className="text-lg font-semibold text-capital-dark-blue">
                  {activeView === 'chat' ? 'AI Chat Assistant' : 'Workflow Assistant'}
                </h2>
              </div>
            </div>
            <div className="flex-1 bg-white">
              {activeView === 'chat' ? <ChatInterface /> : <WorkflowInterface />}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
