import React from 'react';
import {buildURI} from '../core';
import {defaultProps, PropTypes, PropsNotForwarded} from '../metaProps';

class CSVLink extends React.Component {
  constructor(props) {
    super(props);
  }


  render(){
    return (
      <a {...this.props} href={buildURI(this.props.data, this.props)}>
        {this.props.children}
      </a>
    )
  }
}
CSVLink.defaultProps = defaultProps;
CSVLink.PropTypes = PropTypes;
CSVLink.PropsNotForwarded = PropsNotForwarded;

export default CSVLink;
