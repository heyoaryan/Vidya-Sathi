import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  GraduationCap, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BookOpen,
  Target, 
  Activity,
  ShieldCheck,
  ShieldAlert,
  ListChecks,
  CalendarClock,
  FileText
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
import { assessStudentRisk } from '../utils/riskEngine';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Find current student data (in real app, this would come from API)
  // For now, using first student as demo - in real app, match by user ID or email
  const currentStudent = mockStudents.find(s => s.id === user?.id) || mockStudents[0];
  const assessment = assessStudentRisk(currentStudent);

  // Risk level and badge driven from the student's own riskScore (not assessment aggregate)
  const riskLevel: 'low' | 'medium' | 'high' = currentStudent.riskScore > 75 ? 'high' : currentStudent.riskScore >= 50 ? 'medium' : 'low';

  // Parse batch years like "2023-26" or "2023-2024"
  const parseBatchYears = (batch: string): { start: number; end: number } => {
    const parts = (batch || '').split('-').map(p => p.trim());
    const start = parseInt(parts[0], 10);
    let end = start;
    if (parts.length > 1) {
      const right = parts[1];
      const rightNum = parseInt(right, 10);
      end = right.length === 2 ? Math.floor(start / 100) * 100 + rightNum : rightNum; // e.g., 2023-26 => 2026
    }
    if (isNaN(start) || isNaN(end)) return { start: new Date().getFullYear(), end: new Date().getFullYear() };
    return { start, end };
  };

  const { start: batchStart, end: batchEnd } = parseBatchYears(currentStudent.batch || '');
  const currentYear = new Date().getFullYear();
  const yearsInBatch = Array.from({ length: Math.max(1, (Math.min(batchEnd, currentYear) - batchStart) + 1) }, (_, i) => batchStart + i);
  const [selectedYear, setSelectedYear] = useState<number>(yearsInBatch[yearsInBatch.length - 1]);

  useEffect(() => {
    // If batch or current year changes, ensure selectedYear stays in range
    if (!yearsInBatch.includes(selectedYear)) {
      setSelectedYear(yearsInBatch[yearsInBatch.length - 1]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudent.batch]);

  // Generate monthly performance trend data for selected year; if current year, up to current month
  const generatePerformanceDataForYear = (year: number) => {
    const data: { period: string; performance: number; attendance: number }[] = [];
    const basePerf = currentStudent.academicScore;
    const baseAttend = currentStudent.attendance;
    const months = year === currentYear ? new Date().getMonth() + 1 : 12; // up to current month for current year
    for (let m = 0; m < months; m++) {
      const date = new Date(year, m, 1);
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short' });
      const performance = clamp(0, 100, basePerf + randomJitter(6) + trendAdjust(m));
      const attendance = clamp(0, 100, baseAttend + randomJitter(4) + trendAdjust(Math.max(0, m - 2)) / 2);
      data.push({ period: monthLabel, performance, attendance });
    }
    return data;
  };

  const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, Math.round(value * 10) / 10));
  const randomJitter = (range: number) => (Math.random() * range) - (range / 2);
  const trendAdjust = (monthIndex: number) => (monthIndex - 5) * 0.8; // light mid-year dip/raise

  const performanceData = generatePerformanceDataForYear(selectedYear);

  // Compute trend deltas for display
  const latestPoint = performanceData[performanceData.length - 1];
  const previousPoint = performanceData[performanceData.length - 2];
  const academicDelta = latestPoint && previousPoint ? latestPoint.performance - previousPoint.performance : 0;
  const attendanceDelta = latestPoint && previousPoint ? latestPoint.attendance - previousPoint.attendance : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, {currentStudent.name}</h1>
          <p className="text-gray-300">Here's your academic overview and AI-powered insights</p>
        </div>
        <div />
      </div>

      {/* Student Profile Card */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {currentStudent.name?.charAt(0) || 'U'}
            </span>
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
                <span className="text-gray-300">Backlogs: {currentStudent.backlogs || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="glass-card p-0 overflow-hidden">
        <div className={`px-6 py-4 flex items-center justify-between ${
          riskLevel === 'high' ? 'bg-red-500/20' : riskLevel === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              riskLevel === 'high' ? 'bg-red-500' : riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
              {riskLevel === 'low' ? (
                <ShieldCheck className="w-6 h-6 text-white" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-white" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-white">Your Risk Overview</h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${riskLevel === 'high' ? 'bg-red-500/30 text-red-100' : riskLevel === 'medium' ? 'bg-yellow-500/30 text-yellow-900' : 'bg-green-500/30 text-green-100'}`}>
            {riskLevel.toUpperCase()} • {currentStudent.riskScore}
          </div>
        </div>
        {/* Overview only; details removed as requested */}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            academicDelta >= 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'
          }`}>
            {academicDelta >= 0 ? (
              <TrendingUp className="w-8 h-8 text-white" />
            ) : (
              <TrendingDown className="w-8 h-8 text-white" />
            )}
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{currentStudent.academicScore}%</h3>
          <p className="text-gray-300">Academic Performance</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            attendanceDelta >= 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'
          }`}>
            {attendanceDelta >= 0 ? (
              <TrendingUp className="w-8 h-8 text-white" />
            ) : (
              <TrendingDown className="w-8 h-8 text-white" />
            )}
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{currentStudent.attendance}%</h3>
          <p className="text-gray-300">Attendance Rate</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            (currentStudent.backlogs || 0) >= 3 ? 'bg-red-500' :
            (currentStudent.backlogs || 0) >= 1 ? 'bg-orange-500' :
            'bg-green-500'
          }`}>
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{currentStudent.backlogs || 0}</h3>
          <p className="text-gray-300">Backlogs</p>
        </div>
      </div>
          
      

      {/* Performance Trend (Monthly by Selected Year) */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Performance Trend — {selectedYear}</h3>
          <div className="flex items-center space-x-2">
            <label htmlFor="yearSelect" className="text-sm text-gray-300">Year</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
              className="text-sm px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {yearsInBatch.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
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
