import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/RegisterPage'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: true
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const {
    isLoading,
    showAlert,
    displayAlert,
    //registerUser,
    //loginUser,
    setupUser,
    user
  } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }

    const currentUser = { name, email, password }

    if (isMember) {
      //loginUser(currentUser)
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...'
      })
    } else {
      //registerUser(currentUser)
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...'
      })
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {showAlert && <Alert />}

        {/* toggle name */}

        {!values.isMember && (
          <FormRow labelText="name" type="text" value={values.name} name="name" handleChange={handleChange} />
        )}

        {/* email field */}
        <FormRow labelText="email" type="email" value={values.email} name="email" handleChange={handleChange} />

        {/* password field */}
        <FormRow
          labelText="password"
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default RegisterPage
