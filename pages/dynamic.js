import React from 'react';
import styled from 'styled-components';
import { Link } from 'root/routes';
import { fetchCollectionItems } from 'root/actions';

const Container = styled.div`
  background-color: ${props => props.theme.rowBackground};
  padding: 40px;
  height: 100vh;
`;

const Title = styled.div`
  color: ${props => props.theme.primary};
  font-size: 1.5em;
  font-weight: 400;
  display: block;
  padding-bottom: 20px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Content = styled.div`
  background-color: ${props => props.theme.rowBackground};
  color: ${props => props.theme.navLink};
`;

const Image = styled.img`
  position: relative;
  background-color: ${props => props.theme.rowBackground};
  margin-bottom: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  max-width: 100%;
`;

const StyledLink = styled.a`
  display: block;
`;

const Dynamic = props => {
  const items = props.collection._embedded.items || props.collection._embedded.collections;

  return (
    <Container>
      <Title>{props.collection.name}</Title>
      <List>
        {items.map(collectionItem => {
          return (
            <Content key={collectionItem.name}>
              <Link route={`/watch/${collectionItem.url}`} passHref prefetch>
                <StyledLink>
                  <Image src={collectionItem.thumbnail.medium} />
                  <div>{collectionItem.name}</div>
                </StyledLink>
              </Link>
            </Content>
          );
        })}
      </List>
    </Container>
  );
};

Dynamic.getInitialProps = async ({ query }) => {
  const collection = await fetchCollectionItems(query.slug);

  return {
    query,
    collection,
  };
};

export default Dynamic;
