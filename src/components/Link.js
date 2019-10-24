import React from 'react';
import { buildURI, toCSV } from '../core';
import {
  defaultProps as commonDefaultProps,
  propTypes as commonPropTypes,
} from '../metaProps';

/**
 *
 * @example ../../sample-site/csvlink.example.md
 */
class CSVLink extends React.Component {
  static propTypes = commonPropTypes;

  static defaultProps = commonDefaultProps;

  constructor(props) {
    super(props);
    this.buildURI = this.buildURI.bind(this);
    this.state = { href: '' };
  }

  componentDidMount() {
    const {
      data, headers, separator, uFEFF, enclosingCharacter,
    } = this.props;
    this.setState({ href: this.buildURI(data, uFEFF, headers, separator, enclosingCharacter) });
  }

  componentWillReceiveProps(nextProps) {
    const {
      data, headers, separator, uFEFF,
    } = nextProps;
    this.setState({ href: this.buildURI(data, uFEFF, headers, separator) });
  }

  /**
   * In IE11 this method will trigger the file download
   */
  handleLegacy = (event, data, headers, separator, filename, enclosingCharacter) => {
    // If this browser is IE 11, it does not support the `download` attribute
    if (window.navigator.msSaveOrOpenBlob) {
      // Stop the click propagation
      event.preventDefault();

      const blob = new Blob([toCSV(data, headers, separator, enclosingCharacter)]);
      window.navigator.msSaveBlob(blob, filename);

      return false;
    }
  }

  buildURI(...rest) {
    return buildURI(...rest);
  }

  handleAsyncClick(event, ...args) {
    const done = (proceed) => {
      if (proceed === false) {
        event.preventDefault();
        return;
      }
      this.handleLegacy(event, ...args);
    };

    const { onClick } = this.props;
    onClick(event, done);
  }

  handleSyncClick(event, ...args) {
    const { onClick } = this.props;
    const stopEvent = onClick(event) === false;
    if (stopEvent) {
      event.preventDefault();
      return;
    }
    this.handleLegacy(event, ...args);
  }

  handleClick(...args) {
    const { onClick, asyncOnClick } = this.props;
    return (event) => {
      if (typeof onClick === 'function') {
        return asyncOnClick
          ? this.handleAsyncClick(event, ...args)
          : this.handleSyncClick(event, ...args);
      }
      this.handleLegacy(event, ...args);
    };
  }

  render() {
    const {
      data,
      headers,
      separator,
      filename,
      uFEFF,
      children,
      onClick,
      asyncOnClick,
      enclosingCharacter,
      ...rest
    } = this.props;

    const { href } = this.state;

    return (
      <a
        download={filename}
        {...rest}
        ref={(link) => { this.link = link; }}
        target="_self"
        href={href}
        onClick={this.handleClick(data, headers, separator, filename, enclosingCharacter)}
      >
        {children}
      </a>
    );
  }
}

export default CSVLink;
