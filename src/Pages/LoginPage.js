import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [a_name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [credentials, setCredentials] = useState({a_name:"",password:""})
  const handleChange = (e) => {
    if (e.target.name === "a_name") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    // setCredentials({...credentials,[e.target.name]:e.target.value})
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const data = { a_name, password };
    // console.log("This is a credentials",credentials);
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await response.json();

    if (user.success === true) {
      localStorage.setItem("authtoken", JSON.stringify(user.authtoken));
      window.location.reload(true);
    }
    if (response.ok) {
      // props.login(a_name , password);
      // Store authentication token or session data in state
    } else {
      console.log("Login failed.");
    }
  };
  return (
    <div className="main-login-screen">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden login-screen">
        <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#101118] underline">
            Sign in
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label
                    htmlFor="text"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    User Name
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-[#101118] bg-white border rounded-md focus:border-[#101118] focus:ring-[#101118] focus:outline-none focus:ring focus:ring-opacity-40 login-input"
                    name="a_name"
                    value={a_name}
                    onChange={handleChange}
                    placeholder="mwasi6662"
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
