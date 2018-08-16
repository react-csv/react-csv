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

export const joiner = ((data,separator = ',',newLine=`\n`) =>
 data.map((row, index) => row.map((element) => "\"" + elementOrEmpty(element) + "\"").join(separator)).join(newLine)
);

export const arrays2csv = ((data, headers, separator,newLine) =>
 joiner(headers ? [headers, ...data] : data, separator,newLine)
);

export const jsons2csv = ((data, headers, separator,newLine) =>
 joiner(jsons2arrays(data, headers), separator,newLine)
);

export const string2csv = ((data, headers, separator,newLine=`\n`) =>
  (headers) ? `${headers.join(separator)}${newLine}${data}`: data
);

export const toCSV = (data, headers, separator,newLine) => {
 if (isJsons(data)) return jsons2csv(data, headers, separator,newLine);
 if (isArrays(data)) return arrays2csv(data, headers, separator,newLine);
 if (typeof data ==='string') return string2csv(data, headers, separator,newLine);
 throw new TypeError(`Data should be a "String", "Array of arrays" OR "Array of objects" `);
};

export const buildURI = ((data, uFEFF, headers, separator,newLine) => {
  const csv = toCSV(data, headers, separator,newLine);
  const blob = new Blob([uFEFF ? '\uFEFF' : '', csv], {type: 'text/csv'});
  const dataURI = `data:text/csv;charset=utf-8,${uFEFF ? '\uFEFF' : ''}${csv}`;

  const URL = window.URL || window.webkitURL;

  return (typeof URL.createObjectURL === 'undefined')
    ? dataURI
    : URL.createObjectURL(blob);
});