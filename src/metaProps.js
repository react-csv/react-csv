import React from 'react';


export const propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]).isRequired,
  headers: React.PropTypes.array,
  target: React.PropTypes.string,
  separator: React.PropTypes.string,
  filename: React.PropTypes.string
};

export const defaultProps = {
  separator: ',',
  filename: 'generatedBy_react-csv.csv'
};

export const PropsNotForwarded = [
  `data`,
  `headers`
];

// export const DownloadPropTypes = Object.assign(
//   {},
//   PropTypes,
//   {
//     : ,
//   }
// );
