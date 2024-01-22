// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./Pages/Dashboard";
// import Sidebar from "./Components/Sidebar";
// import AddProduct from "./Pages/AddProduct";
// import UpdateProduct from "./Pages/UpdateProduct";
// import ProductState from "./context/product/ProductState";
// import DeleteProduct from "./Pages/DeleteProduct";
// import CreateUser from "./Pages/CreateUser";
// import Orders from "./Pages/Orders";
// import AllProducts from "./Pages/AllProducts";
// import ViewAllProducts from "./Pages/ViewAllProducts";
// import Emailbox from "./Pages/Emailbox";
// import LoginPage from "./Pages/LoginPage";

// function App() {
//   const isLoggedIn = false; // Replace this with your authentication logic (true if logged in, false if not)

//   return (
//     <>
//       <ProductState>
//         <Router>
//           {/* Sidebar outside of the routes */}
//           {isLoggedIn && <Sidebar />}

//           <Routes>
//             {!isLoggedIn && <Route path="/" element={<App2 />} />}

//             {isLoggedIn && (
//               <>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/product/addproduct" element={<AddProduct />} />
//                 <Route path="/product/allproducts" element={<AllProducts />} />
//                 <Route
//                   path="/product/updateproduct"
//                   element={<UpdateProduct />}
//                 />
//                 <Route
//                   path="/product/deleteproduct"
//                   element={<DeleteProduct />}
//                 />
//                 <Route path="/createuser" element={<CreateUser />} />
//                 <Route path="/createinvoice" element={<Orders />} />
//                 <Route
//                   path="/ViewAllProducts/:index"
//                   element={<ViewAllProducts />}
//                 />
//                 <Route path="/emailbox" element={<Emailbox />} />
//               </>
//             )}
//           </Routes>
//         </Router>
//       </ProductState>
//     </>
//   );
// }

// export default App;
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
import LoginPage from "./Pages/LoginPage";

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
              <Route exact path="/login" element={<LoginPage />} />
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
