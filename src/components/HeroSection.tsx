import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, AlertTriangle, BarChart3, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/30 to-secondary-light/20">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-xl text-primary">StudentSathi</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Login</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary-light text-primary border-primary/20" variant="outline">
              🚀 AI-Powered Student Engagement Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transform Student
              <span className="gradient-primary bg-clip-text text-transparent"> Engagement</span>
              <br />
              with Smart Analytics
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Empower educators with real-time insights, predictive alerts, and actionable data to identify at-risk students 
              early and improve learning outcomes for every student.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6">
                Explore Demo Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Watch Demo Video
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="transition-smooth hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-Time Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor engagement, attendance, and performance with live dashboards and insights.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-smooth hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-engagement-medium rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Early Warning System</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified when students show signs of disengagement or declining performance.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-smooth hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-engagement-high rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Student Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Deep dive into individual student profiles with comprehensive engagement metrics.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-smooth hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Advanced Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Generate detailed reports with visualizations for administrators and stakeholders.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="bg-card border rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Educators Worldwide</h2>
              <p className="text-muted-foreground">Making a real impact on student success and engagement</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Early Detection Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">25%</div>
                <div className="text-sm text-muted-foreground">Improvement in Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-warning mb-2">10k+</div>
                <div className="text-sm text-muted-foreground">Students Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-destructive mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Schools & Institutions</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Classroom?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of educators who are already using StudentSathi to improve student outcomes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6">
                Start Free Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Schedule a Demo
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Full-featured demo • Setup in minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};