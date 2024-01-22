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
import {
  DropdownItem,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AllProductDetails = () => {
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
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (localStorage.getItem("Products") !== null) {
      let fetchProducts = JSON.parse(localStorage.getItem("Products"));
      setProductsList(fetchProducts);
      let fetchUser = JSON.parse(localStorage.getItem("AuthenticatedUser"));
      setAuthUser(fetchUser);
    } else {
      localStorage.setItem("Products", JSON.stringify([]));
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = productsList.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteProduct = (index) => {
    let productListClone = [...productsList];
    productListClone.splice(index, 1);
    setProductsList(productListClone);
    localStorage.setItem("Products", JSON.stringify(productListClone));
  };

  const saveEditedProduct = () => {};

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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(!dropdownOpen);
    setSelectedItemIndex(index);
  };

  const [viewModal, setViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Other state variables and useEffect...

  const openViewModal = (product) => {
    setSelectedProduct(product);
    setViewModal(true);
  };

  // this is get product code
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [id, setId] = useState("");

  const getProduct = async () => {
    setLoading(true);
    let response = await fetch(`http://localhost:5000/api/prod/v1/getproduct`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjY1ODMzZWRiZjU4MzE3ZGMzYzg5MTQyMCIsImlhdCI6MTcwMzEwMDE1OH0.xqQ7ykJAGEwW_-DOuTps0GCpK4nU4Hra40d-g4TGGR8", // this token comes from you cookies or localstorage
      },
    });
    let res = await response.json();
    if (res.success) {
      setLoading(false);
      setProduct(res.product);
    } else {
      alert(res.status);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  // Edit product api code comes here

  const openEditModal = (index, id) => {
    setEditModal(true);
    setId(id); // Open the edit modal
  };

  const handChange = (e) => {
    if (e.target.name === "prodTitle") setProdTitle(e.target.value);
    if (e.target.name === "prodDesc") setProdDesc(e.target.value);
    if (e.target.name === "prodPrice") setProdPrice(e.target.value);
    if (e.target.name === "prodQty") setProdQty(e.target.value);
    if (e.target.name === "prodSize") setProdSize(e.target.value);
    if (e.target.name === "prodColor") setProdColor(e.target.value);
    if (e.target.name === "prodCategory") setProdCategory(e.target.value);
    if (e.target.name === "productFeatured") setProductFeatured(e.target.value);
  };

  const handleFileChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };
  const updateProd = async (e) => {
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
      let response = await fetch(
        `http://localhost:5000/api/prod/v1/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjY1ODMzZWRiZjU4MzE3ZGMzYzg5MTQyMCIsImlhdCI6MTcwMzEwMDE1OH0.xqQ7ykJAGEwW_-DOuTps0GCpK4nU4Hra40d-g4TGGR8", // this token comes from you cookies or localstorage
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert(`${data.message}`);
        // Reset form fields after successful update
        setProdTitle("");
        setProdDesc("");
        setProdPrice("");
        setProdQty("");
        setProdColor("");
        setProdSize("");
        setProdCategory("");
        setProductFeatured("");
        setProdImg1("");
        setProdImg2("");
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(error);
      alert("Something went wrong in updateing prod form frontend wh!");
    }
  };

  // For Delete Prod
  const deleteProd = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/prod/v1/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjY1ODMzZWRiZjU4MzE3ZGMzYzg5MTQyMCIsImlhdCI6MTcwMzEwMDE1OH0.xqQ7ykJAGEwW_-DOuTps0GCpK4nU4Hra40d-g4TGGR8", // this token comes from you cookies or localstorage
          },
        }
      );
      let res = await response.json();
      if (res.success) {
        let updateProdList = product.filter((x) => x._id !== id);
        setProduct(updateProdList);
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if loading equal to true then we show loading ...
  if (loading) {
    return <h1 className="text-xl m-5 p-5 font-bold">Loading....</h1>;
  }

  return (
    <>
      <div className="add_search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button color="success" onClick={openAddProductModal}>
          Add Product
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Images</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Color</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.length === 0 ? (
            <tr>
              <td colSpan="5">Data Not Found! 😢</td>
            </tr>
          ) : (
            product.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={item.productImage} />
                  </td>
                  <td>{item.prodTitle}</td>
                  <td>{item.prodPrice}</td>
                  <td>{item.prodQty}</td>
                  <td>{item.prodColor}</td>
                  <td>{item.prodCategory}</td>
                  <td>
                    <Dropdown
                      isOpen={dropdownOpen && selectedItemIndex === index}
                      toggle={() => toggleDropdown(index)}
                    >
                      <DropdownToggle
                        caret={false}
                        className="custom-dropdown-toggle"
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          className="text-lg"
                          onClick={() => deleteProd(item._id)}
                        >
                          Delete
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => openEditModal(index, item._id, item)}
                        >
                          Edit
                        </DropdownItem>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                          {/* <DropdownItem onClick={() => openViewModal(item)}>
                            View
                          </DropdownItem> */}
                          <DropdownItem>
                            <Link to={`/ViewAllProducts/${index}`}>View</Link>
                          </DropdownItem>
                        </Dropdown>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <Modal isOpen={viewModal} toggle={() => setViewModal(!viewModal)}>
        <ModalHeader toggle={() => setViewModal(!viewModal)}>
          Product Details
        </ModalHeader>
        <ModalBody>
          <div>
            {/* Ensure the 'selectedProduct' is available */}
            <img src={selectedProduct?.productImage} />
            <h4>{selectedProduct?.productName}</h4>
            <p>Price: {selectedProduct?.productPrice}</p>
            {/* Display other product information as needed */}
          </div>
        </ModalBody>
        <Button color="secondary" onClick={() => setViewModal(!viewModal)}>
          Close
        </Button>
      </Modal>
      <Modal
        isOpen={editModal}
        toggle={toggleEditModal}
        className="modals-input"
      >
        <ModalHeader toggle={toggleEditModal}>Edit Product</ModalHeader>
        <ModalBody>
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
                    <option value="null">~Select feature~ </option>
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
              onClick={updateProd}
            >
              Add Product
            </button>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={addModal} toggle={toggleAddModal} className="modals-input">
        <ModalHeader toggle={toggleAddModal}>Add New Product</ModalHeader>

        <ModalBody>
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
                    <option value="null">~Select feature~ </option>
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
              onClick={updateProd}
            >
              Add Product
            </button>
          </form>
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

export default AllProductDetails;
