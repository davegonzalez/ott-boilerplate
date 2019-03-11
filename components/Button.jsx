import React from 'react';
import styled, { css } from 'styled-components';
import { parseToRgb, rgb } from 'polished';

const luma = ({ red, blue, green }) => {
  return (red * 299 + blue * 114 + green * 587) / 1000;
};

export const setSiteTextColor = color => {
  const luminosity = luma(parseToRgb(color));

  return luminosity > 150 ? '#1a2e3b' : '#ffffff';
};

// 1.0 would be the current site color.  Anything above one would be lightening, anything below 1 darkening.  Default is lightening.
export const setSitePrimaryColor = (color, change = 1.6) => {
  const parsedRGB = parseToRgb(color);

  const red = Math.round(parsedRGB.red * change);
  const green = Math.round(parsedRGB.green * change);
  const blue = Math.round(parsedRGB.blue * change);

  const maxRed = red > 255 ? 255 : red;
  const maxGreen = green > 255 ? 255 : green;
  const maxBlue = blue > 255 ? 255 : blue;

  return `${rgb({ red: maxRed, green: maxGreen, blue: maxBlue })}`;
};

const height = {
  small: '30px',
  medium: '40px',
  large: '60px',
};

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => (props.size === 'small' ? '12px' : '14px')};
  font-weight: 700;

  ${props =>
    props.size === 'small' &&
    css`
      padding-left: 10px;
      padding-right: 10px;
    `}

  ${props =>
    props.size === 'medium' &&
    css`
      padding-left: 15px;
      padding-right: 15px;
    `}

  ${props =>
    props.size === 'large' &&
    css`
      padding-left: 30px;
      padding-right: 30px;
    `}

  a {
    color: inherit;
  }

  > * {
    font-weight: 700;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${props => props.theme.primaryButtonBg};
  color: ${props => setSiteTextColor(props.theme.primaryButton)};
  border: 1px solid ${props => setSitePrimaryColor(props.theme.primaryButton, 0.85)};
  display: flex;
  justify-content: center;
  height: ${props => height[props.size]};
  width: 100%;
  border-radius: 3px;

  &:focus,
  &:hover {
    background-color: ${props => setSitePrimaryColor(props.theme.primaryButton, 0.85)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = props => {
  return (
    <StyledButton size={props.size} {...props}>
      <Content size={props.size}>{props.children}</Content>
    </StyledButton>
  );
};

export default Button;
