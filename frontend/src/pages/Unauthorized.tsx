import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/roles';

export const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    if (user?.role === UserRole.STUDENT) {
      navigate('/student/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F8FAFC] via-slate-50 to-slate-100">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <ShieldOff className="w-10 h-10 text-red-500" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-slate-700 font-medium">
              You don't have permission to access this page
            </p>
            <p className="text-sm text-slate-500">
              Your current role: <span className="font-semibold text-[#0EA5E9]">{user?.role}</span>
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Button 
              onClick={handleGoBack} 
              className="w-full bg-[#0EA5E9] hover:bg-[#0284c7]"
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => logout()} 
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400">
              Need different access? Contact your administrator
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
