import React from "react";
import { ReactWorldCountriesMap } from "react-world-countries-map";
import "./Badge.css";

const BarChart = () => {
  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];

  return (
    <>
      <ReactWorldCountriesMap
        color="#fe6c00"
        valueSuffix=" people"
        size="lg"
        className="ReactWorldCountriesMap"
        data={data}
      />
    </>
  );
};

export default BarChart;
