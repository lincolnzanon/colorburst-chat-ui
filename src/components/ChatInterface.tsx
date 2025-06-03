
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
import { companyConfig } from '@/config/company';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [clientName, setClientName] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message. I\'m here to assist you with your consulting needs.',
        sender: 'assistant',
        timestamp: new Date(),
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Show welcome screen if no messages
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 w-full max-w-4xl px-4">
            <h2 className="text-3xl font-medium text-gray-800">
              {getGreeting()} {companyConfig.greeting.userName}
            </h2>
            
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600">I want to search</span>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-32 border-capital-blue/30">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-capital-blue/30">
                    {companyConfig.searchOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {searchType === 'client' && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-600">I want to search my client</span>
                  <Select value={clientName} onValueChange={setClientName}>
                    <SelectTrigger className="w-48 border-capital-blue/30">
                      <SelectValue placeholder="Select client..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-capital-blue/30">
                      {companyConfig.clients.map((client) => (
                        <SelectItem key={client.value} value={client.value}>
                          {client.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full width input area at bottom */}
        <div className="w-full p-6 bg-gray-50 border-t border-capital-light-blue/30">
          <div className="flex gap-2 items-end max-w-full">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="flex-1 border border-capital-blue/30 focus:border-capital-blue resize-none rounded-md px-3 py-2 min-h-[40px] max-h-[200px]"
              style={{ overflowY: inputValue.split('\n').length > 5 ? 'auto' : 'hidden' }}
              rows={1}
            />
            <Button
              onClick={handleFileUpload}
              variant="outline"
              size="icon"
              className="border-capital-blue/30 hover:bg-capital-blue/10"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleMicrophoneToggle}
              variant="outline"
              size="icon"
              className={`border-capital-blue/30 ${
                isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-capital-blue/10'
              }`}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-capital-blue hover:bg-capital-dark-blue text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
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
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area - Full Width */}
      <div className="w-full border-t border-capital-light-blue/30 p-6 bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-capital-blue/30 focus:border-capital-blue resize-none rounded-md px-3 py-2 min-h-[40px] max-h-[200px]"
            style={{ overflowY: inputValue.split('\n').length > 5 ? 'auto' : 'hidden' }}
            rows={1}
          />
          <Button
            onClick={handleFileUpload}
            variant="outline"
            size="icon"
            className="border-capital-blue/30 hover:bg-capital-blue/10"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleMicrophoneToggle}
            variant="outline"
            size="icon"
            className={`border-capital-blue/30 ${
              isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-capital-blue/10'
            }`}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSendMessage}
            className="bg-capital-blue hover:bg-capital-dark-blue text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
