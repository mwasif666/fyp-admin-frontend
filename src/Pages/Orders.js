import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Modal } from "react-bootstrap";

const ApplicationsTable = () => {
  const { userToken } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    try {
      console.log("Placing order...");
      const res = await fetch(
        `http://localhost:5000/api/order/v1/updateOrderStatus/${selectedOrder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjYyOGU2NWFiOWJkNDYzN2Q4MjRjNCIsImZpcnN0TmFtZSI6Ildhc2lmIiwiZW1haWwiOiJ3YXNpNjY2MjU0MjZAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwMzQ2MTEyMDk3OCIsImlhdCI6MTcwNjY4MzU4N30.j78Jqlo2QOg8w8-rAw5bFcFieVqj_1S4SmK4uH7GyJE",
          },
          body: JSON.stringify({ orderStatus: "Completed" }),
        }
      );
      if (res.ok) {
        // Update the local state to reflect the change
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          orderStatus: "Completed",
        }));
        console.log("Order status updated successfully.");
      } else {
        console.error("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">C. Name</th>
                <th scope="col">City</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderDetails &&
                orderDetails.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.orderNo}</td>
                      <td>{item.totalPrice}</td>
                      <td>{item.totalQty}</td>
                      <td>{item.cusName}</td>
                      <td>{item.city}</td>
                      <td>{item.Date}</td>
                      <td>{item.orderStatus}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-neutral"
                          onClick={() => handleViewClick(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render the selected order details here */}
          {selectedOrder && (
            <div>
              <p>Order No: {selectedOrder.orderNo}</p>
              <p>Customer Name: {selectedOrder.cusName}</p>
              <p>Total Price: {selectedOrder.totalPrice}</p>
              <p>Contact Number: {selectedOrder.phoneNo}</p>
              <p>Quantity: {selectedOrder.totalQty}</p>
              <p>Address: {selectedOrder.shippingAddress}</p>
              <p>Order Received: {selectedOrder.Date}</p>
              <p>Order Status: {selectedOrder.orderStatus}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {/* Render the "Place Order" button */}
          <Button variant="success" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApplicationsTable;
