import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import config from "./config.json";

export const Admin = () => {

  return (
        <WatchListForm />
        );
}

const WatchListForm = () => {

      const [state, setState] = useState({name: '', stocks: ''});
    
      const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})        
      }

      const {
        getAccessTokenSilently
      } = useAuth0();
    
      const handleSubmit = async (event) => {

        event.preventDefault();

        alert('A name was submitted: ' + state.name + '\n stocks: ' + state.stocks);
        let body = {values: state.stocks.split(' ')}
        const token = await getAccessTokenSilently({
          audience: config.apiAudience,
          scope: "write:profiles"
        });
        await fetch(config.baseUrl + "/profiles/" + state.name, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input name="name" type="text" value={state.name} onChange={handleChange} />
          </label>
          <label>
            Stocks:
            <input name="stocks" type="text" value={state.stocks} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
}

export default withAuthenticationRequired(Admin, {
    onRedirecting: () => <div>Loading</div>
})