'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('../core');

var _metaProps = require('../metaProps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVLink = function (_React$Component) {
  _inherits(CSVLink, _React$Component);

  function CSVLink(props) {
    _classCallCheck(this, CSVLink);

    var _this = _possibleConstructorReturn(this, (CSVLink.__proto__ || Object.getPrototypeOf(CSVLink)).call(this, props));

    _this.buildURI = _this.buildURI.bind(_this);
    _this.state = { href: '' };
    return _this;
  }

  _createClass(CSVLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          headers = _props.headers,
          separator = _props.separator,
          uFEFF = _props.uFEFF,
          enclosingCharacter = _props.enclosingCharacter;

      this.setState({ href: this.buildURI(data, uFEFF, headers, separator, enclosingCharacter) });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var data = nextProps.data,
          headers = nextProps.headers,
          separator = nextProps.separator,
          uFEFF = nextProps.uFEFF;

      this.setState({ href: this.buildURI(data, uFEFF, headers, separator) });
    }
  }, {
    key: 'buildURI',
    value: function buildURI() {
      return _core.buildURI.apply(undefined, arguments);
    }
  }, {
    key: 'handleLegacy',
    value: function handleLegacy(event, data, headers, separator, filename, enclosingCharacter, uFEFF) {
      if (window.navigator.msSaveOrOpenBlob) {
        event.preventDefault();

        var blob = new Blob([uFEFF ? '\uFEFF' : '', (0, _core.toCSV)(data, headers, separator, enclosingCharacter)]);
        window.navigator.msSaveBlob(blob, filename);

        return false;
      }
    }
  }, {
    key: 'handleAsyncClick',
    value: function handleAsyncClick(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var done = function done(proceed) {
        if (proceed === false) {
          event.preventDefault();
          return;
        }
        _this2.handleLegacy.apply(_this2, [event].concat(args));
      };

      this.props.onClick(event, done);
    }
  }, {
    key: 'handleSyncClick',
    value: function handleSyncClick(event) {
      var stopEvent = this.props.onClick(event) === false;
      if (stopEvent) {
        event.preventDefault();
        return;
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this.handleLegacy.apply(this, [event].concat(args));
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var _this3 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return function (event) {
        if (typeof _this3.props.onClick === 'function') {
          return _this3.props.asyncOnClick ? _this3.handleAsyncClick.apply(_this3, [event].concat(args)) : _this3.handleSyncClick.apply(_this3, [event].concat(args));
        }
        _this3.handleLegacy.apply(_this3, [event].concat(args));
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          data = _props2.data,
          headers = _props2.headers,
          separator = _props2.separator,
          filename = _props2.filename,
          uFEFF = _props2.uFEFF,
          children = _props2.children,
          onClick = _props2.onClick,
          asyncOnClick = _props2.asyncOnClick,
          enclosingCharacter = _props2.enclosingCharacter,
          rest = _objectWithoutProperties(_props2, ['data', 'headers', 'separator', 'filename', 'uFEFF', 'children', 'onClick', 'asyncOnClick', 'enclosingCharacter']);

      return _react2.default.createElement(
        'a',
        _extends({
          download: filename
        }, rest, {
          ref: function ref(link) {
            return _this4.link = link;
          },
          target: '_self',
          href: this.state.href,
          onClick: this.handleClick(data, headers, separator, filename, enclosingCharacter, uFEFF)
        }),
        children
      );
    }
  }]);

  return CSVLink;
}(_react2.default.Component);

CSVLink.defaultProps = _metaProps.defaultProps;
CSVLink.propTypes = _metaProps.propTypes;
exports.default = CSVLink;