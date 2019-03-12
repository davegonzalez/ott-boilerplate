# OTT Boilerplate

### Until I decide on a better name

![Alt Text](https://media.giphy.com/media/t7u9bWYaqfXsoz4nLk/giphy.gif)

Small project that I took on in my free time to rebuild most of the customer/watch pages seen on sites like mhzchoice.vhx.tv or yogawithadriene.vhx.tv. This uses the VHX/Vimeo OTT API for all requests. It does not have everything in place (in particular authentication and pagination). See here for a roadmap of things to do if this were to be mostly re-usable: https://github.com/davegonzalez/ott-boilerplate/projects/1

## Why?

- I wanted to get some experience with SSR using Next.js
- I wanted to get some experience building themes and toggling between them using Styled Components (still a TODO)
- If this were to work out, it could be a starting point for any OTT seller to build their own site and then modify as needed

## What's in use here?

- Next.js for SSR, with a custom express server to handle server side specific requests
- React
- Styled Components
- Redux is setup in this project, but not in use. I set it up initially and then realized I didn't really need it. I figured it'd be beneficial to keep the boilerplate in place for later uses.
- next-routes for dynamic routing (though I think I can handle this with Next.js routing now?)
- Jest for testing, which this project lacks 🙁
