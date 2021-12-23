import React from 'react';
import {buildURI} from '../core';
import {
   defaultProps as commonDefaultProps,
   propTypes as commonPropTypes} from '../metaProps';
const defaultProps = {
  target: '_blank'
};

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends React.Component {

  static defaultProps = Object.assign(
    commonDefaultProps,
    defaultProps
  );

  static propTypes = commonPropTypes;

  constructor(props) {
    super(props);
    this.state={};
  }

  buildURI() {
    return buildURI(...arguments);
  }

  componentWillMount(){
    const {data, headers, separator, enclosingCharacter, uFEFF, target, specs, replace} = this.props;
    this.buildURI(data, uFEFF, headers, separator, enclosingCharacter).then((dataUrl) => {
      this.state.page = window.open(dataUrl, target, specs, replace);
    })
  }

  getWindow() {
    return this.state.page;
  }

  render(){
    return (null)
  }
}

export default CSVDownload;
