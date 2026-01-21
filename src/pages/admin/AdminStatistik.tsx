import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, RefreshCw, TrendingUp, Eye, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for 7 days
const data7Days = [
  { date: "15/01", aktivitas: 12 },
  { date: "16/01", aktivitas: 8 },
  { date: "17/01", aktivitas: 15 },
  { date: "18/01", aktivitas: 22 },
  { date: "19/01", aktivitas: 18 },
  { date: "20/01", aktivitas: 25 },
  { date: "21/01", aktivitas: 30 },
];

// Sample data for 30 days
const data30Days = [
  { date: "23/12", aktivitas: 0 },
  { date: "24/12", aktivitas: 2 },
  { date: "25/12", aktivitas: 1 },
  { date: "26/12", aktivitas: 0 },
  { date: "27/12", aktivitas: 3 },
  { date: "28/12", aktivitas: 2 },
  { date: "29/12", aktivitas: 1 },
  { date: "30/12", aktivitas: 4 },
  { date: "31/12", aktivitas: 5 },
  { date: "01/01", aktivitas: 2 },
  { date: "02/01", aktivitas: 3 },
  { date: "03/01", aktivitas: 1 },
  { date: "04/01", aktivitas: 2 },
  { date: "05/01", aktivitas: 0 },
  { date: "06/01", aktivitas: 1 },
  { date: "07/01", aktivitas: 2 },
  { date: "08/01", aktivitas: 3 },
  { date: "09/01", aktivitas: 2 },
  { date: "10/01", aktivitas: 1 },
  { date: "11/01", aktivitas: 0 },
  { date: "12/01", aktivitas: 2 },
  { date: "13/01", aktivitas: 4 },
  { date: "14/01", aktivitas: 3 },
  { date: "15/01", aktivitas: 5 },
  { date: "16/01", aktivitas: 6 },
  { date: "17/01", aktivitas: 8 },
  { date: "18/01", aktivitas: 12 },
  { date: "19/01", aktivitas: 15 },
  { date: "20/01", aktivitas: 22 },
  { date: "21/01", aktivitas: 28 },
];

const AdminStatistik = () => {
  const [period, setPeriod] = useState<"7days" | "30days">("30days");
  const data = period === "7days" ? data7Days : data30Days;

  const totalAktivitas = data.reduce((sum, item) => sum + item.aktivitas, 0);
  const avgPerDay = (totalAktivitas / data.length).toFixed(1);
  
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container-narrow">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Ke Website
                </Link>
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-narrow py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Statistik Aktivitas Admin
          </h1>
          <p className="text-muted-foreground">
            Analisis aktivitas admin dalam periode waktu tertentu
          </p>
        </div>

        {/* Period Toggle */}
        <div className="mb-6">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            <button
              onClick={() => setPeriod("7days")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                period === "7days"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              7 Hari Terakhir
            </button>
            <button
              onClick={() => setPeriod("30days")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                period === "30days"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              30 Hari Terakhir
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Total Aktivitas</span>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">{totalAktivitas}</p>
            <p className="text-xs text-muted-foreground mt-1">
              dalam {period === "7days" ? "7" : "30"} hari terakhir
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Rata-rata Harian</span>
              <Eye className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">{avgPerDay}</p>
            <p className="text-xs text-muted-foreground mt-1">aktivitas per hari</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Tabel Tersering</span>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">artikel</p>
            <p className="text-xs text-muted-foreground mt-1">14 perubahan</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Aktivitas Harian
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Grafik aktivitas admin per hari
          </p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="date" 
                  className="text-muted-foreground"
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="aktivitas" 
                  name="Jumlah Aktivitas"
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>Jumlah Aktivitas</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminStatistik;
