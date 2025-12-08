"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-primary via-primary-light to-primary flex items-center justify-center pt-24">
      <style jsx>{`
        .heartbeat {
          animation: heartbeat 2.4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.04); }
          40% { transform: scale(0.98); }
          60% { transform: scale(1.05); }
          80% { transform: scale(0.99); }
        }
      `}</style>
      {/* Радиальный градиент на фоне */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "1200px",
          height: "1200px",
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)",
        }}
      />

      {/* Декор колосьев по краям (фиксированные) */}
      <div className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 pointer-events-none z-[5]">
        <img
          src="/img/l_wheat.png"
          alt=""
          className="w-[180px] xl:w-[220px] select-none"
          draggable={false}
        />
      </div>
      <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 pointer-events-none z-[5]">
        <img
          src="/img/r_wheat.png"
          alt=""
          className="w-[200px] xl:w-[240px] select-none"
          draggable={false}
        />
      </div>

      {/* Мобильная версия: картинка сверху, текст снизу */}
      <div className="md:hidden w-full px-4 flex flex-col items-center relative z-10 pt-4">
        {/* Картинка с радиальным градиентом */}
        <div className="w-full max-w-md mb-4 relative">
          {/* Радиальный градиент под картинкой */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            style={{
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 70%)",
            }}
          />
          <div className="aspect-square relative z-10 heartbeat">
            <Image
              src="/img/heart.png"
              alt="Хлеб в форме сердца"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Текст */}
        <div className="text-white text-center space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Безглютеновая <br />
            пекарня <br />
            в Москве
          </h1>
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden md:flex w-full px-4 py-8 relative z-10 min-h-[600px]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-8 lg:gap-12">
          {/* Левая колонка - текст */}
          <div className="text-white space-y-8 flex-shrink-0 w-2/5">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Безглютеновая <br />
              пекарня <br />
              в Москве
            </h1>
            <div>
              <Link
                href="#products"
                className="inline-block px-8 py-3 border-2 border-white rounded-full hover:bg-white hover:text-primary transition-all text-lg font-medium"
              >
                Каталог продукции
              </Link>
            </div>
          </div>

          {/* Правая колонка - изображение хлеба в форме сердца */}
          <div className="relative flex items-center justify-center flex-shrink-0 w-3/5 h-full">
            {/* Радиальный градиент под картинкой */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
              style={{
                width: "800px",
                height: "800px",
                background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 40%, transparent 70%)",
              }}
            />
            <div className="relative w-full max-w-2xl aspect-square heartbeat z-10">
              <Image
                src="/img/heart.png"
                alt="Хлеб в форме сердца"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
