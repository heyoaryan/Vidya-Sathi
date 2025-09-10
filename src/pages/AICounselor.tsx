import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Brain, MessageCircle, Send, User, Bot, Sparkles, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

const AICounselor: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI counselor. How can I help you today? I can assist with academic guidance, career planning, study strategies, and personal development.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Only students can access AI Counselor
  useEffect(() => {
    if (user && user.role !== 'student') {
      navigate('/app/dashboard');
    }
  }, [user, navigate]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message: string): string => {
    const responses = [
      "That's a great question! Based on your situation, I'd recommend focusing on time management and creating a structured study schedule.",
      "I understand your concern. Let me suggest some strategies that have helped many students in similar situations.",
      "Excellent point! Have you considered breaking this down into smaller, manageable tasks? This often makes complex challenges more approachable.",
      "I'm here to support you through this. Let's work together to find the best approach for your unique circumstances.",
      "That's a common challenge many students face. Here are some proven techniques that might help..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickActions = [
    { icon: BookOpen, title: 'Study Tips', description: 'Get personalized study strategies' },
    { icon: TrendingUp, title: 'Career Guidance', description: 'Explore career paths and opportunities' },
    { icon: Lightbulb, title: 'Problem Solving', description: 'Get help with academic challenges' },
    { icon: Sparkles, title: 'Goal Setting', description: 'Set and track your academic goals' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Counselor</h1>
        <p className="text-gray-300">Your personal AI-powered academic and career advisor</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 hover:scale-105 group"
                  onClick={() => setInputMessage(`I need help with ${action.title.toLowerCase()}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-400">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div className="glass-card p-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">AI Features</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Personalized Advice</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Academic Guidance</span>
        </div>
        <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Career Planning</span>
              </div>
          </div>
        </div>
      </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="glass-card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Counselor</h3>
                  <p className="text-sm text-gray-400">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white border border-white/20 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICounselor;
