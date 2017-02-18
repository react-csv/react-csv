import React from 'react';

class Table extends React.Component {
  state= {};
  renderHeaders() {
   return (<thead><tr>
             {this.props.headers.map((header, i) => <th key={"th"+i}>{header}</th>)}
         </tr></thead>);
  }

   renderRow(row, key) {
     return (<tr key={'tbody-tr'+key}>
               {row.map((cell, i) => <td key={'td-'+key+'-'+i}>{cell}</td>)}
           </tr>);
   }

  renderData() {
   return (
    <tbody>
      {this.props.data.map((row, k) => this.renderRow(row, k) )}
   </tbody>
   );
  }
  render(){
    return (
     <table >
      {this.renderHeaders()}
      {this.renderData()}
     </table>
    );
  }
}

export default Table;
