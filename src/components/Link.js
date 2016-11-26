import React from 'react';
import {buildURI} from '../core';
import {defaultProps, PropTypes, PropsNotForwarded} from '../metaProps';
import XObject from 'x-object/safe';

class CSVLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <a {...XObject.filter(this.props, (k, v) => !PropsNotForwarded.includes(k))}
         href={buildURI(this.props.data, this.props.headers)}>
        {this.props.children}
      </a>
    )
  }
}
CSVLink.defaultProps = defaultProps;
CSVLink.PropTypes = PropTypes;

export default CSVLink;
