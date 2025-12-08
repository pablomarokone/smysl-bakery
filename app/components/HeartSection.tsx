"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HeartSection() {
  const [scale, setScale] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Вычисляем, насколько далеко элемент прошел через viewport
      const elementCenter = rect.top + rect.height / 2;
      const distance = windowHeight / 2 - elementCenter;
      
      // Масштаб от 1 до 1.15 при прокрутке
      const newScale = 1 + (Math.abs(distance) / windowHeight) * 0.15;
      setScale(Math.min(newScale, 1.15));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 relative overflow-hidden" style={{ backgroundColor: '#675b53' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - текст */}
          <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-7xl md:text-9xl great-vibes italic" style={{ color: '#fdebc1', lineHeight: '1.1' }}>
              <style jsx>{`
                @media (min-width: 768px) {
                  h2 {
                    line-height: 0.95;
                  }
                }
              `}</style>
              В ритме <br />
              миллионов сердец
            </h2>
            <p className="text-lg leading-relaxed text-white">
              Наша выпечка — это любимый вкус, который объединяет миллионы
              сердец, живущих по всей стране. Миллионы завтраков, пропитанных
              заботой и миллионы чаепитий, которые делают нас чуточку ближе.
              Встречайте!
            </p>
          </div>

          {/* Правая колонка - изображение в форме сердца */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl -translate-x-[10%] md:translate-x-0" style={{ transform: `scale(${scale * 1.3})`, transition: 'transform 0.3s ease-out' }}>
              <Image
                src="/img/rythm1.png"
                alt="Ритм"
                width={650}
                height={780}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Декоративные элементы фона */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-beige/5" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-beige/5" />
    </section>
  );
}
