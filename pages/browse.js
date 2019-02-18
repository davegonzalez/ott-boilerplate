import React, { useEffect, useState, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FeaturedCarousel from 'components/FeaturedCarousel';
import BrowseRow from 'components/BrowseRow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import vhx from 'root/vhx';

const Container = styled.div`
  background-color: ${props => props.theme.rowBackground};
`;

const Title = styled.div`
  color: ${props => props.theme.primary};
  font-size: 1.5em;
  padding: 20px 40px 0 45px;
  font-weight: 400;
`;

const omitFeaturedCollection = collection => !collection.is_featured;
const isFeatured = props => props.browseItems.find(collection => collection.is_featured);

const Browse = props => {
  useEffect(() => {
    props.dispatch({
      type: 'SET_INITIAL_BROWSE_ITEMS',
      browse: __NEXT_DATA__.props.initialProps.pageProps.browseItems,
    });
  }, [props.browseItems]);

  return (
    <Container>
      <FeaturedCarousel {...isFeatured(props)} />
      {props.browseItems.filter(omitFeaturedCollection).map(collection => {
        return (
          <Fragment>
            <Title>{collection.name}</Title>
            <BrowseRow items={collection._embedded.items} />
          </Fragment>
        );
      })}
    </Container>
  );
};

Browse.getInitialProps = async props => {
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
};

export default connect(state => state)(Browse);
