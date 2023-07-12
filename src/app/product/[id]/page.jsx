import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";
import TopBar from "@/components/TopBar";
import React from "react";
import "../../../styles/product.css";

import RelatedProducts from "@/components/RelatedProducts";
import useServerFetch from "@/utils/useServerFetch";
import ProductView from "@/components/SingleProduct/ProductView";

export default async function Product({ params }) {
  const data = await useServerFetch(`/products/${params.id}?populate=*`);

  return (
    <div>
      <TopBar />

      <div className="mainViewProduct">
        <ProductView data={data} />
      </div>

      <RelatedProducts
        Cat={data?.data?.attributes?.categories?.data[0]?.attributes?.title}
        id={params.id}
      />

      <NewsLetter />
      <Footer />
    </div>
  );
}

export const generateMetadata = async ({ params }) => {
  const data = await useServerFetch(`/products/${params.id}`);

  return {
    title: data?.data?.attributes?.title,
    description: data?.data?.attributes?.description,
  };
};
