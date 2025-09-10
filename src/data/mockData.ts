import { Student, ClassData, DashboardStats } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    rollNumber: '2024001',
    class: '10',
    section: 'A',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 85,
    academicScore: 72,
    extraCurricularScore: 65,
    familyBackground: 'medium',
    riskScore: 35,
    riskCategory: 'low',
    lastUpdated: '2024-01-15',
    interventions: [
      {
        id: '1',
        type: 'mentorship',
        title: 'Peer Mentoring Program',
        description: 'Assign senior student mentor for academic guidance',
        status: 'in_progress',
        assignedTo: 'Mrs. Sharma',
        assignedDate: '2024-01-10',
        dueDate: '2024-02-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Priya Singh',
    rollNumber: '2024002',
    class: '10',
    section: 'A',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 45,
    academicScore: 58,
    extraCurricularScore: 30,
    familyBackground: 'low',
    riskScore: 78,
    riskCategory: 'high',
    lastUpdated: '2024-01-15',
    interventions: [
      {
        id: '2',
        type: 'counseling',
        title: 'Family Counseling Session',
        description: 'Schedule meeting with parents to discuss financial support options',
        status: 'pending',
        assignedTo: 'School Counselor',
        assignedDate: '2024-01-12',
        dueDate: '2024-01-25'
      },
      {
        id: '3',
        type: 'scholarship',
        title: 'Merit Scholarship Application',
        description: 'Apply for government scholarship program',
        status: 'in_progress',
        assignedTo: 'Admin Office',
        assignedDate: '2024-01-12',
        dueDate: '2024-01-30'
      }
    ]
  },
  {
    id: '3',
    name: 'Amit Patel',
    rollNumber: '2024003',
    class: '10',
    section: 'B',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 92,
    academicScore: 88,
    extraCurricularScore: 85,
    familyBackground: 'high',
    riskScore: 15,
    riskCategory: 'low',
    lastUpdated: '2024-01-15',
    interventions: []
  },
  {
    id: '4',
    name: 'Neha Verma',
    rollNumber: '2024004',
    class: '10',
    section: 'B',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-26',
    attendance: 68,
    academicScore: 65,
    extraCurricularScore: 55,
    familyBackground: 'medium',
    riskScore: 62,
    riskCategory: 'medium',
    lastUpdated: '2024-01-15',
    interventions: [
      {
        id: '4',
        type: 'remedial',
        title: 'Mathematics Remedial Classes',
        description: 'Extra classes for weak topics in Mathematics',
        status: 'in_progress',
        assignedTo: 'Mr. Gupta',
        assignedDate: '2024-01-08',
        dueDate: '2024-02-08'
      }
    ]
  },
  {
    id: '5',
    name: 'Suresh Kumar',
    rollNumber: '2024005',
    class: '10',
    section: 'A',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 35,
    academicScore: 42,
    extraCurricularScore: 25,
    familyBackground: 'low',
    riskScore: 85,
    riskCategory: 'high',
    lastUpdated: '2024-01-15',
    interventions: [
      {
        id: '5',
        type: 'counseling',
        title: 'Academic Counseling',
        description: 'One-on-one counseling session to address academic challenges',
        status: 'completed',
        assignedTo: 'School Counselor',
        assignedDate: '2024-01-05',
        dueDate: '2024-01-15'
      }
    ]
  },
  {
    id: '6',
    name: 'Anjali Sharma',
    rollNumber: '2024006',
    class: '10',
    section: 'B',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 78,
    academicScore: 75,
    extraCurricularScore: 70,
    familyBackground: 'medium',
    riskScore: 45,
    riskCategory: 'medium',
    lastUpdated: '2024-01-15',
    interventions: []
  },
  {
    id: '7',
    name: 'Rajesh Malhotra',
    rollNumber: '2024007',
    class: '10',
    section: 'A',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 88,
    academicScore: 82,
    extraCurricularScore: 75,
    familyBackground: 'high',
    riskScore: 28,
    riskCategory: 'low',
    lastUpdated: '2024-01-15',
    interventions: []
  },
  {
    id: '8',
    name: 'Kavita Reddy',
    rollNumber: '2024008',
    class: '10',
    section: 'B',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 55,
    academicScore: 48,
    extraCurricularScore: 40,
    familyBackground: 'low',
    riskScore: 72,
    riskCategory: 'high',
    lastUpdated: '2024-01-15',
    interventions: [
      {
        id: '6',
        type: 'scholarship',
        title: 'Need-based Scholarship',
        description: 'Apply for financial aid to support education',
        status: 'in_progress',
        assignedTo: 'Admin Office',
        assignedDate: '2024-01-10',
        dueDate: '2024-01-25'
      }
    ]
  },
  {
    id: '9',
    name: 'Vikram Singh',
    rollNumber: '2024009',
    class: '10',
    section: 'A',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 95,
    academicScore: 90,
    extraCurricularScore: 88,
    familyBackground: 'high',
    riskScore: 12,
    riskCategory: 'low',
    lastUpdated: '2024-01-15',
    interventions: []
  },
  {
    id: '10',
    name: 'Meera Iyer',
    rollNumber: '2024010',
    class: '10',
    section: 'B',
    department: 'Computer Science',
    year: '2nd Year',
    batch: '2023-2024',
    attendance: 62,
    academicScore: 58,
    extraCurricularScore: 50,
    familyBackground: 'medium',
    riskScore: 68,
    riskCategory: 'medium',
    lastUpdated: '2024-01-15',
    interventions: [
      {
        id: '7',
        type: 'remedial',
        title: 'English Language Support',
        description: 'Additional English classes to improve communication skills',
        status: 'planned',
        assignedTo: 'Ms. Johnson',
        assignedDate: '2024-01-15',
        dueDate: '2024-02-15'
      }
    ]
  }
];

export const mockClasses: ClassData[] = [
  {
    id: '1',
    name: '10',
    section: 'A',
    totalStudents: 35,
    lowRiskCount: 20,
    mediumRiskCount: 10,
    highRiskCount: 5,
    averageRiskScore: 42
  },
  {
    id: '2',
    name: '10',
    section: 'B',
    totalStudents: 32,
    lowRiskCount: 18,
    mediumRiskCount: 12,
    highRiskCount: 2,
    averageRiskScore: 38
  },
  {
    id: '3',
    name: '9',
    section: 'A',
    totalStudents: 38,
    lowRiskCount: 15,
    mediumRiskCount: 18,
    highRiskCount: 5,
    averageRiskScore: 55
  }
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: 105,
  atRiskStudents: 32,
  lowRiskStudents: 53,
  mediumRiskStudents: 20,
  highRiskStudents: 12,
  averageAttendance: 78,
  averageAcademicScore: 72
};
