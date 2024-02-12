import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ApplicationsTable = () => {
  const { userToken } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProd = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/order/v1/getorder?orderStatus=Pending`,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjYyOGU2NWFiOWJkNDYzN2Q4MjRjNCIsImZpcnN0TmFtZSI6Ildhc2lmIiwiZW1haWwiOiJ3YXNpNjY2MjU0MjZAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwMzQ2MTEyMDk3OCIsImlhdCI6MTcwNjY4MzU4N30.j78Jqlo2QOg8w8-rAw5bFcFieVqj_1S4SmK4uH7GyJE",
          },
        }
      );
      const data = await res.json();
      console.log("fdgdfgfdgdf", data);
      setOrderDetails(data.orders);
      setLoading(false);
      console.log(orderDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProd();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="card shadow border-0 mb-7">
        <div className="card-header">
          <h5 className="mb-0">Orders</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-nowrap">
            <thead className="thead-light">
              <tr>
                <th scope="col">Order No.</th>
                <th scope="col">Image 1</th>
                <th scope="col">Image 2</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Color</th>
                <th scope="col">C. Name</th>
                <th scope="col">C. Phone</th>
                <th scope="col">City</th>
                <th scope="col">S. Address</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderDetails &&
                orderDetails.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.orderNo}</td>
                      <td>
                        <img
                          alt="..."
                          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                          className="avatar avatar-sm rounded-circle me-2"
                        />
                      </td>
                      <td>
                        <img
                          alt="..."
                          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                          className="avatar avatar-sm rounded-circle me-2"
                        />
                      </td>
                      <td>{item.prodTitle}</td>
                      <td>{item.totalPrice}</td>
                      <td>{item.totalQty}</td>
                      <td>{item.prodColor}</td>
                      <td>{item.cusName}</td>
                      <td>{item.phoneNo}</td>
                      <td>{item.city}</td>
                      <td>{item.shippingAddress}</td>
                      <td>{item.Date}</td>
                      <td>{item.orderStatus}</td>

                      <td className="text-end">
                        <p className="btn btn-sm btn-neutral">View</p>
                        <button
                          type="button"
                          className="btn btn-sm btn-square btn-neutral text-danger-hover"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {/* More table rows can be added here */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApplicationsTable;
