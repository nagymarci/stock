import React, { useState } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {Stock} from './StockPage';
import config from "./config.json";
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import WatchlistForm from './components/WatchlistForm'

export const WatchLists = () => {

  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentWatchlists, setWatchlists] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFailure, setCreateFailure] = useState(false);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    getAccessTokenSilently({
      audience: config.apiAudience,
      scope: "write:profiles"
    }).then((token) => {
      fetch(config.baseUrl + "/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => Promise.all([res.status, res.json()]))
      .then(([code, watchlists]) => {
        if (code === 200) {
          setWatchlists(watchlists);
          setFailed(false);
          setLoading(false);
        } else {
          setFailed(true);
          setLoading(false);
        }
      })
    })
    
  }

  const handleDelete = async (id) => {
    const token = await getAccessTokenSilently({
      audience: config.apiAudience,
      scope: "write:profiles"
    });
    await fetch(config.baseUrl + "/watchlist/" + id, {
      method: "delete", 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    var watchlists = currentWatchlists;
    var index = watchlists.findIndex(x => x.id === id)
    watchlists.splice(index, 1);
    setWatchlists(watchlists);
    setLoading(false);
    setDeleteSuccess(true);
  }

  const handleCreation = async (name, stocks) => {
    let body = {stocks: stocks.split(' '), name: name}
    await getAccessTokenSilently({
      audience: config.apiAudience,
      scope: "write:profiles"
    }).then((token) => fetch(config.baseUrl + "/watchlist", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`
        }})
    ).then((res) => Promise.all([res.status, res.json()])
    ).then(([code, watchlist]) => {
        if (code === 201) {
          alert("success")
          let watchlists = currentWatchlists != null ? currentWatchlists : [];
          watchlists.push(watchlist);
          setWatchlists(watchlists);
          setLoading(false);
          setDeleteSuccess(false);
          setCreateSuccess(true);
        }
        else {
          alert("failure")
          setCreateFailure(true);
        }
    });
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

  return (
    <div className="watchLists">
      {deleteSuccess && (
        <Alert variant="success">
          Watchlist successfully deleted
        </Alert>
      )}
      {createSuccess && (
        <Alert variant="success">
          Watchlist successfully created
        </Alert>
      )}
      {createFailure && (
        <Alert variant="failure">
          Watchlist creation failued
        </Alert>
      )}
      <WatchlistForm visible={currentWatchlists == null || currentWatchlists.length < 1} onCreation={handleCreation}/>
      {currentWatchlists == null && (<div>You have no Watchlist! Create one above!</div>)}
      {currentWatchlists != null && currentWatchlists.map((watchlist) => {
        return (
          <Container key={watchlist.id}>
            <Row>
              <Col>
                <h4>{watchlist.name}</h4>
              </Col>
              <Col>
              {
                isAuthenticated && 
                (<Delete onDelete={() => handleDelete(watchlist.id)}/>)
              }
            </Col>
          </Row>
          <Row>
            <WatchList id={watchlist.id}/>
          </Row>
          </Container>
        )
      })}
    </div>
  )
}

const WatchList = (props) => {

  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    getAccessTokenSilently({
      audience: config.apiAudience,
      scope: "write:profiles"
    }).then((token) => {
      fetch(config.baseUrl + "/watchlist/" + props.id + "/calculated", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => Promise.all([res.status, res.json()]))
      .then(([code, stockInfo]) => {
        if (code === 200) {
          setStockData(stockInfo);
          setFailed(false)
          setLoading(false)
        } else {
          setFailed(true)
          setLoading(false)
        }
      })
    })
  }

  if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    if (isFailed) {
      return (
        <div>Error during query stockpage!</div>
      )
    }

    if (stockData === undefined || stockData === null)
    {
      return (
        <div>Server returned no data</div>
      )
    }

    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Dividend Yield</th>
          </tr>
        </thead>
        <tbody>
        {stockData.map((stock) => {
          return (
            <Stock key={stock.ticker} stockData={stock}/>
          )
        })}
        </tbody>
      </Table>
    )

}

const Delete = (props) => {

  return (
    <Button variant="danger" onClick={props.onDelete}>
      Delete
    </Button>
  )
}

export default withAuthenticationRequired(WatchLists, {
    onRedirecting: () => <div>Loading</div>
})
