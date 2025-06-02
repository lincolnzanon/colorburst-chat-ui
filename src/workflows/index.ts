
import { addInvoiceXeroWorkflow } from './add-invoice-xero/config';
import { financialAnalysisWorkflow } from './financial-analysis/config';
import { riskAssessmentWorkflow } from './risk-assessment/config';
import { complianceCheckWorkflow } from './compliance-check/config';

export type WorkflowField = {
  name: string;
  label: string;
  type: 'select' | 'text';
  options?: Array<{ value: string; label: string }>;
};

export type WorkflowConfig = {
  id: string;
  name: string;
  description: string;
  fields: WorkflowField[];
};

export const workflows: WorkflowConfig[] = [
  addInvoiceXeroWorkflow,
  financialAnalysisWorkflow,
  riskAssessmentWorkflow,
  complianceCheckWorkflow
];

export const getWorkflowById = (id: string): WorkflowConfig | undefined => {
  return workflows.find(workflow => workflow.id === id);
};
</lov_write>

Now let's create the reminders functionality:

<lov-write file_path="src/components/RemindersInterface.tsx">
import React, { useState } from 'react';
import { Clock, ExternalLink, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { workflows } from '@/workflows';

interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  source: string;
  workflowId?: string;
  priority: 'low' | 'medium' | 'high';
}

const RemindersInterface = ({ onWorkflowSelect }: { onWorkflowSelect?: (workflowId: string) => void }) => {
  // Mock reminders data
  const [reminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Monthly Invoice Processing',
      description: 'Process invoices for client Acme Corporation',
      dueDate: new Date(),
      source: 'Xero',
      workflowId: 'add-invoice-xero',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Quarterly Financial Review',
      description: 'Complete Q4 financial analysis for Tech Solutions',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      source: 'Internal Calendar',
      workflowId: 'financial-analysis',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Compliance Audit Due',
      description: 'Annual compliance check for regulatory requirements',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      source: 'Compliance System',
      workflowId: 'compliance-check',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Risk Assessment Update',
      description: 'Update risk assessment for Global Industries',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      source: 'Risk Management',
      workflowId: 'risk-assessment',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Client Meeting Preparation',
      description: 'Prepare documents for Startup Inc meeting',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      source: 'CRM',
      priority: 'low'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 0) return `Due in ${diffDays} days`;
    return `Overdue by ${Math.abs(diffDays)} days`;
  };

  const handleReminderClick = (reminder: Reminder) => {
    if (reminder.workflowId && onWorkflowSelect) {
      onWorkflowSelect(reminder.workflowId);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-capital-light-blue/30 bg-gradient-to-r from-capital-blue/5 to-capital-light-blue/10">
        <h2 className="text-lg font-semibold text-capital-dark-blue mb-2">Reminders</h2>
        <p className="text-sm text-gray-600">
          {reminders.length} active reminders
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`p-4 rounded-lg border transition-colors cursor-pointer hover:shadow-md ${
              reminder.workflowId ? 'hover:bg-capital-blue/5' : 'hover:bg-gray-50'
            } ${getPriorityColor(reminder.priority)}`}
            onClick={() => handleReminderClick(reminder)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getPriorityIcon(reminder.priority)}
                <h3 className="font-medium text-gray-900">{reminder.title}</h3>
              </div>
              {reminder.workflowId && (
                <ExternalLink className="h-4 w-4 text-gray-400" />
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">From {reminder.source}</span>
              <span className="font-medium">{formatDueDate(reminder.dueDate)}</span>
            </div>

            {reminder.workflowId && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReminderClick(reminder);
                  }}
                >
                  Start {workflows.find(w => w.id === reminder.workflowId)?.name}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemindersInterface;
