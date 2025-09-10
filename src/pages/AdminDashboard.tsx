import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  GraduationCap, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Settings,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Database,
  Key,
  Globe
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
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { mockStudents } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Calculate system statistics
  const systemStats = {
    totalStudents: mockStudents.length,
    totalTeachers: 25,
    totalAdmins: 5,
    activeUsers: mockStudents.length + 25 + 5,
    systemHealth: 98,
    dataBackup: 'Last backup: 2 hours ago',
    securityStatus: 'All systems secure'
  };

  // Risk distribution across all students
  const riskDistribution = [
    { name: 'Low Risk', value: mockStudents.filter(s => s.riskScore < 30).length, color: '#10B981' },
    { name: 'Medium Risk', value: mockStudents.filter(s => s.riskScore >= 30 && s.riskScore < 50).length, color: '#F59E0B' },
    { name: 'High Risk', value: mockStudents.filter(s => s.riskScore >= 50).length, color: '#EF4444' }
  ];

  // Department performance
  const departmentStats = [
    { department: 'Computer Science', students: mockStudents.filter(s => s.department === 'Computer Science').length, avgScore: 78, avgRisk: 32 },
    { department: 'Mechanical', students: mockStudents.filter(s => s.department === 'Mechanical').length, avgScore: 75, avgRisk: 35 },
    { department: 'Electrical', students: mockStudents.filter(s => s.department === 'Electrical').length, avgScore: 72, avgRisk: 38 },
    { department: 'Civil', students: mockStudents.filter(s => s.department === 'Civil').length, avgScore: 80, avgRisk: 28 },
    { department: 'Chemical', students: mockStudents.filter(s => s.department === 'Chemical').length, avgScore: 77, avgRisk: 30 }
  ];

  // Generate system performance data
  const generateSystemData = () => {
    const data = [];
    const periods = selectedTimeframe === 'week' ? 7 : selectedTimeframe === 'month' ? 30 : 12;
    
    for (let i = 0; i < periods; i++) {
      if (selectedTimeframe === 'week') {
        data.push({
          period: new Date(Date.now() - (periods - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          activeUsers: Math.floor(Math.random() * 20) + 80,
          systemLoad: Math.floor(Math.random() * 15) + 60,
          securityScore: Math.floor(Math.random() * 10) + 90
        });
      } else if (selectedTimeframe === 'month') {
        data.push({
          period: new Date(Date.now() - (periods - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          activeUsers: Math.floor(Math.random() * 20) + 80,
          systemLoad: Math.floor(Math.random() * 15) + 60,
          securityScore: Math.floor(Math.random() * 10) + 90
        });
      } else {
        data.push({
          period: new Date(Date.now() - (periods - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
          activeUsers: Math.floor(Math.random() * 20) + 80,
          systemLoad: Math.floor(Math.random() * 15) + 60,
          securityScore: Math.floor(Math.random() * 10) + 90
        });
      }
    }
    return data;
  };

  const systemData = generateSystemData();

  // Recent system activities
  const recentActivities = [
    { action: 'New student registered', user: 'Priya Singh', time: '2 minutes ago', type: 'info' },
    { action: 'Risk assessment updated', user: 'Rahul Kumar', time: '5 minutes ago', type: 'warning' },
    { action: 'Teacher login', user: 'Mrs. Sharma', time: '10 minutes ago', type: 'success' },
    { action: 'Data backup completed', user: 'System', time: '2 hours ago', type: 'success' },
    { action: 'Security scan completed', user: 'System', time: '4 hours ago', type: 'success' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
          <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-300">System overview and administrative controls</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{systemStats.totalStudents}</h3>
          <p className="text-gray-300">Total Students</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{systemStats.totalTeachers}</h3>
          <p className="text-gray-300">Total Teachers</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{systemStats.systemHealth}%</h3>
          <p className="text-gray-300">System Health</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{systemStats.activeUsers}</h3>
          <p className="text-gray-300">Active Users</p>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">System Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Data Backup</span>
              <span className="text-green-400 text-sm">{systemStats.dataBackup}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Security</span>
              <span className="text-green-400 text-sm">{systemStats.securityStatus}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Database</span>
              <span className="text-green-400 text-sm">Connected</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Risk Overview</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">High Risk Students</span>
              <span className="text-red-400 font-semibold">{riskDistribution[2].value}</span>
        </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Medium Risk</span>
              <span className="text-yellow-400 font-semibold">{riskDistribution[1].value}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Low Risk</span>
              <span className="text-green-400 font-semibold">{riskDistribution[0].value}</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
          </div>
          <div className="space-y-3">
            {recentActivities.slice(0, 3).map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 bg-white/5 rounded-lg">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.user} • {activity.time}</p>
                </div>
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">System Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={systemData}>
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
                dataKey="activeUsers" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Active Users"
              />
              <Line 
                type="monotone" 
                dataKey="systemLoad" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="System Load"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Student Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Performance */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Department Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="department" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Students" />
            <Bar dataKey="avgScore" fill="#10B981" radius={[4, 4, 0, 0]} name="Avg Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Administrative Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl border border-white/20 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 text-left">
                  <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-400" />
                    <div>
                <h4 className="text-white font-semibold">User Management</h4>
                <p className="text-gray-400 text-sm">Manage users & roles</p>
              </div>
            </div>
          </button>
            
          <button className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl border border-white/20 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 text-left">
              <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-green-400" />
              <div>
                <h4 className="text-white font-semibold">Data Management</h4>
                <p className="text-gray-400 text-sm">Backup & restore</p>
              </div>
            </div>
          </button>
            
          <button className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl border border-white/20 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 text-left">
              <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-purple-400" />
              <div>
                <h4 className="text-white font-semibold">System Settings</h4>
                <p className="text-gray-400 text-sm">Configure system</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl border border-white/20 hover:from-orange-500/30 hover:to-orange-600/30 transition-all duration-300 text-left">
              <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-orange-400" />
              <div>
                <h4 className="text-white font-semibold">Reports</h4>
                <p className="text-gray-400 text-sm">Generate reports</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
