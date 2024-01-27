import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { FaProductHunt } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { CiViewList } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import Logo from "../assests/images/logo/logo.png";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <TbHeartRateMonitor />,
  },
  {
    path: "/emailbox",
    name: "Email",
    icon: <TbHeartRateMonitor />,
  },
  {
    path: "/createinvoice",
    name: "Order Details",
    icon: <FaFileInvoice />,
  },
  {
    path: "/addproduct",
    name: "Product",
    icon: <FaProductHunt />,
    subRoutes: [
      {
        path: "/product/allproducts",
        name: "All Products",
        icon: <CiViewList />,
      },
      {
        path: "/product/addproduct",
        name: "Add Product",
        icon: <AiOutlinePlusCircle />,
      },
    ],
  },
  {
    path: "/createuser",
    name: "Create User",
    icon: <FaUserAlt />,
  },
];
const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!open);
  };

  const hiddenAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: open ? "300px" : "0px",
        }}
        className={`sidebar`}
      >
        <div className="sidehead">
          <img src={Logo} alt="" />

          {/* <div className="bar cursor-pointer">
            <FaBars onClick={toggle} />
          </div> */}
        </div>

        <section className="routes">
          {routes.map((route) => {
            // here we say if any subroutes have so show it otherwise go on return
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  showAnimation={showAnimation}
                  route={route}
                  open={open}
                  setOpen={setOpen}
                  key={route.name}
                />
              );
            }
            return (
              <NavLink
                activeclassname="active"
                to={route.path}
                key={route.name}
                className="link"
              >
                <div className="icon">{route.icon}</div>
                {open && (
                  <div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="route_text"
                  >
                    {route.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
