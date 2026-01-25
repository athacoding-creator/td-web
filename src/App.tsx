import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import Program from "./pages/Program";
import Campaign from "./pages/Campaign";
import Artikel from "./pages/Artikel";
import ArtikelDetail from "./pages/ArtikelDetail";
import Contact from "./pages/Contact";
import ProfilTD from "./pages/ProfilTD";
import Penasihat from "./pages/Penasihat";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProgram from "./pages/admin/AdminProgram";
import AdminCampaign from "./pages/admin/AdminCampaign";
import AdminArtikel from "./pages/admin/AdminArtikel";
import AdminProfil from "./pages/admin/AdminProfil";
import AdminStats from "./pages/admin/AdminStats";
import AdminKeepAlive from "./pages/admin/AdminKeepAlive";
import AdminActivityLog from "./pages/admin/AdminActivityLog";
import AdminMessages from "./pages/admin/AdminMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/program" element={<Program />} />
            <Route path="/program/:slug" element={<Program />} />
            <Route path="/about" element={<ProfilTD />} />
            <Route path="/tentang" element={<Navigate to="/about" replace />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/:id" element={<ArtikelDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/penasihat" element={<Penasihat />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes (Protected) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/program"
              element={
                <ProtectedRoute>
                  <AdminProgram />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/campaign"
              element={
                <ProtectedRoute>
                  <AdminCampaign />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/artikel"
              element={
                <ProtectedRoute>
                  <AdminArtikel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profil"
              element={
                <ProtectedRoute>
                  <AdminProfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/stats"
              element={
                <ProtectedRoute>
                  <AdminStats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/keep-alive"
              element={
                <ProtectedRoute>
                  <AdminKeepAlive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activity-log"
              element={
                <ProtectedRoute>
                  <AdminActivityLog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute>
                  <AdminMessages />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;