import React from 'react';
import { string, array, oneOfType, bool, func } from 'prop-types';


export const propTypes = {
  data: oneOfType([string, array, func]).isRequired,
  headers: oneOfType([array, bool]),
  target: string,
  separator: string,
  filename: string,
  uFEFF: bool,
  onClick: func,
  asyncOnClick: bool,
  enclosingCharacter: string
};

export const defaultProps = {
  separator: ',',
  filename: 'generatedBy_react-csv.csv',
  uFEFF: true,
  asyncOnClick: false,
  enclosingCharacter: '"'
};

export const PropsNotForwarded = [
  `data`,
  `headers`
];
