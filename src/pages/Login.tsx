import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Eye, EyeOff, Shield, Users, UserCog } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState<'counsellor' | 'student' | 'teacher'>('counsellor');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      if (selectedRole === 'student') {
        // Mock: accept any non-empty college + enrollment and sign in as demo student
        if (!collegeName || !enrollmentNumber) {
          toast.error('Please enter college name and enrollment number');
          setIsLoading(false);
          return;
        }
        success = await login('student@vidhyarti.com', 'student123');
      } else {
        if (!collegeName) {
          toast.error('Please enter your college name');
          setIsLoading(false);
          return;
        }
        success = await login(email, password);
      }
      if (success) {
        toast.success('Login successful!');
        // Redirect based on user role
        if (user?.role === 'student') {
          navigate('/app/student-dashboard');
        } else if (user?.role === 'teacher') {
          navigate('/app/teacher-dashboard');
        } else if (user?.role === 'counsellor') {
          navigate('/app/counsellor-dashboard');
        } else {
          navigate('/app/dashboard');
        }
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Counsellor', email: 'counsellor@vidhyarti.com', password: 'counsellor123' },
    { role: 'Student', email: 'student@vidhyarti.com', password: 'student123' },
    { role: 'Teacher', email: 'teacher@vidhyarti.com', password: 'teacher123' }
  ];

  const handleRolePrefill = (role: string) => {
    const key = role.toLowerCase() as 'counsellor' | 'student' | 'teacher';
    setSelectedRole(key);
    setCollegeName('Government Polytechnic College');
    if (key === 'student') {
      setEnrollmentNumber('2024XXXX');
      setEmail('');
      setPassword('');
    } else {
      const cred = demoCredentials.find((c) => c.role.toLowerCase() === role.toLowerCase());
      if (cred) {
        setEmail(cred.email);
        setPassword(cred.password);
      }
      setEnrollmentNumber('');
    }
  };

  // Prefill role via query param: /login?role=student|teacher|counsellor
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get('role');
    if (role && ['student', 'teacher', 'counsellor'].includes(role)) {
      handleRolePrefill(role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-4 shadow-lg">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Vidya-Sathi</h1>
          <p className="text-slate-300">AI-powered Student Success Platform</p>
        </div>

        {/* Login Form */}
        <div className="professional-card p-8">
          <h2 className="text-2xl font-semibold text-white mb-1 text-center">Welcome Back</h2>
          <p className="text-center text-sm text-slate-400 mb-4">Sign in as <span className="font-medium text-blue-400 capitalize">{selectedRole}</span></p>

          {/* Role Indicator only (cards removed as role is chosen on home) */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              {selectedRole === 'student' ? <Users className="w-5 h-5 text-white" /> : selectedRole === 'teacher' ? <UserCog className="w-5 h-5 text-white" /> : <Shield className="w-5 h-5 text-white" />}
            </div>
            <span className="text-slate-300 text-sm">Selected: <span className="text-white font-medium capitalize">{selectedRole}</span></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* College field for all */}
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-slate-200 mb-2">
                College Name
              </label>
              <input
                id="college"
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="input-field"
                placeholder="Enter your college name"
                required
              />
            </div>

            {/* Student specific fields */}
            {selectedRole === 'student' ? (
              <div>
                <label htmlFor="enrollment" className="block text-sm font-medium text-slate-200 mb-2">
                  Enrollment Number
                </label>
                <input
                  id="enrollment"
                  type="text"
                  value={enrollmentNumber}
                  onChange={(e) => setEnrollmentNumber(e.target.value)}
                  className="input-field"
                  placeholder="Enter your enrollment number"
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-slate-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : selectedRole === 'student' ? 'Continue as Student' : selectedRole === 'teacher' ? 'Sign In as Teacher' : 'Sign In as Counsellor'}
            </button>
          </form>
          
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-400">
            Empowering education through AI-driven insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
