import React from 'react';
import './App.css';

function App() {
  return (
    <table>
      <tr>
        <th>Symbol</th>
        <th>Price</th>
      </tr>
      <Stock />
    </table>
  )
}

class Stock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFailed: false
    }
  }
  componentDidMount() {
    fetch("https://stock.nagymarci.hu/stocks/INTC/calculated")
    .then((res) => Promise.all([res.status, res.json()]))
    .then(([code, stockInfo]) => {
      if (code === 200) {
        console.log(stockInfo)
        this.setState({...stockInfo, isFailed: false})
      } else {
        this.setState({isFailed: true})
      }
    })
  }

  render() {
    if (this.state.isFailed) {
      return (
        <div>Error during query!</div>
      )
    }
    return (
      <tr>
        <td>{this.state.ticker}</td>
        <td>{this.state.price}</td>
      </tr>
    )
  }
}



export default App;
