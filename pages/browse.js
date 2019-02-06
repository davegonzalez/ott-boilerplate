import React from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import vhx from '../vhx';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default class extends React.Component {
  static async getInitialProps() {
    const browse = await vhx.browse.list({ product: 31534 });
    browse._embedded.items.map(async collection => {
      Promise.resolve(vhx.collections.retrieve(collection._links.items.href)).then(item => {
        console.log({
          [collection.name]: item,
        });
      });
    });

    return { browse: browse._embedded.items };
  }

  render() {
    return <Title>browse page</Title>;
  }
}

// series.map(async item => {
//   Promise.resolve(
//     vhx.collections.items(item._links.seasons.href),
//   ).then(season => {
//     dispatch({
//       type: SET_SERIES_SEASON,
//       seasons: {
//         [item.id]: season,
//       },
//     });
//   });
// });
