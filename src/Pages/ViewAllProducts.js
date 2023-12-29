import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AllProducts.css";

const ViewAllProduct = () => {
  const { index } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch the product data from localStorage or an API and set it to the state
    const storedProducts = JSON.parse(localStorage.getItem("Products")) || [];
    setFilteredProducts(storedProducts);
  }, []);

  const product = filteredProducts[index];

  return (
    <div>
      {product ? (
        <div className="View-information">
          <h2 className="text-center py-5">Product Information</h2>
          <div className="img-div-view-product">
            <img src={product.productImage} alt="" />
          </div>
          <p className="py-2">Name: {product.productName}</p>
          <p>Price: {product.productPrice}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ViewAllProduct;
