import React, { useEffect, useState } from "react";
import "./collection.scss";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";

function Collection() {
  const [collectid, setcollectid] = useState(null);
  const [product, setproduct] = useState(null);
  const [sortBy, setsortBy] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const categories = useSelector(
    (state) => state.categorySliceReducer.categories
  );

  const sortList = [
    {
      value: "Newest First",
      sort: "createdAT",
    },
    { value: "Price-Low to High", sort: "price" },
  ];

  async function fetchProduct() {
    const url = params.collectionid
      ? `/products?populate=image&filters[category][key][$eq]=${params.collectionid}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;

    const response = await axiosClient.get(url);

    setproduct(response.data.data);

    // console.log("COLLECTION PRODUCT DATA =>>>", response);
  }

  useEffect(() => {
    setcollectid(params.collectionid);
    fetchProduct();
  }, [params, sortBy]);

  function updateCollection(e) {
    navigate(`/collection/${e.target.value}`);
  }

  return (
    <div className="collection">
      <div className="container">
        <div className="headder">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p className="sub-heading">
              India's largest collection of wall posters for your bedroom,
              living room, kids room, kitchen and posters & art prints at
              highest quality lowest price guaranteed.
            </p>
          </div>
          <div className="sort-by-container">
            <h3 className="sort-by-text">Sort By</h3>
            <select
              className="select-sort-by"
              name="sort-by"
              id="sort-by"
              onClick={(e) => setsortBy(e.target.value)}
            >
              {sortList.map((item) => (
                <option className="options" key={item.sort} value={item.sort}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="collection-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    type="radio"
                    name="collection"
                    value={item.attributes.key}
                    id={item.id}
                    checked={item.attributes.key === collectid}
                    onChange={updateCollection}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="products-box">
            {product?.map((item) => (
              <Product key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
