import React from 'react';
import { CSVLink } from '../index';

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends React.Component {
  state = { hasTriggered: false };
  constructor(props) {
    super(props)
    this.handleRef = this.handleRef.bind(this)
  }
  
  handleRef(ref) {
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
