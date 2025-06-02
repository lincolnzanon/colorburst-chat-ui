
import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const ChatHistory = () => {
  const [chatHistory] = React.useState<ChatHistoryItem[]>([
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
  ]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return timestamp.toLocaleDateString();
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
              <p className="text-xs font-medium text-capital-dark-blue truncate">
                {chat.title}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {chat.lastMessage}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimestamp(chat.timestamp)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
