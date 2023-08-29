import React from "react";
import "./hero.scss";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content center">
        <h1 className="heading">Exclusive Print and ArtWork</h1>
        <p className="subheading">
          Exclusive Art Pieces, for the Exclusive You.
        </p>
        <button
          className="cta-btn btn-primary"
          onClick={() => navigate("/collection")}
        >
          Explore more
        </button>
      </div>
    </div>
  );
}

export default Hero;
