import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  Brain,
  Shield,
  Lightbulb
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { mockStudents } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');

  // Redirect to role-specific dashboard
  useEffect(() => {
    if (user) {
      if (user.role === 'student') {
        navigate('/app/student-dashboard');
      } else if (user.role === 'teacher') {
        navigate('/app/teacher-dashboard');
      } else if (user.role === 'counsellor') {
        navigate('/app/counsellor-dashboard');
      }
    }
  }, [user, navigate]);

  // Generate mock data
  const generateChartData = () => {
    const data = [];
    const days = selectedTimeframe === '7days' ? 7 : selectedTimeframe === '30days' ? 30 : 90;
    
    for (let i = 0; i < days; i++) {
      data.push({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        students: Math.floor(Math.random() * 50) + 150,
        performance: Math.floor(Math.random() * 20) + 70,
        attendance: Math.floor(Math.random() * 15) + 80
      });
    }
    return data;
  };

  const chartData = generateChartData();

  const stats = [
    {
      title: 'Total Students',
      value: mockStudents.length,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Average Performance',
      value: '78%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Attendance Rate',
      value: '85%',
      change: '+3%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Active Warnings',
      value: '8',
      change: '-2',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'warning', message: 'Low attendance alert for Student A', time: '2 hours ago', severity: 'medium' },
    { id: 2, type: 'improvement', message: 'Performance improved for Student B', time: '4 hours ago', severity: 'positive' },
    { id: 3, type: 'intervention', message: 'New intervention plan created', time: '6 hours ago', severity: 'info' },
    { id: 4, type: 'warning', message: 'Academic performance concern', time: '8 hours ago', severity: 'high' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'low': return 'text-blue-500 bg-blue-100';
      case 'positive': return 'text-green-500 bg-green-100';
      case 'info': return 'text-purple-500 bg-purple-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'improvement': return TrendingUp;
      case 'intervention': return Lightbulb;
      default: return Clock;
    }
  };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-300">Welcome back, {user?.name || 'User'}! Here's what's happening today.</p>
        </div>

              <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
          </div>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                    </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                    </span>
                  </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-300 text-sm">{stat.title}</p>
      </div>
    );
        })}
        </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Performance Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Student Performance Trend</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Performance</span>
              </div>
            </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
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
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>

        {/* Attendance Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Attendance Overview</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Attendance</span>
              </div>
            </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="attendance" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
            </div>
          </div>

      {/* Recent Activities */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Activities</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            View All
                      </button>
                    </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getSeverityColor(activity.severity)}`}>
                  <Icon className="w-5 h-5" />
                  </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.message}</p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                  {activity.severity}
        </div>
      </div>
    );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
            </div>
              <div className="text-left">
                <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                  View Students
                </h4>
                <p className="text-gray-400 text-sm">Browse student list</p>
            </div>
          </div>
          </button>

          <button className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
            </div>
              <div className="text-left">
                <h4 className="text-white font-medium group-hover:text-green-300 transition-colors">
                  Analytics
                </h4>
                <p className="text-gray-400 text-sm">View detailed reports</p>
            </div>
          </div>
          </button>

          <button className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
            </div>
              <div className="text-left">
                <h4 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                  AI Counselor
                </h4>
                <p className="text-gray-400 text-sm">Get AI assistance</p>
            </div>
          </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
