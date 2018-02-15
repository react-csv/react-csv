import React from 'react';
import { CSVLink } from '../index';

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends React.Component {
  handleRef(ref) {
    ref.link.click();
    ref.link.remove();
  }

  render() {
    return <CSVLink ref={this.handleRef} {...this.props} />;
  }
}

export default CSVDownload;
