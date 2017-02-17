import React from 'react';
import {buildURI} from '../core';
import {defaultProps as CommonDefaultProps, PropTypes} from '../metaProps';

const defaultProps = {
  target: '_blank'
};
class CSVDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  buildURI() {
    return buildURI(...arguments);
  }

  componentDidMount(){
    const {data, headers, separator, target, specs, replace} = this.props;
    this.state.page = window.open(
        this.buildURI(data, headers, separator), target, specs, replace
    );
  }

  getWindow() {
    return this.state.page;
  }

  render(){
    return (null)
  }
}

CSVDownload.defaultProps = Object.assign(
  CommonDefaultProps,
  defaultProps
);
CSVDownload.PropTypes = PropTypes;

export default CSVDownload;
