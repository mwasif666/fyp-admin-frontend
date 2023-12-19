import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import "./AllProducts.css";

const AllProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImageFile, setProductImageFile] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("Products") !== null) {
      let fetchProducts = JSON.parse(localStorage.getItem("Products"));
      setProductsList(fetchProducts);
      console.log("jgdfkjgldf", productsList);
      let fetchUser = JSON.parse(localStorage.getItem("AuthenticatedUser"));
      setAuthUser(fetchUser);
    } else {
      localStorage.setItem("Products", JSON.stringify([]));
    }
  }, []);

  const deleteProduct = (index) => {
    let productListClone = [...productsList];
    productListClone.splice(index, 1);
    setProductsList(productListClone);
    localStorage.setItem("Products", JSON.stringify(productListClone));
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setEditName(productsList[index].productName);
    setEditPrice(productsList[index].productPrice);
    setEditImage(productsList[index].productImage);
    setEditModal(true); // Open the edit modal
  };

  const saveEditedProduct = () => {
    if (editIndex !== null) {
      let productListClone = [...productsList];
      productListClone[editIndex] = {
        ...productListClone[editIndex],
        productName: editName,
        productPrice: editPrice,
        productImage: editImage,
      };
      setProductsList(productListClone);
      localStorage.setItem("Products", JSON.stringify(productListClone));
      setEditIndex(null);
      setEditModal(false); // Close the edit modal
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditImage(reader.result);
      setEditImageFile(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
    resetEditForm(); // Reset form fields when edit modal closes
  };

  const resetEditForm = () => {
    setEditName("");
    setEditPrice("");
    setEditImage("");
    setEditImageFile(null);
  };

  const openAddProductModal = () => {
    setAddModal(true);
  };

  const toggleAddModal = () => {
    setAddModal(!addModal);
    resetAddForm(); // Reset form fields when add modal closes
  };

  const resetAddForm = () => {
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage("");
    setProductImageFile(null);
  };

  const handleAddProduct = () => {
    const newProduct = {
      productName,
      productPrice,
      productDescription,
      productImage,
      vendorId: "waleed4",
    };

    const updatedProductsList = [...productsList, newProduct];
    setProductsList(updatedProductsList);
    localStorage.setItem("Products", JSON.stringify(updatedProductsList));

    toggleAddModal(); // Close the add modal after adding a new product
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductImage(reader.result);
      setProductImageFile(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
      const res = await fetch(`http://localhost:5000/api/add/addproduct`, {
        method: "POST",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjY1MzE4MDRmODI3MzFiODMwYWE5Y2JlYyIsImlhdCI6MTY5OTcyOTQ4NH0.ZBqKe45MnPGQ-NejNspK2VIaOgDgXNrqTaoDtW8pHdc", // Add your actual auth token
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
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <h1> All Products </h1>
      <Button color="success" onClick={openAddProductModal}>
        Add Product
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {productsList.lenght === 0 ? (
            <tr>
              <td colSpan="5">Data Not Found! 😢</td>
            </tr>
          ) : (
            productsList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={item.productImage}
                      alt="Product"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.productPrice}</td>
                  <td>
                    <Button color="danger" onClick={() => deleteProduct(index)}>
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => openEditModal(index)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <Modal
        isOpen={editModal}
        toggle={toggleEditModal}
        className="modals-input"
      >
        <ModalHeader toggle={toggleEditModal}>Edit Product</ModalHeader>
        <ModalBody>
          <img
            src={editImage}
            alt="Edited Product"
            style={{ maxWidth: "200px" }}
          />
          <input type="file" onChange={handleImageChange} />
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="text"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveEditedProduct}>
            Save
          </Button>
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={addModal} toggle={toggleAddModal} className="modals-input">
        <ModalHeader toggle={toggleAddModal}>Add New Product</ModalHeader>
        <ModalBody>
          <div className="container">
            <h2 className="text-4xl mt-2 mb-4">Add Product</h2>
            <form className="">
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
                  <option value="entertainment">Entertainment</option>
                  <option value="electronic">Electronic</option>
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="tv-led">Tv and LED</option>
                  <option value="laptop-computer">Laptop & Computer</option>
                  <option value="recommended">Recommended</option>
                </select>
              </div>

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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddProduct}>
            Save
          </Button>
          <Button color="secondary" onClick={toggleAddModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AllProducts;
