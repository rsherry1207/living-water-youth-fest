import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SchedulePage from "./pages/SchedulePage";
import RegisterPage from "./pages/RegisterPage";
import RegisterInfoPage from "./pages/RegisterInfoPage";
import RegisterGooglePage from "./pages/RegisterGooglePage";
import SpeakersPage from "./pages/SpeakersPage";
import AboutConferencePage from "./pages/AboutConferencePage";
import MeetTheBoardPage from "./pages/MeetTheBoardPage";
import AboutMerchPage from "./pages/AboutMerchPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/info" element={<RegisterInfoPage />} />
          <Route path="/register-google" element={<RegisterGooglePage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/about/conference" element={<AboutConferencePage />} />
          <Route path="/about/board" element={<MeetTheBoardPage />} />
          <Route path="/about/merch" element={<AboutMerchPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
