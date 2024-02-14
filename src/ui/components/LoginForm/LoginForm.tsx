import { createClient } from '@/utils/supabase/component'
import { styled } from '@stitches/react'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import RegisterCard from '../RegisterCard/RegisterCard'
import { LoginFormStyles } from './LoginForm.styles'
import { formikSchema } from './formik/formikSchema'

const LoginForm = () => {
  const supabase = createClient()
  const router = useRouter()

  async function submitHandler(
    event,
    { setFieldError, setSubmitting, resetForm }
  ) {
    setSubmitting(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.email,
      password: event.password,
    })

    const username = data.user?.user_metadata.username

    if (error) {
      await setFieldError('password', 'Invalid credentials')
    } else {
      setSubmitting(false)
      resetForm()
      router.push(`profile/${username}`)
    }
  }

  return (
    <LoginFormLayout style={LoginFormStyles}>
      <Formik
        validationSchema={formikSchema}
        onSubmit={submitHandler}
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnChange={false}>
        {({
          handleSubmit = { submitHandler },
          handleChange,
          handleBlur,
          touched,
          errors,
          values,
        }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validation01">
                <FloatingLabel
                  controlId="floatingInput1"
                  label="Email"
                  className="mb-3">
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    autoComplete="email"
                    placeholder="Email"
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput3"
                  label="Password"
                  className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
      <RegisterCard />
    </LoginFormLayout>
  )
}

export default LoginForm
const LoginFormLayout = styled(Card, LoginFormStyles)
