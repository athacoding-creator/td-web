import { RefreshCw, Zap, CheckCircle, XCircle, Activity, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminLayout from "@/components/admin/AdminLayout";
import { useKeepAliveLogs, useTriggerKeepAlive } from "@/hooks/useKeepAliveLogs";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const AdminKeepAlive = () => {
  const { data: logs, isLoading, refetch } = useKeepAliveLogs(50);
  const triggerMutation = useTriggerKeepAlive();

  const handleTrigger = async () => {
    try {
      await triggerMutation.mutateAsync();
      toast.success("Keep-alive ping berhasil!");
    } catch (error) {
      toast.error("Gagal melakukan keep-alive ping");
    }
  };

  const successLogs = logs?.filter((log) => log.status === "success") || [];
  const successRate = logs?.length ? ((successLogs.length / logs.length) * 100).toFixed(1) : "0";
  const lastPing = logs?.[0];

  return (
    <AdminLayout
      title="Keep-Alive Monitoring"
      description="Monitor database keep-alive status dan history"
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button
            onClick={handleTrigger}
            disabled={triggerMutation.isPending}
            className="bg-primary hover:bg-primary/90"
          >
            <Zap className="w-4 h-4 mr-2" />
            {triggerMutation.isPending ? "Processing..." : "Trigger Now"}
          </Button>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Status</CardTitle>
              {lastPing?.status === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <Badge
                variant={lastPing?.status === "success" ? "default" : "destructive"}
                className={lastPing?.status === "success" ? "bg-emerald-600 hover:bg-emerald-600" : ""}
              >
                {lastPing?.status?.toUpperCase() || "NO DATA"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                Last ping:{" "}
                {lastPing
                  ? format(new Date(lastPing.created_at), "dd MMM yyyy, HH:mm:ss", { locale: id })
                  : "Never"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate}%</div>
              <p className="text-xs text-muted-foreground">Based on last {logs?.length || 0} pings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
              <ListChecks className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Showing last 50 entries</p>
            </CardContent>
          </Card>
        </div>

        {/* Logs List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Keep-Alive Logs</CardTitle>
            <CardDescription>History of keep-alive pings to prevent database auto-pause</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : logs?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Belum ada log</div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {logs?.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {log.status === "success" ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">
                            {format(new Date(log.created_at), "dd MMM yyyy, HH:mm:ss", { locale: id })}
                          </p>
                          <p className="text-sm text-muted-foreground">{log.message}</p>
                        </div>
                      </div>
                      <Badge
                        variant={log.status === "success" ? "default" : "destructive"}
                        className={log.status === "success" ? "bg-emerald-600 hover:bg-emerald-600" : ""}
                      >
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminKeepAlive;
