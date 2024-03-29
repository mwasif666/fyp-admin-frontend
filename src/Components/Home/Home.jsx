import React, { useEffect, useState } from "react";
import "./Home.css";
import { FcUpLeft } from "react-icons/fc";
import { RiSpam2Line, RiMessage2Fill } from "react-icons/ri";
import { BiArchiveIn } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { GoMoveToEnd } from "react-icons/go";
import { MdOutlineAddTask } from "react-icons/md";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { AiFillDelete, AiOutlineClockCircle } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import user from "../../assests/mailbox/user.png";
import pick from "../../assests/mailbox/no mails.png";
import ComposeMail from "./ComposeMail/ComposeMail";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeListItem, setActiveListItem] = useState("Inbox");
  const [iscompose, setCompose] = useState(false);
  const [readmoode, setReadMode] = useState(false);
  const [readmoodeValue, setReadModeValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const currentDate = new Date();
  const sentMails = useSelector((state) => state.mail.sentMails);
  const allMails = useSelector((state) => state.mail.allMails);
  const unreadMails = useSelector((state) => state.mail.unreadMails);
  const deletedMails = useSelector((state) => state.mail.deletedMails);
  const [temp, setTemp] = useState([]);
  const [age, setAge] = React.useState("");


  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    setTemp(allMails);
  }, [allMails]);
  const navigate = useNavigate();
  const composehandle = (value) => {
    handleMenuClick();
    setCompose(value);
  };
  // Function to format the time (hh:mm AM/PM)
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  // Function to format the date (yyyy-mm-dd)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // Get the formatted time and date
  const formattedTime = formatTime(currentDate);
  const formattedDate = formatDate(currentDate);

  const handleItemClick = (item) => {
    setActiveListItem(item);
    setReadMode(false);
    switch (item) {
      case "Inbox":
        setTemp(allMails);
        handleMenuClick();
        break;
      case "Sent":
        setTemp(sentMails);
        handleMenuClick();
        break;
      case "Deleted Items":
        setTemp(deletedMails);
        handleMenuClick();
        break;
      case "Unread":
        setTemp(unreadMails);
        handleMenuClick();
        break;
      default:
        setTemp([]);
    }
  };

  const toggleAccordion = () => {
    setIsActive((prevState) => !prevState);
  };
  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(!isMenuOpen);
    }
  };
  const readmodeHandler = () => {
    setReadMode(false);
  };
  const readModeActivehandler = (value) => {
    setReadMode(true);
    setReadModeValue(value);
    let temp = {
      ...value,
      read: true,
      unread: false,
    };
    if (value.sender !== localStorage.getItem("email")) {
      setShowModal(true);
      fetch(
        `https://mailclientbox-c312c-default-rtdb.firebaseio.com//mail/${value.mailId}.json`,
        {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(temp),
        }
      )
        .then((response) => {
          if (!response) {
            throw new Error("Unable to update the data");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      setShowModal(false);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    navigate("/");
  };
  const deleteHandler = (value) => {
    setShowModal(true);
    fetch(
      `https://mailclientbox-c312c-default-rtdb.firebaseio.com//mail/${value.mailId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error("Network error");
        } else {
          toast.success("Deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
    setReadMode(false);
    setTemp([]);
  };

  return (
    <div>
      <div className="container-fluid home-header-bg p-0">
        <header className="container-fluid p-0 py-2 align-items-center d-flex flex-row justify-content-between">
          <div className="">
            <div className="text-light font-weight d-flex flex-row align-items-center ">
              <div
                className={
                  isMenuOpen ? "change pointer  ms-s me-3" : "disp ms-s me-3"
                }
                onClick={handleMenuClick}
              >
                <HiOutlineMenuAlt1 fontSize={"2rem"} />
              </div>
            </div>
          </div>
        </header>
      </div>
      {/* Header  */}
      <div className="container-fluid mail-main p-0">
        <div className="row">
          <section
            className={
              isMenuOpen
                ? "menu col-lg-2  col-md-12 py-3 rad"
                : "menu-disp col-lg-2  col-md-12 py-3 rad"
            }
          >
            <button
              className="compose font-weight text-light"
              onClick={() => {
                composehandle(true);
              }}
            >
              Compose mail
            </button>
            <div class="inbox-list">
              <ul className="menu-list font-weight mt-1">
                <li
                  className={activeListItem === "Inbox" ? "list-active" : ""}
                  onClick={() => handleItemClick("Inbox")}
                >
                  Inbox{" "}
                  <span className="inbox-mail-count">{allMails.length}</span>
                </li>
                <li
                  className={activeListItem === "Unread" ? "list-active" : ""}
                  onClick={() => handleItemClick("Unread")}
                >
                  Unread
                  <span className="inbox-mail-count">{unreadMails.length}</span>
                </li>
                <li
                  className={activeListItem === "Starred" ? "list-active" : ""}
                  onClick={() => handleItemClick("Starred")}
                >
                  Starred
                </li>
                <li
                  className={activeListItem === "Drafts" ? "list-active" : ""}
                  onClick={() => handleItemClick("Drafts")}
                >
                  Drafts
                </li>
                <li
                  className={activeListItem === "Sent" ? "list-active" : ""}
                  onClick={() => handleItemClick("Sent")}
                >
                  Sent{" "}
                  <span className="sent-mail-count">{sentMails.length}</span>
                </li>
                <li
                  className={activeListItem === "Spam" ? "list-active" : ""}
                  onClick={() => handleItemClick("Spam")}
                >
                  Spam
                </li>
                <li
                  className={
                    activeListItem === "Deleted Items" ? "list-active" : ""
                  }
                  onClick={() => handleItemClick("Deleted Items")}
                >
                  Deleted Items{" "}
                  <span className="delete-mail-count">
                    {deletedMails.length}
                  </span>
                </li>
              </ul>
            </div>
          </section>
          {!readmoode && (
            <section className="bg-light list col-lg-10 col-md-12 rad">
              <div className="mail-list-header d-flex align-items-center justify-content-between pt-1 pb-1 border-bottom overflow-x-auto">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <div class="search-cantrol d-flex justify-content-end">
                  <input
                    type="text"
                    class="search-input font-weight"
                    placeholder="Search Email"
                  />
                  <button class="search-button font-weight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0Zm0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Mail Listes   the main mail */}
              <div className="mail-lists">
                {temp.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <img src={pick} alt="picka" className="img-picka" />
                    <h3> No {activeListItem} Email</h3>
                  </div>
                ) : (
                  <ul>
                    {temp.map((value) => (
                      <li
                        className="font-weight d-flex align-items-center justify-content-between font-reducer"
                        onClick={() => {
                          readModeActivehandler(value);
                        }}
                      >
                        <input type="checkbox" name="Select" id="Select" />
                        {!value.delete && !value.read && (
                          <span className="bullet"></span>
                        )}
                        <span>{value.name}</span>
                        <AiOutlineStar />
                        <span className="title-mail-list">{value.subject}</span>
                        <span className="description-mail-list">
                          {value.mail}
                        </span>
                        <span className="mail-time">
                          <span>{value.time}</span>
                          {/* <span>{formattedDate}</span> */}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}
          {readmoode && (
            <section className="bg-light list col-lg-10 col-md-12">
              <div className="mail-list-header d-flex align-items-center justify-content-between p-2 border-bottom ">
                <div className="mail-readmode-header">
                  <span onClick={readmodeHandler} title="Back">
                    <FcUpLeft size="1.3rem" />
                  </span>
                  <span title="Archive">
                    <BiArchiveIn size="1.3rem" />
                  </span>
                  <span title="Spam">
                    <RiSpam2Line size="1.3rem" />
                  </span>
                  <span
                    onClick={() => {
                      deleteHandler(readmoodeValue);
                    }}
                    title="Delete"
                  >
                    <AiFillDelete size="1.3rem" />
                  </span>
                  <span title="Message">
                    <RiMessage2Fill size="1.3rem" />
                  </span>
                  <span title="Click">
                    <AiOutlineClockCircle size="1.3rem" />
                  </span>
                  <span title="Add to task">
                    <MdOutlineAddTask size="1.3rem" />
                  </span>
                  <span title="Move to End">
                    <GoMoveToEnd size="1.3rem" />
                  </span>
                  <span title="More...">
                    <FiMoreVertical size="1.3rem" />
                  </span>
                </div>

                <div className="mail-readmode-header">
                  <span title="Backward">&#60;</span>
                  <span title="Forward">&#62;</span>
                  <span title="Mail Count">1 of {temp.length}</span>
                </div>
              </div>
              {/* Mail Listes   the main mail */}
              <div className="mail-readMod-container">
                <div className="mail-list-header d-flex align-items-center justify-content-between p-2 border-bottom">
                  <div className="mail-readmode-header">
                    <span title="Subject of mail">
                      {readmoodeValue.subject}
                    </span>
                    <span className="important-mail">important</span>
                    <span>inbox</span>
                  </div>

                  <div className="mail-readmode-header">
                    <span title="Print">Print</span>
                    <span title="open in new window">
                      <FaOpencart size="1.3rem" />
                    </span>
                  </div>
                </div>

                <div className="mail-list-header p-3 font-weight d-flex flex-row justify-content-start">
                  <img src={user} alt="xyz-damaged" className="user-img" />

                  <span className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className=" ms-2">Elon Musk</span>
                      <span> {readmoodeValue.time} </span>
                    </div>
                    <span className=" ms-2">to me</span>
                  </span>
                </div>

                <div className="message-container">{readmoodeValue.mail}</div>
              </div>
              <div className="reply-btn p-3">
                <button className="btn btn-primary ms-3">Reply</button>
                <button className="btn btn-primary ms-3">Forward</button>
              </div>
            </section>
          )}
        </div>
      </div>
      {iscompose && (
        <ComposeMail
          onClick={composehandle}
          composeHandler={setCompose}
          time={formattedDate + " " + formattedTime}
        />
      )}
      {showModal && (
        <div className="Auth-load-modal">
          <div class="Auth-loader"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
