import React from 'react';
import StockPage from './StockPage';
import config from "./config.json";

class WatchLists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFailed: true
    }
  }

  componentDidMount() {
    fetch(config.baseUrl + "/profiles")
    .then((res) => Promise.all([res.status, res.json()]))
    .then(([code, profileNames]) => {
      if (code === 200) {
      console.log(profileNames)
      this.setState({profileNames: profileNames, isFailed: false})
      } else {
      this.setState({isFailed: true})
      }
    })
  }

  render() {
    if (this.state.isFailed) {
      return (
        <div>Error during query watchlist!</div>
      )
    }
    return (
      <div className="watchLists">
        {this.state.profileNames.map((profile) => {
          return (
            <div>
            <h4>{profile}</h4>
            <WatchList profileName={profile}/>
            </div>
          )
        })}
      </div>
    )
  }
}

class WatchList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StockPage url={config.baseUrl + "/profiles/" + this.props.profileName + "/stocks/calculated"} />
    )
  }

}

export default WatchLists;