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
 import { Calendar, Users, BadgeCheck } from "lucide-react";
 import { differenceInDays } from "date-fns";
 import { useState } from "react";
 
 const CampaignPage = () => {
   const { data: campaigns, isLoading, error } = useCampaigns();
   const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
 
   const formatCurrency = (amount: number, compact = false) => {
     if (compact && amount >= 1000000) {
       return `Rp${(amount / 1000000).toFixed(1).replace('.0', '')} jt`;
     }
     return new Intl.NumberFormat("id-ID", {
       minimumFractionDigits: 0,
       maximumFractionDigits: 0,
     }).format(amount).replace(/^/, 'Rp');
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
           <section className="py-5 bg-background border-b border-border">
             <div className="px-4">
               <h1 className="text-lg font-heading font-bold text-foreground">
                 Campaign Dakwah
               </h1>
             </div>
           </section>
 
           {/* Campaign List */}
           <section className="py-4 px-3 bg-muted/30">
             {isLoading ? (
               <div className="grid grid-cols-2 gap-2.5">
                 {[...Array(4)].map((_, i) => (
                   <Skeleton key={i} className="h-52 rounded-xl" />
                 ))}
               </div>
             ) : error ? (
               <div className="text-center text-muted-foreground py-12 text-sm">
                 Gagal memuat campaign. Silakan coba lagi nanti.
               </div>
             ) : campaigns && campaigns.length > 0 ? (
               <div className="grid grid-cols-2 gap-2.5">
                 {campaigns.map((campaign) => {
                   const progress = calculateProgress(
                     campaign.collected_amount,
                     campaign.target_amount
                   );
 
                   return (
                     <div
                       key={campaign.id}
                       onClick={() => handleCardClick(campaign)}
                       className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                     >
                       {/* Image */}
                       <div className="aspect-[4/3] overflow-hidden bg-muted">
                         <img
                           src={campaign.image_url || "/placeholder.svg"}
                           alt={campaign.title}
                           className="w-full h-full object-cover"
                         />
                       </div>
 
                       {/* Content */}
                       <div className="p-2.5">
                         {/* Organization */}
                         <div className="flex items-center gap-1 mb-1">
                           <span className="text-[10px] text-muted-foreground truncate">
                             Teras Dakwah
                           </span>
                           <BadgeCheck className="w-3 h-3 text-primary flex-shrink-0" />
                         </div>
 
                         {/* Title */}
                         <h3 className="font-medium text-[11px] text-foreground line-clamp-2 leading-tight mb-2 min-h-[2rem]">
                           {campaign.title}
                         </h3>
 
                         {/* Amount */}
                         <div className="mb-2">
                           <span className="text-[9px] text-muted-foreground">Terkumpul </span>
                           <span className="text-[11px] font-bold text-[#ff4081]">
                             {formatCurrency(campaign.collected_amount, true)}
                           </span>
                         </div>
 
                         {/* Progress Bar */}
                         <Progress value={progress} className="h-1 bg-muted" />
                       </div>
                     </div>
                   );
                 })}
               </div>
             ) : (
               <div className="text-center text-muted-foreground py-12 text-sm">
                 Belum ada campaign yang tersedia.
               </div>
             )}
           </section>
         </main>
         <Footer />
 
         {/* Detail Modal */}
         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
           <DialogContent className="max-w-[calc(100%-2rem)] max-h-[80vh] overflow-y-auto mx-4 rounded-xl p-4">
             {selectedCampaign && (
               <>
                 <DialogHeader className="pb-2">
                   <DialogTitle className="text-sm font-heading font-bold pr-6 leading-tight">
                     {selectedCampaign.title}
                   </DialogTitle>
                 </DialogHeader>
 
                 {/* Image */}
                 {selectedCampaign.image_url && (
                   <div className="rounded-lg overflow-hidden bg-muted">
                     <img
                       src={selectedCampaign.image_url}
                       alt={selectedCampaign.title}
                       className="w-full h-auto max-h-[180px] object-cover"
                     />
                   </div>
                 )}
 
                 {/* Description */}
                 <div className="space-y-3 mt-2">
                   <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                     {selectedCampaign.description}
                   </p>
 
                   {/* Progress Section */}
                   {selectedCampaign.target_amount && (
                     <div className="bg-muted/50 p-3 rounded-lg">
                       <Progress
                         value={calculateProgress(
                           selectedCampaign.collected_amount,
                           selectedCampaign.target_amount
                         )}
                         className="h-1.5 mb-2"
                       />
                       <div className="flex justify-between items-end">
                         <div>
                           <p className="text-[9px] text-muted-foreground">Terkumpul</p>
                           <p className="text-xs font-bold text-[#ff4081]">
                             {formatCurrency(selectedCampaign.collected_amount)}
                           </p>
                         </div>
                         <span className="text-[10px] text-muted-foreground">
                           {calculateProgress(
                             selectedCampaign.collected_amount,
                             selectedCampaign.target_amount
                           ).toFixed(0)}%
                         </span>
                       </div>
                     </div>
                   )}
 
                   {/* Stats Grid */}
                   <div className="grid grid-cols-2 gap-2">
                     <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                       <Users className="w-3.5 h-3.5 text-primary" />
                       <div>
                         <p className="text-[9px] text-muted-foreground">Donatur</p>
                         <p className="text-[11px] font-bold text-foreground">
                           {selectedCampaign.donor_count} orang
                         </p>
                       </div>
                     </div>
 
                     {getDaysRemaining(selectedCampaign.end_date) !== null && (
                       <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                         <Calendar className="w-3.5 h-3.5 text-accent" />
                         <div>
                           <p className="text-[9px] text-muted-foreground">Sisa</p>
                           <p className="text-[11px] font-bold text-foreground">
                             {getDaysRemaining(selectedCampaign.end_date)} hari
                           </p>
                         </div>
                       </div>
                     )}
                   </div>
 
                   {/* CTA Button */}
                   <Button
                     className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-9 text-xs"
                     onClick={() => window.open("https://sedekah.terasdakwah.com/", "_blank")}
                   >
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