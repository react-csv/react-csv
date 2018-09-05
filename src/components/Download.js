import React from 'react';
import { buildURI, toCSV } from '../core';
import {
   defaultProps as commonDefaultProps,
   propTypes as commonPropTypes} from '../metaProps';
const defaultProps = {
  target: '_blank'
};

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends React.Component {

  static defaultProps = Object.assign(
    commonDefaultProps,
    defaultProps
  );

  static propTypes = commonPropTypes;

  constructor(props) {
    super(props);
    this.state={};
  }

  buildURI() {
    return buildURI(...arguments);
  }

  toCSV() {
    return toCSV(...arguments);
  }

  componentDidMount(){
    const {data, headers, separator, uFEFF, target, specs, replace, filename} = this.props;

    if (window.navigator.msSaveOrOpenBlob) {
      //In IE11 this method will trigger the file download
      let blob = new Blob([this.toCSV(data, headers, separator)]);
      window.navigator.msSaveBlob(blob, filename);

    } else {
      this.state.page = window.open(this.buildURI(data, uFEFF, headers, separator), target, specs, replace);
    }
  }

  getWindow() {
    return this.state.page;
  }

  render(){
    return (null)
  }
}

export default CSVDownload;
