import React from 'react';
import { buildURI, toCSV } from '../core';
import {
  defaultProps as commonDefaultProps,
  propTypes as commonPropTypes
} from '../metaProps';

/**
 *
 * @example ../../sample-site/csvlink.example.md
 */
class CSVLink extends React.Component {
  static defaultProps = commonDefaultProps;
  static propTypes = commonPropTypes;

  constructor(props) {
    super(props);
    this.buildURI = this.buildURI.bind(this);
  }

  buildURI() {
    return buildURI(...arguments);
  }

  getData = () => {
    const { asyncOnClick, data } = this.props;
    if (asyncOnClick && typeof data === 'function') {
      return data()
    }
    return data
  }

  /**
   * In IE11 this method will trigger the file download
   */
  handleLegacy(event) {
    // If this browser is IE 11, it does not support the `download` attribute
    if (window.navigator.msSaveOrOpenBlob) {
      // Stop the click propagation
      event.preventDefault();

      const {
        headers,
        separator,
        filename,
        enclosingCharacter,
        uFEFF
      } = this.props;

      const csvData = this.getData()
      let blob = new Blob([uFEFF ? '\uFEFF' : '', toCSV(csvData, headers, separator, enclosingCharacter)]);
      window.navigator.msSaveBlob(blob, filename);

      return false;
    }
  }

  handleAsyncClick(event) {
    const done = proceed => {
      if (proceed === false) {
        event.preventDefault();
        return;
      }
      this.handleLegacy(event);
    };

    this.props.onClick(event, done);
  }

  handleSyncClick(event) {
    const stopEvent = this.props.onClick(event) === false;
    if (stopEvent) {
      event.preventDefault();
      return;
    }
    this.handleLegacy(event);
  }

  handleClick() {
    return event => {
      if (typeof this.props.onClick === 'function') {
        return this.props.asyncOnClick
          ? this.handleAsyncClick(event)
          : this.handleSyncClick(event);
      }
      this.handleLegacy(event);
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

    const csvData = this.getData()
    const isNodeEnvironment = typeof window === 'undefined';
    const href = isNodeEnvironment ? '' : this.buildURI(csvData, uFEFF, headers, separator, enclosingCharacter)

    return (
      <a
        download={filename}
        {...rest}
        ref={link => (this.link = link)}
        target="_self"
        href={href}
        onClick={this.handleClick()}
      >
        {children}
      </a>
    );
  }
}

export default CSVLink;
