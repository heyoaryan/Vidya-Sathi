import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  GraduationCap,
  AlertTriangle,
  FileSpreadsheet,
  Bell,
  Target,
  Brain,
  Users,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  Play,
  BookOpen,
  Building2,
  TrendingUp,
  Award,
  Zap,
  Eye,
  Database,
  Cpu,
  MessageSquare,
  Clock,
  Star
} from 'lucide-react';

const LearnAboutVidyaSathi: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const workflowSteps = [
    {
      icon: FileSpreadsheet,
      title: 'Data Collection',
      description: 'Automatically ingests attendance, test scores, and fee-payment data from multiple sources',
      color: 'from-blue-500 to-cyan-600',
      details: ['Attendance tracking', 'Assessment results', 'Payment records', 'Academic history']
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Advanced machine learning algorithms analyze patterns and identify risk indicators',
      color: 'from-purple-500 to-pink-600',
      details: ['Pattern recognition', 'Risk scoring', 'Trend analysis', 'Predictive modeling']
    },
    {
      icon: AlertTriangle,
      title: 'Early Detection',
      description: 'Identifies at-risk students weeks before term-end results with color-coded alerts',
      color: 'from-red-500 to-orange-600',
      details: ['Risk indicators', 'Early warnings', 'Color coding', 'Threshold alerts']
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Automated alerts sent to mentors, teachers, and guardians for timely intervention',
      color: 'from-green-500 to-emerald-600',
      details: ['Mentor alerts', 'Guardian notifications', 'Teacher updates', 'Intervention plans']
    }
  ];

  const features = [
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: '24/7 continuous monitoring of student data with instant updates',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Seamlessly merges multiple data sources into unified dashboard',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Cpu,
      title: 'AI-Powered Insights',
      description: 'Advanced algorithms provide actionable insights and recommendations',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: MessageSquare,
      title: 'Communication Hub',
      description: 'Facilitates communication between students, teachers, and parents',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Clock,
      title: 'Timely Interventions',
      description: 'Enables early intervention strategies to prevent student dropouts',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Star,
      title: 'Success Tracking',
      description: 'Tracks intervention effectiveness and student success metrics',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const stats = [
    { number: '85%', label: 'Early Detection Rate', icon: TrendingUp },
    { number: '60%', label: 'Reduction in Dropouts', icon: Shield },
    { number: '200+', label: 'Institutions Served', icon: Building2 },
    { number: '50K+', label: 'Students Monitored', icon: Users }
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
          <Link to="/" className="flex items-center space-x-3 group">
            <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
            <span className="text-white font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Vidya-Sathi</h1>
              <p className="text-xs text-gray-300">AI Powered Companion</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learn About{' '}
              <span className="gradient-text">Vidya-Sathi</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our AI-powered system transforms education through early intervention, 
              data-driven insights, and personalized support for every student's success.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How{' '}
              <span className="gradient-text">Vidya-Sathi</span>{' '}
              Works
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our comprehensive workflow ensures no student falls through the cracks. 
              Here's how we identify and support at-risk students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <div 
                  key={index}
                  className={`glass-card p-6 transition-all duration-500 ${
                    isActive ? 'scale-105 shadow-2xl' : 'scale-100'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    isActive ? 'animate-pulse' : ''
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-300 text-sm text-center mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-400">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Workflow Connection Lines */}
          <div className="hidden lg:block mt-8">
            <div className="flex justify-center items-center space-x-4">
              {workflowSteps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    activeStep >= index ? 'bg-orange-500' : 'bg-gray-600'
                  }`}></div>
                  {index < workflowSteps.length - 1 && (
                    <div className={`w-16 h-0.5 transition-all duration-500 ${
                      activeStep > index ? 'bg-orange-500' : 'bg-gray-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Key{' '}
              <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools and features designed to support every aspect of student success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="glass-card p-6 group hover:scale-105 transition-all duration-300 bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our{' '}
              <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Real results from institutions using Vidya-Sathi across Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
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

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your{' '}
              <span className="gradient-text">Institution</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the growing number of educational institutions using Vidya-Sathi 
              to improve student outcomes and reduce dropout rates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/login" className="btn-primary text-lg px-8 py-4">
                Get Started Today
              </Link>
              <Link to="/" className="btn-secondary text-lg px-8 py-4">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Vidya-Sathi</span>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2025 Vidya-Sathi. AI Powered Companion for Education System. Smart India Hackathon 2025.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LearnAboutVidyaSathi;
