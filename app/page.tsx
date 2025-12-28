import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScrollingIcons from "./components/ScrollingIcons";
import ProductsSection from "./components/ProductsSection";
import AboutSectionClient from "./components/AboutSectionClient";
import NewsSection from "./components/NewsSection";
import HeartSection from "./components/HeartSection";
import FooterClient from "./components/FooterClient";

export default function Home() {
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
      </main>
      <FooterClient />
    </>
  );
}
