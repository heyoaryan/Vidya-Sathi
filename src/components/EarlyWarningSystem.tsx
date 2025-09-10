import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, User, TrendingUp, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface EarlyWarning {
  id: string;
  studentId: string;
  studentName: string;
  warningType: 'attendance' | 'academic' | 'behavioral' | 'financial' | 'mental_health';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  dueDate?: Date;
}

interface EarlyWarningSystemProps {
  warnings: EarlyWarning[];
  onWarningUpdate: (warningId: string, status: string) => void;
  userRole: string;
}

const EarlyWarningSystem: React.FC<EarlyWarningSystemProps> = ({ 
  warnings, 
  onWarningUpdate, 
  userRole 
}) => {
  const [filteredWarnings, setFilteredWarnings] = useState<EarlyWarning[]>(warnings);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  useEffect(() => {
    let filtered = warnings;
    
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(w => w.warningType === selectedFilter);
    }
    
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(w => w.severity === selectedSeverity);
    }
    
    setFilteredWarnings(filtered);
  }, [warnings, selectedFilter, selectedSeverity]);

  const getWarningIcon = (type: string) => {
    switch (type) {
      case 'attendance': return <Clock className="w-5 h-5" />;
      case 'academic': return <TrendingDown className="w-5 h-5" />;
      case 'behavioral': return <AlertTriangle className="w-5 h-5" />;
      case 'financial': return <TrendingDown className="w-5 h-5" />;
      case 'mental_health': return <AlertTriangle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getWarningColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-l-green-500 bg-green-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'critical': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusUpdate = (warningId: string, newStatus: string) => {
    onWarningUpdate(warningId, newStatus);
    
    if (newStatus === 'acknowledged') {
      toast.success('Warning acknowledged');
    } else if (newStatus === 'resolved') {
      toast.success('Warning marked as resolved');
    }
  };

  const getWarningTypeLabel = (type: string) => {
    switch (type) {
      case 'attendance': return 'Attendance Issue';
      case 'academic': return 'Academic Performance';
      case 'behavioral': return 'Behavioral Concern';
      case 'financial': return 'Financial Constraint';
      case 'mental_health': return 'Mental Health';
      default: return type;
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'low': return 'Low Priority';
      case 'medium': return 'Medium Priority';
      case 'high': return 'High Priority';
      case 'critical': return 'Critical Priority';
      default: return severity;
    }
  };

  const activeWarnings = warnings.filter(w => w.status === 'active');
  const criticalWarnings = warnings.filter(w => w.severity === 'critical' && w.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Bell className="w-5 h-5 text-red-600 mr-2" />
            Early Warning System
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{activeWarnings.length}</div>
              <div className="text-sm text-gray-600">Active Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-700">{criticalWarnings.length}</div>
              <div className="text-sm text-gray-600">Critical Alerts</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="attendance">Attendance</option>
            <option value="academic">Academic</option>
            <option value="behavioral">Behavioral</option>
            <option value="financial">Financial</option>
            <option value="mental_health">Mental Health</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Critical Warnings Banner */}
      {criticalWarnings.length > 0 && (
        <div className="card border-l-4 border-red-500 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-900">Critical Warnings Require Immediate Attention</h4>
                <p className="text-sm text-red-700">
                  {criticalWarnings.length} critical warning{criticalWarnings.length > 1 ? 's' : ''} need immediate intervention
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              View Critical
            </button>
          </div>
        </div>
      )}

      {/* Warnings List */}
      <div className="space-y-4">
        {filteredWarnings.length === 0 ? (
          <div className="card text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No warnings found with current filters</p>
          </div>
        ) : (
          filteredWarnings.map(warning => (
            <div key={warning.id} className={`card border-l-4 ${getWarningColor(warning.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getWarningIcon(warning.warningType)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{warning.studentName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(warning.severity)}`}>
                        {warning.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(warning.status)}`}>
                        {warning.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{warning.message}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{warning.timestamp.toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{getWarningTypeLabel(warning.warningType)}</span>
                      </span>
                      {warning.assignedTo && (
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>Assigned to: {warning.assignedTo}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 ml-4">
                  {warning.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(warning.id, 'acknowledged')}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-xs hover:bg-yellow-200 transition-colors"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(warning.id, 'resolved')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    </>
                  )}
                  
                  {warning.status === 'acknowledged' && (
                    <button
                      onClick={() => handleStatusUpdate(warning.id, 'resolved')}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                  
                  {warning.status === 'resolved' && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">Resolved</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Actions for Teachers/Admins */}
              {(userRole === 'teacher' || userRole === 'admin') && warning.status === 'active' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">
                        Schedule Meeting
                      </button>
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition-colors">
                        Create Intervention
                      </button>
                      <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200 transition-colors">
                        Contact Parent
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Due: {warning.dueDate ? warning.dueDate.toLocaleDateString() : 'ASAP'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">{warnings.filter(w => w.severity === 'critical').length}</div>
          <div className="text-sm text-gray-600">Critical</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">{warnings.filter(w => w.severity === 'high').length}</div>
          <div className="text-sm text-gray-600">High</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{warnings.filter(w => w.severity === 'medium').length}</div>
          <div className="text-sm text-gray-600">Medium</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{warnings.filter(w => w.severity === 'low').length}</div>
          <div className="text-sm text-gray-600">Low</div>
        </div>
      </div>
    </div>
  );
};

export default EarlyWarningSystem;
