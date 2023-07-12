import Footer from "@/components/Footer";
import HeroContainer from "@/components/HeroContainer";
import NewsLetter from "@/components/NewsLetter";
import TopBar from "@/components/TopBar";
import TopCategories from "@/components/TopCategories";
import TopProducts from "@/components/TopProducts";

export default function Home() {
  return (
    <>
      <TopBar />
      <HeroContainer />
      <TopCategories />
      <TopProducts />
      <NewsLetter />
      <Footer />
    </>
  );
}
