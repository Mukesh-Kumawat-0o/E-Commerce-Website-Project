import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
import "./home.scss";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Home() {
  const categories = useSelector(
    (state) => state.categorySliceReducer.categories
  );
  const [topProduct, settopProduct] = useState(null);

  async function fetchData() {
    const productResponse = await axiosClient.get(
      "/products?filters[isTopPic][$eq]=true&populate=image"
    );

    settopProduct(productResponse.data.data);

    // console.log("CATEGORY REASPONSE =>> ", categoryResponse.data.data);
    // console.log("PRODUCTS REASPONSE =>> ", productResponse.data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our Film and TV Posters Collection.
          </p>
        </div>
        <div className="content">
          {categories?.map((item) => (
            <Category key={item.id} category={item} />
          ))}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">All New Designs, Same Old Details.</p>
        </div>
        <div className="content">
          {topProduct?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
