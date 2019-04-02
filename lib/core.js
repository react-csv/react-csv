"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isSafari = exports.isSafari = function isSafari() {
  return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  );
};

var isJsons = exports.isJsons = function isJsons(array) {
  return Array.isArray(array) && array.every(function (row) {
    return (typeof row === "undefined" ? "undefined" : _typeof(row)) === 'object' && !(row instanceof Array);
  });
};

var isArrays = exports.isArrays = function isArrays(array) {
  return Array.isArray(array) && array.every(function (row) {
    return Array.isArray(row);
  });
};

var jsonsHeaders = exports.jsonsHeaders = function jsonsHeaders(array) {
  return Array.from(array.map(function (json) {
    return Object.keys(json);
  }).reduce(function (a, b) {
    return new Set([].concat(_toConsumableArray(a), _toConsumableArray(b)));
  }, []));
};

var jsons2arrays = exports.jsons2arrays = function jsons2arrays(jsons, headers) {
  headers = headers || jsonsHeaders(jsons);

  var headerLabels = headers;
  var headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map(function (header) {
      return header.label;
    });
    headerKeys = headers.map(function (header) {
      return header.key;
    });
  }

  var data = jsons.map(function (object) {
    return headerKeys.map(function (header) {
      return getHeaderValue(header, object);
    });
  });
  return [headerLabels].concat(_toConsumableArray(data));
};

var getHeaderValue = exports.getHeaderValue = function getHeaderValue(property, obj) {
  var foundValue = property.replace(/\[([^\]]+)]/g, ".$1").split(".").reduce(function (o, p, i, arr) {
    if (o[p] === undefined) {
      arr.splice(1);
    } else {
      return o[p];
    }
  }, obj);

  return foundValue === undefined ? '' : foundValue;
};

var elementOrEmpty = exports.elementOrEmpty = function elementOrEmpty(element) {
  return element || element === 0 ? element : '';
};

var joiner = exports.joiner = function joiner(data) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  var enclosingCharacter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '"';

  return data.filter(function (e) {
    return e;
  }).map(function (row) {
    return row.map(function (element) {
      return elementOrEmpty(element);
    }).map(function (column) {
      return "" + enclosingCharacter + column + enclosingCharacter;
    }).join(separator);
  }).join("\n");
};

var arrays2csv = exports.arrays2csv = function arrays2csv(data, headers, separator, enclosingCharacter) {
  return joiner(headers ? [headers].concat(_toConsumableArray(data)) : data, separator, enclosingCharacter);
};

var jsons2csv = exports.jsons2csv = function jsons2csv(data, headers, separator, enclosingCharacter) {
  return joiner(jsons2arrays(data, headers), separator, enclosingCharacter);
};

var string2csv = exports.string2csv = function string2csv(data, headers, separator, enclosingCharacter) {
  return headers ? headers.join(separator) + "\n" + data : data;
};

var toCSV = exports.toCSV = function toCSV(data, headers, separator, enclosingCharacter) {
  if (isJsons(data)) return jsons2csv(data, headers, separator, enclosingCharacter);
  if (isArrays(data)) return arrays2csv(data, headers, separator, enclosingCharacter);
  if (typeof data === 'string') return string2csv(data, headers, separator);
  throw new TypeError("Data should be a \"String\", \"Array of arrays\" OR \"Array of objects\" ");
};

var buildURI = exports.buildURI = function buildURI(data, uFEFF, headers, separator, enclosingCharacter) {
  var csv = toCSV(data, headers, separator, enclosingCharacter);
  var type = isSafari() ? 'application/csv' : 'text/csv';
  var blob = new Blob([uFEFF ? "\uFEFF" : '', csv], { type: type });
  var dataURI = "data:" + type + ";charset=utf-8," + (uFEFF ? "\uFEFF" : '') + csv;

  var URL = window.URL || window.webkitURL;

  return typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob);
};