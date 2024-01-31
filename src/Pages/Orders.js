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
            "auth-token": userToken,
          },
        }
      );
      const data = await res.json();
      setOrderDetails(data);
      setLoading(false);
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
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Price</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Deliverd</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {orderDetails && orderDetails.map((item, index) => {})}

                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    className="avatar avatar-sm rounded-circle me-2"
                  />
                  <p>Robert Fox</p>
                </td>
                <td>Feb 15, 2021</td>
                <td>Muhammad Wasif</td>
                <td>$3.500</td>
                <td>03461120978</td>
                <td>Karachi</td>
                <td>
                  <span className="badge badge-lg badge-dot">
                    <i className="bg-success">Delivered</i>
                  </span>
                </td>
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
              <tr>
                <td className="d-flex align-items-center">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    className="avatar avatar-sm rounded-circle me-2"
                  />
                  <p>Robert Fox</p>
                </td>
                <td>Feb 15, 2021</td>
                <td>Muhammad Wasif</td>
                <td>$3.500</td>
                <td>03461120978</td>
                <td>Karachi</td>
                <td>
                  <span className="badge badge-lg badge-dot">
                    <i className="bg-success">Delivered</i>
                  </span>
                </td>
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
              <tr>
                <td className="d-flex align-items-center">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    className="avatar avatar-sm rounded-circle me-2"
                  />
                  <p>Robert Fox</p>
                </td>
                <td>Feb 15, 2021</td>
                <td>Muhammad Wasif</td>
                <td>$3.500</td>
                <td>03461120978</td>
                <td>Karachi</td>
                <td>
                  <span className="badge badge-lg badge-dot">
                    <i className="bg-success">Delivered</i>
                  </span>
                </td>
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
              <tr>
                <td className="d-flex align-items-center">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    className="avatar avatar-sm rounded-circle me-2"
                  />
                  <p>Robert Fox</p>
                </td>
                <td>Feb 15, 2021</td>
                <td>Muhammad Wasif</td>
                <td>$3.500</td>
                <td>03461120978</td>
                <td>Karachi</td>
                <td>
                  <span className="badge badge-lg badge-dot">
                    <i className="bg-warning">Pending</i>
                  </span>
                </td>
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
              <tr>
                <td className="d-flex align-items-center">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    className="avatar avatar-sm rounded-circle me-2"
                  />
                  <p>Robert Fox</p>
                </td>
                <td>Feb 15, 2021</td>
                <td>Muhammad Wasif</td>
                <td>$3.500</td>
                <td>03461120978</td>
                <td>Karachi</td>
                <td>
                  <span className="badge badge-lg badge-dot">
                    <i className="bg-danger">Cancel</i>
                  </span>
                </td>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApplicationsTable;
