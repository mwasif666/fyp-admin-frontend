import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

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

  const login = async (userData) => {
    console.log(userData);
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
        setUser(data.logedInUser)
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
    localStorage.removeItem("authToken");
    navigation("/login");
  };

  const isLoggedIn = async () => {
    try {
      setLoading(true);
      let userTokenValue = await localStorage.getItem("auth-token");
      let userValue = await localStorage.getItem("user-details");
      setUserToken(userTokenValue);
      setUser(userValue)
      setLoading(false);
    } catch (e) {
      console.log(`some error occurred ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []); // No need to include userToken as a dependency

  if (loading) {
    // You can show a loading spinner or placeholder while userToken is being fetched
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ login, userToken, logout, isLoggedIn , user }}>
      {children}
    </AuthContext.Provider>
  );
};
