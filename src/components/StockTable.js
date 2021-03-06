import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Table } from 'react-bootstrap';

class StockTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockData: props.stockData
    }
  }  

  render() {
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Dividend Yield</th>
            <th>P/E</th>
          </tr>
        </thead>
        <tbody>
        {this.state.stockData.map((stock) => {
          return (
            <Stock key={stock.ticker} stockData={stock}/>
          )
        })}
        </tbody>
      </Table>
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
          <PeInfo color={this.state.pecolor} pe={this.state.currentPe} optInPe={this.state.optInPe} />
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

class PeInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: props.color,
      currentPe: props.pe,
      optInPe: props.optInPe
    }
  }

  render() {
    let optInText = "Opt-in pe: " + formatNumber(this.state.optInPe)
    let color = this.state.color === "blank" ? "white" : this.state.color
    return (
      <td bgcolor={color} data-tip={optInText}>
        {formatNumber(this.state.currentPe)}
        <ReactTooltip />
      </td>
    )
  }
}

function formatNumber(value) {
    return Number.parseFloat(value).toFixed(2)
}

export default StockTable