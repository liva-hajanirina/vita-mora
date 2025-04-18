
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from 'lucide-react';

const PartnerInvitation = () => {
  const { toast } = useToast();

  const handleInvitePartner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      const token = crypto.randomUUID();
      const { error } = await supabase
        .from('partner_invitations')
        .insert({
          email: formData.get('email') as string,
          company_name: formData.get('companyName') as string,
          company_address: formData.get('companyAddress') as string,
          company_phone: formData.get('companyPhone') as string,
          token: token,
          created_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "Invitation envoyée",
        description: "Le partenaire recevra un email avec les instructions",
      });
      
      (event.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5" />
        Inviter un nouveau partenaire
      </h3>
      
      <form onSubmit={handleInvitePartner} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email du partenaire
          </label>
          <Input
            type="email"
            name="email"
            required
            placeholder="email@entreprise.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'entreprise
          </label>
          <Input
            type="text"
            name="companyName"
            required
            placeholder="Nom de l'entreprise"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse de l'entreprise
          </label>
          <Input
            type="text"
            name="companyAddress"
            required
            placeholder="Adresse complète"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone de l'entreprise
          </label>
          <Input
            type="tel"
            name="companyPhone"
            required
            placeholder="+261 xx xxx xx"
          />
        </div>
        
        <Button type="submit" className="w-full">
          Envoyer l'invitation
        </Button>
      </form>
    </div>
  );
};

export default PartnerInvitation;
