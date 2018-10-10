/**
 * Simple safari detection based on user agent test
 */
export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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

export const jsons2arrays = (jsons, headers) => {
  headers = headers || jsonsHeaders(jsons);

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels = headers;
  let headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map((header) => header.label);
    headerKeys = headers.map((header) => header.key);
  }

  const data = jsons.map((object) => headerKeys.map((header) => (header in object) ? object[header] : ''));
  return [headerLabels, ...data];
};

export const elementOrEmpty = (element) => element || element === 0 ? element : '';

export const joiner = ((data,separator = ',') =>
 data.map((row, index) => row.map((element) => "\"" + elementOrEmpty(element) + "\"").join(separator)).join(`\n`)
);

export const arrays2csv = ((data, headers, separator) =>
 joiner(headers ? [headers, ...data] : data, separator)
);

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
  const type = isSafari() ? 'application/csv' : 'text/csv';
  const blob = new Blob([uFEFF ? '\uFEFF' : '', csv], {type});
  const dataURI = `data:${type};charset=utf-8,${uFEFF ? '\uFEFF' : ''}${csv}`;

  const URL = window.URL || window.webkitURL;

  debugger

  return (typeof URL.createObjectURL === 'undefined')
    ? dataURI
    : URL.createObjectURL(blob);
});

