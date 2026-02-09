 import { Link } from "react-router-dom";
 import { MessageCircle, ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const ContactCTA = () => {
   return (
     <section className="py-8 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
       <div className="text-center space-y-4">
         <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
           <MessageCircle className="w-7 h-7 text-primary" />
         </div>
         
         <h3 className="text-lg font-heading font-bold text-foreground">
           Ada Pertanyaan?
         </h3>
         
          <p className="text-sm text-foreground max-w-xs mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang program dan kegiatan Teras Dakwah
          </p>
         
         <Link to="/contact">
           <Button className="mt-2 gap-2">
             Hubungi Kami
             <ArrowRight className="w-4 h-4" />
           </Button>
         </Link>
       </div>
     </section>
   );
 };
 
 export default ContactCTA;