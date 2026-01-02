import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { UserRole, Permission } from "./types/roles";

// Lazy load pages for optimal performance
const Landing = lazy(() => import("./pages/Landing"));
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Demo = lazy(() => import("./pages/Demo"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

// Configure QueryClient with production-ready settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.response?.status && error.response.status >= 400 && error.response.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#F8FAFC] border-t-[#0EA5E9] mx-auto mb-4"></div>
      <p className="text-slate-600 font-medium">Loading StudentSathi...</p>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public Routes - Open to everyone */}
                <Route path="/" element={<Landing />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected Routes - Teacher & Admin Dashboard */}
                <Route
                  element={
                    <ProtectedRoute 
                      allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}
                      requiredPermissions={[Permission.VIEW_STUDENTS]}
                    />
                  }
                >
                  <Route path="/dashboard" element={<Index />} />
                </Route>
                
                {/* Protected Routes - Student Dashboard */}
                <Route
                  element={
                    <ProtectedRoute 
                      allowedRoles={[UserRole.STUDENT]}
                      requiredPermissions={[Permission.VIEW_OWN_DATA]}
                    />
                  }
                >
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                </Route>
                
                {/* 404 Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
