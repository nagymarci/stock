import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WatchlistForm from '../components/WatchlistForm'
import DeleteButton from '../components/DeleteButton'
import WatchList from '../components/WatchList'

import {getAllWatchlist, deleteWatchlist, createWatchlist} from '../api'

export const WatchLists = () => {

  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentWatchlists, setWatchlists] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFailure, setCreateFailure] = useState(false);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      getAllWatchlist(getAccessTokenSilently)
      .then(([code, watchlists]) => {
        if (code === 200) {
          setWatchlists(watchlists);
          setFailed(false);
          setLoading(false);
        } else {
          setFailed(true);
          setLoading(false);
        }
      });
    }
  }, [isLoading, getAccessTokenSilently]);

  const handleDelete = async (id) => {
    deleteWatchlist(getAccessTokenSilently, id)
    .then(() => {
      var watchlists = currentWatchlists;
      var index = watchlists.findIndex(x => x.id === id)
      watchlists.splice(index, 1);
      setWatchlists(watchlists);
      setDeleteSuccess(true);
    })
  }

  const handleCreation = async (name, stocks) => {
    let body = {stocks: stocks.split(' '), name: name}
    createWatchlist(getAccessTokenSilently, body)
      .then(([code, watchlist]) => {
        if (code === 201) {
          let watchlists = currentWatchlists != null ? currentWatchlists : [];
          watchlists.push(watchlist);
          setWatchlists(watchlists);
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
    <Container className="watchLists">
      {deleteSuccess && (
        <Row>
        <Col>
          <Alert variant="success">
            Watchlist successfully deleted
          </Alert>
        </Col>
        </Row>
      )}
      {createSuccess && (
        <Row>
        <Col>
          <Alert variant="success">
            Watchlist successfully created
          </Alert>
        </Col>
        </Row>
      )}
      {createFailure && (
        <Row>
        <Col>
          <Alert variant="failure">
            Watchlist creation failued
          </Alert>
        </Col>
        </Row>
      )}
      <Row xs={10} lg={60} className="mt-5">
        <Col>
        <WatchlistForm visible={currentWatchlists == null || currentWatchlists.length < 1} onCreation={handleCreation}/>
        </Col>
      </Row>
      <Row xs={10} lg={60} className="mt-3">
        <Col>
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
                  (<DeleteButton onDelete={() => handleDelete(watchlist.id)}/>)
                }
              </Col>
            </Row>
            <Row className="mt-2">
              <WatchList id={watchlist.id}/>
            </Row>
            </Container>
          )
        })}
        </Col>
      </Row>
    </Container>
  )
}

export default withAuthenticationRequired(WatchLists, {
    onRedirecting: () => <div>Loading</div>
})
