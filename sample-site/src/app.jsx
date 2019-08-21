import React from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
import Table from './Table.jsx';

const csvHeaders1 = [
"Company","جهة الإتصال ","王玉普"
]
const csvData1 = [
  ['Alfreds Futterkiste'	,'Maria Anders',	'Germany'] ,
  ['Rathath IT', 'Abdennour TM' , 'تونس'] ,
  ['Sinopec', '王玉普' , '中国'],
  ['Auto1', 'Petter' , 'Germany'] ,
  ['Estifeda', 'Yousri K' , 'تونس'] ,
  ['Nine 10ᵗʰ', 'Amjed Idris' , 'المملكة العربية السعودية '] ,
  ['Tamkeen', 'Mohamed Alshibi' , 'المملكة العربية السعودية'] ,
  ['Packet Publishing', 'David Become' , 'UK'] ,
  ['Software hourse', 'Soro' , 'Poland']
];

const csvHeaders2 = [
  { label: 'First. Name', key: 'first.name' },
  { label: 'Last Name.', key: 'lastname' },
  { label: 'E.m.a.i.l.', key: 'email' }
];

const csvData2 = [
  { first:{name: 'Ahm.ed'}, lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { first:{name: 'Raed'}, lastname: 'Lab.es', email: 'rl@smthing.co.com' },
  { first:{name: 'Yezzi'}, lastname: 'Min l3b', email: 'ymin@cocococo.com' }
];

const csvData3 = [
  { 'first.name': 'Ahm.ed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { 'first.name': 'Raed', lastname: 'Lab.es', email: 'rl@smthing.co.com' },
  { 'first.name': 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
];

class App extends React.Component {

  state= {
    csvHeaders: csvHeaders1,
    csvData: csvData1
  };
  getFileName() {
    if (!this.state.filename) return undefined;
    if (!this.state.filename.endsWith('.csv')) return this.state.filename + '.csv';
    return this.state.filename;
  }
  render() {
    return (
      <div>
          <div ><h1>Pretty Example "React-csv"</h1></div>
          <div className="row">
              <div className="large-3 columns">
                  <a className="btn"
                  onClick={() => this.setState({csvHeaders: csvHeaders1, csvData: csvData1})}>
                      Sample Array Data
                  </a>
              </div>
              <div className="large-3 columns">
                  <a className="btn"
                  onClick={() => this.setState({csvHeaders: csvHeaders2, csvData: csvData2})}>Sample Object Data1</a>
              </div>
              <div className="large-3 columns">
                  <a className="btn"
                  onClick={() => this.setState({csvHeaders: csvHeaders2, csvData: csvData3})}>Sample Object Data2</a>
              </div>
              <div className="large-3 columns">
                  <a className="btn"
                  onClick={() => this.setState({csvHeaders: csvHeaders1, csvData: csvData2})}>Sample Object Data3</a>
              </div>
          </div>
          <div>
              <Table headers={this.state.csvHeaders} data={this.state.csvData} />
          </div>
          <div className="row">
              <div className="large-6 columns"></div>
              <div className="large-4 columns">
                  <input
                    onKeyUp={(e) => this.setState({filename: e.target.value})}
                    type="text" placeholder="File name"/>
              </div>
              <div className="large-2 columns">
                  <CSVLink
                    headers={this.state.csvHeaders}
                    data={this.state.csvData}
                    filename={this.getFileName()}
                    className="btn"
                  >
                    Export to CSV ⬇
                  </CSVLink>
              </div>
          </div>
          <div>
              <b>Header :</b>
              <div><pre>{JSON.stringify(this.state.csvHeaders, null, 2) }</pre></div>
              <b>Data : </b>
              <div><pre>{JSON.stringify(this.state.csvData, null, 2) }</pre></div>
          </div>

      </div>
    );
  }
}

export default App;
