import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BookOpen,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  GraduationCap,
  User,
  Shield,
  Lightbulb,
  ArrowRight,
  Download,
  Share2
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
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { mockStudents } from '../data/mockData';

const AIReport: React.FC = () => {
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState('semester');

  // Find current student data
  const currentStudent = mockStudents.find(s => s.id === user?.id) || mockStudents[3]; // Neha Verma

  // Generate detailed performance data
  const generateDetailedData = () => {
    const data = [];
    const periods = selectedTimeframe === 'month' ? 30 : selectedTimeframe === 'semester' ? 6 : 12;
    
    for (let i = 0; i < periods; i++) {
      if (selectedTimeframe === 'month') {
        data.push({
          period: new Date(Date.now() - (periods - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          academic: Math.floor(Math.random() * 15) + currentStudent.academicScore - 5,
          attendance: Math.floor(Math.random() * 10) + currentStudent.attendance - 5,
          extracurricular: Math.floor(Math.random() * 15) + currentStudent.extraCurricularScore - 5,
          risk: Math.floor(Math.random() * 20) + currentStudent.riskScore - 10
        });
      } else {
        data.push({
          period: selectedTimeframe === 'semester' ? `Month ${i + 1}` : new Date(Date.now() - (periods - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
          academic: Math.floor(Math.random() * 15) + currentStudent.academicScore - 5,
          attendance: Math.floor(Math.random() * 10) + currentStudent.attendance - 5,
          extracurricular: Math.floor(Math.random() * 15) + currentStudent.extraCurricularScore - 5,
          risk: Math.floor(Math.random() * 20) + currentStudent.riskScore - 10
        });
      }
    }
    return data;
  };

  const detailedData = generateDetailedData();

  // Risk Analysis
  const getRiskAnalysis = () => {
    const riskLevel = currentStudent.riskScore >= 70 ? 'Critical Risk' : 
                     currentStudent.riskScore >= 50 ? 'High Risk' : 
                     currentStudent.riskScore >= 30 ? 'Medium Risk' : 'Low Risk';
    
    const riskColor = currentStudent.riskScore >= 70 ? 'text-red-500' : 
                     currentStudent.riskScore >= 50 ? 'text-orange-500' : 
                     currentStudent.riskScore >= 30 ? 'text-yellow-500' : 'text-green-500';
    
    const riskBgColor = currentStudent.riskScore >= 70 ? 'bg-red-500/20' : 
                       currentStudent.riskScore >= 50 ? 'bg-orange-500/20' : 
                       currentStudent.riskScore >= 30 ? 'bg-yellow-500/20' : 'bg-green-500/20';

    return { level: riskLevel, color: riskColor, bgColor: riskBgColor };
  };

  const riskAnalysis = getRiskAnalysis();

  // Dropout Risk Assessment
  const getDropoutRisk = () => {
    const factors = [
      { name: 'Academic Performance', weight: 0.3, score: currentStudent.academicScore, risk: currentStudent.academicScore < 60 ? 'High' : currentStudent.academicScore < 75 ? 'Medium' : 'Low' },
      { name: 'Attendance Rate', weight: 0.25, score: currentStudent.attendance, risk: currentStudent.attendance < 75 ? 'High' : currentStudent.attendance < 85 ? 'Medium' : 'Low' },
      { name: 'Family Background', weight: 0.2, score: currentStudent.familyBackground === 'low' ? 40 : currentStudent.familyBackground === 'medium' ? 70 : 90, risk: currentStudent.familyBackground === 'low' ? 'High' : currentStudent.familyBackground === 'medium' ? 'Medium' : 'Low' },
      { name: 'Extracurricular Engagement', weight: 0.15, score: currentStudent.extraCurricularScore, risk: currentStudent.extraCurricularScore < 50 ? 'High' : currentStudent.extraCurricularScore < 70 ? 'Medium' : 'Low' },
      { name: 'Peer Support', weight: 0.1, score: Math.floor(Math.random() * 30) + 60, risk: 'Medium' }
    ];

    const weightedScore = factors.reduce((acc, factor) => acc + (factor.score * factor.weight), 0);
    const dropoutRisk = weightedScore < 60 ? 'High' : weightedScore < 75 ? 'Medium' : 'Low';

    return { factors, weightedScore: Math.round(weightedScore), dropoutRisk };
  };

  const dropoutAnalysis = getDropoutRisk();

  // AI Insights
  const getAIInsights = () => {
    const insights = [];
    
    if (currentStudent.academicScore < 70) {
      insights.push({
        type: 'warning',
        title: 'Academic Performance Alert',
        description: 'Your academic score is below the recommended threshold. Consider seeking additional academic support.',
        icon: AlertTriangle,
        color: 'text-yellow-500'
      });
    }

    if (currentStudent.attendance < 80) {
      insights.push({
        type: 'warning',
        title: 'Attendance Concern',
        description: 'Regular attendance is crucial for academic success. Try to maintain at least 85% attendance.',
        icon: Clock,
        color: 'text-orange-500'
      });
    }

    if (currentStudent.riskScore > 50) {
      insights.push({
        type: 'critical',
        title: 'Risk Level Elevated',
        description: 'Your risk score indicates potential challenges. Consider implementing the recommended interventions.',
        icon: Shield,
        color: 'text-red-500'
      });
    }

    insights.push({
      type: 'positive',
      title: 'Growth Opportunity',
      description: 'Focus on improving your weakest areas to significantly reduce dropout risk.',
      icon: TrendingUp,
      color: 'text-green-500'
    });

    return insights;
  };

  const aiInsights = getAIInsights();

  // Recommendations
  const getDetailedRecommendations = () => {
    const recommendations = [];
    
    if (currentStudent.academicScore < 70) {
      recommendations.push({
        category: 'Academic',
        items: [
          'Join study groups for collaborative learning',
          'Schedule regular meetings with academic advisors',
          'Utilize available tutoring services',
          'Focus on time management and study techniques'
        ]
      });
    }

    if (currentStudent.attendance < 80) {
      recommendations.push({
        category: 'Attendance',
        items: [
          'Set daily attendance goals',
          'Create a morning routine',
          'Identify and address barriers to attendance',
          'Communicate with teachers about absences'
        ]
      });
    }

    recommendations.push({
      category: 'General',
      items: [
        'Participate in extracurricular activities',
        'Build strong peer relationships',
        'Seek mentorship from senior students',
        'Maintain regular communication with family'
      ]
    });

    return recommendations;
  };

  const recommendations = getDetailedRecommendations();

  // Pie chart data for risk factors
  const riskFactorsData = [
    { name: 'Academic', value: currentStudent.academicScore, color: '#10B981' },
    { name: 'Attendance', value: currentStudent.attendance, color: '#3B82F6' },
    { name: 'Extracurricular', value: currentStudent.extraCurricularScore, color: '#8B5CF6' },
    { name: 'Risk Score', value: currentStudent.riskScore, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Analysis Report</h1>
          <p className="text-gray-300">Comprehensive AI-powered insights for {currentStudent.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">Last Month</option>
            <option value="semester">Last Semester</option>
            <option value="year">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Student Profile */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{currentStudent.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
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

      {/* Risk Assessment Summary */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Dropout Risk Assessment</h3>
        </div>
        
        <div className={`p-6 rounded-xl border ${riskAnalysis.bgColor} border-white/20 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className={`text-2xl font-bold ${riskAnalysis.color} mb-2`}>
                {riskAnalysis.level}
              </h4>
              <p className="text-gray-300">
                Based on comprehensive analysis of academic performance, attendance, family background, and behavioral patterns.
              </p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${riskAnalysis.color}`}>
                {currentStudent.riskScore}
              </div>
              <div className="text-gray-400">Risk Score</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-white font-semibold mb-3">Risk Factors Breakdown</h5>
              <div className="space-y-3">
                {dropoutAnalysis.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="text-gray-300 text-sm">{factor.name}</span>
                      <div className="text-xs text-gray-400">Weight: {factor.weight * 100}%</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        factor.risk === 'High' ? 'text-red-400' : 
                        factor.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {factor.score}%
                      </div>
                      <div className={`text-xs ${
                        factor.risk === 'High' ? 'text-red-400' : 
                        factor.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {factor.risk} Risk
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Overall Assessment</h5>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Weighted Risk Score</span>
                    <span className={`font-bold ${
                      dropoutAnalysis.dropoutRisk === 'High' ? 'text-red-400' : 
                      dropoutAnalysis.dropoutRisk === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {dropoutAnalysis.weightedScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        dropoutAnalysis.dropoutRisk === 'High' ? 'bg-red-500' : 
                        dropoutAnalysis.dropoutRisk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${dropoutAnalysis.weightedScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-center">
                    <div className={`text-lg font-semibold mb-1 ${
                      dropoutAnalysis.dropoutRisk === 'High' ? 'text-red-400' : 
                      dropoutAnalysis.dropoutRisk === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {dropoutAnalysis.dropoutRisk} Dropout Risk
                    </div>
                    <div className="text-gray-400 text-sm">
                      {dropoutAnalysis.dropoutRisk === 'High' ? 'Immediate intervention recommended' :
                       dropoutAnalysis.dropoutRisk === 'Medium' ? 'Monitor closely and provide support' :
                       'Low risk, maintain current performance'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">AI-Generated Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-start space-x-3">
                <insight.icon className={`w-6 h-6 ${insight.color} mt-1 flex-shrink-0`} />
                <div>
                  <h4 className="text-white font-semibold mb-2">{insight.title}</h4>
                  <p className="text-gray-300 text-sm">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Trends */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Performance Trends Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={detailedData}>
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
              dataKey="academic" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Academic"
            />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Attendance"
            />
            <Line 
              type="monotone" 
              dataKey="extracurricular" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              name="Extracurricular"
            />
            <Line 
              type="monotone" 
              dataKey="risk" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              name="Risk Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Factors Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Risk Factors Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={riskFactorsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {riskFactorsData.map((entry, index) => (
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
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {riskFactorsData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-300 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Academic', value: currentStudent.academicScore, color: '#10B981' },
              { name: 'Attendance', value: currentStudent.attendance, color: '#3B82F6' },
              { name: 'Extracurricular', value: currentStudent.extraCurricularScore, color: '#8B5CF6' }
            ]}>
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
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((category, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span>{category.category} Improvements</span>
              </h4>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Recommended Action Plan</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold mb-2">Immediate Actions (Next 2 weeks)</h4>
                <p className="text-gray-300 text-sm">Schedule meeting with academic advisor and join study groups</p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold mb-2">Short-term Goals (Next month)</h4>
                <p className="text-gray-300 text-sm">Improve attendance to 85% and academic score to 75%</p>
              </div>
              <ArrowRight className="w-5 h-5 text-green-400" />
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold mb-2">Long-term Objectives (Next semester)</h4>
                <p className="text-gray-300 text-sm">Achieve 80%+ academic score and reduce risk score below 30</p>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReport;
