export const isJsons = ((array) => Array.isArray(array) && array.every(
 row => (typeof row === 'object' && !(row instanceof Array))
));

export const isArrays = ((array) => Array.isArray(array) && array.every(
 row => Array.isArray(row)
));

export const jsonsHeaders = ((array) => Array.from(
 array.map(json => Object.keys(json))
 .reduce((a, b) => new Set([...a, ...b]), [])
));

/**
 * Replace double quotes with preceding double quotes as per RFC-4180
 * @link https://www.ietf.org/rfc/rfc4180.txt
 * @param {Object|Array} data
 * @return {Object|Array}
 */
export const escapeInCSV = (data) => {
  let result = [];

  const hasDoubleQuotes = (value) => typeof value === 'string' && value.includes('"');
  const escapeDoubleQuotes = (value) => value.replace(/"/g, '""');

  // array of arrays
  if (Array.isArray(data)) {
    data.map((row, i) => {
      result[i] = row;
      Array.isArray(row) && row.map((value, j) => {
        result[i][j] = hasDoubleQuotes(value) ? escapeDoubleQuotes(value) : value;
      })
    });
  }

  // object
  if (typeof data === 'object' && !(Array.isArray(data))) {
    result = {};
    Object.keys(data).map((key) => {
      const value = data[key];
      result[key] = hasDoubleQuotes(value) ? escapeDoubleQuotes(value) : value;
    });
  }

  return result;
}

export const jsons2arrays = (jsons, headers) => {
  headers = headers || jsonsHeaders(jsons);

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels = headers;
  let headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map((header) => header.label);
    headerKeys = headers.map((header) => header.key);
  }
  const data = jsons.map((object) => {
    const escapedObject = escapeInCSV(object)
    return headerKeys.map((header) => (header in escapedObject) ? escapedObject[header] : '')
  });
  return [headerLabels, ...data];
};

export const elementOrEmpty = (element) => element || element === 0 ? element : '';

export const joiner = ((data,separator = ',') =>
 data.map((row, index) => row.map((element) => "\"" + elementOrEmpty(element) + "\"").join(separator)).join(`\n`)
);

export const arrays2csv = ((data, headers, separator) => {
  const escapedData = escapeInCSV(data)
  return joiner(headers ? [headers, ...escapedData] : escapedData, separator)
});

export const jsons2csv = ((data, headers, separator) =>
 joiner(jsons2arrays(data, headers), separator)
);

export const string2csv = ((data, headers, separator) =>
  (headers) ? `${headers.join(separator)}\n${data}`: data
);

export const toCSV = (data, headers, separator) => {
 if (isJsons(data)) return jsons2csv(data, headers, separator);
 if (isArrays(data)) return arrays2csv(data, headers, separator);
 if (typeof data ==='string') return string2csv(data, headers, separator);
 throw new TypeError(`Data should be a "String", "Array of arrays" OR "Array of objects" `);
};

export const buildURI = ((data, uFEFF, headers, separator) => {
  const csv = toCSV(data, headers, separator);
  const blob = new Blob([uFEFF ? '\uFEFF' : '', csv], {type: 'text/csv'});
  const dataURI = `data:text/csv;charset=utf-8,${uFEFF ? '\uFEFF' : ''}${csv}`;

  const URL = window.URL || window.webkitURL;

  return (typeof URL.createObjectURL === 'undefined')
    ? dataURI
    : URL.createObjectURL(blob);
});