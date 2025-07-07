
import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, FileText, Calculator, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AddReminderDialog from './AddReminderDialog';

interface RemindersInterfaceProps {
  onWorkflowSelect: (workflowId: string) => void;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  priority: string;
  searchType?: string;
  clientName?: string;
  customQuery?: string;
  date: string;
  time: string;
  createdAt: string;
  status: string;
}

const RemindersInterface = ({ onWorkflowSelect }: RemindersInterfaceProps) => {
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  
  useEffect(() => {
    // Load reminders from localStorage
    const savedReminders = localStorage.getItem('userReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
      case 'urgent':
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

  const handleDeleteReminder = (reminderId: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== reminderId);
    setReminders(updatedReminders);
    localStorage.setItem('userReminders', JSON.stringify(updatedReminders));
  };

  const handleReminderAdded = () => {
    // Refresh reminders from localStorage
    const savedReminders = localStorage.getItem('userReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
    setIsAddReminderOpen(false);
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString();
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
        {reminders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No reminders yet. Create your first reminder!</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <Card 
              key={reminder.id} 
              className="cursor-pointer hover:shadow-md transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <div>
                      <CardTitle className="text-lg dark:text-white">{reminder.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(reminder.date, reminder.time)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getUrgencyColor(reminder.priority)}>
                      {reminder.priority}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReminder(reminder.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 dark:text-gray-300 mb-3">{reminder.description}</p>
                {reminder.searchType && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Search Type: {reminder.searchType}
                    {reminder.clientName && ` • Client: ${reminder.clientName}`}
                  </div>
                )}
                {reminder.customQuery && (
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    Query: {reminder.customQuery}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AddReminderDialog 
        isOpen={isAddReminderOpen} 
        onClose={() => setIsAddReminderOpen(false)}
        onReminderAdded={handleReminderAdded}
      />
    </div>
  );
};

export default RemindersInterface;
