import React, { useState } from "react";

const CreateUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cnic: "",
    DOB: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.cnic ||
      !user.phoneNumber ||
      !user.password
    ) {
      alert("Please fill in all required fields with valid lengths.");
      return;
    }

    try {
      let res = await fetch("http://localhost:5000/api/auth/v1/adminsignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1YWU5NGUxZWE2NDQ3NGY2NjA2N2ViZSIsImZpcnN0TmFtZSI6IndhbGVlZCIsImVtYWlsIjoid2FsZWVkZ2hvcmk0QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDMyMjI4MTE1NzkifSwiaWF0IjoxNzA1OTQwMTkzfQ.hs0shDZ-dA07Y0d1e69gZiAXAaKqtlfyMVhELZYeMXA",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          cnic: user.cnic,
          DOB: user.DOB,
          phoneNumber: user.phoneNumber,
          address: user.address,
          password: user.password,
        }),
      });
      let response = await res.json();
      console.log(response);
      if (response.success) {
        alert(response.message);
      } else {
        alert(response.message || response.errors[0].msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2 className="text-4xl mt-2 mb-4">Create User</h2>
      <form className="">
        <div className="mb-3 flex flex-col">
          <label for="product name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="firstName"
            value={user.firstName}
            name="firstName"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label for="productcategory" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="lastName"
            value={user.lastName}
            name="lastName"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label for="productcategory" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="email"
            value={user.email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label for="productqunatity" className="form-label">
            Cnic
          </label>
          <input
            type="number"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="cnic"
            value={user.cnic}
            name="cnic"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label for="productcategory" className="form-label">
            Date of birth
          </label>
          <input
            type="text"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="DOB"
            value={user.DOB}
            name="DOB"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label for="productcategory" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="phoneNumber"
            value={user.phoneNumber}
            name="phoneNumber"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label for="productdiscount" className="form-label">
            Address
          </label>
          <textarea
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="address"
            value={user.address}
            name="address"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label for="productcompany" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="password"
            value={user.password}
            name="password"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn addcolor p-2 text-white rounded mt-2"
          onClick={handleClick}
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
