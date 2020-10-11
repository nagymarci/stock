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

  handleDelete(profile) {
    var profiles = this.state.profileNames;
    var index = profiles.indexOf(profile);
    profiles.splice(index, 1);
    this.setState({profileNames: profiles});
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
            <Delete profileName={profile} onDelete={() => this.handleDelete(profile)}/>
            <WatchList profileName={profile}/>
            </div>
          )
        })}
      </div>
    )
  }
}

class WatchList extends React.Component {

  render() {
    return (
      <StockPage url={config.baseUrl + "/profiles/" + this.props.profileName + "/stocks/calculated"}/>
    )
  }

}

class Delete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.profileName
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Delete profile ' + this.state.name);
    fetch(config.baseUrl + "/profiles/" + this.state.name, {method: "delete"})
      .then((res) => {
        if (res.status === 200) {
          this.props.onDelete();
        }
        else {
          alert("Failed to delete profile, response code " + res.status);
        }
      })
    
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input name="name" type="hidden" value={this.state.name} />
        </label>
        <input type="submit" value="Delete" />
      </form>
    )
  }
}

export default WatchLists;