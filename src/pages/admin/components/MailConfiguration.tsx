
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MailCheck, Settings2 } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

interface MailConfig {
  id: string;
  provider_name: string;
  imap_host: string;
  imap_port: number;
  smtp_host: string;
  smtp_port: number;
  username: string;
  is_active: boolean;
}

const MailConfiguration = () => {
  const { toast } = useToast();
  const [configurations, setConfigurations] = useState<MailConfig[]>([]);

  useEffect(() => {
    loadConfigurations();
  }, []);

  const loadConfigurations = async () => {
    const { data, error } = await supabase
      .from('mail_configurations')
      .select('*');
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les configurations",
        variant: "destructive"
      });
      return;
    }

    setConfigurations(data || []);
  };

  const handleAddConfiguration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      const { error } = await supabase
        .from('mail_configurations')
        .insert({
          provider_name: formData.get('providerName'),
          imap_host: formData.get('imapHost'),
          imap_port: parseInt(formData.get('imapPort') as string),
          smtp_host: formData.get('smtpHost'),
          smtp_port: parseInt(formData.get('smtpPort') as string),
          username: formData.get('username'),
          password: formData.get('password')
        });

      if (error) throw error;

      toast({
        title: "Configuration ajoutée",
        description: "La configuration email a été ajoutée avec succès",
      });
      
      loadConfigurations();
      (event.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (configId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('mail_configurations')
        .update({ is_active: !currentState })
        .eq('id', configId);

      if (error) throw error;

      loadConfigurations();
      toast({
        title: "Configuration mise à jour",
        description: `Configuration ${!currentState ? 'activée' : 'désactivée'}`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Settings2 className="h-5 w-5" />
        Configuration Email
      </h3>

      {configurations.length > 0 && (
        <div className="mb-6 space-y-4">
          <h4 className="text-sm font-medium">Configurations existantes</h4>
          {configurations.map((config) => (
            <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{config.provider_name}</p>
                <p className="text-sm text-gray-500">{config.username}</p>
              </div>
              <div className="flex items-center gap-4">
                <Switch
                  checked={config.is_active}
                  onCheckedChange={() => toggleActive(config.id, config.is_active)}
                />
                <MailCheck className={`h-5 w-5 ${config.is_active ? 'text-green-500' : 'text-gray-300'}`} />
              </div>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleAddConfiguration} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du fournisseur
            </label>
            <Input
              type="text"
              name="providerName"
              required
              placeholder="Gmail, Outlook, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom d'utilisateur
            </label>
            <Input
              type="text"
              name="username"
              required
              placeholder="email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <Input
              type="password"
              name="password"
              required
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serveur IMAP
            </label>
            <Input
              type="text"
              name="imapHost"
              required
              placeholder="imap.gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Port IMAP
            </label>
            <Input
              type="number"
              name="imapPort"
              required
              placeholder="993"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serveur SMTP
            </label>
            <Input
              type="text"
              name="smtpHost"
              required
              placeholder="smtp.gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Port SMTP
            </label>
            <Input
              type="number"
              name="smtpPort"
              required
              placeholder="587"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Ajouter la configuration
        </Button>
      </form>
    </div>
  );
};

export default MailConfiguration;
