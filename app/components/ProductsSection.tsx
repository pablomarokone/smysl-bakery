"use client";

import ProductsCarousel from "./ProductsCarousel/ProductsCarousel";
import styles from "./ProductsSection.module.css";

export default function ProductsSection() {
  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        {/* Заголовок */}
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            Наша выпечка <br />и десерты
          </h2>
        </div>

        {/* Карусель */}
        <div className={styles.carouselWrapper}>
          <ProductsCarousel />
        </div>
      </div>
    </section>
  );
}