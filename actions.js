import fetch from 'isomorphic-unfetch';

const key = new Buffer(process.env.OTT_API_KEY).toString('base64');

export const fetchSiteData = id => {
  return fetch(`https://api.vhx.tv/sites/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${key}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};
