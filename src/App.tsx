import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Registration from "./pages/Registration";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { MadeWithDyad } from "./components/made-with-dyad";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/stats" element={
                    <ProtectedRoute>
                      <Stats />
                    </ProtectedRoute>
                  } />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/auth" element={<Auth />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <MadeWithDyad />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;