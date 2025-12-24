"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import styles from './ProductsCarousel.module.css';

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ingredients: string;
  weight: string;
  price: string;
  image: string;
}

export default function ProductsCarousel() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      title: "Безглютеновый багет",
      subtitle: "Французская классика",
      description: "Хрустящий багет без глютена с хрустящей корочкой и нежным мякишем.",
      ingredients: "Мука рисовая, вода, дрожжи, соль, оливковое масло",
      weight: "350",
      price: "450",
      image: "baget.jpg"
    },
    {
      id: 2,
      title: "Карамельный круассан",
      subtitle: "Слоёное наслаждение",
      description: "Ароматный круассан с карамельной начинкой.",
      ingredients: "Мука миндальная, масло сливочное, карамель, яйца",
      weight: "120",
      price: "320",
      image: "croissant.jpg"
    },
    {
      id: 3,
      title: "Чиабатта с розмарином",
      subtitle: "Итальянская традиция",
      description: "Воздушная чиабатта с ароматом свежего розмарина.",
      ingredients: "Мука кукурузная, розмарин, оливковое масло, дрожжи",
      weight: "280",
      price: "380",
      image: "chiabatta.jpg"
    },
    {
      id: 4,
      title: "Безглютеновый бородинский",
      subtitle: "Русский хлеб",
      description: "Тёмный хлеб с тмином и кориандром.",
      ingredients: "Мука гречневая, закваска, тмин, кориандр, патока",
      weight: "500",
      price: "520",
      image: "borodinsky.jpg"
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Навигация - оставляем ваш код
  const nextProduct = useCallback(() => {
    if (isAnimating || !products.length) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, products.length]);

  const prevProduct = useCallback(() => {
    if (isAnimating || !products.length) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, products.length]);

  // Драг для десктопа - оставляем ваш код
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

  // Функция для получения URL изображения
  const getImageUrl = (imageName: string) => {
    return `/img/${imageName}`;
  };

  // Мобильный скролл
  const handleMobileScroll = useCallback(() => {
    if (!containerRef.current || !products.length) return;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.85;
    const gap = 20;
    
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    if (newIndex >= 0 && newIndex < products.length && newIndex !== mobileActiveIndex) {
      setMobileActiveIndex(newIndex);
    }
  }, [products.length, mobileActiveIndex]);

  // Прокрутка на мобилке
  const scrollToMobileIndex = useCallback((index: number) => {
    if (!containerRef.current || !products.length) return;
    
    const container = containerRef.current;
    const cardWidth = container.clientWidth * 0.85;
    const gap = 20;
    
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      setMobileActiveIndex(index);
    }, 300);
  }, [products.length]);

  // Навигация по индексу
  const goToIndex = (index: number) => {
    if (isAnimating || !products.length) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleMobileScroll);
      return () => container.removeEventListener('scroll', handleMobileScroll);
    }
  }, [handleMobileScroll]);

  return (
    <section id="products" className="w-full py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Навигация */}
        <div className="hidden md:block">
          <button
            onClick={prevProduct}
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            aria-label="Предыдущий"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M14 6L8 12L14 18" 
                stroke="#7BA862" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <button
            onClick={nextProduct}
            className={`${styles.navButton} ${styles.navButtonNext}`}
            aria-label="Следующий"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M10 6L16 12L10 18" 
                stroke="#7BA862" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Карусель */}
        <div className={styles.carouselWithBackground}>
          <div className={styles.carouselBackground} />
          
          {/* ДЕСКТОП - ИСПРАВЛЕННЫЙ КОД */}
          <animated.div
            {...bindDrag()}
            style={{ 
              x, 
              touchAction: 'pan-y',
              // Добавляем центрирование
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
            className="hidden md:flex relative overflow-visible cursor-grab active:cursor-grabbing z-10"
          >
            {/* Ключевое изменение: используем [-2, -1, 0, 1, 2] без лишней логики */}
            {[-2, -1, 0, 1, 2].map((offset) => {
              const index = (currentIndex + offset + products.length) % products.length;
              const product = products[index];
              const uniqueKey = `${product.id}-${offset}`;
              // Настройки масштаба и прозрачности
              let scale = 1, opacity = 1, zIndex = 10;
              if (offset === 0) { 
                scale = 1; 
                opacity = 1; 
                zIndex = 30; 
              } else if (Math.abs(offset) === 1) { 
                scale = 0.85; 
                opacity = 0.5; 
                zIndex = 20; 
              } else { 
                scale = 0.75; 
                opacity = 0.3; 
                zIndex = 10; 
              }
              // ЦЕНТРАЛЬНАЯ КАРТОЧКА
              if (offset === 0) {
                return (
                  <div 
                    key={uniqueKey}
                    className={`${styles.activeCard} ${isAnimating ? styles.animating : styles.notAnimating}`}
                    style={{ 
                      zIndex,
                      // Центрируем активную карточку
                      position: 'relative',
                      margin: '0 20px' // Отступы для центрирования
                    }}
                  >
                    <div className={styles.activeCardInner}>
                      {/* Фото */}
                      <div className={styles.activeImageContainer}>
                        <Image
                          src={getImageUrl(product.image)}
                          alt={product.title}
                          fill
                          className={styles.activeImage}
                          sizes="432px"
                          priority
                        />
                      </div>
                      
                      {/* Иконка */}
                      <div className={styles.glutenFreeIcon}>
                        <Image
                          src="/svg/gl_free.svg"
                          alt="Gluten Free"
                          fill
                          className="object-contain"
                        />
                      </div>
                      
                      {/* Контент */}
                      <div className={styles.cardContent}>
                        <div className={styles.productHeader}>
                          <h3 className={styles.productTitle}>{product.title}</h3>
                          <div className={styles.productWeight}>
                            {product.weight}г
                          </div>
                        </div>
                        
                        <p className={styles.productSubtitle}>{product.subtitle}</p>
                        <p className={styles.productDescription}>{product.description}</p>
                        
                        <div className={styles.ingredients}>
                          <h4 className={styles.ingredientsTitle}>Состав:</h4>
                          <p className={styles.ingredientsText}>{product.ingredients}</p>
                        </div>
                        
                        <div className="mt-4 text-2xl font-bold text-[#544a44]">
                          {product.price} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } 
              
              // БОКОВЫЕ КАРТОЧКИ
              else {
                const imgWidth = Math.abs(offset) === 2 ? 180 : 260;
                const imgHeight = Math.abs(offset) === 2 ? 140 : 220;
                
                return (
                  <div
                    key={uniqueKey}
                    className={`${styles.desktopOnly} relative z-10 transition-all duration-500`}
                    style={{ 
                      zIndex,
                      transform: `scale(${scale})`, 
                      opacity,
                      // Выравниваем боковые карточки по центру
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 10px', // Уменьшаем отступы
                      // Смещаем вверх для эффекта перспективы
                      marginTop: Math.abs(offset) === 1 ? '30px' : '40px'
                    }}
                  >
                    <Image
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      width={imgWidth}
                      height={imgHeight}
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                );
              }
            })}
          </animated.div>
          
          {/* Мобильная версия - БЕЗ ИЗМЕНЕНИЙ */}
          <div 
            ref={containerRef}
            className={`${styles.scrollSnapContainer} md:hidden`}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.scrollSnapCard}>
                <div className={styles.mobileCard}>
                  {/* Фото */}
                  <div className={styles.mobileImageWrapper}>
                    <Image
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      width={308}
                      height={220}
                      className={styles.mobileImage}
                    />
                  </div>
                  
                  {/* Иконка */}
                  <div className={styles.mobileIcon}>
                    <Image
                      src="/svg/gl_free.svg"
                      alt="Gluten Free"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Контент */}
                  <div className={styles.mobileContent}>
                    <div className={styles.mobileHeader}>
                      <h3 className={styles.mobileTitle}>{product.title}</h3>
                      <div className={styles.mobileWeight}>{product.weight}г</div>
                    </div>
                    
                    <p className={styles.mobileSubtitle}>{product.subtitle}</p>
                    <p className={styles.mobileDescription}>{product.description}</p>
                    
                    <div className={styles.mobileIngredients}>
                      <h4 className={styles.mobileIngredientsTitle}>Состав:</h4>
                      <p className={styles.mobileIngredientsText}>{product.ingredients}</p>
                    </div>
                    
                    <div className="mt-3 text-xl font-bold text-[#544a44]">
                      {product.price} ₽
                    </div>
                  </div>
                </div> 
              </div> 
            ))}
          </div>
        </div>
        
        {/* Индикаторы */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const isActive = isMobile 
              ? mobileActiveIndex === index 
              : currentIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => {
                  if (isMobile) {
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
                aria-label={`Продукт ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}