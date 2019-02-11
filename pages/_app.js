import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import dark from '../themes/dark';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store';

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
