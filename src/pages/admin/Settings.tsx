import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSetting, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

const AdminSettings = () => {
  const { data: donationLinkSetting, isLoading } = useSetting("donation_link");
  const updateSetting = useUpdateSetting();
  
  const [donationLink, setDonationLink] = useState("");

  useEffect(() => {
    if (donationLinkSetting) {
      setDonationLink(donationLinkSetting.value);
    }
  }, [donationLinkSetting]);

  const handleSave = () => {
    if (!donationLink.trim()) {
      return;
    }

    // Validate URL format
    try {
      new URL(donationLink);
    } catch (e) {
      alert("Link tidak valid. Pastikan format URL benar (contoh: https://sedekah.terasdakwah.com)");
      return;
    }

    updateSetting.mutate({
      key: "donation_link",
      value: donationLink.trim(),
    });
  };

  const handleReset = () => {
    setDonationLink("https://sedekah.terasdakwah.com");
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Pengaturan Website
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola pengaturan umum website Teras Dakwah
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Link Donasi
            </CardTitle>
            <CardDescription>
              Atur link tujuan untuk semua button "Donasi Sekarang" di website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-32" />
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="donation-link">Link Donasi</Label>
                  <Input
                    id="donation-link"
                    type="url"
                    placeholder="https://sedekah.terasdakwah.com"
                    value={donationLink}
                    onChange={(e) => setDonationLink(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contoh: https://sedekah.terasdakwah.com/campaign/pembangunan-masjid-teras-dakwah
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">Link Default:</p>
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    https://sedekah.terasdakwah.com
                  </code>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave}
                    disabled={updateSetting.isPending}
                  >
                    {updateSetting.isPending ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    Reset ke Default
                  </Button>
                </div>

                {donationLinkSetting && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Terakhir diupdate: {new Date(donationLinkSetting.updated_at).toLocaleString("id-ID")}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
