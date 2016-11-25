import React from 'react';
export const defaultProps = {

};

export const PropTypes = {
  data: React.PropTypes.array.isRequired,
  headers: React.PropTypes.array
};

export const PropsNotForwarded = [
  `data`
];
