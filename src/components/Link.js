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
  handleLegacy(evt, data, headers, separator, filename) {
    // If this browser is IE 11, it does not support the `download` attribute
    if (window.navigator.msSaveOrOpenBlob) {
      // Stop the click propigation
      evt.preventDefault()

      let blob = new Blob([toCSV(data, headers, separator)])
      window.navigator.msSaveBlob(blob, filename)

      return false
    }
  }

  render(){
    const {data, headers, separator, filename, children , ...rest} = this.props;

    return (
      <a download={filename} {...rest}
        href={this.buildURI(data, headers, separator)}
        ref={link => (this.link = link)}
	onClick={evt => this.handleLegacy(evt, data, headers, separator, filename)}>
        {children}
      </a>
    )
  }
}

export default CSVLink;
