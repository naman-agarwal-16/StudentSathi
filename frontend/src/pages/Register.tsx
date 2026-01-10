import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Mail, Lock, User, ArrowRight, AlertCircle, UserCircle } from 'lucide-react';
import { UserRole } from '@/types/roles';
import SEO from '@/components/SEO';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.TEACHER);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register({ email, password, name, role });
    } catch (error: unknown) {
      const message = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : undefined;
      setErrorMessage(message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Register - StudentSathi | Create Your Education Account"
        description="Create your free StudentSathi account. Join schools and colleges across India using AI-powered student engagement and analytics platform."
        keywords="student sathi register, studentsathi signup, LMS registration, education platform signup, teacher account creation"
      />
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F8FAFC] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F172A]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] shadow-lg mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] bg-clip-text text-transparent">
            StudentSathi
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            AI-Powered Student Analytics Platform
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-800/50 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Create account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Get started with your educator dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-11 h-12 bg-white dark:bg-slate-950 border-[#94A3B8] dark:border-slate-800 focus:border-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                I am a
              </Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger className="pl-11 h-12 bg-white dark:bg-slate-950 border-[#94A3B8] dark:border-slate-800 focus:border-[#0EA5E9] focus:ring-[#0EA5E9]">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.STUDENT}>Student</SelectItem>
                    <SelectItem value={UserRole.TEACHER}>Teacher / Faculty</SelectItem>
                    <SelectItem value={UserRole.ADMIN}>Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={role === UserRole.STUDENT ? "student@school.edu" : "teacher@school.edu"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-11 h-12 bg-white dark:bg-slate-950 border-[#94A3B8] dark:border-slate-800 focus:border-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                  className="pl-11 h-12 bg-white dark:bg-slate-950 border-[#94A3B8] dark:border-slate-800 focus:border-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                  className="pl-11 h-12 bg-white dark:bg-slate-950 border-[#94A3B8] dark:border-slate-800 focus:border-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-medium shadow-lg shadow-[#0EA5E9]/25 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#0EA5E9] hover:text-[#0284c7] font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
    </>
  );
};

export default Register;
