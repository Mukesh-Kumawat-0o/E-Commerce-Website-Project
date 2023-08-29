import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Collection from "./pages/collection/Collection";
import Footer from "./components/footer/Footer";
import ProductDetail from "./pages/productDetail/productDetail";
import { useDispatch } from "react-redux";
import { fetchCategoryData } from "./redux/slices/CategorySlice";
import { useEffect } from "react";
import Payments from "./components/payments/Payments";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, []);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection/:collectionid?" element={<Collection />} />
        <Route path="/singleproduct/:productid" element={<ProductDetail />} />
        <Route path="/payments/:status" element={<Payments />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
