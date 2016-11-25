import React from 'react';
import {buildURI} from '../core';
import {defaultProps, PropTypes, PropsNotForwarded} from '../metaProps';

class CSVDownload extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    window.open(buildURI(this.props.data));
  }

  render(){
    return (null)
  }
}

CSVDownload.defaultProps = defaultProps;
CSVDownload.PropTypes = PropTypes;
CSVDownload.PropsNotForwarded = PropsNotForwarded;
export default CSVDownload;
