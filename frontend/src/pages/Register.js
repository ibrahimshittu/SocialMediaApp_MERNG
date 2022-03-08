import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation} from '@apollo/client'
import { Form, Button } from 'semantic-ui-react'

import { authContext  } from '../context/auth'
import { useForm } from '../Utils/hooks'

const Register = () => {
    const context = useContext(authContext)
    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const initialState = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    const { onChange, handleSubmit, values } = useForm(initialState, addUser)

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
      update(_, {data: { register: userData }}) {
        context.login(userData)
        navigate("/")
      }, 
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions)
        console.log("graphql error", err.graphQLErrors[0])
      },
      variables : values
    });

    function addUser() {
      registerUser()
    }

    

  return (
    <div className='form-container' >
      <h2>Register</h2>
    <Form className={ loading ? 'loading' : ' '} onSubmit={handleSubmit} noValidate>
      
        <Form.Input
          label='Username'
          placeholder='username'
          name='username'
          value={values.username}
          error={errors.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          value={values.email}
          error={errors.email}
          onChange={onChange}
        />
        <Form.Input
          label='password'
          placeholder='password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='confirm password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      
    </Form>
      {console.log("all  x errors", errors)}

      {/* {Object.entries(errors).length > 0 && <div className="ui error message">
        <ul className="list">
          {Object.entries(errors).map(([key, value]) => (
            <li key={key}>{value.toString()}</li>
          ))}
        </ul>
      </div>} */}

    </div>

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

export default Register;