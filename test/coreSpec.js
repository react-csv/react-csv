import expect from 'expect';
import sinon from 'sinon';
import {
  isJsons,
  isArrays,
  jsonsHeaders,
  jsons2arrays,
  arrays2csv,
  jsons2csv,
  string2csv,
  toCSV,
  buildURI,
  joiner,
  elementOrEmpty,
} from '../src/core';

describe('In browser environment', () => {
  before(function () {
    this.jsdom = require('jsdom-global')()
  })

  after(function () {
    this.jsdom()
  })

  describe(`core::isJsons`, () => {
    it(`returns true if all items of array are literal objects`, () => {
      const target = [{}, {}, {}, {}];
      expect(isJsons(target)).toBeTruthy();
    });
    it(`returns false if one of array items is not literal object`, () => {
      let target = ["", {}, {}, {}];
      expect(isJsons(target)).toBeFalsy();
      target = [
        {},
        [],
        {},
        {}
      ];
      expect(isJsons(target)).toBeFalsy();
    });

  });

  describe(`core::isArrays`, () => {
    it(`returns true if all array items are arrays too`, () => {
      const target = [
        [],
        [],
        [],
        []
      ];
      expect(isArrays(target)).toBeTruthy();
    });
    it(`returns false if one of array items is not array`, () => {
      let target = [
        {},
        [],
        [],
        []
      ];
      expect(isArrays(target)).toBeFalsy();
      target = [
        [],
        new Set([]),
        [],
        []
      ];
      expect(isArrays(target)).toBeFalsy();
      target = [
        [],
        '[]',
        [],
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
        sport: 0
      }]
    });
    it(`converts an Array of literal objects to Array of arrays without headers`, () => {
      const actual = jsons2arrays(fixtures, false);
      const expected = [
        ['90', ''],
        ['', '97'],
        ['77', 0]
      ];
      expect(actual).toEqual(expected);
    });
    it(`converts an Array of literal objects to Array of arrays`, () => {
      const actual = jsons2arrays(fixtures);
      const expected = [
        ['maths', 'sport'],
        ['90', ''],
        ['', '97'],
        ['77', 0]
      ];
      expect(actual).toEqual(expected);
    });

    it(`converts to Array of arrays following the order of headers`, () => {
      const actual = jsons2arrays(fixtures, ['sport', 'maths']);
      const expected = [
        ['maths', 'sport'].reverse(), ['90', ''].reverse(), ['', '97'].reverse(), ['77', 0].reverse()
      ];
      expect(actual).toEqual(expected);
    });
    it(`accepts any size of headers list`, () => {
      const headers = ['maths', 'sport', 'phy', 'ch'];
      const actual = jsons2arrays(fixtures, headers);
      const expected = [
        headers, ['90', '', '', ''],
        ['', '97', '', ''],
        ['77', 0, '', '']
      ];
      expect(actual).toEqual(expected);
    });
    it(`accepts dot notation in headers`, () => {
      fixtures = [{
        maths: '90'
      }, {
        sport: '97'
      }, {
        maths: '77',
        sport: 0
      }, {
        people: {
          name: 'john',
          age: 12
        }
      }]
      const headers = ['maths', 'sport', 'phy', 'ch', 'people.name'];
      const actual = jsons2arrays(fixtures, headers);
      const expected = [
        headers, ['90', '', '', '', ''],
        ['', '97', '', '', ''],
        ['77', 0, '', '', ''],
        ['', '', '', '', 'john']
      ];
      expect(actual).toEqual(expected);
    });
    it(`accepts dot notation in headers and map to key when nested keys are not found`, () => {
      fixtures = [{
        maths: '90'
      }, {
        sport: '97'
      }, {
        maths: '77',
        sport: 0
      }, {
        people: {
          name: 'john'
        }
      }, {
        'people.age': '20'
      }]
      const headers = ['maths', 'sport', 'phy', 'ch', 'people.name', 'people.age'];
      const actual = jsons2arrays(fixtures, headers);
      const expected = [
        headers, ['90', '', '', '', '', ''],
        ['', '97', '', '', '', ''],
        ['77', 0, '', '', '', ''],
        ['', '', '', '', 'john', ''],
        ['', '', '', '', '', '20']
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe(`core::elementOrEmpty`, () => {
    it(`returns the value of the element`, () => {
      const expected = "any string ...";
      const actual = elementOrEmpty(expected);
      expect(actual).toEqual(expected);
    });

    it(`returns an empty string when the element is null or undefined`, () => {
      const emptyString = '';
      const wasNull = elementOrEmpty(null);
      const wasUndefined = elementOrEmpty(undefined);
      expect(wasNull).toEqual(emptyString);
      expect(wasUndefined).toEqual(emptyString);
    });
  });

  describe(`core::joiner`, () => {
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
      expect(actual.split(`\n`).join(`|`)).toEqual(`"a","b"|"c","d"`);
    });

    it(`renders  CSV headers whenever it was given `, () => {
      const headers = [`X`, `Y`];
      const firstLineOfCSV = arrays2csv(fixtures, headers).split(`\n`)[0];
      expect(firstLineOfCSV).toEqual(`"X","Y"`);
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
      const expected = `"X","Y"|"88","97"|"77","99"`;

      expect(actual).toBeA('string');
      expect(actual.split(`\n`).join(`|`)).toEqual(expected);
    });

    it(`renders CSV string according to order of given headers`, () => {
      let fixtures = [{ X: '12', Y: 'bb' }, { Y: 'ee', X: '55' }]
      const headers = ['Y', 'X', 'Z'];
      const actual = jsons2csv(fixtures, headers);
      expect(actual.startsWith(`"Y","X","Z"`)).toBeTruthy();
      expect(actual.endsWith(`"ee","55",""`)).toBeTruthy();

    });

    it(`converts Array of literal objects to string in CSV format including custom header labels`, () => {
      const customHeaders = [
        { label: 'Letter X', key: 'X' },
        { label: 'Letter Y', key: 'Y' }
      ];

      const actual = jsons2csv(fixtures, customHeaders);

      expect(actual).toBeA('string');
      expect(actual.startsWith(`"Letter X","Letter Y"`)).toBeTruthy();
      expect(actual.endsWith(`"77","99"`)).toBeTruthy();
    });

  });

  describe(`core::string2csv`, () => {
    let fixtures;
    beforeEach(() => {
      fixtures = `33,44\n55,66`;
    });
    it(`returns the same string if no header given`, () => {
      expect(string2csv(fixtures)).toEqual(fixtures);
    });

    it(`prepends headers at the top of input`, () => {
      const headers = [`X`, `Y`];
      expect(string2csv(fixtures, headers)).toEqual(`X,Y\n${fixtures}`);
    });

    it('escapes double quotes', () => {
      const result = string2csv('lorem "ipsum" dolor sit amet')
      expect(result).toEqual('lorem ""ipsum"" dolor sit amet');
    })
  });

  describe(`core::toCSV`, () => {
    let fixtures;
    beforeEach(() => {
      fixtures = { string: 'Xy', arrays: [[], []], jsons: [{}, {}] };
    });
    it(`requires one argument at least`, () => {
      expect(() => toCSV()).toThrow();
    });

    it(`accepts data as "Array" of jsons `, () => {
      expect(() => toCSV(fixtures.jsons)).toNotThrow();
    });

    it(`accepts data as "Array" of arrays `, () => {
      expect(() => toCSV(fixtures.arrays)).toNotThrow();
    });

    it(`accepts data as "string" `, () => {
      expect(() => toCSV(fixtures.string)).toNotThrow();
    });

  })

  describe(`core::buildURI`, () => {
    let fixtures;
    beforeEach(() => {
      fixtures = { string: 'Xy', arrays: [['a', 'b'], ['c', 'd']], jsons: [{}, {}] };
    });

    it(`generates URI to download data in CSV format`, () => {
      const prefixCsvURI = `data:text/csv;`;
      expect(buildURI(fixtures.jsons, false).startsWith(prefixCsvURI)).toBeTruthy();
      expect(buildURI(fixtures.arrays).startsWith(prefixCsvURI)).toBeTruthy();
      expect(buildURI(fixtures.string).startsWith(prefixCsvURI)).toBeTruthy();

    });

    it(`generates CSV string according to "separator"`, () => {
      const prefixCsvURI = `data:text/csv;charset=utf-8,\uFEFF,`;
      const expectedSepartorCount = fixtures.arrays.map(row => row.length - 1).reduce((total, next) => total + next, 0);
      let separator = ';';
      let fullURI = buildURI(fixtures.arrays, true, null, separator);

      expect(
        fullURI.slice(prefixCsvURI.length).match(/;/g).length
      ).toEqual(expectedSepartorCount);

      separator = ':'; // any separator
      fullURI = buildURI(fixtures.arrays, true, null, separator);
      expect(
        fullURI.slice(prefixCsvURI.length).match(/:/g).length
      ).toEqual(expectedSepartorCount);

    });
  });
  describe('core::joiner', () => {
    const data = [null, undefined, [1, 2, 3, 5], ["hello hello"]];
    it('does not throw upon receiving empty (null / undefined) indices in the data array', () => {
      expect(joiner).toNotThrow(data);
    });
    it(`filters null rows and replaces null / undefined values by an empty string`, () => {
      const expected = '"1","two","3","true"\n"4","","six","false"';
      const actual = joiner([
        [1, 'two', 3, true],
        null,
        [4.0, undefined, 'six', false]
      ]);
      expect(actual).toEqual(expected);
    });
    it('does return the valid data contained between null and undefined values', () => {
      expect(joiner(data)).toMatch('"1","2","3","5"\n"hello hello"');
    });
  });

});
