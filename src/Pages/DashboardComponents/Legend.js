import React from "react";
import { Box } from "@material-ui/core";

export default function Legend(props) {
  return (
    <div className="App">
      <Box
        borderBottom={props.noBorder ? "none" : "1px solid lightgray"}
        padding="10px 0"
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center">
          <Box
            borderRadius="25px"
            height="12px"
            width="12px"
            style={{ backgroundColor: props.color }}
          ></Box>
          <Box paddingLeft="12px" fontWeight={600} fontFamily="sans-serif">
            {props.label}
          </Box>
        </Box>
        <Box>
          <Box color="#8B8B8B" fontFamily="sans-serif">
            {props.labelNumber}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
