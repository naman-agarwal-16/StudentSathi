import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Database, 
  Github, 
  Zap, 
  Cloud, 
  BookOpen, 
  Users, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LMSConnection {
  id: string;
  platform: 'google_classroom' | 'canvas' | 'moodle' | 'teams';
  name: string;
  apiKey: string;
  baseUrl: string;
  enabled: boolean;
  status: 'connected' | 'disconnected' | 'error';
}

interface ZapierWebhook {
  id: string;
  name: string;
  url: string;
  event: 'engagement_alert' | 'attendance_low' | 'grade_drop' | 'weekly_report';
  enabled: boolean;
}

export const HybridBackendSettings = () => {
  const { toast } = useToast();
  
  // State for all integrations
  const [lmsConnections, setLmsConnections] = useState<LMSConnection[]>([
    {
      id: '1',
      platform: 'google_classroom',
      name: 'Math Class - Google Classroom',
      apiKey: '',
      baseUrl: 'https://classroom.googleapis.com/v1',
      enabled: false,
      status: 'disconnected'
    }
  ]);

  const [zapierWebhooks, setZapierWebhooks] = useState<ZapierWebhook[]>([
    {
      id: '1',
      name: 'Engagement Alerts',
      url: '',
      event: 'engagement_alert',
      enabled: false
    }
  ]);

  const [supabaseConfig, setSupabaseConfig] = useState({
    connected: false,
    url: '',
    anonKey: '',
    status: 'Not Connected'
  });

  const [githubConfig, setGithubConfig] = useState({
    connected: false,
    repository: '',
    lastSync: 'Never',
    status: 'Not Connected'
  });

  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    event: 'engagement_alert' as const
  });

  // Handlers
  const handleSupabaseConnect = () => {
    toast({
      title: "Supabase Connection",
      description: "Click the green Supabase button in the top-right to connect your database.",
    });
  };

  const handleGithubConnect = () => {
    toast({
      title: "GitHub Connection", 
      description: "Click GitHub → Connect to GitHub in the top menu to sync your code.",
    });
  };

  const testZapierWebhook = async (webhook: ZapierWebhook) => {
    if (!webhook.url) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch(webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          event: webhook.event,
          timestamp: new Date().toISOString(),
          message: "Test webhook from StudentSathi"
        }),
      });

      toast({
        title: "Webhook Test Sent",
        description: "Check your Zap's history to confirm it was triggered.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test webhook.",
        variant: "destructive",
      });
    }
  };

  const addZapierWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast({
        title: "Error",
        description: "Please fill in both name and URL fields.",
        variant: "destructive",
      });
      return;
    }

    const webhook: ZapierWebhook = {
      id: Date.now().toString(),
      ...newWebhook,
      enabled: true
    };

    setZapierWebhooks(prev => [...prev, webhook]);
    setNewWebhook({ name: '', url: '', event: 'engagement_alert' });
    
    toast({
      title: "Webhook Added",
      description: `${newWebhook.name} has been added successfully.`,
    });
  };

  const removeZapierWebhook = (id: string) => {
    setZapierWebhooks(prev => prev.filter(w => w.id !== id));
    toast({
      title: "Webhook Removed",
      description: "The webhook has been deleted.",
    });
  };

  const toggleLMSConnection = (id: string) => {
    setLmsConnections(prev => prev.map(conn => 
      conn.id === id ? { 
        ...conn, 
        enabled: !conn.enabled,
        status: !conn.enabled ? 'connected' : 'disconnected'
      } : conn
    ));
  };

  const toggleZapierWebhook = (id: string) => {
    setZapierWebhooks(prev => prev.map(webhook => 
      webhook.id === id ? { ...webhook, enabled: !webhook.enabled } : webhook
    ));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Cloud className="w-8 h-8" />
          Hybrid Backend Configuration
        </h1>
        <p className="text-muted-foreground">
          Connect multiple services to create a powerful, integrated backend for StudentSathi
        </p>
      </div>

      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <Database className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Supabase</h3>
            <Badge variant={supabaseConfig.connected ? 'default' : 'outline'}>
              {supabaseConfig.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <Github className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">GitHub</h3>
            <Badge variant={githubConfig.connected ? 'default' : 'outline'}>
              {githubConfig.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">LMS APIs</h3>
            <Badge variant={lmsConnections.some(c => c.enabled) ? 'default' : 'outline'}>
              {lmsConnections.filter(c => c.enabled).length} Connected
            </Badge>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Zapier</h3>
            <Badge variant={zapierWebhooks.some(w => w.enabled) ? 'default' : 'outline'}>
              {zapierWebhooks.filter(w => w.enabled).length} Active
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="supabase" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
          <TabsTrigger value="lms">LMS APIs</TabsTrigger>
          <TabsTrigger value="zapier">Zapier</TabsTrigger>
        </TabsList>

        {/* Supabase Tab */}
        <TabsContent value="supabase">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Supabase Database & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-semibold">Database Connection</h4>
                  <p className="text-sm text-muted-foreground">
                    Store student data, manage authentication, real-time updates
                  </p>
                </div>
                <Button onClick={handleSupabaseConnect} className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Connect Supabase
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">What you'll get:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    Real student database (replace mock data)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    Teacher authentication & user management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    Real-time notifications and updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    File storage for student documents
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GitHub Tab */}
        <TabsContent value="github">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub Version Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-semibold">Code Repository</h4>
                  <p className="text-sm text-muted-foreground">
                    Sync your code, enable team development, deploy anywhere
                  </p>
                </div>
                <Button onClick={handleGithubConnect} className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Connect GitHub
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Benefits:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    Automatic code backup and version control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    Deploy to Vercel, Netlify, or your own servers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    Team collaboration and code reviews
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-engagement-high" />
                    CI/CD pipelines with GitHub Actions
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LMS APIs Tab */}
        <TabsContent value="lms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Learning Management System APIs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect to your existing LMS platforms to pull real student data automatically.
              </p>

              {lmsConnections.map((connection) => (
                <div key={connection.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{connection.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {connection.platform.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={connection.status === 'connected' ? 'default' : 'outline'}>
                        {connection.status}
                      </Badge>
                      <Switch
                        checked={connection.enabled}
                        onCheckedChange={() => toggleLMSConnection(connection.id)}
                      />
                    </div>
                  </div>

                  {connection.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`api-key-${connection.id}`}>API Key</Label>
                        <Input
                          id={`api-key-${connection.id}`}
                          type="password"
                          placeholder="Enter your API key"
                          value={connection.apiKey}
                          onChange={(e) => {
                            setLmsConnections(prev => prev.map(conn => 
                              conn.id === connection.id 
                                ? { ...conn, apiKey: e.target.value }
                                : conn
                            ));
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`base-url-${connection.id}`}>Base URL</Label>
                        <Input
                          id={`base-url-${connection.id}`}
                          placeholder="API base URL"
                          value={connection.baseUrl}
                          onChange={(e) => {
                            setLmsConnections(prev => prev.map(conn => 
                              conn.id === connection.id 
                                ? { ...conn, baseUrl: e.target.value }
                                : conn
                            ));
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="p-4 bg-primary-light rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Supported Platforms</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <span>• Google Classroom</span>
                  <span>• Canvas LMS</span>
                  <span>• Moodle</span>
                  <span>• Microsoft Teams</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zapier Tab */}
        <TabsContent value="zapier">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Zapier Webhooks & Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Send automated notifications and trigger actions when student engagement events occur.
              </p>

              {/* Add New Webhook */}
              <div className="p-4 border rounded-lg space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Webhook
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input
                      id="webhook-name"
                      placeholder="e.g., Email Alerts"
                      value={newWebhook.name}
                      onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="webhook-event">Trigger Event</Label>
                    <Select 
                      value={newWebhook.event} 
                      onValueChange={(value: any) => setNewWebhook(prev => ({ ...prev, event: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engagement_alert">Engagement Drop</SelectItem>
                        <SelectItem value="attendance_low">Low Attendance</SelectItem>
                        <SelectItem value="grade_drop">Grade Drop</SelectItem>
                        <SelectItem value="weekly_report">Weekly Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://hooks.zapier.com/..."
                      value={newWebhook.url}
                      onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                </div>
                
                <Button onClick={addZapierWebhook} className="w-full">
                  Add Webhook
                </Button>
              </div>

              {/* Existing Webhooks */}
              <div className="space-y-4">
                <h4 className="font-semibold">Active Webhooks</h4>
                
                {zapierWebhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium">{webhook.name}</h5>
                        <p className="text-sm text-muted-foreground capitalize">
                          {webhook.event.replace('_', ' ')} trigger
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={webhook.enabled}
                          onCheckedChange={() => toggleZapierWebhook(webhook.id)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeZapierWebhook(webhook.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`url-${webhook.id}`}>Webhook URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`url-${webhook.id}`}
                          value={webhook.url}
                          onChange={(e) => {
                            setZapierWebhooks(prev => prev.map(w => 
                              w.id === webhook.id ? { ...w, url: e.target.value } : w
                            ));
                          }}
                          placeholder="https://hooks.zapier.com/..."
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => testZapierWebhook(webhook)}
                          disabled={!webhook.url}
                        >
                          Test
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {zapierWebhooks.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No webhooks configured yet. Add one above to get started.
                  </p>
                )}
              </div>

              {/* Zapier Instructions */}
              <div className="p-4 bg-warning/10 rounded-lg">
                <h4 className="font-semibold text-warning mb-2">How to create a Zapier webhook:</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Create a new Zap in Zapier</li>
                  <li>Choose "Webhooks by Zapier" as the trigger</li>
                  <li>Select "Catch Hook" and copy the webhook URL</li>
                  <li>Paste the URL above and add your desired actions (email, Slack, etc.)</li>
                  <li>Test the webhook and activate your Zap</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
