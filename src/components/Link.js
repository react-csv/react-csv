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

  /**
   * In IE11 this method will trigger the file download
   */
  handleLegacy(event, isAsync = false) {
    // If this browser is IE 11, it does not support the `download` attribute
    if (window.navigator.msSaveOrOpenBlob) {
      // Stop the click propagation
      event.preventDefault();

      const {
        data,
        headers,
        separator,
        filename,
        enclosingCharacter,
        newLineSeparator,
        uFEFF
      } = this.props;

      const csvData = isAsync && typeof data === 'function' ? data() : data;

      let blob = new Blob([uFEFF ? '\uFEFF' : '', toCSV(csvData, headers, separator, enclosingCharacter, newLineSeparator)]);
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
      this.handleLegacy(event, true);
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
      newLineSeparator,
      ...rest
    } = this.props;

    const isNodeEnvironment = typeof window === 'undefined';
    const href = isNodeEnvironment ? '' : this.buildURI(data, uFEFF, headers, separator, enclosingCharacter, newLineSeparator)

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
