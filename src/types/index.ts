export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  department: string;
  year: string;
  batch: string;
  attendance: number;
  academicScore: number;
  extraCurricularScore: number;
  familyBackground: 'low' | 'medium' | 'high';
  // New holistic risk inputs
  backlogs?: number; // total active backlogs/arrears
  placementReadiness?: {
    aptitude?: number; // 0-100
    communication?: number; // 0-100
    projects?: number; // 0-100
  };
  financialStressIndex?: number; // 0-100 (higher = more stress)
  mentalHealthSignals?: {
    absenteeismSpike?: boolean;
    peerIsolation?: boolean;
    selfReportScore?: number; // 0-100 lower worse
  };
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high';
  lastUpdated: string;
  interventions: Intervention[];
}

export interface Intervention {
  id: string;
  type: 'counseling' | 'remedial' | 'scholarship' | 'mentorship' | 'extra_tuition';
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'planned';
  assignedTo: string;
  assignedDate: string;
  dueDate: string;
}

export interface ClassData {
  id: string;
  name: string;
  section: string;
  totalStudents: number;
  lowRiskCount: number;
  mediumRiskCount: number;
  highRiskCount: number;
  averageRiskScore: number;
}

export interface DashboardStats {
  totalStudents: number;
  atRiskStudents: number;
  lowRiskStudents: number;
  mediumRiskStudents: number;
  highRiskStudents: number;
  averageAttendance: number;
  averageAcademicScore: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}
