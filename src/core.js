const isJsons = (array) => array.every(row => (typeof row === 'object' && !(row instanceof Array)))
const isArrays = (array) => array.every(row => Array.isArray(row))

const jsonsHeaders = (array) => Array.from(
 array.map(json => Object.keys(json))
 .reduce((a, b) => new Set([...a, ...b]), [])
);
const jsons2arrays = (jsons, headers) => {
 headers = headers || jsonsHeaders(jsons);
 return [headers, ...array.map((object) =>
  headers.map((header) =>
   object[header] ? object[header] : ''))]
};

const joiner = (data) => data.map((row, index) => row.join(',')).join(`\n`);

const arrays2csv = (data, headers) => joiner(headers ? [headers, ...data] : data);
const jsons2csv = (data, headers) =>  joiner(jsons2arrays(data, headers))
const toCSV = (data, headers) => {
  if(isJsons(data)) return jsons2csv(data, headers);
  if(isArrays(data)) return jsons2csv(data, headers);
  throw new TypeError(`Data should be an array of arrays OR array of objects `);
};
export const buildURI = (data, headers) => encodeURI(
`data:text/csv;charset=utf-8,${toCSV(data, headers)}`
);
