import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Star,
  Brain,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Clock,
  Target as TargetIcon
} from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import AIPredictionEngine from '../components/AIPredictionEngine';

interface DropoutPrediction {
  studentId: string;
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
  confidence: number;
  lastUpdated: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
}

const StudentPerformance: React.FC = () => {
  const { user } = useAuth();
  const [aiPrediction, setAiPrediction] = useState<DropoutPrediction | null>(null);
  
  // Find current student data
  const currentStudent = mockStudents.find(s => s.id === user?.id) || mockStudents[0];

  // Calculate GPA based on academic score
  const calculateGPA = (score: number) => {
    if (score >= 90) return 4.0;
    if (score >= 80) return 3.5;
    if (score >= 70) return 3.0;
    if (score >= 60) return 2.5;
    return 2.0;
  };

  // Get risk level info
  const getRiskLevelInfo = (riskCategory: string) => {
    switch (riskCategory) {
      case 'low':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Low Risk' };
      case 'medium':
        return { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle, text: 'Medium Risk' };
      case 'high':
        return { color: 'bg-red-100 text-red-800', icon: AlertTriangle, text: 'High Risk' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: AlertTriangle, text: 'Unknown Risk' };
    }
  };

  const riskInfo = getRiskLevelInfo(currentStudent.riskCategory);
  const RiskIcon = riskInfo.icon;

  // ERP System Data (Simulated) - Dynamic based on student's academic history
  const generateAcademicHistory = (student: any) => {
    const currentYear = parseInt(student.year.split(' ')[0]);
    const academicHistory = [];
    
    // Generate data for each year the student has been enrolled
    for (let year = 1; year <= currentYear; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        const baseGPA = 3.0 + (Math.random() - 0.5) * 1.0; // GPA between 2.5-3.5
        const baseAttendance = 80 + (Math.random() - 0.5) * 20; // Attendance between 70-90%
        const semesterNumber = (year - 1) * 2 + semester; // Continuous semester numbering
        
        academicHistory.push({
          year: `${year}${year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year`,
          semester: `Semester ${semesterNumber}`,
          semesterNumber: semesterNumber, // For chart ordering
          gpa: Math.round(baseGPA * 10) / 10,
          attendance: Math.round(baseAttendance),
          assignments: Math.floor(Math.random() * 10) + 5,
          exams: Math.floor(Math.random() * 3) + 1,
          subjects: Math.floor(Math.random() * 3) + 4
        });
      }
    }
    
    return academicHistory;
  };

  const erpPerformanceData = generateAcademicHistory(currentStudent);

  // Subject Performance from ERP
  const subjectPerformance = [
    { subject: 'Mathematics', gpa: 3.8, attendance: 95, assignments: 12, exams: 3, color: '#3B82F6' },
    { subject: 'Physics', gpa: 3.6, attendance: 88, assignments: 10, exams: 2, color: '#10B981' },
    { subject: 'Chemistry', gpa: 3.4, attendance: 85, assignments: 11, exams: 3, color: '#F59E0B' },
    { subject: 'English', gpa: 3.9, attendance: 92, assignments: 8, exams: 2, color: '#EF4444' },
    { subject: 'Computer Science', gpa: 4.0, attendance: 96, assignments: 15, exams: 2, color: '#8B5CF6' }
  ];

  // Performance Insights Data
  const performanceInsights = {
    strengths: [
      'Excellent performance in Computer Science',
      'Consistent attendance above 90%',
      'Strong analytical skills in Mathematics',
      'Good communication in English'
    ],
    areasForImprovement: [
      'Chemistry needs more focus on practical work',
      'Physics problem-solving skills can be enhanced',
      'Time management for assignments',
      'Study habits for better retention'
    ],
    recommendations: [
      'Join study groups for Chemistry and Physics',
      'Use spaced repetition techniques',
      'Practice more problem-solving questions',
      'Maintain current performance in strong subjects'
    ],
    achievements: [
      'Top 10% in Mathematics',
      'Perfect attendance for 3 months',
      'Outstanding project in Computer Science',
      'Leadership role in Science Club'
    ]
  };

  return (
    <div className="space-y-8">
             {/* Header */}
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold text-gray-900">AI-Powered Student Analytics</h1>
           <p className="text-gray-600">Advanced machine learning insights for personalized academic success</p>
         </div>
       </div>



             {/* AI Dropout Risk Prediction */}
       <div className="card">
         <AIPredictionEngine 
           studentData={currentStudent}
           onPredictionUpdate={(prediction) => setAiPrediction(prediction)}
         />
       </div>

      {/* Risk Trend Analysis */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 text-red-600 mr-2" />
          Risk Trend Analysis
        </h3>
        <p className="text-gray-600 mb-6">Historical risk progression and future projections</p>
        
                 <ResponsiveContainer width="100%" height={300}>
           <RechartsLineChart data={erpPerformanceData}>
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="semester" />
             <YAxis />
             <Tooltip 
               labelFormatter={(value) => {
                 const data = erpPerformanceData.find(d => d.semester === value);
                 return `${data?.year} - ${data?.semester}`;
               }}
             />
             <Line 
               type="monotone" 
               dataKey="gpa" 
               stroke="#EF4444" 
               strokeWidth={3}
               name="GPA Trend"
               dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
             />
           </RechartsLineChart>
         </ResponsiveContainer>
      </div>

      {/* AI Insights & Recommendations */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 text-purple-600 mr-2" />
          AI Insights & Recommendations
        </h3>
        <p className="text-gray-600 mb-6">Personalized recommendations based on AI analysis</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Current Assessment
            </h4>
            <p className="text-blue-700 mb-4">
              Based on AI analysis of {aiPrediction?.factors.length || 0} risk factors, 
              you have a {aiPrediction?.riskCategory || 'low'} risk of academic challenges.
            </p>
            <div className="space-y-2">
              {aiPrediction?.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
              <TargetIcon className="w-5 h-5 mr-2" />
              Recommended Actions
            </h4>
            <ul className="space-y-2 text-yellow-700">
              {aiPrediction?.riskCategory === 'critical' && (
                <>
                  <li>• Immediate academic intervention required</li>
                  <li>• Schedule meeting with academic advisor</li>
                  <li>• Join intensive study programs</li>
                </>
              )}
              {aiPrediction?.riskCategory === 'high' && (
                <>
                  <li>• Academic support program enrollment</li>
                  <li>• Regular progress monitoring</li>
                  <li>• Study skill workshops</li>
                </>
              )}
              {aiPrediction?.riskCategory === 'medium' && (
                <>
                  <li>• Performance tracking system</li>
                  <li>• Study habit improvement</li>
                  <li>• Regular check-ins</li>
                </>
              )}
              {aiPrediction?.riskCategory === 'low' && (
                <>
                  <li>• Maintain current performance</li>
                  <li>• Continue good study habits</li>
                  <li>• Regular progress monitoring</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Academic Performance Data from ERP System */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
          Academic Performance Data from College/University ERP System
        </h3>
        <p className="text-gray-600 mb-6">Real-time data integration with institutional systems</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                           {/* ERP Performance Chart */}
                 <div>
                   <h4 className="font-medium text-gray-900 mb-3">Academic Performance by Semester</h4>
                   <ResponsiveContainer width="100%" height={250}>
                     <BarChart data={erpPerformanceData}>
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="semester" />
                       <YAxis />
                       <Tooltip 
                         labelFormatter={(value) => {
                           const data = erpPerformanceData.find(d => d.semester === value);
                           return `${data?.year} - ${data?.semester}`;
                         }}
                       />
                       <Bar dataKey="gpa" fill="#3B82F6" name="GPA" />
                       <Bar dataKey="attendance" fill="#10B981" name="Attendance %" />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>

          {/* Subject Performance */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Subject-wise Performance</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={subjectPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ subject, gpa }) => `${subject}: ${gpa}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="gpa"
                >
                  {subjectPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

                 {/* ERP Data Table */}
         <div className="mt-6">
           <h4 className="font-medium text-gray-900 mb-3">Detailed Academic History</h4>
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exams</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {erpPerformanceData.map((data, index) => (
                   <tr key={index} className="hover:bg-gray-50">
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.year}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.semester}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.gpa}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.attendance}%</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.assignments}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.exams}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.subjects}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
      </div>

      {/* Performance Insights */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 text-yellow-600 mr-2" />
          Performance Insights
        </h3>
        <p className="text-gray-600 mb-6">Comprehensive analysis and actionable insights</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Your Strengths
            </h4>
            <ul className="space-y-2">
              {performanceInsights.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
              <TargetIcon className="w-5 h-5 mr-2" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2">
              {performanceInsights.areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-yellow-700">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recommendations */}
          <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Recommendations
            </h4>
            <ul className="space-y-2">
              {performanceInsights.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Recent Achievements
            </h4>
            <ul className="space-y-2">
              {performanceInsights.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-purple-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;
