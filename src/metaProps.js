import React from 'react';


export const PropTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]).isRequired,
  headers: React.PropTypes.array,
  target: React.PropTypes.string
};

export const defaultProps = {

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
