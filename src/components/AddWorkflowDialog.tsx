
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

interface AddWorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWorkflowDialog = ({ isOpen, onClose }: AddWorkflowDialogProps) => {
  const [workflowData, setWorkflowData] = useState({
    name: '',
    description: '',
    category: '',
    priority: 'medium',
    estimatedTime: '',
    requiredInputs: '',
    expectedOutputs: '',
    automationLevel: 'semi-automated',
    triggerConditions: '',
    notificationEmail: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setWorkflowData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log('Workflow creation request:', workflowData);
    
    // Here you would normally send the data to an API or email service
    // For now, we'll just log it and show a confirmation
    
    // Simulate sending email (this would be replaced with actual email service)
    const emailContent = `
      New Workflow Request:
      
      Name: ${workflowData.name}
      Description: ${workflowData.description}
      Category: ${workflowData.category}
      Priority: ${workflowData.priority}
      Estimated Time: ${workflowData.estimatedTime}
      Required Inputs: ${workflowData.requiredInputs}
      Expected Outputs: ${workflowData.expectedOutputs}
      Automation Level: ${workflowData.automationLevel}
      Trigger Conditions: ${workflowData.triggerConditions}
      Notification Email: ${workflowData.notificationEmail}
    `;
    
    console.log('Email content that would be sent:', emailContent);
    
    // Reset form and close dialog
    setWorkflowData({
      name: '',
      description: '',
      category: '',
      priority: 'medium',
      estimatedTime: '',
      requiredInputs: '',
      expectedOutputs: '',
      automationLevel: 'semi-automated',
      triggerConditions: '',
      notificationEmail: ''
    });
    
    onClose();
    alert('Workflow creation request submitted! An email has been sent with the details.');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-capital-dark-blue dark:text-white">
            Create New Workflow
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Workflow Name *
              </Label>
              <Input
                id="name"
                value={workflowData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter workflow name"
                className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Category</Label>
              <Select value={workflowData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                  <SelectItem value="data-processing">Data Processing</SelectItem>
                  <SelectItem value="client-management">Client Management</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={workflowData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what this workflow should accomplish"
              className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority</Label>
              <Select value={workflowData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
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
              <Label htmlFor="estimatedTime" className="text-sm font-medium">
                Estimated Time
              </Label>
              <Input
                id="estimatedTime"
                value={workflowData.estimatedTime}
                onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                placeholder="e.g., 2 hours, 1 day"
                className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requiredInputs" className="text-sm font-medium">
              Required Inputs
            </Label>
            <Textarea
              id="requiredInputs"
              value={workflowData.requiredInputs}
              onChange={(e) => handleInputChange('requiredInputs', e.target.value)}
              placeholder="What data or inputs are needed for this workflow?"
              className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedOutputs" className="text-sm font-medium">
              Expected Outputs
            </Label>
            <Textarea
              id="expectedOutputs"
              value={workflowData.expectedOutputs}
              onChange={(e) => handleInputChange('expectedOutputs', e.target.value)}
              placeholder="What should this workflow produce?"
              className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Automation Level</Label>
              <Select value={workflowData.automationLevel} onValueChange={(value) => handleInputChange('automationLevel', value)}>
                <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="semi-automated">Semi-Automated</SelectItem>
                  <SelectItem value="fully-automated">Fully Automated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notificationEmail" className="text-sm font-medium">
                Notification Email
              </Label>
              <Input
                id="notificationEmail"
                type="email"
                value={workflowData.notificationEmail}
                onChange={(e) => handleInputChange('notificationEmail', e.target.value)}
                placeholder="admin@company.com"
                className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="triggerConditions" className="text-sm font-medium">
              Trigger Conditions
            </Label>
            <Textarea
              id="triggerConditions"
              value={workflowData.triggerConditions}
              onChange={(e) => handleInputChange('triggerConditions', e.target.value)}
              placeholder="When should this workflow be triggered? (e.g., daily at 9 AM, when new invoice is received)"
              className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
            />
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
              disabled={!workflowData.name || !workflowData.description}
              className="flex-1 bg-capital-blue hover:bg-capital-dark-blue text-white disabled:opacity-50"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkflowDialog;
