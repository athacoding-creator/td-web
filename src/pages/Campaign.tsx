import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { Calendar, Users, Target, TrendingUp, X } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { id as localeId } from "date-fns/locale";
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
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
          Selesai
        </span>
      );
    }
    
    if (daysRemaining && daysRemaining <= 7) {
      return (
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700 border border-orange-200">
          Segera Berakhir
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
        Aktif
      </span>
    );
  };

  const handleCardClick = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Campaign Dakwah
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Bergabunglah dalam berbagai campaign kebaikan untuk mendukung dakwah dan membantu sesama
            </p>
          </div>
        </section>

        {/* Campaign List */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-narrow">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[450px] rounded-xl" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-muted-foreground py-12">
                Gagal memuat campaign. Silakan coba lagi nanti.
              </div>
            ) : campaigns && campaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className="bg-card rounded-xl border-2 border-border overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col cursor-pointer"
                    >
                      {/* Image */}
                      {campaign.image_url && (
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={campaign.image_url}
                            alt={campaign.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            {getStatusBadge(campaign)}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Title & Description */}
                        <h3 className="font-heading font-bold text-xl mb-3 text-foreground line-clamp-2">
                          {campaign.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                          {campaign.description}
                        </p>

                        {/* Progress Section */}
                        {campaign.target_amount && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">
                                Terkumpul
                              </span>
                              <span className="text-xs font-semibold text-primary">
                                {progress.toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-2 mb-3" />
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-lg font-bold text-foreground">
                                  {formatCurrency(campaign.collected_amount)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  dari {formatCurrency(campaign.target_amount)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-muted-foreground">Donatur</p>
                              <p className="text-sm font-semibold text-foreground">
                                {campaign.donor_count} orang
                              </p>
                            </div>
                          </div>
                          {daysRemaining !== null && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-orange-600" />
                              <div>
                                <p className="text-xs text-muted-foreground">Sisa Waktu</p>
                                <p className="text-sm font-semibold text-foreground">
                                  {daysRemaining} hari
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Belum ada campaign yang tersedia.
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-green-600 to-green-500">
          <div className="container-narrow text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Ingin Mendukung Campaign?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut tentang cara berpartisipasi dalam campaign-campaign kebaikan.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-100 font-semibold shadow-lg"
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-heading font-bold pr-8">
                  {selectedCampaign.title}
                </DialogTitle>
              </DialogHeader>

              {/* Image */}
              {selectedCampaign.image_url && (
                <div className="aspect-video overflow-hidden rounded-lg relative -mt-2">
                  <img
                    src={selectedCampaign.image_url}
                    alt={selectedCampaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(selectedCampaign)}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tentang Campaign</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {selectedCampaign.description}
                  </p>
                </div>

                {/* Progress Section */}
                {selectedCampaign.target_amount && (
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground font-medium">
                        Progress Donasi
                      </span>
                      <span className="text-sm font-bold text-primary">
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
                      className="h-3 mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Terkumpul</p>
                        <p className="text-xl font-bold text-foreground">
                          {formatCurrency(selectedCampaign.collected_amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Target</p>
                        <p className="text-xl font-bold text-foreground">
                          {formatCurrency(selectedCampaign.target_amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Donatur</p>
                      <p className="text-lg font-bold text-foreground">
                        {selectedCampaign.donor_count} orang
                      </p>
                    </div>
                  </div>

                  {getDaysRemaining(selectedCampaign.end_date) !== null && (
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sisa Waktu</p>
                        <p className="text-lg font-bold text-foreground">
                          {getDaysRemaining(selectedCampaign.end_date)} hari
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-lg h-12 text-base"
                  onClick={() => window.open("https://sedekah.terasdakwah.com/", "_blank")}
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Donasi Sekarang
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignPage;
