import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, AlertTriangle, BookOpen, ArrowLeft, Sparkles, GraduationCap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import SEO from '@/components/SEO';

const DemoPage = () => {
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = 'Demo - StudentSathi';
  }, []);

  const weeklyData = [
    { week: 'Week 1', engagement: 78, attendance: 85 },
    { week: 'Week 2', engagement: 76, attendance: 82 },
    { week: 'Week 3', engagement: 73, attendance: 84 },
    { week: 'Week 4', engagement: 74, attendance: 84 },
  ];

  return (
    <>
      <SEO 
        title="Live Demo - StudentSathi | Try Our Student Engagement Platform"
        description="Experience StudentSathi's powerful features with our interactive demo. See real-time analytics, AI-powered alerts, and comprehensive student tracking in action. No signup required!"
        keywords="student sathi demo, studentsathi demo, LMS demo, student engagement demo, education platform demo, free LMS trial"
      />
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#F8FAFC]">
        <div className="relative z-10">
          {/* Header */}
          <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl border-b border-[#94A3B8] sticky top-0 z-50 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] bg-clip-text text-transparent">
                  StudentSathi Demo
                </h1>
                <p className="text-xs text-slate-600">Live Analytics Preview</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/register')}
              className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white shadow-lg shadow-[#0EA5E9]/25 border-0"
            >
              Get Started
            </Button>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Hero Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0EA5E9]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMTAgMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
            
            <div className="relative p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome to StudentSathi Demo
              </h2>
              <p className="text-lg text-white/90 mb-6 max-w-2xl">
                Experience real-time student engagement analytics, predictive alerts, and comprehensive performance tracking.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="bg-white text-[#0EA5E9] hover:bg-[#F8FAFC] shadow-xl px-8 py-6 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Free Account
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Total Students', value: '1,234', subtitle: '985 active today', icon: Users, color: 'from-[#0F172A] to-[#0EA5E9]' },
              { title: 'Avg Engagement', value: '82%', progress: 82, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
              { title: 'Attendance Rate', value: '94%', progress: 94, icon: BookOpen, color: 'from-[#0EA5E9] to-[#94A3B8]' },
              { title: 'Active Alerts', value: '15', subtitle: 'Require attention', icon: AlertTriangle, color: 'from-orange-500 to-red-500' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white border-slate-200 hover:shadow-lg transition-all group">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-700">{metric.title}</CardTitle>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <metric.icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                      {metric.value}
                    </div>
                    {metric.progress && <Progress value={metric.progress} className="mt-2" />}
                    {metric.subtitle && (
                      <p className="text-xs text-slate-500 mt-1">
                        {metric.subtitle}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Weekly Engagement Trends</CardTitle>
                <p className="text-sm text-slate-600">Track student engagement and attendance over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                    <XAxis 
                      dataKey="week" 
                      className="text-xs"
                      stroke="#64748b"
                    />
                    <YAxis className="text-xs" stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#engagementGradient)" 
                      name="Engagement %"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#attendanceGradient)" 
                      name="Attendance %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] border-0 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMTAgMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
              <CardContent className="relative p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to unlock the full experience?
                </h3>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Create your free account to access advanced analytics, custom reports, and AI-powered insights.
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="bg-white text-[#0EA5E9] hover:bg-[#F8FAFC] px-8 py-6 text-lg font-semibold shadow-xl group"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DemoPage;
