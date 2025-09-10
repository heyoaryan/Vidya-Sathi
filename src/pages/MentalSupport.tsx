import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Smile, 
  Frown, 
  Meh,
  Lightbulb,
  Phone,
  Calendar,
  FileText,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Shield
} from 'lucide-react';
import { mockStudents } from '../data/mockData';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface RiskAnalysis {
  currentRisk: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  factors: string[];
  recommendations: string[];
  moodTrend: number[];
}

const MentalSupport: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI mental health counselor. I'm here to listen, support, and help analyze your mental well-being. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      sentiment: 'positive'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis>({
    currentRisk: 35,
    trend: 'stable',
    factors: ['Good academic performance', 'Regular attendance'],
    recommendations: ['Continue current positive habits', 'Maintain social connections'],
    moodTrend: [70, 75, 68, 72, 80, 78]
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find current student data
  const currentStudent = mockStudents.find(s => s.id === user?.id) || mockStudents[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
    const positiveWords = ['good', 'great', 'happy', 'excited', 'wonderful', 'amazing', 'love', 'enjoy', 'hope', 'better'];
    const negativeWords = ['bad', 'terrible', 'sad', 'angry', 'hate', 'worried', 'scared', 'anxious', 'depressed', 'lonely'];
    
    const lowerText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  const updateRiskAnalysis = (message: Message) => {
    const sentiment = message.sentiment;
    const mood = message.mood;
    
    let riskChange = 0;
    let newFactors: string[] = [];
    let newRecommendations: string[] = [];
    
    if (sentiment === 'negative') {
      riskChange = 5;
      newFactors.push('Expressed negative emotions');
      newRecommendations.push('Consider talking to a human counselor');
    } else if (sentiment === 'positive') {
      riskChange = -3;
      newFactors.push('Expressed positive emotions');
      newRecommendations.push('Continue positive mindset');
    }
    
    if (mood === 'sad') {
      riskChange += 8;
      newFactors.push('Selected sad mood');
      newRecommendations.push('Practice self-care activities');
    } else if (mood === 'happy') {
      riskChange -= 5;
      newFactors.push('Selected happy mood');
      newRecommendations.push('Maintain positive outlook');
    }
    
    const newRisk = Math.max(0, Math.min(100, riskAnalysis.currentRisk + riskChange));
    const trend = newRisk > riskAnalysis.currentRisk ? 'increasing' : 
                  newRisk < riskAnalysis.currentRisk ? 'decreasing' : 'stable';
    
    setRiskAnalysis(prev => ({
      ...prev,
      currentRisk: newRisk,
      trend,
      factors: [...prev.factors, ...newFactors].slice(-5),
      recommendations: [...prev.recommendations, ...newRecommendations].slice(-5),
      moodTrend: [...prev.moodTrend.slice(1), newRisk]
    }));
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const sentiment = analyzeSentiment(newMessage);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      mood: selectedMood,
      sentiment
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setSelectedMood('');

    // Update risk analysis
    updateRiskAnalysis(userMessage);

    // Simulate AI typing
    setIsTyping(true);
    
    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: Message): Message => {
    const text = userMessage.text.toLowerCase();
    const sentiment = userMessage.sentiment;
    const mood = userMessage.mood;

    let response = '';

    if (text.includes('stress') || text.includes('pressure')) {
      response = "I can see you're experiencing stress. This is very common among students. Let me help you understand what's happening and suggest some coping strategies. Have you noticed any specific triggers for your stress?";
    } else if (text.includes('sad') || text.includes('depressed')) {
      response = "I hear that you're feeling down, and I want you to know that your feelings are valid. Depression can affect anyone, and it's not a sign of weakness. How long have you been feeling this way?";
    } else if (text.includes('anxiety') || text.includes('worried')) {
      response = "Anxiety can be overwhelming, especially when it affects your daily life. I'm here to help you work through these feelings. Can you tell me more about what's making you anxious?";
    } else if (text.includes('sleep') || text.includes('tired')) {
      response = "Sleep issues can significantly impact your mental health and academic performance. Let's work on establishing better sleep habits. What's your current sleep schedule like?";
    } else if (text.includes('study') || text.includes('exam')) {
      response = "Academic pressure is real and can be overwhelming. It's important to find a balance between studying and taking care of yourself. What study techniques have you tried so far?";
    } else {
      response = "Thank you for sharing that with me. I'm here to listen and support you. Is there something specific you'd like to explore or work through together?";
    }

    // Add sentiment-aware response
    if (sentiment === 'negative') {
      response += " I notice you're expressing some difficult emotions. It's brave of you to share this, and I want you to know that it's okay to not be okay sometimes.";
    } else if (sentiment === 'positive') {
      response += " I'm glad to see you're in a positive space. Maintaining this mindset can be really beneficial for your overall well-being.";
    }

    // Add mood-specific guidance
    if (mood === 'sad') {
      response += " I see you've selected the sad mood. Remember, difficult emotions are temporary, and it's okay to ask for help when you need it.";
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
      sentiment: 'positive'
    };
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600';
    if (risk < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <TrendingUp className="w-4 h-4 text-green-500 transform rotate-180" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const mentalHealthTips = [
    'Practice deep breathing exercises for 5 minutes daily',
    'Take regular breaks during study sessions',
    'Maintain a consistent sleep schedule',
    'Stay connected with friends and family',
    'Engage in physical activities you enjoy',
    'Write down your thoughts and feelings',
    'Practice mindfulness and meditation',
    'Limit screen time before bedtime'
  ];

  const emergencyContacts = [
    { name: 'School Counselor', phone: '+91-98765-43210', available: 'Mon-Fri, 9 AM - 5 PM' },
    { name: 'Mental Health Helpline', phone: '1800-599-0019', available: '24/7' },
    { name: 'Crisis Support', phone: '+91-98765-43211', available: '24/7' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Mental Health Support</h1>
          <p className="text-gray-600">Advanced AI-powered support and risk analysis for your mental well-being</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            <Brain className="w-4 h-4 inline mr-1" />
            AI Powered
          </div>
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 inline mr-1" />
            Confidential
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <div className="card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">AI Counselor</h3>
                  <p className="text-sm text-gray-500">Online • Analyzing your mental health</p>
                </div>
              </div>
            </div>

            {/* Messages - Fixed scrollable area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '400px' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm">AI is analyzing...</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="p-4 border-t border-gray-200 bg-white">
              {/* Mood Selector */}
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-2">How are you feeling?</p>
                <div className="flex space-x-2">
                  {[
                    { mood: 'happy', icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
                    { mood: 'neutral', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100' },
                    { mood: 'sad', icon: Frown, color: 'text-red-500', bg: 'bg-red-100' }
                  ].map(({ mood, icon: Icon, color, bg }) => (
                    <button
                      key={mood}
                      onClick={() => handleMoodSelect(mood)}
                      className={`p-2 rounded-lg transition-colors ${
                        selectedMood === mood ? `${bg} ${color}` : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input - Form to prevent page scroll */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your thoughts and feelings..."
                  className="flex-1 input-field"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* AI Analysis Panel */}
        <div className="space-y-6">
          {/* Risk Analysis */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              Risk Analysis
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getRiskColor(riskAnalysis.currentRisk)}`}>
                  {riskAnalysis.currentRisk}
                </div>
                <div className="text-sm text-gray-600">Current Risk Score</div>
                <div className="flex items-center justify-center mt-2">
                  {getTrendIcon(riskAnalysis.trend)}
                  <span className="text-xs text-gray-600 ml-1 capitalize">
                    {riskAnalysis.trend}
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    riskAnalysis.currentRisk < 30 ? 'bg-green-500' :
                    riskAnalysis.currentRisk < 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${riskAnalysis.currentRisk}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Mood Trend Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-green-500 mr-2" />
              Mood Trend
            </h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={riskAnalysis.moodTrend.map((value, index) => ({ day: index + 1, mood: value }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Factors */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              Risk Factors
            </h3>
            <div className="space-y-2">
              {riskAnalysis.factors.map((factor, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{factor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              AI Recommendations
            </h3>
            <div className="space-y-2">
              {riskAnalysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wellness Tips */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              Wellness Tips
            </h3>
            <div className="space-y-3">
              {mentalHealthTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 text-red-500 mr-2" />
              Emergency Contacts
            </h3>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">{contact.name}</h4>
                  <p className="text-primary-600 text-sm font-mono">{contact.phone}</p>
                  <p className="text-xs text-gray-500">{contact.available}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-secondary text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </button>
              <button className="w-full btn-secondary text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Download Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalSupport;
