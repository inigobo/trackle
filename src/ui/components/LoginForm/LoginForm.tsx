import { createClient } from '@/utils/supabase/component'
import { styled } from '@stitches/react'
import { Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import RegisterCard from '../RegisterCard/RegisterCard'
import { LoginFormStyles } from './LoginForm.styles'
import { formikSchema } from './formik/formikSchema'

type Values = {
  email: string
  password: string
}

const LoginForm = () => {
  const supabase = createClient()
  const router = useRouter()

  async function handleSubmit(
    values: Values,
    { setFieldError, setSubmitting, resetForm }: FormikHelpers<Values>
  ) {
    setSubmitting(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    const username = data.user?.user_metadata.username

    if (error) {
      setFieldError('password', 'Invalid credentials')
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
        onSubmit={handleSubmit}
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnChange={false}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
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
                  label="Contraseña"
                  className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
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
                Acceder
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
