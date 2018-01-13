import React from 'react';
import {buildURI, toCSV} from '../core';
import {
   defaultProps as commonDefaultProps,
   propTypes as commonPropTypes} from '../metaProps';

/**
 *
 * @example ../../sample-site/csvlink.example.md
 */
class CSVLink extends React.Component {

  static defaultProps = commonDefaultProps;
  static propTypes = commonPropTypes;

  constructor(props) {
    super(props);
    this.buildURI= this.buildURI.bind(this);
  }

  buildURI() {
    return buildURI(...arguments);
  }

/**
   * In IE11 this method will trigger the file download
   */
  handleDownload(evt, data, headers, separator, filename) {

    let blob = new Blob([toCSV(data, headers, separator)])
    // If this browser is IE 11, it does not support the `download` attribute
    if (window.navigator.msSaveOrOpenBlob) {
      // Stop the click propagation
      evt.preventDefault()
      window.navigator.msSaveBlob(blob, filename)
      return false
    } else {

      let e = window.document.createElement('a');
      e.href = window.URL.createObjectURL(blob);
      e.download = filename;
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
    }
  }

  render(){
    const {data, headers, separator, filename, uFEFF, children , ...rest} = this.props;

    return (
      <a download={filename} {...rest}
         ref={link => (this.link = link)}
         onClick={evt => this.handleDownload(evt, data, headers, separator, filename)}>
        {children}
      </a>
    )
  }
}

export default CSVLink;
