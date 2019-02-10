import React from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { connect } from 'react-redux';
import vhx from '../vhx';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

class Browse extends React.Component {
  static async getInitialProps({ store }) {
    const initialBrowseList = await vhx.browse.list({ product: 31534 });

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

    const browseItems = await Promise.all(items);

    return { browseItems };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Title>browse page</Title>
      </div>
    );
  }
}

export default connect(state => state)(Browse);

// store.dispatch({
//   type: 'SET_BROWSE_ITEMS',
//   browse: {
//     title: collection.name,
//     ...item,
//   },
// });
