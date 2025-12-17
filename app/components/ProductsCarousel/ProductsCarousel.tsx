"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { getProducts } from "@/lib/strapi";
import styles from './ProductsCarousel.module.css';

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ingredients: string;
  weight: string;
  product_photo?: {
    url: string;
  };
}

export default function ProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setProducts([]);
      }
    }
    loadProducts();
  }, []);

  const nextProduct = () => {
    if (isAnimating || !products.length) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prevProduct = () => {
    if (isAnimating || !products.length) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Универсальный свайп для десктопа
  const bindDrag = useDrag(({ active, movement: [mx], direction: [dx], velocity: [vx] }) => {
    if (!active && (Math.abs(mx) > 100 || vx > 0.5)) {
      if (dx > 0) prevProduct();
      else nextProduct();
      api.start({ x: 0 });
    } else {
      api.start({ x: active ? mx : 0, immediate: active });
    }
  }, {
    axis: 'x',
    filterTaps: true,
    rubberband: 0.2,
    from: () => [x.get(), 0]
  });

  // Обработчик скролла для мобильной версии
  const handleMobileScroll = useCallback(() => {
    if (!containerRef.current || !products.length) return;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.85;
    const gap = 20;
    
    // Рассчитываем текущий индекс с округлением
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    if (newIndex >= 0 && newIndex < products.length && newIndex !== mobileActiveIndex) {
      setMobileActiveIndex(newIndex);
    }
  }, [products.length, mobileActiveIndex]);

  // Прокрутка к карточке по индексу на мобилке
  const scrollToMobileIndex = useCallback((index: number) => {
    if (!containerRef.current || !products.length) return;
    
    const container = containerRef.current;
    const cardWidth = container.clientWidth * 0.85;
    const gap = 20;
    
    // Плавная прокрутка
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
    
    // Устанавливаем активный индекс после прокрутки
    setTimeout(() => {
      setMobileActiveIndex(index);
    }, 300);
  }, [products.length]);

  // Десктопная навигация
  const goToIndex = (index: number) => {
    if (isAnimating || !products.length) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Устанавливаем обработчик скролла
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleMobileScroll);
      return () => {
        container.removeEventListener('scroll', handleMobileScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [handleMobileScroll]);

  // Авто-определение активной карточки при монтировании
  useEffect(() => {
    if (containerRef.current && products.length > 0) {
      handleMobileScroll();
    }
  }, [products, handleMobileScroll]);

  if (!products.length) return <div>Загрузка...</div>;

  return (
    <section id="products" className="w-full py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* СТРЕЛКИ С ИНВЕРСИЕЙ - БЛИЖЕ К КРАЯМ (только для десктопа) */}
        <div className="hidden md:block">
          <button
            onClick={prevProduct}
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            aria-label="Предыдущий"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M14 6L8 12L14 18" 
                stroke="#7BA862" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={styles.navArrow}
              />
            </svg>
          </button>
          
          <button
            onClick={nextProduct}
            className={`${styles.navButton} ${styles.navButtonNext}`}
            aria-label="Следующий"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10 6L16 12L10 18" 
                stroke="#7BA862" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={styles.navArrow}
              />
            </svg>
          </button>
        </div>

        {/* ЕДИНЫЙ КОНТЕЙНЕР ДЛЯ ВСЕХ УСТРОЙСТВ */}
        <div className={styles.carouselWithBackground}>
          <div className={styles.carouselBackground} />
          
          {/* АНИМИРОВАННЫЙ КОНТЕЙНЕР ДЛЯ ДЕСКТОПА */}
          <animated.div 
            {...bindDrag()}
            style={{ x, touchAction: 'pan-y' }}
            className="hidden md:flex items-center justify-center gap-4 relative overflow-visible cursor-grab active:cursor-grabbing z-10"
          >
            {[ -2, -1, 0, 1, 2 ].map((offset) => {
              const index = (currentIndex + offset + products.length) % products.length;
              const product = products[index];
              let scale = 1, opacity = 1;
              
              if (offset === 0) { scale = 1; opacity = 1; }
              else if (Math.abs(offset) === 1) { scale = 0.85; opacity = 0.5; }
              else { scale = 0.75; opacity = 0.3; }
              
              // ЦЕНТРАЛЬНАЯ КАРТОЧКА
              if (offset === 0) {
                return (
                  <div key={product.id} className={`${styles.activeCard} ${isAnimating ? styles.animating : styles.notAnimating}`}>
                    <div className={styles.activeCardInner}>
                      
                      {/* ФОТО */}
                      <div className={styles.activeImageContainer}>
                        {product.product_photo?.url ? (
                          <Image
                            src={`http://localhost:1337${product.product_photo.url}`}
                            alt={product.title}
                            fill
                            className={styles.activeImage}
                            sizes="432px"
                            priority
                          />
                        ) : (
                          <div className={styles.noImagePlaceholder}>
                            <span>Нет фото</span>
                          </div>
                        )}
                      </div>
                      
                      {/* ИКОНКА */}
                      <div className={styles.glutenFreeIcon}>
                        <Image
                          src="/svg/gl_free.svg"
                          alt="Gluten Free"
                          fill
                          className="object-contain"
                        />
                      </div>
                      
                      {/* КОНТЕНТ */}
                      <div className={styles.cardContent}>
                        <div className={styles.productHeader}>
                          <h3 className={styles.productTitle}>{product.title}</h3>
                          <div className={styles.productWeight}>
                            {product.weight ? `${product.weight}г` : '0г'}
                          </div>
                        </div>
                        
                        <p className={styles.productSubtitle}>
                          {product.subtitle || 'Безглютеновый аналог'}
                        </p>
                        
                        <p className={styles.productDescription}>
                          {product.description || ''}
                        </p>
                        
                        <div className={styles.ingredients}>
                          <h4 className={styles.ingredientsTitle}>Состав:</h4>
                          <p className={styles.ingredientsText}>
                            {product.ingredients || 'Состав не указан'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } 
              
              // БОКОВЫЕ ФОТО (только для десктопа)
              else {
                const imgWidth = Math.abs(offset) === 2 ? 180 : 260;
                const imgHeight = Math.abs(offset) === 2 ? 140 : 220;
                const marginTop = Math.abs(offset) === 1 ? '40px' : '60px';
                
                return (
                  <div 
                    key={product.id} 
                    className={`${styles.desktopOnly} relative ${Math.abs(offset) === 1 ? 'w-[280px]' : 'w-[240px]'} z-10 transition-all duration-500 flex items-center justify-center`}
                    style={{ transform: `scale(${scale})`, opacity, marginTop }}
                  >
                    {product.product_photo?.url && (
                      <Image
                        src={`http://localhost:1337${product.product_photo.url}`}
                        alt={product.title}
                        width={imgWidth}
                        height={imgHeight}
                        className="object-contain drop-shadow-xl"
                      />
                    )}
                  </div>
                );
              }
            })}
          </animated.div>
          
          {/* МОБИЛЬНЫЙ КОНТЕЙНЕР С ГОРИЗОНТАЛЬНЫМ СКРОЛЛОМ */}
          <div 
            ref={containerRef}
            className={`${styles.scrollSnapContainer} md:hidden`}
          >
            {products.map((product, index) => (
              <div key={product.id} className={styles.scrollSnapCard}>
                <div className={styles.mobileCard}>
                  
                  {/* ФОТО - УВЕЛИЧЕННОЕ НА 10% */}
                  <div className={styles.mobileImageWrapper}>
                    {product.product_photo?.url ? (
                      <Image
                        src={`http://localhost:1337${product.product_photo.url}`}
                        alt={product.title}
                        width={308}
                        height={220}
                        className={styles.mobileImage}
                      />
                    ) : (
                      <div className={styles.mobileNoImage}>Нет фото</div>
                    )}
                  </div>
                  
                  {/* ИКОНКА */}
                  <div className={styles.mobileIcon}>
                    <Image
                      src="/svg/gl_free.svg"
                      alt="Gluten Free"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* КОНТЕНТ */}
                  <div className={styles.mobileContent}>
                    <div className={styles.mobileHeader}>
                      <h3 className={styles.mobileTitle}>{product.title}</h3>
                      <div className={styles.mobileWeight}>
                        {product.weight ? `${product.weight}г` : '0г'}
                      </div>
                    </div>
                    
                    <p className={styles.mobileSubtitle}>
                      {product.subtitle || 'Безглютеновый аналог'}
                    </p>
                    
                    <p className={styles.mobileDescription}>
                      {product.description || ''}
                    </p>
                    
                    <div className={styles.mobileIngredients}>
                      <h4 className={styles.mobileIngredientsTitle}>Состав:</h4>
                      <p className={styles.mobileIngredientsText}>
                        {product.ingredients || 'Состав не указан'}
                      </p>
                    </div>
                  </div>
                </div> 
              </div> 
            ))}
          </div>
        </div>
        
        {/* ОБЩИЕ ДОТСЫ ДЛЯ ВСЕХ УСТРОЙСТВ */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => {
            // Определяем активный индекс в зависимости от устройства
            const isActive = window.innerWidth < 768 
              ? mobileActiveIndex === index 
              : currentIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    scrollToMobileIndex(index);
                  } else {
                    goToIndex(index);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#fdebc1] scale-110'
                    : 'bg-[#fdebc1] opacity-40 hover:opacity-70'
                }`}
                aria-label={`Перейти к продукту ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}