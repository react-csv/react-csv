export const isJsons = ((array) => array.every(
 row => (typeof row === 'object' && !(row instanceof Array))
));

export const isArrays = ((array) => array.every(
 row => Array.isArray(row)
));

export const jsonsHeaders = ((array) => Array.from(
 array.map(json => Object.keys(json))
 .reduce((a, b) => new Set([...a, ...b]), [])
));

export const jsons2arrays = (jsons, headers) => {
 headers = headers || jsonsHeaders(jsons);
 return [headers, ...array.map((object) =>
  headers.map((header) =>
   object[header] ? object[header] : ''))]
};

export const joiner = ((data) =>
 data.map((row, index) => row.join(',')).join(`\n`)
);

export const arrays2csv = ((data, headers) =>
 joiner(headers ? [headers, ...data] : data)
);

export const jsons2csv = ((data, headers) =>
 joiner(jsons2arrays(data, headers))
);

export const string2csv = ((data, headers) =>
  (headers) ? `${headers.join(`,`)}\n${data}`: data
)

export const toCSV = (data, headers) => {
 if (isJsons(data)) return jsons2csv(data, headers);
 if (isArrays(data)) return arrays2csv(data, headers);
 if (typeof data ==='string') return string2csv(data, headers);
 throw new TypeError(`Data should be a "String", "Array of arrays" OR "Array of objects" `);
};

export const buildURI = ((data, headers) => encodeURI(
  `data:text/csv;charset=utf-8,${toCSV(data, headers)}`
 )
);
