import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div>
          <h2>Product Information</h2>
          <img src={product.productImage} alt="" />
          <p>Name: {product.productName}</p>
          <p>Price: {product.productPrice}</p>
          {/* Display other product details */}
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ViewAllProduct;
