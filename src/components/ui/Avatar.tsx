// components/ui/Avatar.tsx
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 100 }) => {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden' }}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default Avatar;
