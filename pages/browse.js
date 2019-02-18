import React, { useEffect, useState, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FeaturedCarousel from 'components/FeaturedCarousel';
import BrowseRow from 'components/BrowseRow';
import vhx from 'root/vhx';
import { Link } from 'root/routes';
import Head from 'next/head';

// see: https://github.com/fridays/next-routes/issues/269
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const requestAndFormatItems = async () => {
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

  return Promise.all(items);
};

const Container = styled.div`
  background-color: ${props => props.theme.rowBackground};
`;

const Title = styled.a`
  color: ${props => props.theme.primary};
  font-size: 1.5em;
  padding: 20px 40px 0 45px;
  font-weight: 400;
  display: block;
`;

const omitFeaturedCollection = collection => !collection.is_featured;
const isFeatured = props => props.browseItems.find(collection => collection.is_featured);

const Browse = props => {
  useEffect(() => {
    if (__NEXT_DATA__.props.initialProps.pageProps.browseItems) {
      props.dispatch({
        type: 'SET_INITIAL_BROWSE_ITEMS',
        browse: __NEXT_DATA__.props.initialProps.pageProps.browseItems,
      });
    } else {
      requestAndFormatItems().then(items => {
        props.dispatch({
          type: 'SET_INITIAL_BROWSE_ITEMS',
          browse: items,
        });
      });
    }
  }, [props.browseItems]);

  return (
    <Container>
      <Head>
        <link
          rel='stylesheet'
          type='text/css'
          charSet='UTF-8'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
      </Head>
      <FeaturedCarousel {...isFeatured(props)} />
      {props.browseItems.filter(omitFeaturedCollection).map(collection => {
        return (
          <Fragment>
            <Link
              href={`/dynamic?slug=${collection.name.toLowerCase()}`}
              as={`/${collection.name.toLowerCase()}`}
              passHref
              prefetch
            >
              <Title>{collection.name}</Title>
            </Link>
            <BrowseRow items={collection._embedded.items} />
          </Fragment>
        );
      })}
    </Container>
  );
};

Browse.getInitialProps = async props => {
  const browseItems = await requestAndFormatItems();
  return { browseItems };
};

export default connect(state => state)(Browse);
