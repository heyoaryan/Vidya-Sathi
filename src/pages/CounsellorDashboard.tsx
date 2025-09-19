import React, { useMemo } from 'react';
import { mockStudents } from '../data/mockData';
import { assessStudentRisk } from '../utils/riskEngine';
import { 
  Users,
  AlertTriangle,
  CalendarClock,
  ClipboardCheck,
  FileText,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';

const CounsellorDashboard: React.FC = () => {
  const assessed = useMemo(() => (
    mockStudents.map(s => ({ student: s, assessment: assessStudentRisk(s) }))
  ), []);

  const atRiskStudents = assessed
    .filter(x => x.student.riskScore >= 50)
    .sort((a, b) => b.student.riskScore - a.student.riskScore)
    .slice(0, 6);

  const upcomingSessions = [
    { with: 'Rahul Kumar', when: 'Tomorrow 11:00 AM', type: 'Mentor Check‑in' },
    { with: 'Priya Singh', when: 'Thu 3:30 PM', type: 'Parent Call' },
    { with: 'Neha Verma', when: 'Fri 1:00 PM', type: 'Counselling Session' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Counsellor Console</h1>
          <p className="text-gray-300">Manage at‑risk students and interventions</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{assessed.filter(x => x.student.riskScore > 75).length}</h3>
          <p className="text-gray-300">High‑risk Students</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{assessed.filter(x => x.student.riskScore >= 50 && x.student.riskScore <= 75).length}</h3>
          <p className="text-gray-300">Medium‑risk Students</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{assessed.filter(x => x.student.interventions?.length > 0).length}</h3>
          <p className="text-gray-300">Active Interventions</p>
        </div>
      </div>

      {/* At‑risk list and Upcoming sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">At‑risk Students (score ≥ 50)</h3>
          </div>
          <div className="divide-y divide-white/10">
            {atRiskStudents.map(({ student }, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${student.riskScore > 75 ? 'bg-red-500' : 'bg-orange-500'} flex items-center justify-center text-white text-xs font-semibold`}>{student.name.charAt(0)}</div>
                  <div>
                    <p className="text-white text-sm font-medium">{student.name}</p>
                    <p className="text-gray-400 text-xs">Score: {student.riskScore} • Dept: {student.department}</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs rounded-lg bg-white/10 text-white hover:bg-white/20">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <CalendarClock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Upcoming Sessions</h3>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{s.with}</p>
                  <p className="text-gray-400 text-xs">{s.type} • {s.when}</p>
                </div>
                <button className="px-3 py-1 text-xs rounded-lg bg-white/10 text-white hover:bg-white/20">Open</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counselor Actions */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Counsellor Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl border border-white/20 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <ClipboardCheck className="w-6 h-6 text-purple-300" />
              <div>
                <h4 className="text-white font-semibold">Assign Intervention</h4>
                <p className="text-gray-400 text-sm">Plan remedials or mentoring</p>
              </div>
            </div>
          </button>
          <button className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-xl border border-white/20 hover:from-emerald-500/30 hover:to-teal-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-emerald-300" />
              <div>
                <h4 className="text-white font-semibold">Schedule Parent Call</h4>
                <p className="text-gray-400 text-sm">Coordinate outreach</p>
              </div>
            </div>
          </button>
          <button className="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-xl border border-white/20 hover:from-blue-500/30 hover:to-indigo-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-blue-300" />
              <div>
                <h4 className="text-white font-semibold">Send Mentor Note</h4>
                <p className="text-gray-400 text-sm">Guidance for mentor</p>
              </div>
            </div>
          </button>
          <button className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-600/20 rounded-xl border border-white/20 hover:from-amber-500/30 hover:to-orange-600/30 transition-all duration-300 text-left">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-amber-300" />
              <div>
                <h4 className="text-white font-semibold">Generate Parent Report</h4>
                <p className="text-gray-400 text-sm">Share latest status</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;


