import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Bell, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight,
  Award,
  Target,
  Building2,
  Code,
  Database,
  Server,
  Brain,
  Lock
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Set page title and meta description
  useEffect(() => {
    document.title = 'StudentSathi - AI-Powered Early Warning System';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'AI-powered early warning system that helps institutions identify at-risk students 3x faster through real-time engagement analytics.'
      );
    }
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive real-time insights into student engagement, attendance patterns, and academic performance metrics.',
      color: 'from-[#0F172A] to-[#1E293B]'
    },
    {
      icon: Bell,
      title: 'Predictive Alert System',
      description: 'AI-powered early warning system identifies at-risk students and recommends targeted interventions.',
      color: 'from-[#0EA5E9] to-[#0284c7]'
    },
    {
      icon: Users,
      title: 'Student Success Management',
      description: 'Holistic student profiles with detailed analytics, intervention tracking, and progress monitoring.',
      color: 'from-[#0F172A] to-[#1E293B]'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, role-based access control, and full FERPA/GDPR compliance for data protection.',
      color: 'from-[#0EA5E9] to-[#0284c7]'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Built on modern infrastructure for lightning-fast load times and seamless real-time data synchronization.',
      color: 'from-[#0F172A] to-[#1E293B]'
    },
    {
      icon: TrendingUp,
      title: 'Outcome Analytics',
      description: 'Track institutional KPIs, retention rates, and student success metrics with actionable intelligence.',
      color: 'from-[#0EA5E9] to-[#0284c7]'
    }
  ];

  const stats = [
    { value: '< 100ms', label: 'Data Latency', icon: Zap },
    { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
    { value: 'AES-256', label: 'Security', icon: Lock },
    { value: 'FERPA Ready', label: 'Compliance', icon: Shield }
  ];

  const techStack = [
    { name: 'React', icon: Code },
    { name: 'Node.js', icon: Server },
    { name: 'Supabase', icon: Database },
    { name: 'Prisma', icon: Database },
    { name: 'OpenAI', icon: Brain }
  ];

  const useCases = [
    { 
      role: 'For Deans', 
      description: 'Monitor aggregate attendance trends and retention rates across all departments in real-time.',
      icon: Building2 
    },
    { 
      role: 'For Professors', 
      description: 'Receive automated alerts when a student misses 3 consecutive classes or fails a quiz.',
      icon: Bell 
    },
    { 
      role: 'For Students', 
      description: 'Track your own academic health score and get personalized predictions for final grades.',
      icon: Users 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#94A3B8]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1E293B]">StudentSathi</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/demo')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Platform Demo
            </button>
            <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Solutions
            </button>
            <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Pricing
            </button>
            <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Resources
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')} className="text-slate-700 hover:text-[#1E293B]">
              Sign In
            </Button>
            <Button onClick={() => navigate('/register')} className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white">
              Get Started
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#94A3B8] mb-6"
            >
              <Award className="w-4 h-4 text-[#0EA5E9]" />
              <span className="text-sm text-[#0F172A] font-medium">AI-Powered Early Warning System</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#1E293B] leading-tight"
            >
              Stop Student Dropouts
              <span className="block mt-2 bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] bg-clip-text text-transparent">
                Before They Happen
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
            >
              The AI-powered early warning system that helps institutions identify at-risk students 3x faster through real-time engagement analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button
                onClick={() => navigate('/demo')}
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-[#0EA5E9] hover:bg-[#0284c7] text-white shadow-lg shadow-[#0EA5E9]/20"
              >
                Try Live Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi', '_blank')}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-[#94A3B8] text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                View Architecture
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>FERPA & GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Enterprise SSO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>99.9% Uptime SLA</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20"
          >
            <p className="text-center text-sm text-slate-500 mb-8 font-medium">Powered by Modern Enterprise Tech</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                >
                  <tech.icon className="w-8 h-8 text-[#0EA5E9]" />
                  <span className="text-sm font-semibold text-slate-700">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white border border-[#94A3B8]"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F8FAFC] to-[#e0f2fe] flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#94A3B8] mb-4">
                <Target className="w-4 h-4 text-[#0EA5E9]" />
                <span className="text-sm text-[#0F172A] font-medium">Platform Capabilities</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1E293B]">
                Enterprise-Grade Features
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Comprehensive tools designed to scale with your institution's needs, backed by industry-leading security and support.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card className="h-full bg-white border-[#94A3B8] hover:shadow-2xl hover:border-[#0EA5E9] transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Use Cases Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#94A3B8] mb-4">
                <Users className="w-4 h-4 text-[#0EA5E9]" />
                <span className="text-sm text-[#0F172A] font-medium">Platform Use Cases</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1E293B]">
                Built for Every Stakeholder
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tailored experiences for administrators, educators, and students with role-specific insights.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-[#F8FAFC] border border-[#94A3B8] hover:shadow-xl transition-all">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#0284c7] flex items-center justify-center mb-6">
                        <useCase.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1E293B] mb-4">
                        {useCase.role}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {useCase.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0EA5E9]"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTI2IDI0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAxMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTEwIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              
              <div className="relative p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to Transform Student Success?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join leading institutions using StudentSathi to improve retention rates and student outcomes with data-driven insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/register')}
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold bg-white text-[#0EA5E9] hover:bg-[#F8FAFC] shadow-xl"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => navigate('/demo')}
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg font-semibold bg-white/10 border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    Explore Platform
                  </Button>
                </div>
                <p className="mt-8 text-sm text-white/80">
                  Open Source • MIT License • Community Supported
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-[#94A3B8] bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-[#1E293B]">StudentSathi</span>
                </div>
                <p className="text-slate-600 mb-6 max-w-sm leading-relaxed">
                  Open-source student engagement analytics platform built with modern enterprise technologies.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>FERPA & GDPR Compliant</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-[#1E293B] font-bold mb-4 text-sm uppercase tracking-wide">Platform</h3>
                <div className="space-y-3">
                  <button onClick={() => navigate('/demo')} className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    Demo
                  </button>
                  <button className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    Features
                  </button>
                  <button className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    Pricing
                  </button>
                  <button className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    Security
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wide">Resources</h3>
                <div className="space-y-3">
                  <button onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi', '_blank')} className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    GitHub
                  </button>
                  <button onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi/blob/main/README.md', '_blank')} className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    Documentation
                  </button>
                  <button onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi/blob/main/CONTRIBUTING.md', '_blank')} className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    Contributing
                  </button>
                  <button onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi/issues', '_blank')} className="block text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm">
                    Support
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wide">Connect</h3>
                <div className="space-y-3 text-slate-600 text-sm">
                  <p>Open Source Project</p>
                  <p className="mt-4 font-semibold text-slate-900">MIT License</p>
                  <p>Community Supported</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#94A3B8] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-sm">
                © 2025 StudentSathi. Open Source Project.
              </p>
              <div className="flex gap-6">
                <a href="https://github.com/naman-agarwal-16/StudentSathi/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm font-medium">MIT License</a>
                <a href="https://github.com/naman-agarwal-16/StudentSathi/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm font-medium">Code of Conduct</a>
                <a href="https://github.com/naman-agarwal-16/StudentSathi/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#0EA5E9] transition-colors text-sm font-medium">Security</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default Landing;