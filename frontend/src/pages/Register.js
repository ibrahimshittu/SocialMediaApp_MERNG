import React, { useState } from 'react'
import { gql, useMutation} from '@apollo/client'
import { Form, Button } from 'semantic-ui-react'

const Register = () => {

    const [values, setValues] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      registerUser()
        
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
      update(proxy, result) {
        console.log(result)
      }, 
      variables : values
    });

  return (
    <Form className='form-container' onSubmit={handleSubmit} noValidate>
      
        <Form.Input
          label='Username'
          placeholder='username'
          name='username'
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label='password'
          placeholder='password'
          name='password'
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='confirm password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      
    </Form>

  )
}

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: {
        username: $username,
        email: $email,
        password: $password,
        confirmPassword: $confirmPassword,
      }
    ) {
      id username email token
    }
  }
`

export default Register