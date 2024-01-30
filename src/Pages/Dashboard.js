import React from "react";
import Badge from "../Pages/DashboardComponents/Badge";
import Navbar_Dashboard from "./DashboardComponents/navbar_dasboard";
import AllProductDetails from "./AllProductsDetails";
import ChartCountry from "../Pages/DashboardComponents/Chart";
import LineChart from "./DashboardComponents/LineChart";

// import ApplicationsTable from "./PrivateRoutes";

const Dashboard = () => {

  return (
    <>
      <Navbar_Dashboard />
      <Badge />
      {/* <ApplicationsTable /> */}
      {/* <BoxCharting /> */}
      <ChartCountry />
      <LineChart />
      <AllProductDetails />
    </>
  );
};

export default Dashboard;
