import Header from "./components/Header";
import TestDirectus from "./TestDirectus";
import HeroSection from "./components/HeroSection";
import ScrollingIcons from "./components/ScrollingIcons";
import ProductsSection from "./components/ProductsSection";
import AboutSectionClient from "./components/AboutSectionClient";
import NewsSection from "./components/NewsSection";
import HeartSection from "./components/HeartSection";
import FooterClient from "./components/FooterClient";

export const revalidate = 60; // ISR: обновлять раз в минуту

export default async function Home() {
  // Пример SSR/ISR: можно получать данные через sdk
  // const header = await sdk.header();
  // const products = await sdk.products();
  // ...
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ScrollingIcons />
        <ProductsSection />
        <AboutSectionClient />
        <NewsSection />
        <HeartSection />
        <TestDirectus />
      </main>
      <FooterClient />
    </>
  );
}
