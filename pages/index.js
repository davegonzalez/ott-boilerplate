import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${props => props.theme.primary};
  font-size: 50px;
`;

const Index = props => {
  return <Title>My page</Title>;
};

export default Index;
