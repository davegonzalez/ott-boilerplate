import React from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import vhx from '../vhx';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

class Browse extends React.Component {
  static async getInitialProps({ store }) {
    const initialBrowseList = await vhx.browse.list({ product: 31534 });

    const items = await initialBrowseList._embedded.items.map(async collection => {
      Promise.resolve(vhx.collections.retrieve(collection._links.items.href)).then(item => {
        store.dispatch({
          type: 'SET_BROWSE_ITEMS',
          browse: {
            [collection.name]: item,
          },
        });
      });
    });

    return {};
  }

  render() {
    return (
      <div>
        <Title>browse page</Title>
      </div>
    );
  }
}

export default Browse;

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
