
import React from 'react';
import { MessageSquare, Workflow } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ChatHistory from './ChatHistory';
import WorkflowSearch from './WorkflowSearch';

interface AppSidebarProps {
  activeView: 'chat' | 'workflows';
  onViewChange: (view: 'chat' | 'workflows') => void;
}

const AppSidebar = ({ activeView, onViewChange }: AppSidebarProps) => {
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
  ];

  return (
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
                    onClick={() => onViewChange(item.view)}
                    className={`transition-colors duration-200 ${
                      activeView === item.view 
                        ? 'bg-capital-blue text-white hover:bg-capital-dark-blue' 
                        : 'text-capital-dark-blue hover:bg-capital-blue/10'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Conditional content based on active view */}
        {activeView === 'chat' && (
          <SidebarGroup>
            <ChatHistory />
          </SidebarGroup>
        )}

        {activeView === 'workflows' && (
          <SidebarGroup>
            <WorkflowSearch />
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
