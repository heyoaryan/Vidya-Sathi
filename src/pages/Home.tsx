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
  Bell
} from 'lucide-react';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated, redirect to role-specific dashboard
    if (isAuthenticated && user) {
      if (user.role === 'student') {
        navigate('/app/student-dashboard');
      } else if (user.role === 'teacher') {
        navigate('/app/teacher-dashboard');
      } else if (user.role === 'admin') {
        navigate('/app/admin-dashboard');
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
    { number: '50,000+', label: 'Technical Students', icon: GraduationCap },
    { number: '85%', label: 'Early Detection Rate', icon: TrendingUp },
    { number: '200+', label: 'DTE Institutions', icon: Building2 },
    { number: '24/7', label: 'AI Monitoring', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Vidya-Sathi</h1>
                <p className="text-xs text-gray-300">AI Powered Companion</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#workflow" className="text-gray-300 hover:text-white transition-colors">Workflow</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105">
                Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
              AI Powered Companion for Education System
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 slide-in-left">
            Vidya-Sathi{' '}
            <span className="gradient-text">AI System</span>
            <br />
            <span className="text-3xl md:text-5xl text-gray-300">Dropout Prevention</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto slide-in-right leading-relaxed">
            By the time term-end marks reveal failures, many struggling students have disengaged beyond recovery. 
            Our AI system surfaces risk indicators—failing attendance, high attempts, reducing test scores—weeks earlier, 
            enabling timely intervention and reducing dropout rates across Rajasthan's technical institutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Link to="/login" className="btn-primary text-lg px-8 py-4 group whitespace-nowrap flex items-center">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={handleLearnAboutClick}
              className="btn-secondary text-lg px-8 py-4 group whitespace-nowrap flex flex-col items-center"
            >
              <BookOpen className="w-5 h-5 mb-2" />
              Learn About Vidya-Sathi
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Data-driven insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Early intervention</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Transparent algorithms</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center glass-card p-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                About <span className="gradient-text">Vidya-Sathi</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Vidya-Sathi is an AI-powered companion that helps institutions detect dropout risk early,
                take timely action, and track impact. It blends transparent rule-based thresholds with
                machine-learning insights while keeping educators in control.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-300"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Unifies attendance, assessments, and fee data into one reliable view</li>
                <li className="flex items-start text-gray-300"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Highlights at-risk students with clear color-coded signals</li>
                <li className="flex items-start text-gray-300"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Notifies mentors and guardians with recommended next steps</li>
              </ul>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-5 text-center">
                  <FileSpreadsheet className="w-7 h-7 text-white mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Easy Integration</h3>
                  <p className="text-gray-400 text-sm">Works with existing spreadsheets and systems</p>
                </div>
                <div className="glass-card p-5 text-center">
                  <Shield className="w-7 h-7 text-white mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Transparent Rules</h3>
                  <p className="text-gray-400 text-sm">Configurable thresholds you can trust</p>
                </div>
                <div className="glass-card p-5 text-center">
                  <Brain className="w-7 h-7 text-white mx-auto mb-2" />
                  <h3 className="text-white font-semibold">AI Insights</h3>
                  <p className="text-gray-400 text-sm">Patterns and trends beyond manual tracking</p>
                </div>
                <div className="glass-card p-5 text-center">
                  <Users className="w-7 h-7 text-white mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Actionable Alerts</h3>
                  <p className="text-gray-400 text-sm">Right people notified at the right time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Preview */}
      <section id="workflow" className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Workflow <span className="gradient-text">Preview</span></h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">A quick look at how Vidya-Sathi works end-to-end.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{
              icon: FileSpreadsheet, title: 'Ingest', desc: 'Attendance, tests, fees'
            }, {
              icon: Brain, title: 'Analyze', desc: 'ML + rules engine'
            }, {
              icon: AlertTriangle, title: 'Detect', desc: 'Risk scoring & colors'
            }, {
              icon: Bell, title: 'Notify', desc: 'Mentors & guardians'
            }].map((step, idx) => {
              const Icon = step.icon as any;
              return (
                <div key={idx} className="glass-card p-6 text-center hover:scale-105 transition">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/learn-about#features" className="btn-secondary text-base px-6 py-3">Explore Full Workflow</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section removed as requested */}

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose{' '}
              <span className="gradient-text">Vidya-Sathi</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A consolidated digital dashboard that automatically ingests attendance, assessment scores, and student data; 
              applies clear, rule-based thresholds to identify at-risk students; and dispatches regular notifications to mentors and guardians.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="glass-card p-6 group hover:scale-105 transition-all duration-300 bounce-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-[15px]">{feature.description}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section removed as requested */}

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white">Vidya-Sathi</span>
                  <p className="text-xs text-gray-400">AI Powered Companion</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering education through AI-driven early intervention and data-driven insights for student success.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">System Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button className="hover:text-white transition-colors text-left">Early Detection</button></li>
                <li><button className="hover:text-white transition-colors text-left">Data Integration</button></li>
                <li><button className="hover:text-white transition-colors text-left">Smart Alerts</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Organization</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button className="hover:text-white transition-colors text-left">Government of Rajasthan</button></li>
                <li><button className="hover:text-white transition-colors text-left">Directorate of Technical Education</button></li>
                <li><button className="hover:text-white transition-colors text-left">SIH 2025</button></li>
              </ul>
            </div>
            
            <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button className="hover:text-white transition-colors text-left">Documentation</button></li>
                <li><button className="hover:text-white transition-colors text-left">Training</button></li>
                <li><button className="hover:text-white transition-colors text-left">Contact DTE</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Vidya-Sathi. AI Powered Companion for Education System. Smart India Hackathon 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
