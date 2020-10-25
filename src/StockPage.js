import React from 'react';
import ReactTooltip from 'react-tooltip';

class StockPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFailed: false,
      isLoading: true
    }
  }
  
  componentDidMount() {
    fetch(this.props.url)
    .then((res) => Promise.all([res.status, res.json()]))
    .then(([code, stockInfo]) => {
      if (code === 200) {
        this.setState({stockData: stockInfo, isFailed: false, isLoading: false})
      } else {
        this.setState({isFailed: true, isLoading: false})
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    if (this.state.isFailed) {
      return (
        <div>Error during query stockpage!</div>
      )
    }

    if (this.state.stockData === undefined || this.state.stockData === null)
    {
      return (
        <div>Server returned no data</div>
      )
    }

    return (
      <table>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Dividend Yield</th>
        </tr>
        {this.state.stockData.map((stock) => {
          return (
            <Stock stockData={stock}/>
          )
        })}
      </table>
    )
  }
}

export class Stock extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        ...props.stockData
      }
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
          <Price color={this.state.priceColor} price={this.state.price} optInPrice={this.state.optInPrice}/>
          <Dividend color={this.state.dividendColor} divYield={this.state.dividendYield} optInYield={this.state.optInYield}/>
        </tr>
      )
    }
  }
  
class Price extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: props.color,
      price: props.price,
      optInPrice: props.optInPrice
    }
  }

  render() {
    let optInText = "Opt-in price: " + formatNumber(this.state.optInPrice)
    let color = this.state.color === "blank" ? "white" : this.state.color
    return (
      <td bgcolor={color} data-tip={optInText}>
        {formatNumber(this.state.price)}
        <ReactTooltip />
      </td>
    )
  }
}

class Dividend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: props.color,
      divYield: props.divYield,
      optInYield: props.optInYield
    }
  }

  render() {
    let optInText = "Opt-in yield: " + formatNumber(this.state.optInYield)
    let color = this.state.color === "blank" ? "white" : this.state.color
    return (
      <td bgcolor={color} data-tip={optInText}>
        {formatNumber(this.state.divYield)}
        <ReactTooltip />
      </td>
    )
  }
}

function formatNumber(value) {
    return Number.parseFloat(value).toFixed(2)
}

export default StockPage