import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import config from "./config.json";

export const Admin = () => {
  return (<WatchListForm />)
}

class WatchListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            stocks: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value})        
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name + '\n stocks: ' + this.state.stocks);
        let body = {values: this.state.stocks.split(' ')}
        fetch(config.baseUrl + "/profiles/" + this.state.name, {method: "POST", body: JSON.stringify(body)})
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <label>
              Stocks:
              <input name="stocks" type="text" value={this.state.stocks} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default withAuthenticationRequired(Admin, {
    onRedirecting: () => <div>Loading</div>
})