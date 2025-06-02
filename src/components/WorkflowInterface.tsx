
import React, { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  workflow?: string;
}

const WorkflowInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to the Workflow Assistant! Please select a workflow from the dropdown above and I\'ll guide you through the process.',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');

  const workflows = [
    { value: 'financial-analysis', label: 'Financial Analysis' },
    { value: 'risk-assessment', label: 'Risk Assessment' },
    { value: 'business-planning', label: 'Business Planning' },
    { value: 'compliance-check', label: 'Compliance Check' },
    { value: 'market-research', label: 'Market Research' },
  ];

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
      
      if (selectedWorkflow) {
        const workflowLabel = workflows.find(w => w.value === selectedWorkflow)?.label;
        responseContent = `I'm analyzing your ${workflowLabel} request. Let me help you with the next steps in this workflow.`;
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
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
              <SelectItem key={workflow.value} value={workflow.value}>
                {workflow.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              {message.workflow && message.sender === 'user' && (
                <div className="text-xs opacity-70 mb-1">
                  Workflow: {workflows.find(w => w.value === message.workflow)?.label}
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

      {/* Input Area */}
      <div className="border-t border-capital-light-blue/30 p-4 bg-white">
        {!selectedWorkflow && (
          <div className="mb-2 text-sm text-capital-yellow bg-capital-yellow/10 p-2 rounded border border-capital-yellow/30">
            Please select a workflow above to continue
          </div>
        )}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={selectedWorkflow ? "Describe your workflow requirements..." : "Select a workflow first..."}
            disabled={!selectedWorkflow}
            className="flex-1 border-capital-blue/30 focus:border-capital-blue disabled:opacity-50"
          />
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
