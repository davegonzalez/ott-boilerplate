import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Nav from '../components/Nav';
import dark from '../themes/dark';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store';
import { fetchSiteData, fetchAndFormatBrowse } from '../actions';

const Global = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    /* 1 */
    -ms-text-size-adjust: 100%;
    /* 2 */
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    border: 0;
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode: bicubic;
    display: inline-block;
    vertical-align: middle;
  }

  img[src=""] {
    display: none;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.navLink};
  }

  table {
    border-collapse: collapse;
    border-spacing: 0; }

  td,
  th {
    padding: 0; }

  ul,
  menu,
  dir {
    padding: 0;
    margin: 0;
  }

  li {
    text-decoration: none;
    list-style-type: none;
  }
`;

const themes = {
  dark,
};

class OTTApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    /**
     * TODO: include notes here about why we're making these requests for on the initial page load
     */
    const site = await fetchSiteData();
    const browseItems = await fetchAndFormatBrowse();

    ctx.store.dispatch({
      type: 'SET_INITIAL_BROWSE_ITEMS',
      browse: browseItems,
    });

    // Do as little as possible when rendering the error page, in case something
    // in this `getInitialProps` function fails. We don't want to error on the
    // error page, so to speak.
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps, site, browseItems };
  }

  constructor() {
    super();

    this.state = {
      setTheme: 'dark',
    };
  }

  // componentDidMount() {
  // this.props.store.dispatch({
  //   type: 'SET_INITIAL_BROWSE_ITEMS',
  //   browse: __NEXT_DATA__.props.initialProps.browseItems,
  // });
  // }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <ThemeProvider theme={themes[this.state.setTheme]}>
          <Provider store={store}>
            <Global />
            <Nav site={this.props.site} />
            <Component {...pageProps} browse={this.props.browseItems} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(OTTApp);
