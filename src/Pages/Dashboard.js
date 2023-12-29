import React from "react";
import "./Dashboard.css";
import Badge from "../Pages/DashboardComponents/Badge";

import Navbar_Dashboard from "./DashboardComponents/navbar_dasboard";
import AllProductDetails from "./AllProductsDetails";
import ChartCountry from "../Pages/DashboardComponents/Chart";
import LineChart from "./DashboardComponents/LineChart";
import Login from "./LoginPage";

const Dashboard = () => {
  return (
    <>
      <Navbar_Dashboard />
      <Badge />
      {/* <BoxCharting /> */}
      <ChartCountry />
      <LineChart />
      <AllProductDetails />
    </>
  );
};

export default Dashboard;
