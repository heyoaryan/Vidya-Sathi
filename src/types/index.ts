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
