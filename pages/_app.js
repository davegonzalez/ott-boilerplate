import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Nav from '../components/Nav';
import dark from '../themes/dark';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store';
import { fetchSiteData } from '../actions';

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue","Helvetica", "Helvetica", Arial, sans-serif;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.navLink};
  }
`;

const themes = {
  dark,
};

class OTTApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const site = await fetchSiteData(process.env.SITE_ID);

    // Do as little as possible when rendering the error page, in case something
    // in this `getInitialProps` function fails. We don't want to error on the
    // error page, so to speak.
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, site };
  }

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
            <Global />
            <Nav site={this.props.site} />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(OTTApp);
