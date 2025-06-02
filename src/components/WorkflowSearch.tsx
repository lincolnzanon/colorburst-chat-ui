
import React, { useState } from 'react';
import { Search, Workflow } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  category: string;
}

const WorkflowSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [workflows] = useState<WorkflowItem[]>([
    {
      id: '1',
      name: 'Financial Analysis',
      description: 'Comprehensive financial data analysis and reporting',
      category: 'Finance',
    },
    {
      id: '2',
      name: 'Risk Assessment',
      description: 'Evaluate and assess potential business risks',
      category: 'Risk Management',
    },
    {
      id: '3',
      name: 'Business Planning',
      description: 'Strategic business planning and forecasting',
      category: 'Strategy',
    },
    {
      id: '4',
      name: 'Compliance Check',
      description: 'Regulatory compliance verification and audit',
      category: 'Legal',
    },
    {
      id: '5',
      name: 'Market Research',
      description: 'Market analysis and competitive intelligence',
      category: 'Research',
    },
  ]);

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 space-y-3">
      <h3 className="text-sm font-medium text-capital-dark-blue">Search Workflows</h3>
      
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search workflows..."
          className="pl-8 text-sm border-capital-blue/30 focus:border-capital-blue"
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredWorkflows.map((workflow) => (
          <div
            key={workflow.id}
            className="p-2 rounded-lg hover:bg-capital-blue/5 cursor-pointer border border-transparent hover:border-capital-blue/20 transition-colors"
          >
            <div className="flex items-start gap-2">
              <Workflow className="h-4 w-4 text-capital-blue mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-capital-dark-blue">
                  {workflow.name}
                </p>
                <p className="text-xs text-gray-600">
                  {workflow.description}
                </p>
                <span className="inline-block text-xs bg-capital-blue/10 text-capital-blue px-1.5 py-0.5 rounded mt-1">
                  {workflow.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowSearch;
