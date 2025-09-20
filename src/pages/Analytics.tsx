import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Brain
} from 'lucide-react';
import { 
  PieChart, 
  LineChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Pie, 
  BarChart
} from 'recharts';
import { mockStudents } from '../data/mockData';

const Analytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('performance');

  // Generate mock analytics data
  const generateChartData = () => {
    const data = [];
    const periods = selectedTimeframe === 'week' ? 7 : selectedTimeframe === 'month' ? 30 : 12;
    
    for (let i = 0; i < periods; i++) {
      if (selectedTimeframe === 'week') {
        data.push({
          period: new Date(Date.now() - (periods - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          performance: Math.floor(Math.random() * 20) + 70,
          attendance: Math.floor(Math.random() * 15) + 80,
          risk: Math.floor(Math.random() * 30) + 20
        });
      } else if (selectedTimeframe === 'month') {
        data.push({
          period: new Date(Date.now() - (periods - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          performance: Math.floor(Math.random() * 20) + 70,
          attendance: Math.floor(Math.random() * 15) + 80,
          risk: Math.floor(Math.random() * 30) + 20
        });
    } else {
        data.push({
          period: new Date(Date.now() - (periods - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
          performance: Math.floor(Math.random() * 20) + 70,
          attendance: Math.floor(Math.random() * 15) + 80,
          risk: Math.floor(Math.random() * 30) + 20
        });
      }
    }
    return data;
  };

  const chartData = generateChartData();

  // Risk distribution data
  const riskDistribution = [
    { name: 'Low Risk', value: mockStudents.filter(s => s.riskScore < 30).length, color: '#10B981' },
    { name: 'Medium Risk', value: mockStudents.filter(s => s.riskScore >= 30 && s.riskScore < 50).length, color: '#F59E0B' },
    { name: 'High Risk', value: mockStudents.filter(s => s.riskScore >= 50 && s.riskScore < 70).length, color: '#F97316' },
    { name: 'Critical Risk', value: mockStudents.filter(s => s.riskScore >= 70).length, color: '#EF4444' }
  ];

  // Class performance data
  const classPerformance = [
    { class: 'Class 9', performance: 82, students: 45, risk: 28 },
    { class: 'Class 10', performance: 78, students: 38, risk: 32 },
    { class: 'Class 11', performance: 75, students: 42, risk: 35 },
    { class: 'Class 12', performance: 80, students: 35, risk: 25 }
  ];

  const keyMetrics = [
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
      value: `${Math.round(mockStudents.reduce((acc, s) => acc + s.academicScore, 0) / mockStudents.length)}%`,
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Attendance Rate',
      value: `${Math.round(mockStudents.reduce((acc, s) => acc + s.attendance, 0) / mockStudents.length)}%`,
      change: '+3%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'High Risk Students',
      value: mockStudents.filter(s => s.riskScore >= 50).length,
      change: '-2',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-300">Comprehensive insights and performance metrics</p>
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
          
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="performance">Performance</option>
            <option value="attendance">Attendance</option>
            <option value="risk">Risk Level</option>
          </select>
            </div>
          </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="glass-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
              </div>
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
              <p className="text-gray-300 text-sm">{metric.title}</p>
            </div>
          );
        })}
          </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Performance Trend</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Performance</span>
          </div>
        </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
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
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Risk Distribution</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Risk Levels</span>
            </div>
          </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                label={renderCustomizedLabel}
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

      {/* Class Performance */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Class Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={classPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="class" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Bar dataKey="performance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="risk" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Top Performers</h3>
          <div className="space-y-4">
            {mockStudents
              .sort((a, b) => b.academicScore - a.academicScore)
              .slice(0, 5)
              .map((student, index) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
        <div>
                      <div className="text-white font-medium">{student.name}</div>
                      <div className="text-gray-400 text-sm">{student.department}</div>
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

        {/* Risk Analysis */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Risk Analysis</h3>
          <div className="space-y-4">
            {mockStudents
              .filter(s => s.riskScore >= 50)
              .sort((a, b) => b.riskScore - a.riskScore)
              .slice(0, 5)
              .map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                      student.riskScore >= 70 ? 'bg-red-500' : 
                      student.riskScore >= 50 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{student.name}</div>
                      <div className="text-gray-400 text-sm">{student.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{student.riskScore}</div>
                    <div className="text-gray-400 text-sm">Risk Score</div>
                  </div>
          </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">AI-Powered Insights</h3>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/20">
            <h4 className="text-white font-semibold mb-2">Performance Prediction</h4>
            <p className="text-gray-300 text-sm">
              Based on current trends, 78% of students are expected to improve their performance in the next quarter.
            </p>
        </div>

          <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-white/20">
            <h4 className="text-white font-semibold mb-2">Intervention Success</h4>
            <p className="text-gray-300 text-sm">
              Early intervention programs have shown 85% success rate in reducing dropout risk among high-risk students.
            </p>
      </div>

          <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-white/20">
            <h4 className="text-white font-semibold mb-2">Risk Factors</h4>
            <p className="text-gray-300 text-sm">
              Attendance below 75% and academic score below 60% are the strongest predictors of student risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
