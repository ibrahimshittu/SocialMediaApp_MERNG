import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation} from '@apollo/client'
import { Form, Button } from 'semantic-ui-react'
import { useForm } from '../Utils/hooks'
import { authContext  } from '../context/auth'


const Login = () => {
    const context = useContext(authContext)

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const initialState = {
      username: '',
      password: '',
    }

    const { onChange, handleSubmit, values } = useForm(initialState, loginUserCallback)

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      update(_, {data : {login : userData}}) {
        context.login(userData)
        navigate("/")
      }, 
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions)
        console.log("graphql error", err.graphQLErrors[0])
      },
      variables : values
    });

    function loginUserCallback() {
      loginUser()
    }

  return (
    <div className='form-container' >
      <h2>Login</h2>
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
          label='password'
          placeholder='password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        
        <Button type='submit' primary>
          Login
        </Button>
      
    </Form>
      {console.log("all  x errors", errors)}

      {Object.entries(errors).length > 0 && <div className="ui error message">
        <ul className="list">
          {Object.entries(errors).slice(0,1).map(([key, value]) => (
            <li key={key}>{Object.values(value).toString()}</li>
          ))}
        </ul>
      </div>}

    </div>

  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(
        username: $username,
        password: $password,
    ) {
      id username email token
    }
  }
`

export default Login;