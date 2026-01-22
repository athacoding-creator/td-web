import { useState } from "react";
import { RefreshCw, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminLayout from "@/components/admin/AdminLayout";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const ACTION_COLORS: Record<string, string> = {
  LOGIN: "bg-blue-500",
  LOGOUT: "bg-gray-500",
  CREATE: "bg-green-500",
  UPDATE: "bg-amber-500",
  DELETE: "bg-red-500",
};

const AdminActivityLog = () => {
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [tableFilter, setTableFilter] = useState<string>("all");

  const { data: logs, isLoading, refetch } = useActivityLogs(
    { action: actionFilter, table_name: tableFilter },
    100
  );

  const uniqueTables = [...new Set(logs?.map((log) => log.table_name).filter(Boolean) || [])];
  const uniqueActions = [...new Set(logs?.map((log) => log.action) || [])];

  return (
    <AdminLayout title="Log Aktivitas" description="Riwayat aktivitas admin di sistem">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Log
            </CardTitle>
            <CardDescription>Filter log berdasarkan action dan tabel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Action</SelectItem>
                  {uniqueActions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={tableFilter} onValueChange={setTableFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Tabel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tabel</SelectItem>
                  {uniqueTables.map((table) => (
                    <SelectItem key={table} value={table!}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Aktivitas ({logs?.length || 0} log)</CardTitle>
            <CardDescription>Menampilkan 100 log aktivitas terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : logs?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Belum ada log aktivitas</div>
            ) : (
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Waktu</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Tabel</TableHead>
                      <TableHead>Deskripsi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs?.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(log.created_at), "dd/MM/yyyy HH:mm:ss", { locale: id })}
                        </TableCell>
                        <TableCell>{log.user_email || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            className={ACTION_COLORS[log.action] || "bg-gray-500"}
                          >
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {log.table_name ? (
                            <Badge variant="outline">{log.table_name}</Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate">
                          {log.description || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityLog;
