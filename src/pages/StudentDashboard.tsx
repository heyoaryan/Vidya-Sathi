import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  GraduationCap, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BookOpen,
  Target, 
  Brain,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { mockStudents } from '../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Find current student data (in real app, this would come from API)
  // For now, using first student as demo - in real app, match by user ID or email
  const currentStudent = mockStudents.find(s => s.id === user?.id) || mockStudents[0];

  // Generate performance trend data
  const generatePerformanceData = () => {
    const data = [];
    const periods = selectedTimeframe === 'week' ? 7 : selectedTimeframe === 'month' ? 30 : 12;
    
    for (let i = 0; i < periods; i++) {
      if (selectedTimeframe === 'week') {
        data.push({
          period: new Date(Date.now() - (periods - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          performance: Math.floor(Math.random() * 15) + currentStudent.academicScore - 5,
          attendance: Math.floor(Math.random() * 10) + currentStudent.attendance - 5
        });
      } else if (selectedTimeframe === 'month') {
        data.push({
          period: new Date(Date.now() - (periods - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          performance: Math.floor(Math.random() * 15) + currentStudent.academicScore - 5,
          attendance: Math.floor(Math.random() * 10) + currentStudent.attendance - 5
        });
      } else {
        data.push({
          period: new Date(Date.now() - (periods - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
          performance: Math.floor(Math.random() * 15) + currentStudent.academicScore - 5,
          attendance: Math.floor(Math.random() * 10) + currentStudent.attendance - 5
        });
      }
    }
    return data;
  };

  const performanceData = generatePerformanceData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {currentStudent.name}! 👋</h1>
          <p className="text-gray-300">Here's your academic overview and AI-powered insights</p>
      </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          </div>
        </div>

      {/* Student Profile Card */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{currentStudent.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">{currentStudent.department}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{currentStudent.year} ({currentStudent.batch})</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">ID: {currentStudent.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">Last Updated: {currentStudent.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
            </div>
          <h3 className="text-3xl font-bold text-white mb-2">{currentStudent.academicScore}%</h3>
          <p className="text-gray-300">Academic Performance</p>
      </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-white" />
        </div>
          <h3 className="text-3xl font-bold text-white mb-2">{currentStudent.attendance}%</h3>
          <p className="text-gray-300">Attendance Rate</p>
      </div>

        <div className="glass-card p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            currentStudent.riskScore >= 70 ? 'bg-red-500' : 
            currentStudent.riskScore >= 50 ? 'bg-orange-500' : 
            currentStudent.riskScore >= 30 ? 'bg-yellow-500' : 'bg-green-500'
          }`}>
            <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          <h3 className="text-3xl font-bold text-white mb-2">{currentStudent.riskScore}</h3>
          <p className="text-gray-300">Risk Score</p>
            </div>
          </div>
          
      {/* AI Counselor Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">AI Counselor</h3>
          </div>
          <div className="text-sm text-gray-300">Personalized suggestions based on your data</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Your Risk Assessment</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Current Risk Level</span>
                <span className={`font-semibold ${
                  currentStudent.riskScore >= 70 ? 'text-red-400' : 
                  currentStudent.riskScore >= 50 ? 'text-orange-400' : 
                  currentStudent.riskScore >= 30 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {currentStudent.riskScore >= 70 ? 'Critical' : 
                   currentStudent.riskScore >= 50 ? 'High' : 
                   currentStudent.riskScore >= 30 ? 'Medium' : 'Low'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Dropout Risk</span>
                <span className={`font-semibold ${
                  currentStudent.riskScore >= 70 ? 'text-red-400' : 
                  currentStudent.riskScore >= 50 ? 'text-orange-400' : 'text-yellow-400'
                }`}>
                  {currentStudent.riskScore >= 70 ? 'High' : 
                   currentStudent.riskScore >= 50 ? 'Medium' : 'Low'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Intervention Status</span>
                <span className="text-green-400 font-semibold">
                  {currentStudent.interventions.length > 0 ? 'Active' : 'None Required'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Counselor Suggestions</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  {currentStudent.academicScore >= 75 ? 'Excellent academic performance' : 
                   currentStudent.academicScore >= 60 ? 'Good performance, room for improvement' : 
                   'Needs academic support'}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  {currentStudent.attendance >= 85 ? 'Excellent attendance record' : 
                   currentStudent.attendance >= 75 ? 'Good attendance, maintain consistency' : 
                   'Attendance needs improvement'}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-purple-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  {currentStudent.riskScore < 30 ? 'Maintain current habits; keep submitting assignments on time.' : 
                   currentStudent.riskScore < 50 ? 'Create a weekly study schedule and meet your mentor once a week.' : 
                   'Book a counseling slot this week and follow the intervention plan.'}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span className="text-gray-300 text-sm">Recommended next step: complete one practice test by Friday.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="period" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="performance" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Performance"
            />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Attendance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentDashboard;
