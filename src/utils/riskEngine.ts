import { Student } from '../types';

export interface RiskReason {
  label: string;
  weight: number; // contribution 0-100
  evidence: string;
}

export interface RiskAssessment {
  score: number; // 0-100
  category: 'low' | 'medium' | 'high';
  reasons: RiskReason[];
  roadmap: string[]; // recommended next steps
}

export function assessStudentRisk(student: Student): RiskAssessment {
  const reasons: RiskReason[] = [];

  // Attendance (30%)
  const attendancePenalty = Math.max(0, 75 - (student.attendance || 0)); // below 75 starts adding risk
  const attendanceWeight = Math.min(30, (attendancePenalty / 75) * 30);
  if (attendanceWeight > 0) {
    reasons.push({
      label: 'Low attendance',
      weight: round(attendanceWeight),
      evidence: `${student.attendance}% attendance`
    });
  }

  // Academics (20%)
  const academicPenalty = Math.max(0, 65 - (student.academicScore || 0));
  const academicWeight = Math.min(20, (academicPenalty / 65) * 20);
  if (academicWeight > 0) {
    reasons.push({
      label: 'Low academic performance',
      weight: round(academicWeight),
      evidence: `${student.academicScore}% academic score`
    });
  }

  // Backlogs (15%)
  const backlogCount = student.backlogs ?? 0;
  const backlogWeight = Math.min(15, backlogCount * 5);
  if (backlogWeight > 0) {
    reasons.push({ label: 'Backlogs/arrears', weight: round(backlogWeight), evidence: `${backlogCount} active backlogs` });
  }

  // Placement readiness gaps (15%)
  const pr = student.placementReadiness || {};
  const readinessAvg = average([pr.aptitude, pr.communication, pr.projects].filter(isNumber));
  const readinessPenalty = Math.max(0, 70 - readinessAvg);
  const readinessWeight = isNaN(readinessAvg) ? 0 : Math.min(15, (readinessPenalty / 70) * 15);
  if (readinessWeight > 0) {
    reasons.push({ label: 'Placement readiness gaps', weight: round(readinessWeight), evidence: `Avg readiness ${round(readinessAvg)}%` });
  }

  // Financial stress (10%) - higher index means more stress
  const fsi = student.financialStressIndex ?? 0;
  const financeWeight = Math.min(10, (fsi / 100) * 10);
  if (financeWeight > 0) {
    reasons.push({ label: 'Financial stress indicators', weight: round(financeWeight), evidence: `Stress index ${fsi}` });
  }

  // Mental health signals (10%)
  const mh = student.mentalHealthSignals || {};
  let mhScore = 0;
  if (mh.absenteeismSpike) mhScore += 4;
  if (mh.peerIsolation) mhScore += 3;
  if (isNumber(mh.selfReportScore)) mhScore += Math.max(0, 60 - (mh.selfReportScore as number)) / 60 * 3;
  mhScore = Math.min(10, mhScore);
  if (mhScore > 0) {
    reasons.push({ label: 'Mental health signals', weight: round(mhScore), evidence: buildMHEvidence(mh) });
  }

  // Sum capped to 100
  const score = round(Math.min(100, reasons.reduce((s, r) => s + r.weight, 0)));
  const category: RiskAssessment['category'] = score >= 60 ? 'high' : score >= 35 ? 'medium' : 'low';

  const roadmap: string[] = buildRoadmap({ category, student });

  return { score, category, reasons: reasons.sort((a, b) => b.weight - a.weight), roadmap };
}

function buildRoadmap({ category, student }: { category: RiskAssessment['category']; student: Student; }): string[] {
  const steps: string[] = [];
  if (category !== 'low') steps.push('Assign mentor check-in within 7 days');
  if ((student.attendance || 0) < 75) steps.push('Attendance improvement plan with weekly tracking');
  if ((student.academicScore || 100) < 65) steps.push('Enroll in remedial sessions for weak subjects');
  if ((student.backlogs || 0) > 0) steps.push('Backlog clearance schedule and targets');
  if ((student.financialStressIndex || 0) >= 60) steps.push('Connect with financial aid/scholarship cell');
  if (student.mentalHealthSignals?.peerIsolation || student.mentalHealthSignals?.absenteeismSpike) steps.push('Counselling referral and peer support group');
  if (category === 'high') steps.push('Create personalized recovery roadmap and notify counsellor');
  return steps;
}

function average(values: number[]): number {
  if (!values.length) return NaN as unknown as number;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function isNumber(v: unknown): v is number {
  return typeof v === 'number' && !isNaN(v);
}

function round(n: number): number { return Math.round(n * 10) / 10; }

function buildMHEvidence(mh: NonNullable<Student['mentalHealthSignals']>): string {
  const parts: string[] = [];
  if (mh.absenteeismSpike) parts.push('absenteeism spike');
  if (mh.peerIsolation) parts.push('peer isolation');
  if (isNumber(mh.selfReportScore)) parts.push(`self-report ${mh.selfReportScore}%`);
  return parts.join(', ');
}


