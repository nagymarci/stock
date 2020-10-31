import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {getProfile, saveProfile} from '../api'
import ProfileForm from '../components/ProfileForm';

const defaultProfile = {
  defaultExpectation: 9.0,
  expectedReturn: 9.0,
  expectations: []
}

export const Profile = () => {

  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFailure, setCreateFailure] = useState(false);

  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (isLoading && user !== undefined) {
      getProfile(getAccessTokenSilently, user.sub)
      .then(([code, profile]) => {
        if (code === 200) {
          setProfile(profile);
          setFailed(false);
          setLoading(false);
        } else if (code === 404) {
          setProfile(defaultProfile);
          setFailed(false);
          setLoading(false);
        } else {
          setFailed(true);
          setLoading(false);
        }
      });
    }
  }, [isLoading, getAccessTokenSilently, user]);

  const handleSave = async (profile) => {
    profile.userId = user.sub;
    profile.email = user.email;
    saveProfile(getAccessTokenSilently, profile)
    .then(([code, response]) => {
      if (code === 201) {
        setProfile(profile);
        setCreateSuccess(true);
      }
      else {
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
      <div>Error during query profile!</div>
    )
  }

  return (
    <Container className="profile">
      {createSuccess && (
        <Row>
        <Col>
          <Alert variant="success">
            Profile successfully saved
          </Alert>
        </Col>
        </Row>
      )}
      {createFailure && (
        <Row>
        <Col>
          <Alert variant="failure">
            Profile save failed
          </Alert>
        </Col>
        </Row>
      )}
      <Row xs={10} lg={60} className="mt-5">
        <Col>
        <ProfileForm profile={profile} onSave={handleSave} />
        </Col>
      </Row>
    </Container>
  )
}

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <div>Loading</div>
})
