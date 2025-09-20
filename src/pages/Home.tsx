import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  Brain, 
  Shield, 
  Zap,
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp,
  Award,
  AlertTriangle,
  Target,
  BookOpen,
  Building2,
  FileSpreadsheet,
  Bell,
  User,
  UserCog
} from 'lucide-react';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    // If user is authenticated, redirect to role-specific dashboard
    if (isAuthenticated && user) {
      if (user.role === 'student') {
        navigate('/app/student-dashboard');
      } else if (user.role === 'teacher') {
        navigate('/app/teacher-dashboard');
      } else if (user.role === 'counsellor') {
        navigate('/app/counsellor-dashboard');
      } else {
        navigate('/app/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleVideoClick = () => {
    // You can add video player logic here
    console.log('Video clicked');
  };

  const handleLearnAboutClick = () => {
    // Navigate to Learn About Vidya-Sathi page
    navigate('/learn-about');
  };

  const openRoleModal = () => setShowRoleModal(true);
  const selectRoleAndGo = (role: 'student' | 'teacher' | 'counsellor') => {
    setShowRoleModal(false);
    navigate(`/login?role=${role}`);
  };

  const features = [
    {
      icon: AlertTriangle,
      title: 'Early Dropout Detection',
      description: 'AI-powered system identifies at-risk students weeks before term-end results using attendance, test scores, and payment data',
      color: 'from-red-500 to-orange-600'
    },
    {
      icon: FileSpreadsheet,
      title: 'Data Integration',
      description: 'Seamlessly merges attendance spreadsheets, assessment results, and fee-payment data into unified dashboard',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Automated alerts to mentors and guardians ensuring timely intervention and support',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Target,
      title: 'Rule-Based Thresholds',
      description: 'Clear, configurable logic with color-coded risk indicators for transparent decision making',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const stats = [
    { number: '500+', label: 'Schools Will Be Covered', icon: GraduationCap },
    { number: '35%', label: 'Current Dropout Rate', icon: TrendingUp },
    { number: '85%', label: 'Dropout Prevention by Vidya-Sathi', icon: Building2 },
    { number: '24/7', label: 'AI Monitoring', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Vidya-Sathi</h1>
                <p className="text-xs text-slate-300">AI Powered Companion</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6"></div>
          <div className="flex items-center space-x-4">
            <button onClick={openRoleModal} className="btn-secondary">
                Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
              AI-Powered Dropout Prevention System
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 slide-in-left">
            Vidya-Sathi{' '}
            <span className="gradient-text">AI System</span>
            <br />
            <span className="text-3xl md:text-5xl text-slate-300">Prevents Dropouts</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-4xl mx-auto slide-in-right leading-relaxed">
            Our AI-powered system identifies at-risk students in schools before they drop out. 
            By analyzing attendance patterns, academic performance, and behavioral indicators, we enable early intervention 
            to keep students engaged and on track for success across schools.
          </p>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="professional-card p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Experience Vidya‑Sathi</p>
                    <p className="text-gray-300 text-sm">Interactive dashboard preview and key workflows</p>
                  </div>
                </div>
                <button onClick={openRoleModal} className="btn-primary text-base px-7 py-3 group whitespace-nowrap flex items-center self-start md:self-auto">
                  Launch Vidya‑Sathi
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="glass-card px-3 py-2 text-sm text-gray-200 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Transparent rules
                </div>
                <div className="glass-card px-3 py-2 text-sm text-gray-200 flex items-center gap-2">
                  <Brain className="w-4 h-4" /> AI insights
                </div>
                <div className="glass-card px-3 py-2 text-sm text-gray-200 flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Smart alerts
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Data-driven insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Early intervention</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Transparent algorithms</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              About <span className="gradient-text">Vidya-Sathi</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Vidya-Sathi is an AI-powered system that helps schools detect dropout risk early,
              take timely intervention measures, and track student success across schools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="professional-card p-6 hover:scale-[1.02] transition">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">Unified Data</h3>
              <p className="text-gray-300 text-sm">Attendance, assessments, and fees in one reliable view.</p>
            </div>
            <div className="professional-card p-6 hover:scale-[1.02] transition">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">Risk Signaling</h3>
              <p className="text-gray-300 text-sm">Transparent, color-coded thresholds highlight at-risk students.</p>
            </div>
            <div className="professional-card p-6 hover:scale-[1.02] transition">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">Actionable Outreach</h3>
              <p className="text-gray-300 text-sm">Automated alerts guide mentors and guardians to act in time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Preview */}
      <section id="workflow" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Workflow <span className="gradient-text">Preview</span></h2>
            <p className="text-gray-300 max-w-3xl mx-auto">From data ingestion to targeted intervention — a smooth, continuous flow.</p>
          </div>
          <div className="marquee relative glass-card px-6 py-5 overflow-hidden">
            {/* Edge fades for nicer left/right blending */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900/60 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900/60 to-transparent"></div>
            <div className="animate-marquee flex whitespace-nowrap will-change-transform" aria-hidden="true">
              {/* Track A */}
              <div className="flex items-center gap-6">
                {[{ icon: FileSpreadsheet, title: 'Ingest', desc: 'Attendance, tests, fees' },
                  { icon: Shield, title: 'Validate', desc: 'Checks & cleaning' },
                  { icon: BarChart3, title: 'Normalize', desc: 'Unified schema' },
                  { icon: Brain, title: 'Analyze', desc: 'ML + rules engine' },
                  { icon: AlertTriangle, title: 'Detect', desc: 'Risk scoring' },
                  { icon: Target, title: 'Segment', desc: 'By severity' },
                  { icon: Bell, title: 'Notify', desc: 'Mentors & guardians' },
                  { icon: Award, title: 'Track', desc: 'Outcomes & follow-up' }].map((step, idx) => {
                  const Icon = step.icon as any;
                  return (
                    <div key={`A-${idx}`} className="w-[260px] h-[96px] professional-card px-5 py-4 mx-0 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold leading-5">{step.title}</p>
                        <p className="text-gray-300 text-xs leading-snug">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Track B (duplicate for seamless loop) */}
              <div className="flex items-center gap-6" aria-hidden="true">
                {[{ icon: FileSpreadsheet, title: 'Ingest', desc: 'Attendance, tests, fees' },
                  { icon: Shield, title: 'Validate', desc: 'Checks & cleaning' },
                  { icon: BarChart3, title: 'Normalize', desc: 'Unified schema' },
                  { icon: Brain, title: 'Analyze', desc: 'ML + rules engine' },
                  { icon: AlertTriangle, title: 'Detect', desc: 'Risk scoring' },
                  { icon: Target, title: 'Segment', desc: 'By severity' },
                  { icon: Bell, title: 'Notify', desc: 'Mentors & guardians' },
                  { icon: Award, title: 'Track', desc: 'Outcomes & follow-up' }].map((step, idx) => {
                  const Icon = step.icon as any;
                  return (
                    <div key={`B-${idx}`} className="w-[260px] h-[96px] professional-card px-5 py-4 mx-0 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold leading-5">{step.title}</p>
                        <p className="text-gray-300 text-xs leading-snug">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section removed as requested */}

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose{' '}
              <span className="gradient-text">Vidya-Sathi</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Explore the pillars of Vidya-Sathi. Scroll through the stack to see each capability.
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index}>
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/50 hover:to-purple-500/50 transition">
                      <div className="professional-card p-6 group hover:-translate-y-[2px] hover:shadow-2xl transition duration-300 rounded-2xl h-full">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold flex items-center justify-center">
                              {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="text-base md:text-lg lg:text-xl font-bold text-white">{feature.title}</h3>
                          </div>
                          <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner shadow-black/20 group-hover:scale-105 transition`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section removed as requested */}

      {/* Footer */}
      <footer className="relative z-10 px-6 pt-16 pb-10 border-t border-white/10 bg-gradient-to-b from-transparent to-slate-900/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                  <span className="text-xl font-bold text-white">Vidya-Sathi</span>
                  <p className="text-xs text-gray-400">AI Powered Companion</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Empowering education through AI-driven early intervention and data-backed insights. Built for DTE institutions across Rajasthan to reduce dropouts and improve outcomes.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">System Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><span>Early Detection</span></li>
                <li><span>Data Integration</span></li>
                <li><span>Smart Alerts</span></li>
                <li><span>Transparent Rules</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Organization</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><span>Government of India</span></li>
                <li><span>Ministry of Education</span></li>
                <li><span>Department of School Education</span></li>
                <li><span>Department of Higher Education</span></li>
                <li><span>State Education Board</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><span>Documentation</span></li>
                <li><span>Training</span></li>
                <li><span>Contact DTE</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 flex items-center justify-center text-gray-300 text-sm">ISO 27001 Ready</div>
            <div className="glass-card p-4 flex items-center justify-center text-gray-300 text-sm">Data Privacy First</div>
            <div className="glass-card p-4 flex items-center justify-center text-gray-300 text-sm">99.9% Uptime Goal</div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Vidya-Sathi. AI-Powered Dropout Prevention System for Schools.</p>
          </div>
        </div>
      </footer>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRoleModal(false)} />
          <div className="relative w-full max-w-3xl professional-card p-6">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-white">Continue as</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button onClick={() => selectRoleAndGo('student')} className="group professional-card p-6 text-center hover:scale-[1.01] transition flex flex-col items-center justify-center h-40">
                <div className="w-12 h-12 rounded-xl success-gradient flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-semibold">Student</p>
                <p className="text-slate-300 text-sm">Use enrollment to continue</p>
              </button>
              <button onClick={() => selectRoleAndGo('counsellor')} className="group professional-card p-6 text-center hover:scale-[1.01] transition flex flex-col items-center justify-center h-40">
                <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-semibold">Counsellor</p>
                <p className="text-slate-300 text-sm">Access student insights</p>
              </button>
              <button onClick={() => selectRoleAndGo('teacher')} className="group professional-card p-6 text-center hover:scale-[1.01] transition flex flex-col items-center justify-center h-40">
                <div className="w-12 h-12 rounded-xl warning-gradient flex items-center justify-center mb-3">
                  <UserCog className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-semibold">Teacher</p>
                <p className="text-slate-300 text-sm">Manage classes & reports</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
