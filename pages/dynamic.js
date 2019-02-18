import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import vhx from 'root/vhx';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Dynamic = props => {
  return <Title>{props.slug} page</Title>;
};

Dynamic.getInitialProps = async ({ query, store }) => {
  return query;
};

export default connect(state => state)(Dynamic);
