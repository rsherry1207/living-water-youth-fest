import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SchedulePage from "./pages/SchedulePage";
import RegisterPage from "./pages/RegisterPage";
import RegisterInfoPage from "./pages/RegisterInfoPage";
import SpeakersPage from "./pages/SpeakersPage";
import AboutConferencePage from "./pages/AboutConferencePage";
import AboutChurchesPage from "./pages/AboutChurchesPage";
import AboutMerchPage from "./pages/AboutMerchPage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/info" element={<RegisterInfoPage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/about/conference" element={<AboutConferencePage />} />
            <Route path="/about/churches" element={<AboutChurchesPage />} />
            <Route path="/about/merch" element={<AboutMerchPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
