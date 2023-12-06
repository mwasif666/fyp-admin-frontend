import React from "react";
import ReactApexChart from "react-apexcharts";
import { Col, Row } from "react-bootstrap";
import BarChart from "./BarChart";

export default function OcorrenciaDonut() {
  return (
    <div>
      <Row className="pt-5">
        <Col md="6">
          <BarChart />
        </Col>
        <Col md="6">
          <div style={{ width: "95%", margin: "0 auto" }}>
            <GraficoDonut />
          </div>
        </Col>
      </Row>
    </div>
  );
}

class GraficoDonut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15],
      options: {
        labels: ["Mobile", "Cameras", "Laptop", "Tv", "Tablet"],
        chart: {
          type: "donut",
        },
        legend: {
          show: false,
          position: "bottom",
          width: 120,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div
        id="chart"
        style={{ width: "100%", height: "100%", display: "inline-block" }}
      >
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
        />
      </div>
    );
  }
}
