import React from "react";
import "./Dashboard.css";
import Badge from "../Pages/DashboardComponents/Badge";
import GraficoDonut from "../Pages/DashboardComponents/Chart";
import TableData from "./DashboardComponents/TableData";
import LineChart from "./DashboardComponents/LineChart";

const Dashboard = () => {
  return (
    <>
      <Badge />
      <LineChart />
      <GraficoDonut />
      <TableData />
    </>
  );
};

export default Dashboard;
