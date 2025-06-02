
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { workflows } from '@/workflows';

interface WorkflowSearchProps {
  onWorkflowSelect: (workflowId: string) => void;
}

const WorkflowSearch = ({ onWorkflowSelect }: WorkflowSearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SidebarGroupLabel className="text-capital-dark-blue font-semibold">
        Available Workflows
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="relative mb-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 border-capital-blue/30 focus:border-capital-blue"
          />
        </div>
        <div className="space-y-1">
          {filteredWorkflows.map((workflow) => (
            <button
              key={workflow.id}
              onClick={() => onWorkflowSelect(workflow.id)}
              className="w-full text-left p-2 rounded-md hover:bg-capital-blue/10 transition-colors text-sm text-capital-dark-blue"
            >
              <div className="font-medium">{workflow.name}</div>
              <div className="text-xs text-gray-600 mt-1">{workflow.description}</div>
            </button>
          ))}
        </div>
      </SidebarGroupContent>
    </>
  );
};

export default WorkflowSearch;
