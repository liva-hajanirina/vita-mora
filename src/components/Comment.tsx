
import React from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import type { Profile } from '@/utils/profileService';

interface CommentProps {
  content: string;
  createdAt: string;
  user: Profile;
  onDelete?: () => void;
  canDelete?: boolean;
}

const Comment = ({ content, createdAt, user, onDelete, canDelete = false }: CommentProps) => {
  return (
    <div className="flex gap-3 p-3 border-b border-gray-100 last:border-0">
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.profile_image_url || `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`} />
        <AvatarFallback><User size={16} /></AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-vitamora-green">
            {user.first_name} {user.last_name}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleString('fr-FR', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            {canDelete && (
              <button
                onClick={onDelete}
                className="text-red-500 text-xs hover:underline"
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-1">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
