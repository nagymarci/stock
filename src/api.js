import config from "./config.json";

export async function getAllWatchlist(tokenFunction) {
  return tokenFunction({
    audience: config.apiAudience,
    scope: "write:profiles"
  })
  .then((token) => fetch(config.baseUrl + "/watchlist", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
  .then((res) => Promise.all([res.status, res.json()]));
}

export async function deleteWatchlist(tokenFunction, id) {
  return tokenFunction({
    audience: config.apiAudience,
    scope: "write:profiles"
  }).then((token) => fetch(config.baseUrl + "/watchlist/" + id, {
      method: "delete", 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );
}

export async function createWatchlist(tokenFunction, watchlist) {
  return tokenFunction({
    audience: config.apiAudience,
    scope: "write:profiles"
  }).then((token) => fetch(config.baseUrl + "/watchlist", {
      method: "POST",
      body: JSON.stringify(watchlist),
      headers: {
        Authorization: `Bearer ${token}`
      }})
  ).then((res) => Promise.all([res.status, res.json()]));
}

export async function getCalculatedWatchlist(tokenFunction, id) {
  return tokenFunction({
      audience: config.apiAudience,
      scope: "write:profiles"
    })
  .then((token) => fetch(config.baseUrl + "/watchlist/" + id + "/calculated", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  .then((res) => Promise.all([res.status, res.json()]));
}