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
  Share2,
  RefreshCw
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
  Cell,
  ReferenceLine,
  LabelList
} from 'recharts';
import { mockStudents } from '../data/mockData';

const AIReport: React.FC = () => {
  const { user } = useAuth();

  // Find current student data
  const currentStudent = mockStudents.find(s => s.id === user?.id) || mockStudents[3]; // Neha Verma

  // Generate detailed performance data for the current year up to the previous month
  const generateDetailedData = () => {
    const data: any[] = [];
    const now = new Date();
    const year = now.getFullYear();
    const monthsToInclude = Math.max(1, now.getMonth()); // 0=Jan; include up to previous month
    for (let m = 0; m < monthsToInclude; m++) {
      const date = new Date(year, m, 1);
      const period = date.toLocaleDateString('en-US', { month: 'short' });
      data.push({
        period,
        academic: Math.floor(Math.random() * 15) + currentStudent.academicScore - 5,
        attendance: Math.floor(Math.random() * 10) + currentStudent.attendance - 5,
        extracurricular: Math.floor(Math.random() * 15) + currentStudent.extraCurricularScore - 5,
        risk: Math.floor(Math.random() * 20) + currentStudent.riskScore - 10
      });
    }
    return data;
  };

  const detailedData = generateDetailedData();

  // Risk Analysis with thresholds: <50 green, 50–75 orange, >75 red
  const getRiskAnalysis = () => {
    const score = currentStudent.riskScore;
    const level = score > 75 ? 'High Risk' : score >= 50 ? 'Medium Risk' : 'Low Risk';
    const color = score > 75 ? 'text-red-500' : score >= 50 ? 'text-orange-500' : 'text-green-500';
    const bgColor = score > 75 ? 'bg-red-500/20' : score >= 50 ? 'bg-orange-500/20' : 'bg-green-500/20';
    return { level, color, bgColor };
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

    // Force weighted score to 62 as requested and derive risk with thresholds: <50 green, 50–75 orange, >75 red
    const weightedScore = 62;
    const dropoutRisk = weightedScore > 75 ? 'High' : weightedScore >= 50 ? 'Medium' : 'Low';

    return { factors, weightedScore, dropoutRisk };
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

  const [insights, setInsights] = useState<ReturnType<typeof getAIInsights>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const regenerateInsights = async () => {
    setIsGenerating(true);
    // simulate async generation
    await new Promise(r => setTimeout(r, 700));
    // Rebuild insights with slight variability
    const jitter = () => (Math.random() - 0.5) * 10;
    const dynamicInsights = [] as ReturnType<typeof getAIInsights>;
    if (currentStudent.academicScore + jitter() < 70) {
      dynamicInsights.push({
        type: 'warning',
        title: 'Academic Performance Alert',
        description: 'Your academic score is below the recommended threshold. Consider seeking additional academic support.',
        icon: AlertTriangle,
        color: 'text-yellow-500'
      });
    }
    if (currentStudent.attendance + jitter() < 80) {
      dynamicInsights.push({
        type: 'warning',
        title: 'Attendance Concern',
        description: 'Regular attendance is crucial for academic success. Try to maintain at least 85% attendance.',
        icon: Clock,
        color: 'text-orange-500'
      });
    }
    if (currentStudent.riskScore + jitter() > 50) {
      dynamicInsights.push({
        type: 'critical',
        title: 'Risk Level Elevated',
        description: 'Your risk score indicates potential challenges. Consider implementing the recommended interventions.',
        icon: Shield,
        color: 'text-red-500'
      });
    }
    dynamicInsights.push({
      type: 'positive',
      title: 'Growth Opportunity',
      description: 'Focus on improving your weakest areas to significantly reduce dropout risk.',
      icon: TrendingUp,
      color: 'text-green-500'
    });
    setInsights(dynamicInsights);
    setIsGenerating(false);
  };

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
        <div />
      </div>

      {/* Student Profile removed on AI Report per request */}

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
                {dropoutAnalysis.factors.map((factor, index) => {
                  const score = factor.score;
                  const isHigh = score > 75;
                  const isMedium = score >= 50 && score <= 75;
                  const colorClass = isHigh ? 'text-red-400' : isMedium ? 'text-orange-400' : 'text-green-400';
                  const riskLabel = isHigh ? 'High Risk' : isMedium ? 'Medium Risk' : 'Low Risk';
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <span className="text-gray-300 text-sm">{factor.name}</span>
                        <div className="text-xs text-gray-400">Weight: {factor.weight * 100}%</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${colorClass}`}>
                          {score}%
                        </div>
                        <div className={`text-xs ${colorClass}`}>
                          {riskLabel}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Overall Assessment</h5>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Weighted Risk Score</span>
                    <span className={`font-bold ${
                      dropoutAnalysis.weightedScore > 75 ? 'text-red-400' : 
                      dropoutAnalysis.weightedScore >= 50 ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {dropoutAnalysis.weightedScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        dropoutAnalysis.weightedScore > 75 ? 'bg-red-500' : 
                        dropoutAnalysis.weightedScore >= 50 ? 'bg-orange-500' : 'bg-green-500'
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

      {/* AI Recommendations */}
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

      {/* AI Insights */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">AI-Generated Insights</h3>
          </div>
          <button onClick={regenerateInsights} disabled={isGenerating || insights.length > 0} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
            isGenerating || insights.length > 0 ? 'bg-white/10 text-gray-300 cursor-not-allowed' : 'bg-white/20 text-white hover:bg-white/30'
          }`}>
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating…' : insights.length > 0 ? 'Generated' : 'Generate Insights'}</span>
          </button>
        </div>
        {insights.length === 0 && !isGenerating ? (
          <div className="p-6 border border-dashed border-white/20 rounded-lg text-center text-gray-300">
            Click "Generate Insights" to create AI insights.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
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
        )}
      </div>

      {/* Performance Trends - shown after generating insights */}
      {insights.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Performance Trends Overview</h3>
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
      )}

      {/* Risk Factors Visualization and Performance Comparison - shown after generating insights */}
      {insights.length > 0 && (
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
                  itemStyle={{ color: '#ffffff' }}
                  labelStyle={{ color: '#ffffff' }}
                  formatter={(value: number, name: string) => [value, name]}
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
                <YAxis stroke="rgba(255,255,255,0.6)" domain={[0, 100]} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Score']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  itemStyle={{ color: '#ffffff' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <ReferenceLine y={50} stroke="#F59E0B" strokeDasharray="4 4" />
                <ReferenceLine y={75} stroke="#EF4444" strokeDasharray="4 4" />
                <Bar dataKey="value" radius={[8,8,0,0]}>
                  <LabelList dataKey="value" position="top" formatter={(v: number) => `${v}%`} fill="#ffffff" />
                  {[
                    { name: 'Academic', value: currentStudent.academicScore, color: '#10B981' },
                    { name: 'Attendance', value: currentStudent.attendance, color: '#3B82F6' },
                    { name: 'Extracurricular', value: currentStudent.extraCurricularScore, color: '#8B5CF6' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      

      
    </div>
  );
};

export default AIReport;
