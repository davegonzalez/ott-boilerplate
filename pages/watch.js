import React from 'react';
import styled from 'styled-components';
import VideoEmbed from 'components/VideoEmbed';
import { fetchVideo } from 'root/actions';

const Container = styled.div`
  background-color: ${props => props.theme.rowBackground};
  height: 100vh;
`;

const Information = styled.div`
  margin: 0 auto;
  max-width: 90rem;
  padding-top: 1.25rem;
  color: ${props => props.theme.title};
`;

const Title = styled.h1`
  font-size: 2.25rem;
  color: ${props => props.theme.title};
`;

const Watch = props => {
  return (
    <Container>
      <VideoEmbed id={props.watch.id} />
      <Information>
        <Title>{props.watch.title}</Title>
      </Information>
    </Container>
  );
};

Watch.getInitialProps = async ({ store, query }) => {
  const watch = await fetchVideo(query.slug);

  return { watch };
};

export default Watch;
