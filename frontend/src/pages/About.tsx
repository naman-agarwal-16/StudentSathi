import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Target, 
  Award,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: 'Student Success First',
      description: 'Every feature is designed to improve student outcomes and educational experiences.'
    },
    {
      icon: Shield,
      title: 'Data Privacy & Security',
      description: 'Bank-level encryption and compliance with DPDP Act 2023, FERPA, and GDPR standards.'
    },
    {
      icon: Users,
      title: 'Empowering Educators',
      description: 'Providing teachers with tools to identify at-risk students and intervene early.'
    },
    {
      icon: Zap,
      title: 'Innovation in EdTech',
      description: 'Leveraging AI and modern technology to transform traditional education.'
    }
  ];

  const milestones = [
    { year: '2024', title: 'Platform Launch', description: 'StudentSathi goes live with core features' },
    { year: '2024', title: 'AI Integration', description: 'OpenAI-powered predictive analytics added' },
    { year: '2025', title: 'Growing Adoption', description: 'Trusted by educational institutions across India' },
    { year: '2026', title: 'Expansion', description: 'New features and enhanced capabilities' }
  ];

  return (
    <>
      <SEO 
        title="About StudentSathi - AI-Powered Student Engagement Platform | Our Mission"
        description="Learn about StudentSathi's mission to transform education through AI-powered analytics. Discover how we help schools and colleges improve student engagement, reduce dropout rates, and boost NAAC scores."
        keywords="about student sathi, studentsathi company, education technology India, EdTech platform, student engagement mission, AI education, NAAC accreditation"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">StudentSathi</h1>
            </div>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Transforming Education Through AI-Powered Student Engagement & Analytics
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-12 border-2 border-blue-100">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    StudentSathi exists to bridge the gap between educational institutions and student success. 
                    We believe that every student deserves personalized attention, and every educator should have 
                    the tools to identify and support at-risk students before it's too late. Our AI-powered platform 
                    provides real-time insights, predictive analytics, and actionable recommendations to improve 
                    student engagement, reduce dropout rates, and enhance learning outcomes across India.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What We Do */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Analytics</h3>
                  <p className="text-slate-600">
                    Track student engagement, attendance, and academic performance in real-time with 
                    comprehensive dashboards and automated reporting.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <Award className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">NAAC Accreditation Support</h3>
                  <p className="text-slate-600">
                    Help institutions improve their NAAC scores with documented student engagement metrics, 
                    attendance records, and outcome tracking.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <Zap className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Predictions</h3>
                  <p className="text-slate-600">
                    Leverage machine learning to identify at-risk students early and receive personalized 
                    intervention recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <Shield className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
                  <p className="text-slate-600">
                    Bank-level encryption, role-based access control, and compliance with India's DPDP Act 2023 
                    and international standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-2 border-slate-200 text-center">
                  <CardContent className="p-6">
                    <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                      <value.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Journey</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="border-2 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Institution?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join schools and colleges across India using StudentSathi to improve student success
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/demo')}
                  className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg"
                >
                  Try Live Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Get Started Free
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="bg-slate-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400">
              © 2026 StudentSathi. Open Source Project. MIT License.
            </p>
            <div className="flex gap-6 justify-center mt-4">
              <a href="https://github.com/naman-agarwal-16/StudentSathi" target="_blank" rel="noopener noreferrer" 
                 className="text-slate-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="/security.txt" target="_blank" rel="noopener noreferrer"
                 className="text-slate-400 hover:text-white transition-colors">
                Security
              </a>
              <a href="/humans.txt" target="_blank" rel="noopener noreferrer"
                 className="text-slate-400 hover:text-white transition-colors">
                Credits
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
