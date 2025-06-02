
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { workflows, getWorkflowById } from '@/workflows';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  workflow?: string;
}

const WorkflowInterface = ({ selectedWorkflowId }: { selectedWorkflowId?: string }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to the Workflow Assistant! Please select a workflow from the dropdown above and I\'ll guide you through the process.',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(selectedWorkflowId || '');
  const [isRecording, setIsRecording] = useState(false);
  const [workflowFields, setWorkflowFields] = useState<{[key: string]: string}>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (selectedWorkflowId) {
      setSelectedWorkflow(selectedWorkflowId);
    }
  }, [selectedWorkflowId]);

  const currentWorkflow = getWorkflowById(selectedWorkflow);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      workflow: selectedWorkflow,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response based on workflow
    setTimeout(() => {
      let responseContent = 'I\'m processing your request...';
      
      if (selectedWorkflow && currentWorkflow) {
        responseContent = `I'm analyzing your ${currentWorkflow.name} request. Let me help you with the next steps in this workflow.`;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date(),
        workflow: selectedWorkflow,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicrophoneToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('File selected:', file.name);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Workflow Selector */}
      <div className="border-b border-capital-light-blue/30 p-4 bg-gradient-to-r from-capital-blue/5 to-capital-light-blue/10">
        <label className="block text-sm font-medium text-capital-dark-blue mb-2">
          Select Workflow
        </label>
        <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
          <SelectTrigger className="w-full border-capital-blue/30">
            <SelectValue placeholder="Choose a workflow to get started" />
          </SelectTrigger>
          <SelectContent className="bg-white border-capital-blue/30">
            {workflows.map((workflow) => (
              <SelectItem key={workflow.id} value={workflow.id}>
                {workflow.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Dynamic Workflow Fields */}
        {currentWorkflow && (
          <div className="mt-4 space-y-3">
            {currentWorkflow.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-capital-dark-blue mb-1">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <Select 
                    value={workflowFields[field.name] || ''} 
                    onValueChange={(value) => setWorkflowFields(prev => ({ ...prev, [field.name]: value }))}
                  >
                    <SelectTrigger className="w-full border-capital-blue/30">
                      <SelectValue placeholder={`Select ${field.label.toLowerCase()}...`} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-capital-blue/30">
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <input
                    type="text"
                    value={workflowFields[field.name] || ''}
                    onChange={(e) => setWorkflowFields(prev => ({ ...prev, [field.name]: e.target.value }))}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    className="w-full px-3 py-2 border border-capital-blue/30 rounded-md focus:outline-none focus:ring-2 focus:ring-capital-blue focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-capital-blue text-white'
                  : 'bg-gray-100 text-gray-800 border border-capital-light-blue/30'
              }`}
            >
              {message.workflow && message.sender === 'user' && currentWorkflow && (
                <div className="text-xs opacity-70 mb-1">
                  Workflow: {currentWorkflow.name}
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area - Full Width */}
      <div className="border-t border-capital-light-blue/30 p-4 bg-white">
        {!selectedWorkflow && (
          <div className="mb-2 text-sm text-capital-yellow bg-capital-yellow/10 p-2 rounded border border-capital-yellow/30">
            Please select a workflow above to continue
          </div>
        )}
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={selectedWorkflow ? "Describe your workflow requirements..." : "Select a workflow first..."}
            disabled={!selectedWorkflow}
            className="flex-1 border border-capital-blue/30 focus:border-capital-blue disabled:opacity-50 resize-none rounded-md px-3 py-2 min-h-[40px] max-h-[200px] overflow-y-auto"
            rows={1}
          />
          <Button
            onClick={handleFileUpload}
            variant="outline"
            size="icon"
            disabled={!selectedWorkflow}
            className="border-capital-blue/30 hover:bg-capital-blue/10 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleMicrophoneToggle}
            variant="outline"
            size="icon"
            disabled={!selectedWorkflow}
            className={`border-capital-blue/30 disabled:opacity-50 ${
              isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-capital-blue/10'
            }`}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!selectedWorkflow}
            className="bg-capital-blue hover:bg-capital-dark-blue text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowInterface;
