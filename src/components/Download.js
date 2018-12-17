import React from 'react';
import { CSVLink } from '../index';

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends React.Component {
  state = { hasTriggered: false };
  handleRef = ref => {
    if (ref) {
      ref.link.click();
      this.setState({ hasTriggered: true })
    }
  }

  render() {
    if (this.state.hasTriggered) return null;
    return <CSVLink ref={this.handleRef} {...this.props} />;
  }
}

export default CSVDownload;
