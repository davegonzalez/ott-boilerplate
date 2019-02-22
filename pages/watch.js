import React from 'react';
import { fetchVideo } from 'root/actions';

const Watch = props => {
  return <div>hi</div>;
};

Watch.getInitialProps = async ({ store, query }) => {
  const watch = await fetchVideo(query.slug);

  return { watch };
};

export default Watch;
