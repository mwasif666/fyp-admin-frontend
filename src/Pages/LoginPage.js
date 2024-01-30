import React, { useContext, useEffect, useState } from "react";
import "./LoginPage.css"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { useDispatch, useSelector } from "react-redux";
// import { isLoggedIn, login } from "../Store/authSlice";


const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  // const { authToken } = useSelector((state) => state.auth) || {};
  const navigate = useNavigate();
  const { login, userToken } = useContext(AuthContext);
  
  const handleChange = (e) => {
    if (e.target.name === "phoneNumber") {
      setPhoneNumber(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    login({phoneNumber, password});
    // dispatch(login({ phoneNumber, password }))
    //   .then((response) => {
    //     if (response.payload && response.payload.success) {
    //       alert(response.payload.message);
    //       localStorage.setItem("auth-token",response.payload.authToken)
    //       localStorage.setItem("user-details", JSON.stringify(response.payload.logedInUser));
    //       setPhoneNumber("")
    //       setPassword("")
    //       navigate('/')
           
    //     }else{
    //       alert(response.payload.message || response.payload.errors[0].msg );
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  // useEffect(()=>{
  //   if (userToken) {
  //      navigate('/')
  //   }
  // })
 
  return (
    <div className="main-login-screen">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden login-screen">
        <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#101118] underline">
           
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label
                    htmlFor="text"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-[#101118] bg-white border rounded-md focus:border-[#101118] focus:ring-[#101118] focus:outline-none focus:ring focus:ring-opacity-40 login-input"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    placeholder="0333xxxxxxxx"
                  />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-[#101118] bg-white border rounded-md focus:border-[#101118] focus:ring-[#101118] focus:outline-none focus:ring focus:ring-opacity-40 login-input"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="*********"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <button
                onClick={handleClick}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#101118] rounded-md hover:bg-[#101118]e-600 focus:outline-none focus:bg-[#101118]"
              >
                Login
              </button>
            </div>
            {/* <div className="text-center ms-5 mt-4">
            <p>
              Don't have an account? <Link to="/SignupPage">Singup</Link>
            </p>
          </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
