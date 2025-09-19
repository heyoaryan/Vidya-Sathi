import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Users,
  Brain
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavigation = () => {
    if (user?.role === 'student') {
      return [
        { name: 'Dashboard', href: '/app/student-dashboard', icon: Home },
        { name: 'AI Report', href: '/app/ai-report', icon: BarChart3 },
        { name: 'Settings', href: '/app/settings', icon: Settings },
      ];
    } else if (user?.role === 'teacher') {
      return [
        { name: 'Dashboard', href: '/app/teacher-dashboard', icon: Home },
        { name: 'Students', href: '/app/students', icon: Users },
        { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/app/settings', icon: Settings },
      ];
    } else if (user?.role === 'counsellor') {
      return [
        { name: 'Dashboard', href: '/app/counsellor-dashboard', icon: Home },
        { name: 'Students', href: '/app/students', icon: Users },
        { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/app/settings', icon: Settings },
      ];
    }
    
    // Default navigation
    return [
      { name: 'Dashboard', href: '/app/dashboard', icon: Home },
      { name: 'Students', href: '/app/students', icon: Users },
      { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
      { name: 'Settings', href: '/app/settings', icon: Settings },
    ];
  };

  const navigation = getNavigation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // When authenticated, logo goes to role-specific dashboard
    if (user?.role === 'student') {
      navigate('/app/student-dashboard');
    } else if (user?.role === 'teacher') {
      navigate('/app/teacher-dashboard');
    } else if (user?.role === 'counsellor') {
      navigate('/app/counsellor-dashboard');
    } else {
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/10 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  Vidya-Sathi
                </h1>
                <p className="text-xs text-gray-300">AI Powered Companion</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    {isActive(item.href) && (
                      <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">{user?.name || 'Student'}</p>
                  <p className="text-slate-200 text-xs capitalize">{user?.role || 'Student'} User</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
        isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        <div className={`fixed right-0 top-0 h-full w-80 bg-white/10 backdrop-blur-md border-l border-white/20 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 px-6 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-white bg-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-6 border-t border-white/20">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl px-4 py-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{user?.name || 'Student'}</p>
                  <p className="text-gray-300 text-sm">{user?.role || 'Student'} User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
