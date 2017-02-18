import React from 'react';
import {buildURI} from '../core';
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

  render(){
    const {data, headers, separator, filename, children , ...rest} = this.props;
    return (
      <a download={filename} {...rest}
         href={this.buildURI(data, headers, separator)}>
        {children}
      </a>
    )
  }
}

export default CSVLink;
