"use client";

import { useEffect, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  desktopSrc?: string;
  mobileSrc?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  desktopSrc,
  mobileSrc,
  width,
  height
}: OptimizedImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(true);

  useEffect(() => {
    // Определяем мобильное устройство
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Проверяем поддержку WebP
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        setSupportsWebP(canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0);
      }
    };

    checkMobile();
    checkWebPSupport();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Выбираем правильный источник изображения
  const getImageSource = () => {
    // Если есть отдельные пути для mobile/desktop
    if (mobileSrc && desktopSrc) {
      return isMobile ? mobileSrc : desktopSrc;
    }
    
    // Если только один источник, используем его
    return src;
  };

  const imageSource = getImageSource();
  
  // Если нет поддержки WebP, заменяем на .jpg/.png
  const finalSource = !supportsWebP && imageSource.endsWith('.webp') 
    ? imageSource.replace('.webp', '.jpg') 
    : imageSource;

  return (
    <img
      src={finalSource}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}
