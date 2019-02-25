import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FeaturedCarousel from 'components/FeaturedCarousel';
import BrowseRow from 'components/BrowseRow';
import { Link } from 'root/routes';
import Head from 'next/head';
import { fetchAndFormatBrowse } from 'root/actions';

// see: https://github.com/fridays/next-routes/issues/269
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

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
const isFeatured = props => props.browse.find(collection => collection.is_featured);

const Browse = props => {
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
      {props.browse.filter(omitFeaturedCollection).map(collection => {
        return (
          <Fragment key={collection.name}>
            <Link
              href={`/dynamic?slug=${collection.name.toLowerCase().replace(/ /g, '-')}`}
              as={`/browse/${collection.name.toLowerCase().replace(/ /g, '-')}`}
              passHref
              prefetch
            >
              <Title>{collection.name}</Title>
            </Link>
            <BrowseRow items={collection._embedded.items || collection._embedded.collections} />
          </Fragment>
        );
      })}
    </Container>
  );
};

Browse.getInitialProps = async () => {
  const browse = await fetchAndFormatBrowse();

  return { browse };
};

export default Browse;

Browse.propTypes = {
  browse: PropTypes.shape({}),
};

Browse.defaultProps = {
  browse: [],
};
