
import React, { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Edit2, Check, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatHistoryItem {
  id: string;
  title: string;
  customTitle?: string;
  lastMessage: string;
  timestamp: Date;
  messages: Array<{
    id: string;
    content: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
  }>;
}

interface ChatHistoryProps {
  onChatSelect?: (chatId: string) => void;
  onMessageEdit?: (chatId: string, messageId: string, newContent: string) => void;
}

const ChatHistory = ({ onChatSelect, onMessageEdit }: ChatHistoryProps) => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    // Load chat history from localStorage
    const savedChats = localStorage.getItem('chatHistory');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        timestamp: new Date(chat.timestamp),
        messages: chat.messages?.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })) || []
      }));
      setChatHistory(parsedChats);
      setFilteredChats(parsedChats);
    }
  }, []);

  useEffect(() => {
    // Filter chats based on search query
    if (searchQuery.trim() === '') {
      setFilteredChats(chatHistory);
    } else {
      const filtered = chatHistory.filter(chat =>
        (chat.customTitle || chat.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchQuery, chatHistory]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const saveChatHistory = (updatedChats: ChatHistoryItem[]) => {
    setChatHistory(updatedChats);
    localStorage.setItem('chatHistory', JSON.stringify(updatedChats));
  };

  const handleStartEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const handleSaveEdit = (id: string) => {
    const updatedChats = chatHistory.map(chat => 
      chat.id === id 
        ? { ...chat, customTitle: editValue.trim() || chat.title }
        : chat
    );
    saveChatHistory(updatedChats);
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (id: string) => {
    const updatedChats = chatHistory.filter(chat => chat.id !== id);
    saveChatHistory(updatedChats);
  };

  const handleChatClick = (chatId: string) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    }
  };

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-capital-dark-blue dark:text-white">Chat History</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="h-3 w-3" />
        </Button>
      </div>
      
      {searchOpen && (
        <div className="mb-3">
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs h-7 border-capital-blue/30 dark:border-gray-600"
          />
        </div>
      )}

      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          className="p-2 rounded-lg hover:bg-capital-blue/5 cursor-pointer border border-transparent hover:border-capital-blue/20 transition-colors"
          onClick={() => handleChatClick(chat.id)}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveEdit(chat.id);
                    }}
                  >
                    <Check className="h-3 w-3 text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelEdit();
                    }}
                  >
                    <X className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              ) : (
                <p className="text-xs font-medium text-capital-dark-blue dark:text-white truncate">
                  {chat.customTitle || chat.title}
                </p>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {chat.lastMessage}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {formatTimestamp(chat.timestamp)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-gray-400 hover:text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartEdit(chat.id, chat.customTitle || chat.title);
                }}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-gray-400 hover:text-red-500 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(chat.id);
                }}
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
