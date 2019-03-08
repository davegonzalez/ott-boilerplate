import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import omit from 'lodash.omit';
import isEmpty from 'lodash.isempty';

export const SunsetOrange = '#ff4d4d';
export const AstroGranite = '#1a2e3b';
export const SoutherlySky = '#b3bfc8';
export const RegentGray = '#8699a6';

const Container = styled.div`
  margin-top: 0;
  position: relative;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid ${SoutherlySky};
  color: ${AstroGranite};
  padding: 8px 15px 0 15px;
  border-radius: 3px;
  transition: border 0.2s ease;
  height: 50px;
  font-size: 16px;

  ${({ errorMessage }) =>
    errorMessage &&
    css`
      border: 1px solid ${SunsetOrange};
    `}

  &:active,
  &:focus {
    outline: 1px solid transparent;
    border: 1px solid ${AstroGranite};
    box-shadow: 0 0 0 1px ${AstroGranite};
  }
`;

const Label = styled.label`
  display: inline-block;
  margin-top: 16px;
  position: absolute;
  pointer-events: none;
  transition: 0.2s ease all;

  ${css`
    color: ${({ focused }) => (focused ? `${RegentGray}` : `${AstroGranite}`)};
    left: ${({ focused }) => (focused ? '16px' : '20px')};
    top: ${({ focused }) => (focused ? '-7px' : '0')};
    margin-top: ${({ focused }) => (focused ? '10px' : '15px')};
    font-weight: ${({ focused }) => (focused ? '700' : '400')};
    font-size: ${({ focused }) => (focused ? '12px' : '16px')};
  `}

  &:active,
  &:focus,
  &:hover,
  &:visited {
    outline: 1px solid transparent;
  }
`;

const ErrorMessage = styled.div`
  text-align: left;
  color: ${SunsetOrange};
  font-size: 0.875em;
`;

class AnimatedInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      focused: props.defaultValue,
    };

    this.setFocus = this.setFocus.bind(this);
    this.setText = this.setText.bind(this);
    this.textIsEmpty = this.textIsEmpty.bind(this);
  }

  setText(value) {
    return this.setState({ text: value });
  }

  setFocus(val) {
    return this.setState({ focused: val });
  }

  textIsEmpty() {
    return isEmpty(this.state.text);
  }

  render() {
    return (
      <Container>
        <Input
          {...omit(this.props, ['displayName', 'errorMessage'])}
          errorMessage={this.props.errorMessage}
          onFocus={event => {
            if (this.textIsEmpty()) {
              this.setFocus(true);
            }

            this.props.onFocus(event);
          }}
          onBlur={event => {
            if (this.textIsEmpty()) {
              this.setFocus(false);
            }

            this.props.onBlur(event);
          }}
          onChange={event => {
            this.setText(event.target.value);
            this.props.onChange(event);
          }}
        />
        {this.props.errorMessage && <ErrorMessage>{this.props.errorMessage}</ErrorMessage>}
        <Label htmlFor={this.props.name} focused={this.state.focused}>
          {this.props.name}
        </Label>
      </Container>
    );
  }
}

export default AnimatedInput;

AnimatedInput.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  name: PropTypes.string,
};

AnimatedInput.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  errorMessage: null,
  name: '',
};
