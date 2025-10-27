import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, Shield, Database, Mail, Smartphone, Cloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HybridBackendSettings } from '@/components/HybridBackendSettings';

export const SettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Alert Settings
    emailNotifications: true,
    pushNotifications: true,
    engagementThreshold: 70,
    attendanceThreshold: 80,
    gradeDropThreshold: 15,
    
    // Class Settings
    className: 'Advanced Mathematics',
    semester: 'Spring 2024',
    timezone: 'America/New_York',
    
    // Data Settings
    dataRetention: 90,
    autoBackup: true,
    exportFrequency: 'weekly'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const resetSettings = () => {
    setSettings({
      emailNotifications: true,
      pushNotifications: true,
      engagementThreshold: 70,
      attendanceThreshold: 80,
      gradeDropThreshold: 15,
      className: 'Advanced Mathematics',
      semester: 'Spring 2024',
      timezone: 'America/New_York',
      dataRetention: 90,
      autoBackup: true,
      exportFrequency: 'weekly'
    });
    
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-muted-foreground">Configure your StudentSathi preferences and integrations</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="backend">Hybrid Backend</TabsTrigger>
          <TabsTrigger value="system">System Info</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alert Settings */}
            <Card className="transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Alert Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Types */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive browser notifications</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>
                </div>

                {/* Threshold Settings */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Engagement Alert Threshold: {settings.engagementThreshold}%
                    </Label>
                    <Slider
                      value={[settings.engagementThreshold]}
                      onValueChange={(value) => handleSettingChange('engagementThreshold', value[0])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Alert when student engagement drops below this level
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Attendance Alert Threshold: {settings.attendanceThreshold}%
                    </Label>
                    <Slider
                      value={[settings.attendanceThreshold]}
                      onValueChange={(value) => handleSettingChange('attendanceThreshold', value[0])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Alert when attendance rate falls below this level
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Grade Drop Alert: {settings.gradeDropThreshold}%
                    </Label>
                    <Slider
                      value={[settings.gradeDropThreshold]}
                      onValueChange={(value) => handleSettingChange('gradeDropThreshold', value[0])}
                      max={50}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Alert when grades drop by this percentage
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Class Settings */}
            <Card className="transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Class Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    value={settings.className}
                    onChange={(e) => handleSettingChange('className', e.target.value)}
                    placeholder="Enter class name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={settings.semester}
                    onChange={(e) => handleSettingChange('semester', e.target.value)}
                    placeholder="e.g., Spring 2024"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Connected Integrations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">Google Classroom</span>
                      <Badge variant="outline">Demo Mode</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">Canvas LMS</span>
                      <Badge variant="outline">Demo Mode</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">Moodle</span>
                      <Badge variant="outline">Demo Mode</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hybrid Backend Tab */}
        <TabsContent value="backend">
          <HybridBackendSettings />
        </TabsContent>

        {/* System Info Tab */}
        <TabsContent value="system">
          <Card className="transition-smooth hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Version</span>
                  <Badge variant="outline">v1.0.0 Demo</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Sync</span>
                  <span className="text-sm text-muted-foreground">5 minutes ago</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Status</span>
                  <Badge className="bg-engagement-high text-white">Healthy</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Storage Used</span>
                  <span className="text-sm text-muted-foreground">Demo Mode</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button variant="outline" onClick={resetSettings}>
          Reset to Defaults
        </Button>
        <Button onClick={saveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};