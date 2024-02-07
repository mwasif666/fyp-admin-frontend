// export default App;
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import AddProduct from "./Pages/AddProduct";
import CreateUser from "./Pages/CreateUser";
import Orders from "./Pages/Orders";
import AllProducts from "./Pages/AllProducts";
import ViewAllProducts from "./Pages/ViewAllProducts";
import Emailbox from "./Pages/Emailbox";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./Store/authSlice";
import NotFound from "./Pages/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);
  const { authToken } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <AuthProvider>
          {authToken ? (
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
                <Route exact path="*" element={<NotFound />} />
                <Route exact path="/createinvoice" element={<Orders />} />
                {/* <Route exact path="/login" element={<LoginPage />} /> */}

                <Route
                  exact
                  path="/ViewAllProducts/:id"
                  element={<ViewAllProducts />}
                />
                <Route exact path="/emailbox" element={<Emailbox />} />
              </Routes>
            </Sidebar>
          ) : (
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
