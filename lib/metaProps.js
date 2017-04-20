'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropsNotForwarded = exports.defaultProps = exports.propTypes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = exports.propTypes = {
  data: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array]).isRequired,
  headers: _react2.default.PropTypes.array,
  target: _react2.default.PropTypes.string,
  separator: _react2.default.PropTypes.string,
  filename: _react2.default.PropTypes.string
};

var defaultProps = exports.defaultProps = {
  separator: ',',
  filename: 'generatedBy_react-csv.csv'
};

var PropsNotForwarded = exports.PropsNotForwarded = ['data', 'headers'];