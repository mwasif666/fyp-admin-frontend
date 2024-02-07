import React, { useState } from "react";

const AddProduct = () => {
  const [prodTitle, setProdTitle] = useState(" ");
  const [prodDesc, setProdDesc] = useState(" ");
  const [prodPrice, setProdPrice] = useState(" ");
  const [prodImg1, setProdImg1] = useState(" ");
  const [prodImg2, setProdImg2] = useState(" ");
  const [prodQty, setProdQty] = useState(" ");
  const [prodSize, setProdSize] = useState(" ");
  const [prodColor, setProdColor] = useState(" ");
  const [prodCategory, setProdCategory] = useState(" ");
  const [productFeatured, setProductFeatured] = useState(" ");

  const handChange = (e) => {
    if (e.target.name === "prodTitle") setProdTitle(e.target.value);
    if (e.target.name === "prodDesc") setProdDesc(e.target.value);
    if (e.target.name === "prodPrice") setProdPrice(e.target.value);
    // if (e.target.name === "prodImg1") setProdImg1(e.target.files[0]);
    // if (e.target.name === "prodImg2") setProdImg2(e.target.files[1]);
    if (e.target.name === "prodQty") setProdQty(e.target.value);
    if (e.target.name === "prodSize") setProdSize(e.target.value);
    if (e.target.name === "prodColor") setProdColor(e.target.value);
    if (e.target.name === "prodCategory") setProdCategory(e.target.value);
    if (e.target.name === "productFeatured") setProductFeatured(e.target.value);
  };

  const handleFileChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("prodTitle", prodTitle);
    formData.append("prodDesc", prodDesc);
    formData.append("prodPrice", prodPrice);
    formData.append("prodQty", prodQty);
    formData.append("prodColor", prodColor);
    formData.append("prodSize", prodSize);
    formData.append("prodCategory", prodCategory);
    formData.append("productFeatured", productFeatured);
    formData.append("prodImg1", prodImg1);
    formData.append("prodImg2", prodImg2);

    try {
      const res = await fetch(`http://localhost:5000/api/prod/v1/addproduct`, {
        method: "POST",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjY1ODMzZWRiZjU4MzE3ZGMzYzg5MTQyMCIsImlhdCI6MTcwMzEwMDE1OH0.xqQ7ykJAGEwW_-DOuTps0GCpK4nU4Hra40d-g4TGGR8",
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        alert("Add successfully!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <h2 className="text-4xl mt-2 mb-4">Add Product</h2>
      <form className="">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="product name" className="form-label">
                Product Title
              </label>
              <input
                type="text"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname"
                value={prodTitle}
                name="prodTitle"
                onChange={handChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productcategory" className="form-label">
                Product Description
              </label>
              <input
                type="text"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productcategory"
                value={prodDesc}
                name="prodDesc"
                onChange={handChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productcompany" className="form-label">
                Product Price
              </label>
              <input
                type="text"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productcompany"
                value={prodPrice}
                name="prodPrice"
                onChange={handChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productqunatity" className="form-label">
                Product Quantity
              </label>
              <input
                type="Number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productquantity"
                value={prodQty}
                name="prodQty"
                onChange={handChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productdiscount" className="form-label">
                Product Color
              </label>
              <input
                type="text"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productdiscount"
                value={prodColor}
                name="prodColor"
                onChange={handChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productExtradiscount" className="form-label">
                Product Size
              </label>
              <input
                type="text"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productextradiscount"
                value={prodSize}
                name="prodSize"
                onChange={handChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productExtradiscount" className="form-label">
                Product Category
              </label>
              <input
                type="text"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productextradiscount"
                value={prodCategory}
                name="prodCategory"
                onChange={handChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productExtradiscount" className="form-label">
                Product Category
              </label>
              <select
                id="cars"
                className="form-control border-2 border-slate-200 rounded mt-2"
                value={productFeatured}
                name="productFeatured"
                onChange={handChange}
              >
                <option value="null">Select feature</option>
                <option value="best-deals">Best Deals</option>
                <option value="featured">Featured</option>
                <option value="on-sale">On Sale</option>
                <option value="top-rated">Top Rated</option>
                <option value="entertainment">Accesseries</option>
                <option value="electronic">Electronic</option>
                <option value="new-arrivals">New Arrivals</option>
                <option value="tv-led">Tv and LED</option>
                <option value="laptop-computer">Laptop & Computer</option>
                <option value="recommended">Recommended</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productExtradiscount" className="form-label">
                Product Image1
              </label>
              <input
                type="file"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="prodImg1"
                name="prodImg1"
                onChange={(e) => handleFileChange(e, setProdImg1)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 flex flex-col">
              <label for="productExtradiscount" className="form-label">
                Product Image2
              </label>
              <input
                type="file"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="prodImg2"
                name="prodImg2"
                onChange={(e) => handleFileChange(e, setProdImg2)}
              />
            </div>
          </div>
        </div>
        <button
          style={{ background: "red" }}
          type="submit"
          className="btn addcolor p-2 text-white rounded mt-2"
          onClick={handleClick}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
