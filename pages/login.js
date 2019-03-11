import React, { useState } from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash.isempty';
import AnimatedInput from 'components/AnimatedInput';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { login } from 'root/actions';

export const AstroGranite = '#1a2e3b';

const Container = styled.div`
  background-color: ${props => props.theme.primary};
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  text-align: center;
  background-color: white;
  border-radius: 5px;
  width: 500px;
  padding: 40px;
`;

const Header = styled.h1`
  font-size: 24px;
  color: ${AstroGranite};
  margin: 0;
  padding-bottom: 20px;
`;

const SpaceWrapper = styled.div`
  margin: 10px 0;
`;

const ErrorMessage = styled.div`
  font-size: 0.857em;
  background-color: #ff4d4d;
  text-align: left;
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  color: white;
`;

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormField = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submit = event => {
    setLoading(true);
    event.preventDefault();
    return login(values.email, values.password).then(res => {
      setLoading(false);

      if (isEmpty(res)) {
        return setError('Sorry! That email and password was not found.');
      }
    });
  };

  return (
    <Container>
      <Form onSubmit={submit}>
        <Header>Log in</Header>
        {error && (
          <ErrorMessage role='button' tabIndex={0} onClick={() => setError(null)}>
            {error}
          </ErrorMessage>
        )}
        <SpaceWrapper>
          <AnimatedInput
            id='email'
            name='email'
            aria-placeholder='email'
            type='email'
            onClick={() => setError(null)}
            onChange={updateFormField}
          />
        </SpaceWrapper>
        <AnimatedInput
          id='password'
          name='password'
          aria-placeholder='password'
          type='password'
          onClick={() => setError(null)}
          onChange={updateFormField}
        />
        <SpaceWrapper>
          <Button
            type='submit'
            size='large'
            disabled={isEmpty(values.email) || isEmpty(values.password)}
          >
            {loading ? <Spinner /> : 'Submit'}
          </Button>
        </SpaceWrapper>
      </Form>
    </Container>
  );
};

export default Login;
