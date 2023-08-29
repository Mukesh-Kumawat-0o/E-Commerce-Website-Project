import React from "react";
import "./category.scss";
import { useNavigate } from "react-router-dom";
function Category({ category }) {
  const navigate = useNavigate();
  return (
    <div
      className="category"
      style={{
        backgroundImage: `url(${category.attributes.image.data.attributes.url})`,
      }}
      onClick={() => navigate(`/collection/${category.attributes.key}`)}
    >
      <div className="category-text center">
        <h3 className="heading">{category.attributes.title}</h3>
      </div>
    </div>
  );
}

export default Category;
