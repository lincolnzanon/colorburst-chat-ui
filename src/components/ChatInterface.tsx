import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Upload, Edit2, Check, X, UserPlus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { companyConfig } from '@/config/company';

interface Message {
  id: string;
  content: string;
  originalContent?: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isEditing?: boolean;
}

interface ChatInterfaceProps {
  selectedChatId?: string;
  onChatUpdate?: () => void;
}

// Mock organization members
const organizationMembers = [
  { id: '1', name: 'John Smith', email: 'john@company.com' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com' },
  { id: '3', name: 'Mike Davis', email: 'mike@company.com' },
  { id: '4', name: 'Emily Chen', email: 'emily@company.com' },
  { id: '5', name: 'David Wilson', email: 'david@company.com' },
];

const ChatInterface = ({ selectedChatId, onChatUpdate }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [clientName, setClientName] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(selectedChatId || null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat when selectedChatId changes
  useEffect(() => {
    if (selectedChatId) {
      loadChatHistory(selectedChatId);
      setCurrentChatId(selectedChatId);
    } else {
      // Reset to new chat
      setMessages([]);
      setCurrentChatId(null);
      setUploadedFile(null);
    }
  }, [selectedChatId]);

  const loadChatHistory = (chatId: string) => {
    const currentUser = localStorage.getItem('currentUser') || 'demo-user';
    const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${currentUser}`) || '[]');
    const chat = chatHistory.find((c: any) => c.id === chatId);
    
    if (chat) {
      const loadedMessages = chat.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(loadedMessages);
      
      // Load any user preferences for this chat if they exist
      const lastUserMessage = loadedMessages.reverse().find((msg: any) => msg.sender === 'user');
      if (lastUserMessage && chat.searchType) {
        setSearchType(chat.searchType);
        setClientName(chat.clientName || '');
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const saveChatToHistory = (chatId: string, messages: Message[], title: string, lastMessage: string) => {
    const currentUser = localStorage.getItem('currentUser') || 'demo-user';
    const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${currentUser}`) || '[]');
    const existingChatIndex = chatHistory.findIndex((chat: any) => chat.id === chatId);
    
    const chatData = {
      id: chatId,
      title,
      customTitle: existingChatIndex >= 0 ? chatHistory[existingChatIndex].customTitle : undefined,
      lastMessage,
      timestamp: new Date(),
      searchType,
      clientName,
      messages: messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender,
        timestamp: msg.timestamp
      }))
    };

    if (existingChatIndex >= 0) {
      chatHistory[existingChatIndex] = chatData;
    } else {
      chatHistory.unshift(chatData);
    }

    // Keep only last 50 chats per user
    if (chatHistory.length > 50) {
      chatHistory.splice(50);
    }

    localStorage.setItem(`chatHistory_${currentUser}`, JSON.stringify(chatHistory));
    
    // Trigger chat history update
    if (onChatUpdate) {
      onChatUpdate();
    }
  };

  const sendWebhookRequest = async (searchType: string, clientName: string, query: string, file?: File) => {
    const webhookData: any = {
      searchType,
      clientName,
      query,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('currentUser') || 'demo-user-123'
    };

    // Add file data if present
    if (file) {
      webhookData.fileName = file.name;
      webhookData.fileSize = file.size;
      webhookData.fileType = file.type;
    }

    const webhookUrls = {
      client: 'https://api.example.com/webhooks/client-search',
      company: 'https://api.example.com/webhooks/company-search', 
      financials: 'https://api.example.com/webhooks/financial-search',
      crm: 'https://api.example.com/webhooks/crm-search'
    };

    const webhookUrl = webhookUrls[searchType as keyof typeof webhookUrls];
    
    console.log('Sending webhook request to:', webhookUrl);
    console.log('Webhook data:', webhookData);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
        mode: 'no-cors'
      });

      console.log('Webhook sent successfully');
      return { success: true, data: webhookData };
    } catch (error) {
      console.error('Webhook request failed:', error);
      return { success: false, error };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Initialize chat if it's the first message
    let chatId = currentChatId;
    if (!chatId) {
      chatId = `chat-${Date.now()}`;
      setCurrentChatId(chatId);
    }

    // Send webhook request if search type is selected
    if (searchType) {
      await sendWebhookRequest(searchType, clientName, inputValue, uploadedFile || undefined);
    }

    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      let responseContent = 'Thank you for your message. I\'m here to assist you with your consulting needs.';
      
      if (searchType) {
        const searchLabel = companyConfig.searchOptions.find(opt => opt.value === searchType)?.label || searchType;
        responseContent = `I've processed your ${searchLabel} search request and sent it to our backend systems for analysis. `;
        
        if (clientName) {
          const clientLabel = companyConfig.clients.find(client => client.value === clientName)?.label || clientName;
          responseContent += `The search is specifically for ${clientLabel}. `;
        }
        
        if (uploadedFile) {
          responseContent += `I've also included the file "${uploadedFile.name}" in the analysis. `;
        }
        
        responseContent += 'You should receive the results shortly.';
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);

      // Save to chat history
      const chatTitle = inputValue.length > 50 ? inputValue.substring(0, 50) + '...' : inputValue;
      saveChatToHistory(chatId!, finalMessages, chatTitle, inputValue);
    }, 1000);
  };

  const handleShareChat = (memberId: string) => {
    const member = organizationMembers.find(m => m.id === memberId);
    if (member) {
      console.log(`Sharing chat with ${member.name} (${member.email})`);
      // In a real app, this would send the chat data to the selected user
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedFile(file);
        console.log('File selected:', file.name);
      }
    };
    input.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message && message.sender === 'user') {
      setEditingMessageId(messageId);
      setEditValue(message.content);
    }
  };

  const handleSaveEdit = async (messageId: string) => {
    if (!editValue.trim()) return;

    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: editValue, originalContent: msg.content }
        : msg
    );
    setMessages(updatedMessages);
    
    // Send new webhook request for edited message
    if (searchType) {
      await sendWebhookRequest(searchType, clientName, editValue, uploadedFile || undefined);
    }

    setEditingMessageId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditValue('');
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
            <h2 className="text-3xl font-medium text-gray-800 dark:text-white">
              {getGreeting()} {companyConfig.greeting.userName}
            </h2>
            
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600 dark:text-gray-300">I want to search</span>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-32 border-capital-blue/30 dark:border-gray-600">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-capital-blue/30 dark:bg-gray-800 dark:border-gray-600">
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
                  <span className="text-gray-600 dark:text-gray-300">I want to search my client</span>
                  <Select value={clientName} onValueChange={setClientName}>
                    <SelectTrigger className="w-48 border-capital-blue/30 dark:border-gray-600">
                      <SelectValue placeholder="Select client..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-capital-blue/30 dark:bg-gray-800 dark:border-gray-600">
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
        <div className="w-full p-6 bg-gray-50 border-t border-capital-light-blue/30 dark:bg-gray-900 dark:border-gray-600">
          {uploadedFile && (
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>📄 {uploadedFile.name}</span>
              <button
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <div className="flex gap-2 items-end max-w-full">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="flex-1 border border-capital-blue/30 focus:border-capital-blue resize-none rounded-md px-3 py-2 min-h-[40px] max-h-[200px] dark:border-gray-600 dark:bg-gray-800 dark:text-white overflow-hidden"
              style={{ 
                height: 'auto',
                overflowY: inputValue.split('\n').length > 5 || textareaRef.current?.scrollHeight > 200 ? 'auto' : 'hidden'
              }}
              rows={1}
            />
            <Button
              onClick={handleFileUpload}
              variant="outline"
              size="icon"
              className="border-capital-blue/30 hover:bg-capital-blue/10 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleMicrophoneToggle}
              variant="outline"
              size="icon"
              className={`border-capital-blue/30 dark:border-gray-600 ${
                isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' : 'hover:bg-capital-blue/10 dark:hover:bg-gray-700'
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
      {/* Header with Share Button */}
      <div className="border-b border-capital-light-blue/30 p-4 flex justify-end dark:border-gray-600">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-capital-blue/30 text-capital-dark-blue hover:bg-capital-blue/10 dark:border-gray-600 dark:text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Someone
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border-capital-blue/30 dark:border-gray-600">
            {organizationMembers.map((member) => (
              <DropdownMenuItem 
                key={member.id}
                onClick={() => handleShareChat(member.id)}
                className="hover:bg-capital-blue/10 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{member.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{member.email}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 relative group ${
                message.sender === 'user'
                  ? 'bg-capital-blue text-white'
                  : 'bg-gray-100 text-gray-800 border border-capital-light-blue/30 dark:bg-gray-800 dark:text-white dark:border-gray-600'
              }`}
            >
              {editingMessageId === message.id ? (
                <div className="space-y-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="text-sm bg-white text-black"
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(message.id)}
                  />
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleSaveEdit(message.id)}>
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm">{message.content}</p>
                  {message.sender === 'user' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 h-6 w-6 text-gray-400 hover:text-gray-600"
                      onClick={() => handleEditMessage(message.id)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </>
              )}
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area - Full Width */}
      <div className="w-full border-t border-capital-light-blue/30 p-6 bg-white dark:bg-gray-900 dark:border-gray-600">
        {uploadedFile && (
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>📄 {uploadedFile.name}</span>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-capital-blue/30 focus:border-capital-blue resize-none rounded-md px-3 py-2 min-h-[40px] max-h-[200px] dark:border-gray-600 dark:bg-gray-800 dark:text-white overflow-hidden"
            style={{ 
              height: 'auto',
              overflowY: inputValue.split('\n').length > 5 || textareaRef.current?.scrollHeight > 200 ? 'auto' : 'hidden'
            }}
            rows={1}
          />
          <Button
            onClick={handleFileUpload}
            variant="outline"
            size="icon"
            className="border-capital-blue/30 hover:bg-capital-blue/10 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleMicrophoneToggle}
            variant="outline"
            size="icon"
            className={`border-capital-blue/30 dark:border-gray-600 ${
              isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' : 'hover:bg-capital-blue/10 dark:hover:bg-gray-700'
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
