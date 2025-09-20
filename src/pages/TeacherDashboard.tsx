import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  MessageSquare,
  Calendar,
  Award
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
  Cell
} from 'recharts';
import { mockStudents } from '../data/mockData';
import { assessStudentRisk } from '../utils/riskEngine';

const TeacherDashboard: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock teacher data - in real app, this would come from API
  const teacherClasses = ['9', '10', '11', '12'];

  // Filter students by class
  const classStudents = selectedClass === 'all' 
    ? mockStudents 
    : mockStudents.filter(s => s.class === selectedClass);

  // Calculate class statistics
  const classStats = {
    totalStudents: classStudents.length,
    averageAttendance: Math.round(classStudents.reduce((acc, s) => acc + s.attendance, 0) / classStudents.length),
    averagePerformance: Math.round(classStudents.reduce((acc, s) => acc + s.academicScore, 0) / classStudents.length),
    highRiskStudents: classStudents.filter(s => s.riskScore >= 50).length,
    lowRiskStudents: classStudents.filter(s => s.riskScore < 30).length
  };

  // Generate performance trend data
  const generatePerformanceData = () => {
    const data = [];
    for (let i = 0; i < 6; i++) {
      data.push({
        month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
        performance: Math.floor(Math.random() * 15) + classStats.averagePerformance - 5,
        attendance: Math.floor(Math.random() * 10) + classStats.averageAttendance - 5
      });
    }
    return data;
  };

  const performanceData = generatePerformanceData();

  // Risk distribution data
  const riskDistribution = (() => {
    const buckets = { low: 0, medium: 0, high: 0 } as Record<'low'|'medium'|'high', number>;
    classStudents.forEach(s => {
      const a = assessStudentRisk(s);
      buckets[a.category]++;
    });
    return [
      { name: 'Low Risk', value: buckets.low, color: '#10B981' },
      { name: 'Medium Risk', value: buckets.medium, color: '#F59E0B' },
      { name: 'High Risk', value: buckets.high, color: '#EF4444' }
    ];
  })();

  // Top performers
  const topPerformers = classStudents
    .sort((a, b) => b.academicScore - a.academicScore)
    .slice(0, 5);

  // Students needing attention
  const studentsNeedingAttention = classStudents
    .map(s => ({ s, a: assessStudentRisk(s) }))
    .sort((x, y) => y.a.score - x.a.score)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
          <div>
          <h1 className="text-3xl font-bold text-white">School Teacher Dashboard</h1>
          <p className="text-gray-300">Manage your school classes and monitor student academic progress</p>
          </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Classes</option>
            {teacherClasses.map(cls => (
              <option key={cls} value={cls}>Class {cls}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Class Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
            </div>
          <h3 className="text-3xl font-bold text-white mb-2">{classStats.totalStudents}</h3>
          <p className="text-gray-300">Total School Students</p>
            </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{classStats.averagePerformance}%</h3>
          <p className="text-gray-300">Avg Academic Performance</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{classStats.averageAttendance}%</h3>
          <p className="text-gray-300">Avg School Attendance</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{classStats.highRiskStudents}</h3>
          <p className="text-gray-300">High Risk Students</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{classStats.lowRiskStudents}</h3>
          <p className="text-gray-300">Low Risk Students</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">School Class Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
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

        {/* Risk Distribution */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Student Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">Top School Performers</h3>
          </div>
          
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">{student.name}</div>
                    <div className="text-gray-400 text-sm">Class {student.class} - Section {student.section}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{student.academicScore}%</div>
                  <div className="text-gray-400 text-sm">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Needing Attention */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">Students Needing Attention</h3>
          </div>
          
          <div className="space-y-4">
            {studentsNeedingAttention.map(({ s, a }) => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                    a.category === 'high' ? 'bg-red-500' : 'bg-orange-500'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{s.name}</div>
                    <div className="text-gray-400 text-sm">Class {s.class} - Section {s.section}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{a.score}</div>
                  <div className="text-gray-400 text-sm">Risk Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">School Teacher Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl border border-white/20 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="text-white font-semibold">View School Students</h4>
                <p className="text-gray-400 text-sm">Browse school student list</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl border border-white/20 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-green-400" />
              <div>
                <h4 className="text-white font-semibold">Send Messages</h4>
                <p className="text-gray-400 text-sm">Contact school students</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl border border-white/20 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-400" />
              <div>
                <h4 className="text-white font-semibold">Schedule Parent Meeting</h4>
                <p className="text-gray-400 text-sm">Book parent appointments</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl border border-white/20 hover:from-orange-500/30 hover:to-orange-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-orange-400" />
              <div>
                <h4 className="text-white font-semibold">View School Analytics</h4>
                <p className="text-gray-400 text-sm">Detailed school reports</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
