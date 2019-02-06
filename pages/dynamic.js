import React from 'react';
import styled from 'styled-components';
import vhx from '../vhx';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    console.log(query);
    return query;
  }

  render() {
    return <Title>{this.props.slug} page</Title>;
  }
}
