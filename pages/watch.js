import React from 'react';
import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import VideoEmbed from 'components/VideoEmbed';
import Comment from 'components/Comment';
import { formatDistance } from 'date-fns';
import { fetchVideo, fetchCollectionItemsByHref, fetchComments } from 'root/actions';

const WatchMore = dynamic(() => import('components/WatchMore'));

const Container = styled.div`
  background-color: ${props => props.theme.rowBackground};
  min-height: 100vh;
`;

const Information = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding-top: 1.25rem;
  color: ${props => props.theme.title};
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  margin-right: 50px;
  border-right: 1px solid ${props => props.theme.navBottomOutline}};
`;

const Aside = styled.aside`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  color: ${props => props.theme.title};
`;

const Description = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.navBottomOutline}};
`;

const hasCollections = watch => watch._embedded?.collections?.length > 0;

const Watch = props => {
  return (
    <Container>
      <VideoEmbed id={props.watch.id} />
      <Information>
        <Content>
          <Title>{props.watch.title}</Title>
          <div>{formatDistance(new Date(props.watch.created_at), new Date())} ago</div>
          <Description>{props.watch.description}</Description>
          {props.watch.slido_link && (
            <iframe
              src={props.watch.slido_link}
              frameBorder='0'
              height='100%'
              width='100%'
              title='slido'
            />
          )}
          <h3>{props.comments.total} comments</h3>
          {props.comments._embedded.comments.map(Comment)}
        </Content>
        <Aside>
          {hasCollections(props.watch) && (
            <WatchMore
              title={props.watch._embedded?.collections[0].name}
              {...props.more}
              url={props.url}
            />
          )}
        </Aside>
      </Information>
    </Container>
  );
};

Watch.getInitialProps = async ({ query }) => {
  try {
    const watch = await fetchVideo(query.slug);
    const comments = await fetchComments(watch._links.comments.href);
    const more = (await hasCollections(watch))
      ? await fetchCollectionItemsByHref(watch._embedded?.collections[0]._links.items.href)
      : {};
    return { watch, more, comments, url: query.slug };
  } catch (e) {
    return { watch: {} };
  }
};

export default Watch;
