import fetch from 'isomorphic-unfetch';
import vhx from 'root/vhx';

const key = new Buffer(process.env.OTT_API_KEY).toString('base64');

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
  const initialBrowseList = await vhx.browse.list({ product: process.env.SUBSCRIPTION_ID });

  const items = await initialBrowseList._embedded.items.map(async collection => {
    return Promise.resolve(vhx.collections.retrieve(collection._links.items.href)).then(item => {
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
