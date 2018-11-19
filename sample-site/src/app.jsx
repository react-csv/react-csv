import React from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
import Table from './Table.jsx';

const csvHeaders = [
"Company","جهة الإتصال ","王玉普"
]
const csvData =[
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
const csvData2 =[
  ['Alfreds Futterkiste'	,'Maria Anders',	'Germany'] ,
  ['Sinopec', '王玉普' , '中国'],
  ['Auto1', 'Petter' , 'Germany'] ,
  ['Estifeda', 'Yousri K' , 'تونس'] ,
  ['Tamkeen', 'Mohamed Alshibi' , 'المملكة العربية السعودية'] ,
  ['Packet Publishing', 'David Become' , 'UK']
];

class App extends React.Component {

  state= {
    data: csvData,
    selected: "data1"
  };
  handleRadioChange = event => {
    const { value } = event.target;
    this.setState({
      data: value === "data1" ? csvData : csvData2,
      selected: value
    });
  }
  getFileName() {
    if (!this.state.filename) return undefined;
    if (!this.state.filename.endsWith('.csv')) return this.state.filename + '.csv';
    return this.state.filename;
  }
  render() {
    return (
      <div>
          <div ><h1>Pretty Example "React-csv"</h1></div>
          <div>
              <input type="radio" id="data1" name="selectedData" value="data1" checked={this.state.selected === "data1"} onChange={this.handleRadioChange} />
              <label htmlFor="data1">Data1</label>
              <input type="radio" id="data2" name="selectedData" value="data2" checked={this.state.selected === "data2"} onChange={this.handleRadioChange} />
              <label htmlFor="data2">Data2</label>
          </div>
          <div>
              <Table headers={csvHeaders} data={this.state.data} />
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
                    headers={csvHeaders}
                    data={this.state.data}
                    filename={this.getFileName()}
                    className="btn">Export to CSV ⬇</CSVLink>
              </div>
          </div>

      </div>
    );
  }
}

export default App;
