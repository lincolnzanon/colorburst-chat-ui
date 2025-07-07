
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock } from 'lucide-react';
import { companyConfig } from '@/config/company';

interface AddReminderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReminderAdded?: () => void;
}

const AddReminderDialog = ({ isOpen, onClose, onReminderAdded }: AddReminderDialogProps) => {
  const [reminderData, setReminderData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    searchType: '',
    clientName: '',
    customQuery: '',
    priority: 'medium',
    repeatInterval: 'none',
    notificationMethods: ['popup']
  });

  const handleInputChange = (field: string, value: string) => {
    setReminderData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationMethodToggle = (method: string) => {
    setReminderData(prev => ({
      ...prev,
      notificationMethods: prev.notificationMethods.includes(method)
        ? prev.notificationMethods.filter(m => m !== method)
        : [...prev.notificationMethods, method]
    }));
  };

  const handleSubmit = async () => {
    console.log('Reminder creation request:', reminderData);
    
    // Simulate caching the chat query output
    const cachedQuery = {
      searchType: reminderData.searchType,
      clientName: reminderData.clientName,
      customQuery: reminderData.customQuery,
      timestamp: new Date().toISOString(),
      cachedResult: `Cached result for ${reminderData.searchType} query: ${reminderData.customQuery || 'Default query'}`
    };
    
    console.log('Chat query cached for future use:', cachedQuery);
    
    // Store reminder in localStorage for demo purposes
    const existingReminders = JSON.parse(localStorage.getItem('userReminders') || '[]');
    const newReminder = {
      id: Date.now().toString(),
      ...reminderData,
      cachedQuery,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    existingReminders.push(newReminder);
    localStorage.setItem('userReminders', JSON.stringify(existingReminders));
    
    // Reset form and close dialog
    setReminderData({
      title: '',
      description: '',
      date: '',
      time: '',
      searchType: '',
      clientName: '',
      customQuery: '',
      priority: 'medium',
      repeatInterval: 'none',
      notificationMethods: ['popup']
    });
    
    if (onReminderAdded) {
      onReminderAdded();
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-capital-dark-blue dark:text-white">
            Add New Reminder
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Reminder Title *
            </Label>
            <Input
              id="title"
              value={reminderData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter reminder title"
              className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={reminderData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Additional details about this reminder"
              className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={reminderData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={reminderData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-md font-medium text-capital-dark-blue dark:text-white mb-3">
              Chat Query Configuration
            </h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Search Type</Label>
                <Select value={reminderData.searchType} onValueChange={(value) => handleInputChange('searchType', value)}>
                  <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                    <SelectValue placeholder="Select search type" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyConfig.searchOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {reminderData.searchType === 'client' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Client</Label>
                  <Select value={reminderData.clientName} onValueChange={(value) => handleInputChange('clientName', value)}>
                    <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {companyConfig.clients.map((client) => (
                        <SelectItem key={client.value} value={client.value}>
                          {client.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="customQuery" className="text-sm font-medium">
                  Custom Query
                </Label>
                <Textarea
                  id="customQuery"
                  value={reminderData.customQuery}
                  onChange={(e) => handleInputChange('customQuery', e.target.value)}
                  placeholder="Enter your specific question or query that will be cached"
                  className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority</Label>
              <Select value={reminderData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Repeat</Label>
              <Select value={reminderData.repeatInterval} onValueChange={(value) => handleInputChange('repeatInterval', value)}>
                <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Repeat</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Notification Methods</Label>
            <div className="flex gap-2 flex-wrap">
              {['popup', 'email', 'browser', 'sound'].map((method) => (
                <Button
                  key={method}
                  variant={reminderData.notificationMethods.includes(method) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleNotificationMethodToggle(method)}
                  className="capitalize"
                >
                  {method}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-capital-blue/30 text-capital-dark-blue dark:border-gray-600 dark:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!reminderData.title || !reminderData.date || !reminderData.time}
              className="flex-1 bg-capital-blue hover:bg-capital-dark-blue text-white disabled:opacity-50"
            >
              Create Reminder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminderDialog;
