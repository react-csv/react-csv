import React from 'react';
import {buildURI} from '../core';
import {defaultProps, PropTypes, PropsNotForwarded} from '../metaProps';

class CSVLink extends React.Component {
  constructor(props) {
    super(props);
    this.buildURI= this.buildURI.bind(this);
  }

  buildURI() {
    return buildURI(...arguments);
  }

  render(){
    const {data, headers, children , ...rest} = this.props;
    return (
      <a {...rest}
         href={this.buildURI(data, headers)}>
        {children}
      </a>
    )
  }
}
CSVLink.defaultProps = defaultProps;
CSVLink.PropTypes = PropTypes;

export default CSVLink;
