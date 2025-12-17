"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [waveScrolled, setWaveScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Можно скорректировать порог по желанию
      setWaveScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Декоративные хлеба на фоне */}
      <div className={styles.waveBg} aria-hidden="true">
        <img
          src="/svg/muka_wave.svg"
          alt=""
          className={
            waveScrolled
              ? `${styles.waveSvg} ${styles.waveScrolled}`
              : styles.waveSvg
          }
        />
      </div>
      <div className={styles.breadsBg} aria-hidden="true">
        <img src="/img/bread_.png" alt="" className={styles.breadMain} />
        <img src="/img/bread_1.png" alt="" className={styles.bread1} />
        <img src="/img/bread_min.png" alt="" className={styles.breadMin} />
        <img src="/img/bread_micro.png" alt="" className={styles.breadMicro} />
      </div>
      {/* Декор колосьев (только на десктопе) */}
      <div className={`${styles.wheatDecor} ${styles.wheatLeft}`}>
        <img
          src="/img/l_wheat.png"
          alt=""
          className="w-full h-auto select-none"
          draggable={false}
        />
      </div>
      <div className={`${styles.wheatDecor} ${styles.wheatRight}`}>
        <img
          src="/img/r_wheat.png"
          alt=""
          className="w-full h-auto select-none"
          draggable={false}
        />
      </div>

      <div className={styles.content}>
        {/* МОБИЛЬНАЯ ВЕРСИЯ */}
        <div className={styles.mobileLayout}>
          <div className={styles.mobileImageContainer}>
            <div className={styles.imageGradient} />
            <div className={`${styles.heartImage} ${styles.heartbeat}`}>
              <Image
                src="/img/heart.png"
                alt="Хлеб в форме сердца"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 767px) 100vw, 500px"
              />
            </div>
          </div>

          <div className={styles.mobileTextContainer}>
            <h1 className={styles.title}>
              Безглютеновая<br />
              пекарня<br />
              в Москве
            </h1>
            <Link href="#products" className={styles.button}>
              Каталог продукции
            </Link>
          </div>
        </div>

        {/* ДЕСКТОПНАЯ ВЕРСИЯ */}
        <div className={styles.desktopLayout}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              Безглютеновая<br />
              пекарня<br />
              в Москве
            </h1>
            <Link href="#products" className={styles.button}>
              Каталог продукции
            </Link>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.imageGradient} />
            <div className={`${styles.heartImage} ${styles.heartbeat}`}>
              <Image
                src="/img/heart.png"
                alt="Хлеб в форме сердца"
                fill
                className="object-contain"
                priority
                sizes="(min-width: 1024px) 800px, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}