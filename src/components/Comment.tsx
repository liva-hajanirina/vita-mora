
import React, { useState } from 'react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Profile } from '@/utils/profileService';

interface CommentProps {
  content: string;
  createdAt: string;
  user: Profile;
  canDelete?: boolean;
  onDelete?: () => void;
}

const Comment: React.FC<CommentProps> = ({ 
  content, 
  createdAt, 
  user,
  canDelete = false,
  onDelete 
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    if (onDelete) {
      onDelete();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return `Aujourd'hui à ${format(date, 'HH:mm')}`;
    } else if (isYesterday(date)) {
      return `Hier à ${format(date, 'HH:mm')}`;
    } else {
      return format(date, 'dd MMM yyyy à HH:mm', { locale: fr });
    }
  };

  return (
    <div className="flex gap-2">
      <img 
        src={user.profile_image_url || `https://ui-avatars.com/api/?name=${user.first_name || ''} ${user.last_name || ''}`}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex-1 bg-gray-50 p-2 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <span className="font-medium">{user.first_name} {user.last_name}</span>
            <span className="text-xs text-gray-500 ml-2">{formatDate(createdAt)}</span>
          </div>
          
          {canDelete && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 -mr-1">
                  <MoreHorizontal size={16} className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="text-sm mt-1">{content}</p>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce commentaire?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Comment;
