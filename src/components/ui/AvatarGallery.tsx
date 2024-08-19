// components/ui/AvatarGallery.tsx
import React from 'react';
import Avatar from './Avatar';

const avatars = [
  '/images/owl-profile.png',
  '/images/owl-glasses.png',
  '/images/owl-books.png',
  '/images/bear-educator.png',
  '/images/lion-books.png',
  '/images/lion-on-books.png',
];

interface AvatarGalleryProps {
  onSelect: (src: string) => void;
}

const AvatarGallery: React.FC<AvatarGalleryProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {avatars.map((src, index) => (
        <div 
          key={index} 
          onClick={() => onSelect(src)}
          className="cursor-pointer transform transition-transform duration-200 hover:scale-150"
        >
          <Avatar src={src} alt={`Avatar ${index + 1}`} size={50} />
        </div>
      ))}
    </div>
  );
};

export default AvatarGallery;