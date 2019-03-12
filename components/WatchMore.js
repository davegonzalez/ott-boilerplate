import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'root/routes';

const Title = styled.h4`
  font-size: 1.125rem;
  display: flex;
  align-self: flex-start;
`;

const Card = video => (
  <Link route={`/watch/${video.url}`} passHref prefetch key={video.title}>
    <a
      css={`
        padding: 15px 0;
        max-width: 240px;
      `}
    >
      <img src={video.thumbnail.small} />
      <div
        css={`
          margin-top: 10px;
        `}
      >
        {video.name}
      </div>
    </a>
  </Link>
);

const WatchMore = props => {
  const videos = props._embedded.items || props._embedded.collections;

  return (
    <Fragment>
      <Title>More from {props.title}</Title>
      {videos.filter(video => video.url !== props.url).map(Card)}
    </Fragment>
  );
};

export default WatchMore;
