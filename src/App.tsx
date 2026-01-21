import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import TentangTD from "./pages/TentangTD";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStatistik from "./pages/admin/AdminStatistik";
import {
  AdminProgram,
  AdminArtikel,
  AdminJadwal,
  AdminDokumentasi,
  AdminPengumuman,
  AdminMedia,
  AdminMonitoring,
  AdminLog,
} from "./pages/admin/AdminPlaceholders";

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
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/:id" element={<ArtikelDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/penasihat" element={<Penasihat />} />
            <Route path="/tentang" element={<TentangTD />} />
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
              path="/admin/artikel"
              element={
                <ProtectedRoute>
                  <AdminArtikel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jadwal"
              element={
                <ProtectedRoute>
                  <AdminJadwal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dokumentasi"
              element={
                <ProtectedRoute>
                  <AdminDokumentasi />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pengumuman"
              element={
                <ProtectedRoute>
                  <AdminPengumuman />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/media"
              element={
                <ProtectedRoute>
                  <AdminMedia />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/monitoring"
              element={
                <ProtectedRoute>
                  <AdminMonitoring />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/log"
              element={
                <ProtectedRoute>
                  <AdminLog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/statistik"
              element={
                <ProtectedRoute>
                  <AdminStatistik />
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
