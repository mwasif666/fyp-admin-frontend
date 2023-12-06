import React from "react";

// Externals
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@mui/icons-material/Money";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AddchartIcon from "@mui/icons-material/Addchart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import "./Badge.css";
import { Card, Col, Row } from "react-bootstrap";

const Budget = () => {
  return (
    <>
      <Row className="pt-2 pb-4">
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    All Order Amount
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>$24,000</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper label-yellow">
                    <MoneyIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    Total Product Sell
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>4,350</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper label-blue">
                    <GroupOutlinedIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    Cancel Orders
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>700</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"difference"} variant="body2">
                    <ArrowDownwardIcon />
                    12%
                  </Typography>
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper">
                    <AddchartIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    Profit
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>$8,000</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"difference arrow-up"} variant="body2">
                    <ArrowUpwardIcon />
                    23.5%
                  </Typography>
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper label-green">
                    <AttachMoneyIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    Pending Orders
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>1,350</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper label-blue">
                    <AutorenewIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    Total Products
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>17,000</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper">
                    <LocalMallIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    Cancel Order Amount
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>$3,000</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper label-green">
                    <CancelScheduleSendIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Card className="content-Badge">
            <Row>
              <Col md="8">
                <div className="details">
                  <Typography className="title" variant="body2">
                    Re-Deliver Products
                  </Typography>
                  <Typography className={"value"} variant="h3">
                    <h2>400</h2>
                  </Typography>
                </div>
                <div className="footer">
                  <Typography className={"caption"} variant="caption">
                    Since last month
                  </Typography>
                </div>
              </Col>
              <Col md="4">
                <div className="icons-badge">
                  <div className="iconWrapper label-yellow">
                    <MoneyIcon className={"icon"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Budget;
