"use client";

import { useEffect, useRef } from "react";

export default function ScrollingIcons() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentScrollY = 0;
    let targetScrollY = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const smoothScroll = () => {
      // Плавная интерполяция с инерцией
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;

      const isMobile = window.innerWidth < 768;
      const speed = isMobile ? 0.3 : 0.5;
      const offset = 500;

      // Первая строка: слева направо
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(-${currentScrollY * speed}px)`;
      }

      // Вторая строка: справа налево с начальным смещением
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${currentScrollY * speed - offset}px)`;
      }

      // Третья строка: слева направо
      if (row3Ref.current) {
        row3Ref.current.style.transform = `translateX(-${currentScrollY * speed}px)`;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="w-full py-0 md:py-8 bg-primary overflow-hidden" style={{ lineHeight: 0 }}>
      <style jsx>{`
        .svg-row {
          height: 40px;
          width: auto;
        }
        .scrolling-row {
          margin: 10px 0;
        }
        .scrolling-row-2 {
          margin: 10px 0;
        }
        @media (min-width: 768px) {
          .svg-row {
            height: 100px;
          }
          .scrolling-row {
            transform: scale(1.2);
            transform-origin: center;
            margin: 80px 0;
          }
          .scrolling-row-2 {
            transform: scale(1.0);
            transform-origin: center;
            margin: 80px 0;
          }
        }
      `}</style>
      <div className="flex flex-col" style={{ lineHeight: 0, gap: 0, margin: 0, padding: 0 }}>
        {/* Первая строка - t1.svg слева направо */}
        <div className="overflow-hidden whitespace-nowrap scrolling-row" style={{ lineHeight: 0, margin: 0, padding: 0, display: 'block', height: 'auto' }}>
          <div
            ref={row1Ref}
            className="inline-flex"
            style={{ willChange: "transform", lineHeight: 0, margin: 0, padding: 0 }}
          >
            {Array(3).fill("/svg/t1.svg").map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Text 1"
                className="svg-row"
                style={{ display: 'block', verticalAlign: 'top', lineHeight: 0, margin: '0 10px', padding: 0 }}
              />
            ))}
          </div>
        </div>

        {/* Вторая строка - t2.svg справа налево */}
        <div className="overflow-hidden whitespace-nowrap scrolling-row-2" style={{ lineHeight: 0, margin: 0, padding: 0, display: 'block', height: 'auto' }}>
          <div
            ref={row2Ref}
            className="inline-flex"
            style={{ willChange: "transform", lineHeight: 0, margin: 0, padding: 0 }}
          >
            {Array(3).fill("/svg/t2.svg").map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Text 2"
                className="svg-row"
                style={{ display: 'block', verticalAlign: 'top', lineHeight: 0, margin: '0 10px', padding: 0 }}
              />
            ))}
          </div>
        </div>

        {/* Третья строка - t3.svg слева направо */}
        <div className="overflow-hidden whitespace-nowrap scrolling-row" style={{ lineHeight: 0, margin: 0, padding: 0, display: 'block', height: 'auto' }}>
          <div
            ref={row3Ref}
            className="inline-flex"
            style={{ willChange: "transform", lineHeight: 0, margin: 0, padding: 0 }}
          >
            {Array(3).fill("/svg/t3.svg").map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Text 3"
                className="svg-row"
                style={{ display: 'block', verticalAlign: 'top', lineHeight: 0, margin: '0 10px', padding: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
