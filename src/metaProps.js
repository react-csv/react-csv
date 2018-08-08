import React from "react";
import { string, array, oneOfType, bool } from "prop-types";

export const propTypes = {
  data: oneOfType([string, array]).isRequired,
  headers: array,
  target: string,
  separator: string,
  filename: string,
  uFEFF: bool,
  newLine: string
};

export const defaultProps = {
  separator: ",",
  filename: "generatedBy_react-csv.csv",
  uFEFF: true,
  newLine: `\n`
};

export const PropsNotForwarded = [`data`, `headers`];

// export const DownloadPropTypes = Object.assign(
//   {},
//   PropTypes,
//   {
//     : ,
//   }
// );
