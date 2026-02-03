import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Users, TrendingUp } from "lucide-react";
import { differenceInDays } from "date-fns";
import { useState } from "react";

const CampaignPage = () => {
  const { data: campaigns, isLoading, error } = useCampaigns();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (collected: number, target: number | null) => {
    if (!target || target === 0) return 0;
    return Math.min((collected / target) * 100, 100);
  };

  const getDaysRemaining = (endDate: string | null) => {
    if (!endDate) return null;
    const days = differenceInDays(new Date(endDate), new Date());
    return days > 0 ? days : 0;
  };

  const getStatusBadge = (campaign: any) => {
    const daysRemaining = getDaysRemaining(campaign.end_date);
    
    if (daysRemaining === 0) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
          Selesai
        </span>
      );
    }
    
    if (daysRemaining && daysRemaining <= 7) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
          Segera Berakhir
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
        Aktif
      </span>
    );
  };

  const handleCardClick = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero - Compact */}
          <section className="py-8 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="px-4 text-center">
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                Campaign Dakwah
              </h1>
              <p className="text-sm text-muted-foreground">
                Bergabunglah dalam berbagai campaign kebaikan
              </p>
            </div>
          </section>

          {/* Campaign List */}
          <section className="py-6 px-4 bg-background">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-xl" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-muted-foreground py-8 text-sm">
                Gagal memuat campaign. Silakan coba lagi nanti.
              </div>
            ) : campaigns && campaigns.length > 0 ? (
              <div className="space-y-4">
                {campaigns.map((campaign) => {
                  const progress = calculateProgress(
                    campaign.collected_amount,
                    campaign.target_amount
                  );
                  const daysRemaining = getDaysRemaining(campaign.end_date);

                  return (
                    <div
                      key={campaign.id}
                      onClick={() => handleCardClick(campaign)}
                      className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    >
                      {/* Image */}
                      {campaign.image_url && (
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={campaign.image_url}
                            alt={campaign.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            {getStatusBadge(campaign)}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        {/* Title */}
                        <h3 className="font-heading font-semibold text-base mb-2 text-foreground line-clamp-2">
                          {campaign.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {campaign.description}
                        </p>

                        {/* Progress Section */}
                        {campaign.target_amount && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs text-muted-foreground">
                                Terkumpul
                              </span>
                              <span className="text-xs font-semibold text-primary">
                                {progress.toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-1.5 mb-2" />
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-bold text-foreground">
                                {formatCurrency(campaign.collected_amount)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                dari {formatCurrency(campaign.target_amount)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">{campaign.donor_count}</span> donatur
                            </span>
                          </div>
                          {daysRemaining !== null && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-orange-600" />
                              <span className="text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">{daysRemaining}</span> hari lagi
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8 text-sm">
                Belum ada campaign yang tersedia.
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="py-8 px-4 bg-gradient-to-r from-green-600 to-green-500">
            <div className="text-center">
              <h2 className="text-lg font-heading font-bold text-white mb-2">
                Ingin Mendukung Campaign?
              </h2>
              <p className="text-white/90 text-sm mb-4">
                Hubungi kami untuk informasi lebih lanjut
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-green-700 hover:bg-gray-100 font-semibold"
                onClick={() => window.location.href = "/contact"}
              >
                Hubungi Kami
              </Button>
            </div>
          </section>
        </main>
        <Footer />

        {/* Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto mx-4 rounded-xl">
            {selectedCampaign && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-lg font-heading font-bold pr-6 leading-tight">
                    {selectedCampaign.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Image */}
                {selectedCampaign.image_url && (
                  <div className="relative rounded-lg overflow-hidden bg-muted -mt-2">
                    <img
                      src={selectedCampaign.image_url}
                      alt={selectedCampaign.title}
                      className="w-full h-auto max-h-[300px] object-contain"
                    />
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(selectedCampaign)}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm mb-1.5">Tentang Campaign</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                      {selectedCampaign.description}
                    </p>
                  </div>

                  {/* Progress Section */}
                  {selectedCampaign.target_amount && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground font-medium">
                          Progress Donasi
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {calculateProgress(
                            selectedCampaign.collected_amount,
                            selectedCampaign.target_amount
                          ).toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={calculateProgress(
                          selectedCampaign.collected_amount,
                          selectedCampaign.target_amount
                        )}
                        className="h-2 mb-3"
                      />
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Terkumpul</p>
                          <p className="text-base font-bold text-foreground">
                            {formatCurrency(selectedCampaign.collected_amount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Target</p>
                          <p className="text-base font-bold text-foreground">
                            {formatCurrency(selectedCampaign.target_amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <div className="p-1.5 bg-blue-100 rounded-full">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Donatur</p>
                        <p className="text-sm font-bold text-foreground">
                          {selectedCampaign.donor_count} orang
                        </p>
                      </div>
                    </div>

                    {getDaysRemaining(selectedCampaign.end_date) !== null && (
                      <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                        <div className="p-1.5 bg-orange-100 rounded-full">
                          <Calendar className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Sisa Waktu</p>
                          <p className="text-sm font-bold text-foreground">
                            {getDaysRemaining(selectedCampaign.end_date)} hari
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-md h-10 text-sm"
                    onClick={() => window.open("https://sedekah.terasdakwah.com/", "_blank")}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Donasi Sekarang
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
};

export default CampaignPage;
