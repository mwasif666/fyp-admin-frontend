import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const signup = async (name, email, phone, password) => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/auth/resturantsignup", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ name, email, phone, password }),
  //       });

  //       const data = await response.json();
  //       if (data.success && data.authToken) {
  //         setUserToken(data.authToken);
  //         localStorage.setItem("authToken", data.authToken);
  //         navigation("/createRestaurant");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const getProduct = async () => {
    setIsLoading(true);
    let response = await fetch(`http://localhost:5000/api/prod/v1/getproduct`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjY1ODMzZWRiZjU4MzE3ZGMzYzg5MTQyMCIsImlhdCI6MTcwMzEwMDE1OH0.xqQ7ykJAGEwW_-DOuTps0GCpK4nU4Hra40d-g4TGGR8", // this token comes from you cookies or localstorage
      },
    });
    let res = await response.json();
    if (res.success) {
      setProduct(res.product);
      setIsLoading(false);
    } else {
      alert(res.status);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getProduct();
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/v1/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (data.success && data.authToken) {
        setUserToken(data.authToken);
        setUser(data.logedInUser);
        localStorage.setItem("auth-token", data.authToken);
        localStorage.setItem("user-details", JSON.stringify(data.logedInUser));
        navigation("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-details");
    navigation("/login");
  };

  const isLoggedIn = () => {
    setLoading(true);
    let authToken = localStorage.getItem("auth-token");
    let user = JSON.parse(localStorage.getItem("user-details"));
    setUserToken(authToken);
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, [userToken]); // No need to include userToken as a dependency

  if (loading) {
    // You can show a loading spinner or placeholder while userToken is being fetched
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        userToken,
        logout,
        isLoggedIn,
        user,
        setIsLoading,
        isLoading,
        product,
        setProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
