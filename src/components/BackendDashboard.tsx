import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Github, 
  Zap, 
  Cloud, 
  BookOpen, 
  Wifi, 
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { hybridBackend } from '@/services/hybridBackend';

interface SyncStatus {
  source: string;
  status: 'syncing' | 'success' | 'error' | 'idle';
  lastSync: string;
  recordsCount?: number;
}

export const BackendDashboard = () => {
  const { toast } = useToast();
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([
    { source: 'Supabase', status: 'idle', lastSync: 'Never' },
    { source: 'Google Classroom', status: 'idle', lastSync: 'Never' },
    { source: 'Canvas', status: 'idle', lastSync: 'Never' },
    { source: 'Zapier Webhooks', status: 'idle', lastSync: 'Never' }
  ]);

  const [isGlobalSync, setIsGlobalSync] = useState(false);

  const syncAllData = async () => {
    setIsGlobalSync(true);
    
    // Update all to syncing
    setSyncStatuses(prev => prev.map(status => ({ 
      ...status, 
      status: 'syncing' as const 
    })));

    try {
      // Simulate API calls with delays
      const results = await Promise.allSettled([
        simulateSupabaseSync(),
        simulateGoogleClassroomSync(),
        simulateCanvasSync(),
        simulateZapierSync()
      ]);

      // Update statuses based on results
      setSyncStatuses(prev => prev.map((status, index) => ({
        ...status,
        status: results[index].status === 'fulfilled' ? 'success' : 'error',
        lastSync: new Date().toLocaleString(),
        recordsCount: results[index].status === 'fulfilled' 
          ? Math.floor(Math.random() * 100) + 20 
          : undefined
      })));

      const successCount = results.filter(r => r.status === 'fulfilled').length;
      
      toast({
        title: "Sync Complete",
        description: `${successCount}/${results.length} services synced successfully`,
      });

    } catch (error) {
      toast({
        title: "Sync Error",
        description: "Failed to sync some services. Check individual statuses.",
        variant: "destructive"
      });
    } finally {
      setIsGlobalSync(false);
    }
  };

  const syncIndividual = async (source: string) => {
    setSyncStatuses(prev => prev.map(status => 
      status.source === source 
        ? { ...status, status: 'syncing' }
        : status
    ));

    // Simulate individual sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSyncStatuses(prev => prev.map(status => 
      status.source === source 
        ? { 
            ...status, 
            status: 'success', 
            lastSync: new Date().toLocaleString(),
            recordsCount: Math.floor(Math.random() * 50) + 10
          }
        : status
    ));

    toast({
      title: "Sync Complete",
      description: `${source} data has been updated`,
    });
  };

  // Simulation functions
  const simulateSupabaseSync = () => 
    new Promise(resolve => setTimeout(resolve, 1500));
  
  const simulateGoogleClassroomSync = () => 
    new Promise(resolve => setTimeout(resolve, 2000));
  
  const simulateCanvasSync = () => 
    new Promise(resolve => setTimeout(resolve, 1800));
  
  const simulateZapierSync = () => 
    new Promise(resolve => setTimeout(resolve, 1000));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'syncing':
        return <RefreshCw className="w-4 h-4 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-engagement-high" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Wifi className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'syncing': return 'secondary';
      case 'success': return 'default';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Cloud className="w-7 h-7" />
            Backend Status
          </h2>
          <p className="text-muted-foreground">Monitor and sync your hybrid backend connections</p>
        </div>
        
        <Button 
          onClick={syncAllData} 
          disabled={isGlobalSync}
          className="gap-2"
        >
          {isGlobalSync ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Sync All Data
        </Button>
      </div>

      {/* Sync Progress */}
      {isGlobalSync && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              <span className="font-medium">Syncing all data sources...</span>
            </div>
            <Progress value={33} className="w-full" />
          </CardContent>
        </Card>
      )}

      {/* Service Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {syncStatuses.map((syncStatus) => (
          <Card key={syncStatus.source} className="transition-smooth hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {syncStatus.source === 'Supabase' && <Database className="w-5 h-5" />}
                  {syncStatus.source === 'Google Classroom' && <BookOpen className="w-5 h-5" />}
                  {syncStatus.source === 'Canvas' && <BookOpen className="w-5 h-5" />}
                  {syncStatus.source === 'Zapier Webhooks' && <Zap className="w-5 h-5" />}
                  {syncStatus.source}
                </CardTitle>
                <Badge variant={getStatusColor(syncStatus.status) as "default" | "secondary" | "destructive" | "outline"}>
                  {syncStatus.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Sync:</span>
                  <span>{syncStatus.lastSync}</span>
                </div>
                
                {syncStatus.recordsCount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Records:</span>
                    <span className="font-medium">{syncStatus.recordsCount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(syncStatus.status)}
                    <span className="text-sm text-muted-foreground">
                      {syncStatus.status === 'syncing' && 'Syncing...'}
                      {syncStatus.status === 'success' && 'Connected'}
                      {syncStatus.status === 'error' && 'Connection Error'}
                      {syncStatus.status === 'idle' && 'Ready to Sync'}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => syncIndividual(syncStatus.source)}
                    disabled={syncStatus.status === 'syncing' || isGlobalSync}
                  >
                    Sync
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Hybrid Backend Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary-light rounded-lg">
              <Database className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold mb-1">Real Database</h4>
              <p className="text-xs text-muted-foreground">Supabase stores actual student data</p>
            </div>
            
            <div className="text-center p-4 bg-secondary-light rounded-lg">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <h4 className="font-semibold mb-1">LMS Integration</h4>
              <p className="text-xs text-muted-foreground">Pull data from existing systems</p>
            </div>
            
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <Zap className="w-8 h-8 mx-auto mb-2 text-warning" />
              <h4 className="font-semibold mb-1">Auto Notifications</h4>
              <p className="text-xs text-muted-foreground">Zapier sends alerts automatically</p>
            </div>
            
            <div className="text-center p-4 bg-engagement-high/10 rounded-lg">
              <Github className="w-8 h-8 mx-auto mb-2 text-engagement-high" />
              <h4 className="font-semibold mb-1">Version Control</h4>
              <p className="text-xs text-muted-foreground">GitHub backup and team development</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};