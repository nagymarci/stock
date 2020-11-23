export async function getAllWatchlist(tokenFunction) {
  return tokenFunction({
    audience: window.config.apiAudience,
    scope: "write:profiles"
  })
  .then((token) => fetch(window.config.baseUrl + "/watchlist", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
  .then((res) => Promise.all([res.status, res.json()]));
}

export async function deleteWatchlist(tokenFunction, id) {
  return tokenFunction({
    audience: window.config.apiAudience,
    scope: "write:profiles"
  }).then((token) => fetch(window.config.baseUrl + "/watchlist/" + id, {
      method: "delete", 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );
}

export async function createWatchlist(tokenFunction, watchlist) {
  return tokenFunction({
    audience: window.config.apiAudience,
    scope: "write:profiles"
  }).then((token) => fetch(window.config.baseUrl + "/watchlist", {
      method: "POST",
      body: JSON.stringify(watchlist),
      headers: {
        Authorization: `Bearer ${token}`
      }})
  ).then((res) => Promise.all([res.status, res.json()]));
}

export async function getCalculatedWatchlist(tokenFunction, id) {
  return tokenFunction({
      audience: window.config.apiAudience,
      scope: "write:profiles"
    })
  .then((token) => fetch(window.config.baseUrl + "/watchlist/" + id + "/calculated", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  .then((res) => Promise.all([res.status, res.json()]));
}

export async function getProfile(tokenFunction, userId) {
  return tokenFunction({
    audience: window.config.apiAudience,
    scope: "write:profiles"
  })
  .then((token) => fetch(window.config.baseUrl + "/userprofile/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
  .then((res) => Promise.all([res.status, res.json()]));
}

export async function saveProfile(tokenFunction, profile) {
  return tokenFunction({
    audience: window.config.apiAudience,
    scope: "write:profiles"
  })
  .then((token) => fetch(window.config.baseUrl + "/userprofile", {
    method: "POST",
    body: JSON.stringify(profile),  
    headers: {
      Authorization: `Bearer ${token}`
    }
  }))
  .then((res) => Promise.all([res.status, (res) => {
    if (res.status === 201) {
      return null
    }
    res.json()
  }]));
}

export async function getAllCalculatedAuth(tokenFunction, userId) {
  return tokenFunction({
    audience: window.config.apiAudience,
    scope: "write:profiles"
  })
  .then((token) => fetch(window.config.baseUrl + "/all/" + userId, {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${token}`
    }
  }))
  .then((res) => Promise.all([res.status, res.json()]));
}

export async function getAllCalculated() {
  return fetch(window.config.baseUrl + "/all", {
    method: "GET"
  })
  .then((res) => Promise.all([res.status, res.json()]));
}