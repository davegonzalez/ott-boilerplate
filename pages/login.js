import React, { useState } from 'react';
import styled from 'styled-components';
import AnimatedInput from 'components/AnimatedInput';
import { login } from 'root/actions';

const Container = styled.div`
  background-color: ${props => props.theme.primary};
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  background-color: white;
  height: 450px;
  border-radius: 5px;
  width: 500px;
  padding: 0 40px;
`;

const Login = props => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const updateFormField = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submit = event => {
    event.preventDefault();
    return login(values.email, values.password);
  };

  return (
    <Container>
      <Form onSubmit={submit}>
        <AnimatedInput
          id='email'
          name='email'
          aria-placeholder='email'
          type='email'
          onChange={updateFormField}
        />
        <AnimatedInput
          id='password'
          name='password'
          aria-placeholder='password'
          type='password'
          onChange={updateFormField}
        />
        <button type='submit'>submit</button>
      </Form>
    </Container>
  );
};

export default Login;
