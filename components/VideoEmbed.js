import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const EmbedContainer = styled.div`
  position: relative;
  display: block;
  height: 0;
  width: 100%;
  padding-bottom: 56.25%;
`;

const VideoEmbed = ({ id }) => (
  <EmbedContainer>
    <iframe
      title='video-embed'
      id='video'
      src={`https://embed.vhx.tv/videos/${id}?autoplay=1&api=1`}
      width='850'
      height='480'
      frameBorder='0'
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
      css={`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
      `}
    />
  </EmbedContainer>
);

export default VideoEmbed;

VideoEmbed.propTypes = {
  id: PropTypes.number.isRequired,
};
