import React from 'react';

const Watch = props => {
  return <div>hi</div>;
};

Watch.getInitialProps = async ({ store, query }) => {
  const browse = store.getState().browse;

  /**
   * TODO: this is an insane workaround to finding a collection nested deep down in a
   * hole of browse items. Just open a PR to query collections and collection items by sku.
   */
  const watch = browse
    .map(collection => {
      return collection._embedded.items || collection._embedded.collections;
    })
    .find(items => {
      return items.find(collectionItem => {
        return (
          collectionItem.name
            .trim()
            .toLowerCase()
            .replace(/ /g, '-') === query.slug
        );
      });
    })
    .find(
      item =>
        item.name
          .trim()
          .toLowerCase()
          .replace(/ /g, '-') === query.slug
    );

  return { watch };
};

export default Watch;
