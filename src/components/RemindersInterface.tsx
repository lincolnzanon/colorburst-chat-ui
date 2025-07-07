
import React, { useState } from 'react';
import { Clock, AlertCircle, FileText, Calculator, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AddReminderDialog from './AddReminderDialog';

interface RemindersInterfaceProps {
  onWorkflowSelect: (workflowId: string) => void;
}

const RemindersInterface = ({ onWorkflowSelect }: RemindersInterfaceProps) => {
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  
  const reminders = [
    {
      id: 1,
      title: 'Invoice due for Acme Corp',
      description: 'Invoice #INV-001 payment due in 2 days',
      type: 'payment',
      urgency: 'high',
      workflowId: 'add-invoice-xero',
      icon: FileText,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      title: 'Monthly financial analysis',
      description: 'Generate Q1 financial report for Tech Solutions Ltd',
      type: 'report',
      urgency: 'medium',
      workflowId: 'financial-analysis',
      icon: Calculator,
      timeAgo: '1 day ago'
    },
    {
      id: 3,
      title: 'Compliance check reminder',
      description: 'Annual tax compliance review due next week',
      type: 'compliance',
      urgency: 'medium',
      workflowId: 'compliance-check',
      icon: AlertCircle,
      timeAgo: '3 days ago'
    },
    {
      id: 4,
      title: 'Risk assessment update',
      description: 'Update risk assessment for Global Industries',
      type: 'assessment',
      urgency: 'low',
      workflowId: 'risk-assessment',
      icon: AlertCircle,
      timeAgo: '1 week ago'
    },
    {
      id: 5,
      title: 'Client payment overdue',
      description: 'Startup Inc payment is 5 days overdue',
      type: 'payment',
      urgency: 'high',
      workflowId: 'add-invoice-xero',
      icon: Clock,
      timeAgo: '5 days ago'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
    }
  };

  const handleReminderClick = (workflowId: string) => {
    onWorkflowSelect(workflowId);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reminders</h1>
          <p className="text-gray-600 dark:text-gray-300">Stay on top of your important tasks and deadlines</p>
        </div>
        <Button
          onClick={() => setIsAddReminderOpen(true)}
          className="bg-capital-blue hover:bg-capital-dark-blue text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      <div className="space-y-4">
        {reminders.map((reminder) => {
          const IconComponent = reminder.icon;
          return (
            <Card 
              key={reminder.id} 
              className="cursor-pointer hover:shadow-md transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700"
              onClick={() => handleReminderClick(reminder.workflowId)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <div>
                      <CardTitle className="text-lg dark:text-white">{reminder.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        {reminder.timeAgo}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getUrgencyColor(reminder.urgency)}>
                    {reminder.urgency}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 dark:text-gray-300 mb-3">{reminder.description}</p>
                <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                  Start Workflow
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AddReminderDialog 
        isOpen={isAddReminderOpen} 
        onClose={() => setIsAddReminderOpen(false)} 
      />
    </div>
  );
};

export default RemindersInterface;
