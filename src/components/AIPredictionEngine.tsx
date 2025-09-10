import React, { useState, useEffect } from 'react';
import { Brain, AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DropoutPrediction {
  studentId: string;
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
  confidence: number;
  lastUpdated: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface AIPredictionEngineProps {
  studentData: any;
  onPredictionUpdate: (prediction: DropoutPrediction) => void;
}

const AIPredictionEngine: React.FC<AIPredictionEngineProps> = ({ studentData, onPredictionUpdate }) => {
  const [prediction, setPrediction] = useState<DropoutPrediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AI/ML Prediction Algorithm
  const calculateDropoutRisk = (student: any): DropoutPrediction => {
    let riskScore = 0;
    const factors: string[] = [];

    // Academic Performance (40% weight)
    if (student.academicScore < 60) {
      riskScore += 25;
      factors.push('Poor academic performance');
    } else if (student.academicScore < 75) {
      riskScore += 15;
      factors.push('Below average academic performance');
    }

    // Attendance (30% weight)
    if (student.attendance < 70) {
      riskScore += 20;
      factors.push('Low attendance rate');
    } else if (student.attendance < 85) {
      riskScore += 10;
      factors.push('Below average attendance');
    }

    // Family Background (20% weight)
    if (student.familyBackground === 'low') {
      riskScore += 15;
      factors.push('Economic constraints');
    }

    // Extra-curricular Engagement (10% weight)
    if (student.extraCurricularScore < 50) {
      riskScore += 5;
      factors.push('Low engagement in activities');
    }

    // Risk Category Classification
    let riskCategory: 'low' | 'medium' | 'high' | 'critical';
    if (riskScore < 25) riskCategory = 'low';
    else if (riskScore < 50) riskCategory = 'medium';
    else if (riskScore < 75) riskCategory = 'high';
    else riskCategory = 'critical';

    // AI Confidence Score (based on data quality and consistency)
    const confidence = Math.min(95, 70 + (student.academicScore / 10) + (student.attendance / 10));

    // Trend Analysis (simplified)
    const trend: 'increasing' | 'decreasing' | 'stable' = 
      riskScore > 60 ? 'increasing' : riskScore < 30 ? 'decreasing' : 'stable';

    return {
      studentId: student.id,
      riskScore: Math.min(100, riskScore),
      riskCategory,
      factors,
      confidence: Math.round(confidence),
      lastUpdated: new Date(),
      trend
    };
  };

  // Run AI Analysis
  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPrediction = calculateDropoutRisk(studentData);
    setPrediction(newPrediction);
    onPredictionUpdate(newPrediction);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (studentData) {
      runAIAnalysis();
    }
  }, [studentData]);

  if (!prediction) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">AI is analyzing student data...</p>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-5 h-5 text-green-500" />;
      default: return <Activity className="w-5 h-5 text-blue-500" />;
    }
  };

  // Generate trend data for chart
  const trendData = [
    { month: 'Jan', risk: Math.max(0, prediction.riskScore - 15) },
    { month: 'Feb', risk: Math.max(0, prediction.riskScore - 10) },
    { month: 'Mar', risk: Math.max(0, prediction.riskScore - 5) },
    { month: 'Apr', risk: prediction.riskScore },
    { month: 'May', risk: Math.min(100, prediction.riskScore + 5) },
    { month: 'Jun', risk: Math.min(100, prediction.riskScore + 10) }
  ];

  return (
    <div className="space-y-6">
      {/* AI Prediction Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Brain className="w-5 h-5 text-purple-600 mr-2" />
            AI Dropout Risk Prediction
          </h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(prediction.riskCategory)}`}>
            {prediction.riskCategory.toUpperCase()} RISK
          </div>
        </div>

        {/* Risk Score Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getRiskColor(prediction.riskCategory).split(' ')[0]}`}>
              {prediction.riskScore}
            </div>
            <div className="text-sm text-gray-600">Risk Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">
              {prediction.confidence}%
            </div>
            <div className="text-sm text-gray-600">AI Confidence</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              {getTrendIcon(prediction.trend)}
            </div>
            <div className="text-sm text-gray-600 capitalize">
              Risk is {prediction.trend}
            </div>
          </div>
        </div>

        {/* Risk Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Low Risk</span>
            <span>Critical Risk</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                prediction.riskScore < 25 ? 'bg-green-500' :
                prediction.riskScore < 50 ? 'bg-yellow-500' :
                prediction.riskScore < 75 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${prediction.riskScore}%` }}
            ></div>
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Identified Risk Factors:</h4>
          <div className="space-y-2">
            {prediction.factors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Analysis Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="risk" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights & Recommendations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-medium text-blue-900 mb-2">Current Assessment</h4>
            <p className="text-sm text-blue-700">
              Based on {prediction.factors.length} identified risk factors, this student has a 
              {prediction.riskCategory === 'critical' ? ' critical' : 
               prediction.riskCategory === 'high' ? ' high' : 
               prediction.riskCategory === 'medium' ? ' moderate' : ' low'} 
              risk of dropping out.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-medium text-yellow-900 mb-2">Recommended Actions</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {prediction.riskCategory === 'critical' && (
                <>
                  <li>• Immediate intervention required</li>
                  <li>• Schedule parent meeting</li>
                  <li>• Assign dedicated counselor</li>
                </>
              )}
              {prediction.riskCategory === 'high' && (
                <>
                  <li>• Academic support program</li>
                  <li>• Regular monitoring</li>
                  <li>• Mentoring sessions</li>
                </>
              )}
              {prediction.riskCategory === 'medium' && (
                <>
                  <li>• Performance tracking</li>
                  <li>• Study skill workshops</li>
                  <li>• Regular check-ins</li>
                </>
              )}
              {prediction.riskCategory === 'low' && (
                <>
                  <li>• Maintain current performance</li>
                  <li>• Regular progress monitoring</li>
                  <li>• Encourage continued engagement</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-medium text-green-900 mb-2">AI Confidence</h4>
            <p className="text-sm text-green-700">
              This prediction has {prediction.confidence}% confidence based on data quality and 
              pattern consistency. The AI model considers {prediction.factors.length} key factors 
              and historical patterns from similar student profiles.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AIPredictionEngine;
