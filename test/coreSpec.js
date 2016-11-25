import expect from 'expect';

import {
 isJsons,
 isArrays,
 jsonsHeaders,
 jsons2arrays,
 arrays2csv,
 jsons2csv,
 string2csv,
 toCSV,
 buildURI
} from '../lib/core';

describe(`core::isJsons`, () => {
 it(`returns true if all items of array are literal objects`, () => {
  const target = [{}, {}, {}, {}];
  expect(isJsons(target)).toBeTruthy();
 });
 it(`returns false if one of array items is not literal object`, () => {
  let target = ["", {}, {}, {}];
  expect(isJsons(target)).toBeFalsy();
  target = [{},
   [], {}, {}
  ];
  expect(isJsons(target)).toBeFalsy();
 });

});

describe(`core::isArrays`, () => {
 it(`retruns true if all array items are arrays too`, () => {
  const target = [
   [],
   [],
   [],
   []
  ];
  expect(isArrays(target)).toBeTruthy();
 });
 it(`retruns false if one of array items is not array`, () => {
  let target = [{},
   [],
   [],
   []
  ];
  expect(isArrays(target)).toBeFalsy();
  target = [
   [], new Set([]), [],
   []
  ];
  expect(isArrays(target)).toBeFalsy();
  target = [
   [], '[]', [],
   []
  ];
  expect(isArrays(target)).toBeFalsy();
 });

});


describe(`core::jsonsHeaders`, () => {
 let fixtures;
 beforeEach(() => {
  fixtures = [{
   maths: 90,
   phy: 80
  }, {
   maths: 50,
   sport: 97,
   ch: 66
  }, {
   ch: 77,
   sport: 99
  }]
 });

 it(`returns union of keys of all array items `, () => {
   let actual = jsonsHeaders(fixtures);
   expect(actual).toEqual([`maths`, `phy`, 'sport', 'ch'])
  }),

  it(`does not duplicate keys on the array`, () => {
   let actual = jsonsHeaders(fixtures);
   let keysOfAllItems = fixtures.map((object) => Object.keys(object))
    .reduce((a, b) => [...a, ...b], []);
   expect(actual.length).toBeLessThanOrEqualTo(keysOfAllItems.length);
   expect(actual.length).toEqual(new Set(keysOfAllItems).size);

  })

});
describe(`core::jsons2arrays`, () => {
 let fixtures;
 beforeEach(() => {
  fixtures = [{
   maths: '90'
  }, {
   sport: '97'
  }, {
   maths: '77',
   sport: '99'
  }]
 });
 it(`converts an Array of literal objects to Array of arrays`, () => {
  const actual = jsons2arrays(fixtures);
  const expected = [
   ['maths', 'sport'],
   ['90', ''],
   ['', '97'],
   ['77', '99']
  ];
  expect(actual).toEqual(expected);
 });

 it(`converts to Array of arrays following the order of headers`, () => {
  const actual = jsons2arrays(fixtures, ['sport', 'maths']);
  const expected = [
   ['maths', 'sport'].reverse(), ['90', ''].reverse(), ['', '97'].reverse(), ['77', '99'].reverse()
  ];
  expect(actual).toEqual(expected);
 });
 it(`accepts any size of headers list`, () => {
  const headers = ['maths', 'sport', 'phy', 'ch'];
  const actual = jsons2arrays(fixtures, headers);
  const expected = [
   headers, ['90', '', '', ''],
   ['', '97', '', ''],
   ['77', '99', '', '']
  ];
  expect(actual).toEqual(expected);
 });

});

describe(`core::arrays2csv`, () => {
 let fixtures;
 beforeEach(() => {
  fixtures = [
   [`a`, `b`],
   [`c`, `d`]
  ];

 });
 it(`converts Array of arrays to string in CSV format`, () => {
   const actual = arrays2csv(fixtures);
   expect(actual).toBeA('string');
   expect(actual.split(`\n`).join(`|`)).toEqual(`a,b|c,d`);
 });

 it(`renders  CSV headers whenever it was given `, () => {
   const headers = [`X`, `Y`];
   const firstLineOfCSV = arrays2csv(fixtures, headers).split(`\n`)[0];
   expect(firstLineOfCSV).toEqual(headers.join(`,`));
 });
});


describe(`core::jsons2csv`, () => {
 let fixtures;
 beforeEach(() => {
  fixtures = [{
   X: '88',
   Y: '97'
  }, {
   X: '77',
   Y: '99'
  }]
 });

 it(`converts Array of literal objects to string in CSV format including headers`, () => {

   const actual = jsons2csv(fixtures);
   const expectedHeaders = ['X', 'Y'];
   const expected =`${expectedHeaders.join(`,`)}|88,97|77,99`;
   expect(actual).toBeA('string');
   expect(actual.split(`\n`).join(`|`)).toEqual(expected);
 });

});
