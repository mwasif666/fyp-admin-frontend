import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import ProductState from "./context/product/ProductState";
import DeleteProduct from "./Pages/DeleteProduct";
import CreateUser from "./Pages/CreateUser";
import Orders from "./Pages/Orders";
import AllProducts from "./Pages/AllProducts";
import ViewAllProducts from "./Pages/ViewAllProducts";
import Emailbox from "./Pages/Emailbox";

function App() {
  return (
    <>
      <ProductState>
        <Router>
          <Sidebar>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route
                exact
                path="/product/addproduct"
                element={<AddProduct />}
              />
              <Route
                exact
                path="/product/allproducts"
                element={<AllProducts />}
              />
              <Route
                exact
                path="/product/updateproduct"
                element={<UpdateProduct />}
              />
              <Route
                exact
                path="/product/deleteproduct"
                element={<DeleteProduct />}
              />
              <Route exact path="/createuser" element={<CreateUser />} />
              <Route exact path="/createinvoice" element={<Orders />} />
              <Route
                exact
                path="/ViewAllProducts/:index"
                element={<ViewAllProducts />}
              />
              <Route exact path="/emailbox" element={<Emailbox />} />
            </Routes>
          </Sidebar>
        </Router>
      </ProductState>
    </>
  );
}

export default App;
