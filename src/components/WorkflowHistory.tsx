
import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkflowHistoryItem {
  id: string;
  title: string;
  workflowName: string;
  lastMessage: string;
  timestamp: Date;
}

interface WorkflowHistoryProps {
  selectedWorkflow: string;
}

const WorkflowHistory = ({ selectedWorkflow }: WorkflowHistoryProps) => {
  const [workflowHistory] = React.useState<WorkflowHistoryItem[]>([
    {
      id: '1',
      title: 'Invoice for Office Supplies',
      workflowName: 'add-invoice-xero',
      lastMessage: 'Added invoice for $250 from Office Supplies Co',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: '2',
      title: 'Q3 Profit Analysis',
      workflowName: 'financial-analysis',
      lastMessage: 'Generated quarterly profit & loss report',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: '3',
      title: 'Compliance Review',
      workflowName: 'compliance-check',
      lastMessage: 'Completed tax compliance verification',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: '4',
      title: 'Tech Solutions Invoice',
      workflowName: 'add-invoice-xero',
      lastMessage: 'Processed invoice for consulting services',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
  ]);

  const workflowNames: {[key: string]: string} = {
    'add-invoice-xero': 'Add Invoice to Xero',
    'financial-analysis': 'Financial Analysis',
    'compliance-check': 'Compliance Check',
    'risk-assessment': 'Risk Assessment'
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const filteredHistory = selectedWorkflow 
    ? workflowHistory.filter(item => item.workflowName === selectedWorkflow)
    : workflowHistory;

  return (
    <div className="p-3 space-y-2">
      <h3 className="text-sm font-medium text-capital-dark-blue mb-3">
        {selectedWorkflow ? `${workflowNames[selectedWorkflow]} History` : 'Workflow History'}
      </h3>
      {filteredHistory.map((item) => (
        <div
          key={item.id}
          className="p-2 rounded-lg hover:bg-capital-blue/5 cursor-pointer border border-transparent hover:border-capital-blue/20 transition-colors ml-4"
        >
          <div className="flex items-start gap-2">
            <MessageSquare className="h-4 w-4 text-capital-blue mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-capital-dark-blue truncate">
                {item.title}
              </p>
              {!selectedWorkflow && (
                <p className="text-xs text-capital-blue/70 truncate">
                  {workflowNames[item.workflowName]}
                </p>
              )}
              <p className="text-xs text-gray-600 truncate">
                {item.lastMessage}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimestamp(item.timestamp)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkflowHistory;
