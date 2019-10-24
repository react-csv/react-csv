import React from 'react';
import { buildURI } from '../core';
import {
  defaultProps as commonDefaultProps,
  propTypes as commonPropTypes,
} from '../metaProps';

const defaultProps = {
  target: '_blank',
};

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends React.Component {
  static propTypes = commonPropTypes;

  static defaultProps = Object.assign(
    commonDefaultProps,
    defaultProps,
  );

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      data, headers, separator, enclosingCharacter, uFEFF, target, specs, replace,
    } = this.props;
    this.state.page = window.open(
      this.buildURI(data, uFEFF, headers, separator, enclosingCharacter), target, specs, replace,
    );
  }

  getWindow() {
    const { page } = this.state;
    return page;
  }

  buildURI(...rest) {
    return buildURI(...rest);
  }

  render() {
    return (null);
  }
}

export default CSVDownload;
