import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import StockPage from './StockPage';
import config from "./config.json";

const WatchLists = () => {

  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [profileNames, setProfileNames] = useState([]);

  const { isAuthenticated } = useAuth0();

  if (isLoading) {
  fetch(config.baseUrl + "/profiles")
  .then((res) => Promise.all([res.status, res.json()]))
  .then(([code, profiles]) => {
    if (code === 200) {
    console.log(profiles)
    setProfileNames(profiles);
    setFailed(false);
    setLoading(false);
    } else {
      setFailed(true);
      setLoading(false);
    }
  })
}

  const handleDelete = (profile) => {
    var profiles = profileNames;
    var index = profiles.indexOf(profile);
    profiles.splice(index, 1);
    setProfileNames(profiles);
    setLoading(true);
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (isFailed) {
    return (
      <div>Error during query watchlist!</div>
    )
  }

  console.log(isAuthenticated)

  return (
    <div className="watchLists">
      {profileNames.map((profile) => {
        return (
          <div>
          <h4>{profile}</h4>
          {
            //console.log(isAuthenticated) &&
            isAuthenticated && 
            (<Delete profileName={profile} onDelete={() => handleDelete(profile)}/>)
          }
          <WatchList profileName={profile}/>
          </div>
        )
      })}
    </div>
  )
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