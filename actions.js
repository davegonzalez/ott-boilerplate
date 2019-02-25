import fetch from 'isomorphic-unfetch';
import vhx from 'root/vhx';

const key = new Buffer(process.env.OTT_API_KEY).toString('base64');
const localkey = new Buffer(process.env.LOCAL_API_KEY).toString('base64');

export const fetchSiteData = () => {
  return fetch(`https://api.vhx.tv/sites/${process.env.SITE_ID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${key}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchAndFormatBrowse = async () => {
  // const initialBrowseList = await vhx.browse.list({ product: process.env.SUBSCRIPTION_ID });
  const initialBrowseList = await fetchBrowse();

  const items = await initialBrowseList._embedded.items.map(async collection => {
    return Promise.resolve(fetchCollection(collection._links.items.href)).then(item => {
      return {
        ...item,
        name: collection.name,
        is_automatic: collection.is_automatic,
        is_featured: collection.is_featured,
        items_count: collection.items_count,
        slug: collection.slug,
        thumbnail: collection.thumbnail,
      };
    });
  });

  return Promise.all(items);
};

export const fetchBrowse = () => {
  return fetch(`http://api.crystal.local/browse?product=${process.env.SUBSCRIPTION_ID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchCollection = href => {
  return fetch(href, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchCollectionItems = slug => {
  return fetch(`http://api.crystal.local/collections/${slug}/items`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchCollectionItemsByHref = href => {
  return fetch(`${href}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchComments = href => {
  return fetch(`${href}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchVideo = slug => {
  return fetch(`http://api.crystal.local/videos/${slug}?url=${slug}&include_collections=true`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  }).then(res => res.json());
};

export const test = email => {
  return fetch(`http://api.crystal.local/login/${email}/confirm`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .catch(console.log);
};

export const searchAll = type => query => {
  return fetch(`http://api.crystal.local/${type}?query=${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localkey}`,
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then(res => {
      return res._embedded?.collections || res._embedded?.videos;
    });
};

export const searchVideos = searchAll('videos');
export const searchCollections = searchAll('collections');

export const search = query => {
  return Promise.all([searchCollections(query), searchVideos(query)]).then(results => {
    const collections = results[0];
    const videos = results[1];

    return [...collections, ...videos];
  });
};
