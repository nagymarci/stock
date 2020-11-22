import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {getAllCalculated, getAllCalculatedAuth} from '../api'
import { Container, Row } from 'react-bootstrap';
import StockTable from '../components/StockTable';

function getAllCalc(isAuthenticated, user, tokenFunction) {
  if (isAuthenticated && user !== undefined) {
    return getAllCalculatedAuth(tokenFunction, user.sub);
  } else {
    return getAllCalculated();
  }
}

const Home = () => {
  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentStocks, setStocks] = useState([]);

  const { isAuthenticated, getAccessTokenSilently,user } = useAuth0();

  useEffect(() => {
    console.log(isAuthenticated, user, isLoading)
    if (isLoading) {
      getAllCalc(isAuthenticated, user, getAccessTokenSilently)
      .then(([code, stocks]) => {
        if (code === 200) {
          setStocks(stocks);
          setFailed(false);
          setLoading(false);
        } else {
          setFailed(true);
          setLoading(false);
        }
      });
    }
  }, [isLoading, getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    setLoading(true)
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (isFailed) {
    return (
      <div>Error during query profile!</div>
    )
  }

  return (
    <Container className="homepage">
      <Row>
        {currentStocks && 
        <StockTable stockData={currentStocks} />
        }
      </Row>
    </Container>
  )

}

export default Home;