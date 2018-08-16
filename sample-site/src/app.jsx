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

class App extends React.Component {

  state= {
    newLine:`\n`
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
          <div>
              <Table headers={csvHeaders} data={csvData} />
          </div>
          <div className="row">
              <div className="large-6 columns"></div>
              <div className="large-4 columns">
                  <input
                    onKeyUp={(e) => this.setState({filename: e.target.value})}
                    type="text" placeholder="File name"/>
                    <input
                    onKeyUp={(e) => {console.log(e.target.value);this.setState({newLine: e.target.value})}}
                    type="text" placeholder='NewLine Character. Default:\n'/>
              </div>
              <div className="large-2 columns">
                  <CSVLink
                    headers={csvHeaders}
                    data={csvData}
                    filename={this.getFileName()}
                    newLine={this.state.newLine}
                    className="btn">Export to CSV ⬇</CSVLink>
              </div>
          </div>

      </div>
    );
  }
}

export default App;
