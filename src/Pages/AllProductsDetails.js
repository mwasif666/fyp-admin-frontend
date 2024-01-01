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
      console.log("jgdfkjgldf", productsList);
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


const [product , setProduct] = useState([])
const [loading  , setLoading]= useState(true)
  const getProduct = async()=>{
    setLoading(true)
    let response  = await fetch(`http://localhost:5000/api/prod/v1/getproduct`,{
      method:"GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjY1ODMzZWRiZjU4MzE3ZGMzYzg5MTQyMCIsImlhdCI6MTcwMzEwMDE1OH0.xqQ7ykJAGEwW_-DOuTps0GCpK4nU4Hra40d-g4TGGR8",
      },
    })
    let res  = await response.json();
    console.log(res);
    if(res.success){
      setLoading(false)
      setProduct(res.product)
      console.log(product);
    }else{
      alert(res.status)
    }
  }
  useEffect(()=>{
    getProduct()
  },[])
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
                        <DropdownItem onClick={() => deleteProduct(index)}>
                          Delete
                        </DropdownItem>
                        <DropdownItem onClick={() => openEditModal(index)}>
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
          <Table className="Table-Edit">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Color</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <th className="img-file">
                <img
                  htmlFor="fileInput"
                  className="custom-file-upload"
                  src={editImage}
                  alt="Edited Product"
                  style={{ maxWidth: "80px", cursor: "pointer" }}
                  onClick={() => document.getElementById("fileInput").click()}
                />
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </th>
              <td>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </td>
            </tbody>
          </Table>
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

export default AllProductDetails;
