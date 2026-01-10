import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';
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
  Lock
} from 'lucide-react';

/* --- Custom Brand Logos (Tech Stack) --- */
const OpenAILogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="currentColor" />
  </svg>
);

const NodejsLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M14.656.427c.8-.453 1.82-.455 2.6 0L29.2 7.16c.747.42 1.247 1.253 1.24 2.114v13.5c.005.897-.544 1.748-1.332 2.16l-11.88 6.702a2.6 2.6 0 0 1-2.639-.073l-3.565-2.06c-.243-.145-.516-.26-.688-.495.152-.204.422-.23.642-.32.496-.158.95-.4 1.406-.656.115-.08.256-.05.366.022l3.04 1.758c.217.125.437-.04.623-.145l11.665-6.583c.144-.07.224-.222.212-.38V9.334c.016-.18-.087-.344-.25-.417L16.19 2.244a.41.41 0 0 0-.465-.001L3.892 8.93c-.16.073-.27.235-.25.415v13.37c-.014.158.07.307.215.375l3.162 1.785c.594.32 1.323.5 1.977.265a1.5 1.5 0 0 0 .971-1.409l.003-13.29c-.014-.197.172-.36.363-.34h1.52c.2-.005.357.207.33.405L12.18 23.88c.001 1.188-.487 2.48-1.586 3.063-1.354.7-3.028.553-4.366-.12l-3.4-1.88c-.8-.4-1.337-1.264-1.332-2.16v-13.5a2.46 2.46 0 0 1 1.282-2.141L14.656.427zM18.1 9.785c1.727-.1 3.576-.066 5.13.785 1.203.652 1.87 2.02 1.892 3.358-.034.18-.222.28-.394.267-.5-.001-1.002.007-1.504-.003-.213.008-.336-.188-.363-.376-.144-.64-.493-1.273-1.095-1.582-.924-.463-1.996-.44-3.004-.43-.736.04-1.527.103-2.15.535-.48.328-.624 1-.453 1.522.16.383.603.506.964.62 2.082.544 4.287.5 6.33 1.207.845.292 1.672.86 1.962 1.745.378 1.186.213 2.604-.63 3.556-.684.784-1.68 1.2-2.675 1.442-1.323.295-2.695.302-4.038.17-1.263-.144-2.577-.476-3.552-1.336-.834-.724-1.24-1.852-1.2-2.94.01-.184.193-.312.37-.297h1.5c.202-.014.35.16.36.35.093.6.322 1.25.854 1.6 1.026.662 2.313.616 3.487.635.973-.043 2.065-.056 2.86-.7.42-.367.543-.98.43-1.508-.123-.446-.6-.653-1-.8-2.055-.65-4.285-.414-6.32-1.15-.826-.292-1.625-.844-1.942-1.693-.443-1.2-.24-2.687.693-3.607.9-.915 2.22-1.268 3.47-1.394z" fill="currentColor" />
  </svg>
);

const PrismaLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-27 0 310 310" fill="none" className={className}>
    <path d="M254.312882,235.518775 L148.000961,9.74987264 C145.309805,4.08935083 139.731924,0.359884549 133.472618,0.0359753113 C127.198908,-0.384374336 121.212054,2.71925839 117.939655,8.08838662 L2.63252565,194.847143 C-0.947129465,200.604248 -0.871814894,207.912774 2.8257217,213.594888 L59.2003287,300.896318 C63.5805009,307.626626 71.8662281,310.673635 79.5631922,308.384597 L243.161606,259.992851 C248.145475,258.535702 252.252801,254.989363 254.421072,250.271225 C256.559881,245.57581 256.523135,240.176915 254.32061,235.511047 L254.312882,235.518775 Z M230.511129,245.201761 L91.6881763,286.252058 C87.4533189,287.511696 83.388474,283.840971 84.269448,279.567474 L133.866738,42.0831633 C134.794079,37.6396542 140.929985,36.9364206 142.869673,41.0476325 L234.684164,236.021085 C235.505704,237.779423 235.515611,239.809427 234.711272,241.575701 C233.906934,243.341974 232.369115,244.667163 230.503401,245.201761 L230.511129,245.201761 Z" fill="currentColor" fillRule="nonzero" />
  </svg>
);

const ReactLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z" fill="currentColor" />
  </svg>
);

const SupabaseLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className={className}>
    <path d="m 37.41219,62.936701 c -1.634985,2.05896 -4.950068,0.93085 -4.989463,-1.69817 L 31.846665,22.786035 h 25.855406 c 4.683108,0 7.294967,5.409033 4.382927,9.07673 z" fill="currentColor" style={{ opacity: 0.6 }} />
    <path d="m 26.89694,1.0634102 c 1.634986,-2.05918508 4.950125,-0.93090008 4.989521,1.698149 L 32.138899,41.214003 H 6.607076 c -4.6832501,0 -7.29518376,-5.409032 -4.3830007,-9.07673 z" fill="currentColor" />
  </svg>
);


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
        'AI-powered early warning system helping Indian institutions improve NAAC accreditation scores and student retention with real-time analytics.'
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
      description: 'Bank-level encryption, role-based access control, and compliance with India\'s DPDP Act 2023 and global standards.',
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
    { 
      value: 'DPDP Act \'23', 
      label: 'Compliance',
      subtitle: 'Also FERPA/GDPR ready',
      icon: Shield 
    }
  ];

  /* Using the Custom Logos here for Brand Authority */
  const techStack = [
    {
      name: "React",
      icon: ReactLogo,
      description: "Modern UI for Student Portal",
      color: "text-[#0EA5E9]"
    },
    {
      name: "Node.js",
      icon: NodejsLogo,
      description: "Fast Backend Services",
      color: "text-[#0EA5E9]"
    },
    {
      name: "Prisma",
      icon: PrismaLogo,
      description: "Database ORM & Management",
      color: "text-[#0EA5E9]"
    },
    {
      name: "OpenAI",
      icon: OpenAILogo,
      description: "AI-Powered Learning Support",
      color: "text-[#0EA5E9]"
    },
    {
      name: "Supabase",
      icon: SupabaseLogo,
      description: "Authentication & Database",
      color: "text-[#0EA5E9]"
    }
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
    <>
      <SEO 
        title="StudentSathi - AI-Powered Student Engagement Platform | Best LMS India"
        description="Transform education with StudentSathi - India's leading AI-powered student engagement and analytics platform. Track attendance, predict at-risk students, boost NAAC scores. Trusted by schools and colleges. Free demo available!"
        keywords="student sathi, studentsathi, student engagement platform India, AI education platform, LMS India, learning management system, student analytics, attendance tracking, performance monitoring, early warning system, NAAC accreditation, EdTech India, school management system, college LMS, university management software"
        ogType="website"
      />
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
            <button onClick={() => navigate('/about')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              About Us
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-500 mb-6"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-900 font-semibold">100% Open Source & Free for Educational Use</span>
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
              The AI-powered early warning system helping Indian institutions improve NAAC accreditation scores and student retention.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button
                onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi', '_blank')}
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-lg"
              >
                <Star className="w-5 h-5 mr-2" />
                Star on GitHub
              </Button>
              <Button
                onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi/blob/main/README.md', '_blank')}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-[#94A3B8] text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                Read the Docs
                <ArrowRight className="w-5 h-5 ml-2" />
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
                <span>DPDP Act 2023 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>FERPA & GDPR Ready</span>
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
            <p className="text-center text-sm text-slate-500 mb-8 font-medium">Built with Modern Open Source Standards</p>
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
                className="text-center p-6 rounded-xl bg-white border border-[#94A3B8] group hover:border-[#0EA5E9] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F8FAFC] to-[#e0f2fe] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                {stat.subtitle && (
                  <div className="text-xs text-slate-500 mt-1">{stat.subtitle}</div>
                )}
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
                Ready to Deploy for Your Institution?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Self-host on your own infrastructure or contribute to the roadmap on GitHub. Free forever, no vendor lock-in.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.open('https://github.com/naman-agarwal-16/StudentSathi', '_blank')}
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-white text-[#0F172A] hover:bg-[#F8FAFC] shadow-xl"
                >
                  <Code className="w-5 h-5 mr-2" />
                  Clone Repository
                </Button>
                <Button
                  onClick={() => navigate('/demo')}
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold bg-white/10 border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Try Live Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <p className="mt-8 text-sm text-white/80">
                MIT License • Self-Hostable • No Vendor Lock-in
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
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Enterprise-grade security compliant with India's DPDP Act 2023 and global privacy standards (FERPA/GDPR).</span>
                </div>
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
    </>
  );
};

export default Landing;