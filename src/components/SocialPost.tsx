
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface SocialPostProps {
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

const SocialPost: React.FC<SocialPostProps> = ({ 
  username, 
  avatar, 
  time, 
  content, 
  image,
  likes,
  comments
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="social-post">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <img src={avatar} alt={username} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h4 className="font-bold text-vitamora-green">{username}</h4>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </div>
        <button className="p-1">
          <MoreHorizontal size={20} className="text-gray-500" />
        </button>
      </div>
      
      <p className="my-2">{content}</p>
      
      {image && (
        <div className="my-3 rounded-lg overflow-hidden">
          <img src={image} alt="Publication" className="w-full h-auto" />
        </div>
      )}
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <button 
          onClick={toggleLike}
          className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
          <span>{likeCount}</span>
        </button>
        
        <button className="flex items-center gap-1 text-gray-500">
          <MessageCircle size={20} />
          <span>{comments}</span>
        </button>
        
        <button className="flex items-center gap-1 text-gray-500">
          <Share2 size={20} />
          <span>Partager</span>
        </button>
      </div>
    </div>
  );
};

export default SocialPost;
