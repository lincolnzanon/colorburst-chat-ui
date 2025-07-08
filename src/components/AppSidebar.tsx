
import React, { useState, useEffect } from 'react';
import { MessageSquare, Workflow, Bell, Settings, Plus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import ChatHistory from './ChatHistory';
import WorkflowSearch from './WorkflowSearch';
import SettingsDialog from './SettingsDialog';

interface AppSidebarProps {
  activeView: 'chat' | 'workflows' | 'reminders';
  onViewChange: (view: 'chat' | 'workflows' | 'reminders') => void;
  onWorkflowSelect?: (workflowId: string) => void;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: () => void;
  selectedChatId?: string;
  chatUpdateTrigger?: number;
}

const AppSidebar = ({ 
  activeView, 
  onViewChange, 
  onWorkflowSelect, 
  onChatSelect,
  onNewChat,
  selectedChatId,
  chatUpdateTrigger
}: AppSidebarProps) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [reminderCount, setReminderCount] = useState(0);

  useEffect(() => {
    // Update reminder count from localStorage
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

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('userReminders_')) {
        updateReminderCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case changes happen in same tab
    const interval = setInterval(updateReminderCount, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    {
      title: "Chat",
      icon: MessageSquare,
      view: 'chat' as const,
    },
    {
      title: "Workflows",
      icon: Workflow,
      view: 'workflows' as const,
    },
    {
      title: "Reminders",
      icon: Bell,
      view: 'reminders' as const,
      badge: reminderCount > 0 ? reminderCount : undefined,
    },
  ];

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    if (onWorkflowSelect) {
      onWorkflowSelect(workflowId);
    }
  };

  const handleChatSelect = (chatId: string) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    }
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    }
  };

  return (
    <>
      <Sidebar className="border-r border-capital-light-blue/30">
        <SidebarContent className="bg-gradient-to-b from-capital-blue/5 to-capital-light-blue/10">
          <SidebarGroup>
            <SidebarGroupLabel className="text-capital-dark-blue font-semibold">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => {
                        onViewChange(item.view);
                        if (item.view === 'chat') {
                          setSelectedWorkflow('');
                        }
                      }}
                      className={`transition-colors duration-200 ${
                        activeView === item.view 
                          ? 'bg-capital-blue text-white hover:bg-capital-dark-blue' 
                          : 'text-capital-dark-blue hover:bg-capital-blue/10'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Show ChatHistory for chat view */}
          {activeView === 'chat' && (
            <SidebarGroup>
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-sm font-medium text-capital-dark-blue dark:text-white">Chat</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-capital-blue/10"
                  onClick={handleNewChat}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <ChatHistory 
                onChatSelect={handleChatSelect}
                selectedChatId={selectedChatId}
                onUpdateTrigger={chatUpdateTrigger}
              />
            </SidebarGroup>
          )}

          {/* Show WorkflowSearch only for workflows view */}
          {activeView === 'workflows' && (
            <SidebarGroup>
              <WorkflowSearch onWorkflowSelect={handleWorkflowSelect} />
            </SidebarGroup>
          )}
        </SidebarContent>
        
        <SidebarFooter className="p-2">
          <SidebarMenuButton 
            onClick={() => setIsSettingsOpen(true)}
            className="text-capital-dark-blue hover:bg-capital-blue/10 justify-start"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>

      <SettingsDialog 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};

export default AppSidebar;
