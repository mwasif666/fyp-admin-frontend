// export default App;
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import AddProduct from "./Pages/AddProduct";
import CreateUser from "./Pages/CreateUser";
import Orders from "./Pages/Orders";
import AllProducts from "./Pages/AllProducts";
import ViewAllProducts from "./Pages/ViewAllProducts";
import Emailbox from "./Pages/Emailbox";
import LoginPage from "./Pages/LoginPage";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { userToken } = useContext(AuthContext);
  console.log(userToken);
  return (
    <>
      <Router>
        <AuthProvider>
          
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

                <Route exact path="/createuser" element={<CreateUser />} />
                <Route exact path="/createinvoice" element={<Orders />} />
                <Route exact path="/login" element={<LoginPage />} />
              
                <Route
                  exact
                  path="/ViewAllProducts/:id"
                  element={<ViewAllProducts />}
                />
                <Route exact path="/emailbox" element={<Emailbox />} />
              </Routes>
            </Sidebar>
  {/*          
              <Routes>
                <Route exact path="/login" element={<LoginPage />} />
              </Routes> */}
       
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;