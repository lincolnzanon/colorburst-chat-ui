
import React, { useState } from 'react';
import { MessageSquare, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatHistoryItem {
  id: string;
  title: string;
  customTitle?: string;
  lastMessage: string;
  timestamp: Date;
}

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    {
      id: '1',
      title: 'Financial Analysis Discussion',
      lastMessage: 'Can you help me analyze the Q3 reports?',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: '2',
      title: 'Client Meeting Prep',
      lastMessage: 'What should I prepare for the Acme Corp meeting?',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: '3',
      title: 'Risk Assessment Query',
      lastMessage: 'Help me understand the risk factors',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: '4',
      title: 'Invoice Processing Help',
      lastMessage: 'How do I process multiple invoices at once?',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: '5',
      title: 'Compliance Review Assistance',
      lastMessage: 'Need help with annual compliance checklist',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleStartEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const handleSaveEdit = (id: string) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === id 
          ? { ...chat, customTitle: editValue.trim() || chat.title }
          : chat
      )
    );
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (id: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
  };

  return (
    <div className="p-3 space-y-2">
      <h3 className="text-sm font-medium text-capital-dark-blue mb-3">Chat History</h3>
      {chatHistory.map((chat) => (
        <div
          key={chat.id}
          className="p-2 rounded-lg hover:bg-capital-blue/5 cursor-pointer border border-transparent hover:border-capital-blue/20 transition-colors"
        >
          <div className="flex items-start gap-2">
            <MessageSquare className="h-4 w-4 text-capital-blue mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              {editingId === chat.id ? (
                <div className="flex items-center gap-1 mb-1">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="text-xs h-6 px-2"
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(chat.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => handleSaveEdit(chat.id)}
                  >
                    <Check className="h-3 w-3 text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              ) : (
                <p className="text-xs font-medium text-capital-dark-blue truncate">
                  {chat.customTitle || chat.title}
                </p>
              )}
              <p className="text-xs text-gray-600 truncate">
                {chat.lastMessage}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimestamp(chat.timestamp)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-gray-400 hover:text-blue-500"
                onClick={() => handleStartEdit(chat.id, chat.customTitle || chat.title)}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-gray-400 hover:text-red-500 hover:bg-red-50"
                onClick={() => handleDelete(chat.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
