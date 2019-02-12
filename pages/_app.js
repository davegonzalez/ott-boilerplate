import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import dark from '../themes/dark';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store';

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  }
`;

const themes = {
  dark,
};

class OTTApp extends App {
  constructor() {
    super();

    this.state = {
      setTheme: 'dark',
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Global />
        <ThemeProvider theme={themes[this.state.setTheme]}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(OTTApp);
