// File: src/pages/admin/AdminMessages.tsx
// Copy file ini ke: td-web/src/pages/admin/AdminMessages.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useContactMessages, ContactMessage } from "@/hooks/useContactMessages";
import { ArrowLeft, Mail, Phone, Calendar, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { toast } from "sonner";

const AdminMessages = () => {
  const { signOut } = useAuth();
  const { data: messages, isLoading, updateStatus, updatePriority, markAsReplied } = useContactMessages();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMessages = filterStatus === "all" 
    ? messages 
    : messages.filter(m => m.status === filterStatus);

  const getStatusBadge = (status: ContactMessage["status"]) => {
    const variants = {
      new: "bg-blue-100 text-blue-700 border-blue-200",
      in_progress: "bg-yellow-100 text-yellow-700 border-yellow-200",
      replied: "bg-green-100 text-green-700 border-green-200",
      closed: "bg-gray-100 text-gray-700 border-gray-200",
    };

    const labels = {
      new: "Baru",
      in_progress: "Diproses",
      replied: "Dibalas",
      closed: "Selesai",
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: ContactMessage["priority"]) => {
    const variants = {
      low: "bg-gray-100 text-gray-700",
      medium: "bg-blue-100 text-blue-700",
      high: "bg-red-100 text-red-700",
    };

    const labels = {
      low: "Rendah",
      medium: "Sedang",
      high: "Tinggi",
    };

    return (
      <Badge variant="outline" className={variants[priority]}>
        {labels[priority]}
      </Badge>
    );
  };

  const handleStatusChange = async (id: string, status: ContactMessage["status"]) => {
    try {
      await updateStatus(id, status);
      toast.success("Status berhasil diupdate");
    } catch (error) {
      toast.error("Gagal mengupdate status");
    }
  };

  const handlePriorityChange = async (id: string, priority: ContactMessage["priority"]) => {
    try {
      await updatePriority(id, priority);
      toast.success("Prioritas berhasil diupdate");
    } catch (error) {
      toast.error("Gagal mengupdate prioritas");
    }
  };

  const handleMarkAsReplied = async (id: string) => {
    try {
      await markAsReplied(id);
      toast.success("Pesan ditandai sebagai sudah dibalas");
      setSelectedMessage(null);
    } catch (error) {
      toast.error("Gagal menandai pesan");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container-narrow">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Link>
              </Button>
              <h1 className="text-xl font-heading font-bold text-foreground">
                Pesan Kontak
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-narrow py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Pesan</p>
            <p className="text-2xl font-bold text-foreground">{messages.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Pesan Baru</p>
            <p className="text-2xl font-bold text-blue-600">
              {messages.filter(m => m.status === "new").length}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Diproses</p>
            <p className="text-2xl font-bold text-yellow-600">
              {messages.filter(m => m.status === "in_progress").length}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Selesai</p>
            <p className="text-2xl font-bold text-green-600">
              {messages.filter(m => m.status === "replied" || m.status === "closed").length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-card rounded-xl p-4 border border-border mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">Filter Status:</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="new">Baru</SelectItem>
                <SelectItem value="in_progress">Diproses</SelectItem>
                <SelectItem value="replied">Dibalas</SelectItem>
                <SelectItem value="closed">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              Tidak ada pesan
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioritas</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(message.created_at), "dd MMM yyyy HH:mm", { locale: localeId })}
                    </TableCell>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell className="text-sm">{message.email}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell>{getPriorityBadge(message.priority)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                      >
                        Lihat Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pesan</DialogTitle>
            <DialogDescription>
              Pesan dari {selectedMessage?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telepon</p>
                      <p className="font-medium">{selectedMessage.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tanggal</p>
                    <p className="font-medium">
                      {format(new Date(selectedMessage.created_at), "dd MMMM yyyy, HH:mm", { locale: localeId })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Pesan:</p>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Status & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                  <Select
                    value={selectedMessage.status}
                    onValueChange={(value) => handleStatusChange(selectedMessage.id, value as ContactMessage["status"])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Baru</SelectItem>
                      <SelectItem value="in_progress">Diproses</SelectItem>
                      <SelectItem value="replied">Dibalas</SelectItem>
                      <SelectItem value="closed">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Prioritas</label>
                  <Select
                    value={selectedMessage.priority}
                    onValueChange={(value) => handlePriorityChange(selectedMessage.id, value as ContactMessage["priority"])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: Pesan Anda ke Teras Dakwah`;
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Balas via Email
                </Button>
                {selectedMessage.status !== "replied" && (
                  <Button
                    variant="outline"
                    onClick={() => handleMarkAsReplied(selectedMessage.id)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Tandai Sudah Dibalas
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
