import 'jsdom-global/register';
import React from 'react';
import {
 mount,
 shallow
} from 'enzyme';
import sinon from 'sinon';
import expect from 'expect';

import {
 CSVLink,
 CSVDownload
} from '../src';
import {buildURI} from '../src/core';
import 'console-info';


const getAttrs =((htmlElment) => Array.from(
    htmlElment.attributes
  ).reduce((a, b) => {
      a[b.name ==='class' ? 'className':b.name ] = b.value ;
      return a;}
   , {})
);

describe('CSVLink', () => {
   let minProps;
   beforeEach(() => {
    minProps = {
     data: [
      ['X', 'Y'],
      ['1', '2'],
      ['3', '4']
     ]
    };
   });

   it(`renders without error if required props are passed`, () => {
     const wrapper = shallow( <CSVLink {...minProps} > Click here </CSVLink>);
      expect(wrapper.length).toEqual(1);
   });

   it(`has comma as default separator `, () => {
     const wrapper = mount( <CSVLink {...minProps} > Click here </CSVLink>);
     expect(wrapper.props().separator).toEqual(',');
   })

   it(`assigns a download filename`, () => {
     const filename= "persons.csv";
     const wrapper = mount( <CSVLink {...minProps} filename={filename} > here </CSVLink>);
     expect(wrapper.find('a').get(0).getAttribute('download')).toEqual(filename);
   });

    it(`renders anchor tag`, () => {
      const wrapper = shallow( <CSVLink {...minProps} > Click here </CSVLink>);
       expect(wrapper.find('a').length).toEqual(1);
     });



    it(`calls "buildURI" method on mounting`, () => {
      const dataURI = `data:text/csv;some,thing`
      const buildURI = sinon.stub(CSVLink.prototype, 'buildURI').returns(dataURI);
      const wrapper = mount( <CSVLink {...minProps} > Click here </CSVLink>);
      expect(buildURI.calledOnce).toBeTruthy();
      buildURI.restore();
    });
    it(`generates CSV download link and bind it to "href" of <a> element`, () => {
      const linkPrefix = `data:text/csv`
      const wrapper = mount( <CSVLink {...minProps} > Click here </CSVLink>);
      const actualLink = wrapper.find(`a`).get(0).getAttribute('href');
      expect(actualLink.startsWith(linkPrefix)).toBeTruthy();
    });

     it(`forwards props to anchor tag unless props is forbidden`, () => {
      const extraProps = {
        className:`btn`,
        target:'_self'
      };
      const wrapper = mount( <CSVLink {...Object.assign(minProps, extraProps)} > Click here </CSVLink>);
      const actualAnchorAttrs =getAttrs(wrapper.find(`a`).get(0));
     expect(actualAnchorAttrs).toInclude(extraProps);

     })

   });

  describe('CSVDownload', () => {
    let minProps;
    let manyProps;
    beforeEach(() => {
     minProps = {
      data: [
       ['X', 'Y'],
       ['1', '2'],
       ['3', '4']
      ]
     };
     manyProps= Object.assign(minProps, {
      target: '_blank',
      specs: 'fullscreen=yes&height=200&status=yes',
      replace:'no'
     });
    });

    it(`does not render anything by default`, () => {
      const wrapper = shallow( <CSVDownload {...minProps} />);
       expect(wrapper.props().children).toNotExist();
      });
     it(`calls "buildURI" on mounting`, () => {
       const dataURI = `data:text/csv;some,thing`
       const buildURI = sinon.stub(CSVDownload.prototype, 'buildURI').returns(dataURI);
       const wrapper = mount( <CSVDownload {...minProps} />);
       expect(buildURI.calledOnce).toBeTruthy();
       buildURI.restore();
     });
     it(`redirects in different page on mounting`, () => {
       const openCallback = sinon.stub(window,'open').returns({
         focus: ()=> {}
       });
       const wrapper = mount( <CSVDownload {...manyProps} />);
       expect(openCallback.calledWith(buildURI(manyProps.data), manyProps.target, manyProps.specs, manyProps.replace)).toBeTruthy();
       expect(openCallback.calledOnce).toBeTruthy();
       openCallback.restore();
      });

     it(`persists new opened window`, () => {
       const openCallback = sinon.stub(window,'open').returns('newPage');
       const wrapper = mount( <CSVDownload {...manyProps} />);
       const actualNewWindow= wrapper.instance().getWindow();
       expect(actualNewWindow).toEqual('newPage');
       openCallback.restore();

    });
    });
