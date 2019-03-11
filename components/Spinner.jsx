import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid ${props => props.theme.navBottomOutline};
  border-top: 2px solid ${props => props.theme.primaryButton};
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
  flex: 1;
  border-radius: 50%;
`;

export default Spinner;
