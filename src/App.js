import React from 'react';
import ReactTooltip from 'react-tooltip';
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
      isFailed: true
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
    console.log(this.state.priceColor)
    console.log(this.state.price)
    return (
      <tr>
        <td>{this.state.ticker}</td>
        <Price color={this.state.priceColor} price={this.state.price} optInPrice={this.state.optInPrice}/>
      </tr>
    )
  }

  renderPrice(color, price, optInPrice) {
    return (
      <Price color={color} price={price} optInPrice={optInPrice}/>
    )
  }
}

class Price extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      color: props.color,
      price: props.price,
      optInPrice: props.optInPrice
    }
  }

  render() {
    console.log(this.state.color)
    console.log(this.state.price)
    let optInText = "Opt-in price: " + this.state.optInPrice
    return (
      <td bgcolor={this.state.color} data-tip={optInText}>
        {this.state.price}
        <ReactTooltip />
      </td>
    )
  }
}


export default App;
