import { createClient } from '@/utils/supabase/component'
import { styled } from '@stitches/react'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { getSGV } from '../../../services/apiCalls'
import {
  AvatarOptionStyles,
  AvatarSelectorStyles,
  AvatarTitleLayoutStyles,
  RegisterFormStyles,
} from './RegisterForm.styles'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Too short!')
    .max(14, 'Too long!')
    .required('Required'),
  surname: yup
    .string()
    .min(2, 'Too short!')
    .max(14, 'Too long!')
    .required('Required'),
  username: yup
    .string()
    .min(4, 'Too short!')
    .max(12, 'Too long!')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(6, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
})

export const RegisterForm = () => {
  const [avatarSeeds, setAvatarSeeds] = useState(
    Array.from({ length: 4 }, () =>
      (Math.random() + 1).toString(36).substring(7)
    )
  )

  const supabase = createClient()
  const router = useRouter()

  const handleRegenerateAvatar = () => {
    setAvatarSeeds(
      Array.from({ length: 4 }, () =>
        (Math.random() + 1).toString(36).substring(7)
      )
    )
  }

  const submitHandler = async event => {
    console.log(event)

    const { data, error } = await supabase.auth.signUp({
      email: event.email,
      password: event.password,
      options: {
        emailRedirectTo: `${origin}/api/auth/callback`,
        data: {
          username: event.username,
          fullname: `${event.firstName} ${event.surname}`,
          avatar_seed: event.avatarSeed,
        },
      },
    })

    if (error) {
      console.log(`Error: ${error} `)
    } else {
      router.push(`profile/${event.username}`)
    }
  }

  return (
    <RegisterFormLayout style={RegisterFormStyles}>
      <Formik
        validationSchema={schema}
        onSubmit={submitHandler}
        onChange={console.log}
        validateOnChange={false}
        initialValues={{
          username: '',
          email: '',
          password: '',
          firstName: '',
          surname: '',
          confirmPassword: '',
          avatarSeed: avatarSeeds[0],
        }}>
        {({
          handleSubmit = { submitHandler },
          handleChange,
          handleBlur,
          errors,
          touched,
          values,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <h3>Your profile</h3>
              <Form.Group controlId="validationFirstName" as={Col}>
                <FloatingLabel
                  controlId="floatingInput1"
                  label="Name"
                  className="mb-3">
                  <Form.Control
                    type="text"
                    name="firstName"
                    autoCapitalize="true"
                    value={values.firstName}
                    placeholder="Name"
                    onChange={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    isInvalid={touched.firstName && errors.firstName}
                    required
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="validationSurname" as={Col}>
                <FloatingLabel
                  controlId="floatingInput2"
                  label="Surname"
                  className="mb-3">
                  <Form.Control
                    type="text"
                    name="surname"
                    autoCapitalize="true"
                    value={values.surname}
                    placeholder="Surname"
                    onChange={handleChange('surname')}
                    onBlur={handleBlur('surname')}
                    isInvalid={touched.surname && errors.surname}
                    required
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="validationUsername" as={Col}>
                <FloatingLabel
                  controlId="floatingInput3"
                  label="Username"
                  className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="new-username"
                    defaultValue={values.username}
                    placeholder="Username"
                    onChange={handleChange('username')}
                    onBlur={handleBlur('username')}
                    isInvalid={touched.username && errors.username}
                    required
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="validationEmail" as={Col}>
                <FloatingLabel
                  controlId="floatingInput4"
                  label="Email"
                  name="email"
                  className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    isInvalid={touched.email && errors.email}
                    required
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <h3>Password</h3>
            <Form.Group controlId="validationPassword">
              <FloatingLabel
                controlId="floatingInput5"
                label="Password"
                className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  isInvalid={touched.password && errors.password}
                  required
                />
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="validationConfirmPassword">
              <FloatingLabel
                controlId="floatingInput6"
                label="Confirm password"
                className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                  required
                />
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <AvatarTitleLayout>
              <h3>Avatar</h3>
              <Button
                variant="outline-dark"
                onClick={handleRegenerateAvatar}
                className="rounded-circle"
                style={{
                  margin: '1em 1em 1em 1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></Button>
            </AvatarTitleLayout>
            <Form.Group controlId="validationAvatar">
              <AvatarRadioContainer>
                {avatarSeeds.map((seed, index) => {
                  return (
                    <AvatarOptionContainer
                      key={index.toString()}
                      className={
                        seed.toString() === values.avatarSeed ? 'selected' : ''
                      }
                      style={{ borderRadius: '0.5em' }}>
                      <Form.Check
                        id={index.toString()}
                        defaultChecked={index === 0}>
                        <Form.Check.Input
                          name="group1"
                          type="radio"
                          value={seed.toString()}
                          onChange={handleChange('avatarSeed')}
                          onBlur={handleBlur('avatarSeed')}
                        />
                        <Form.Check.Label>
                          <Image
                            src={getSGV(seed)}
                            alt={`Option ${index}`}
                            height={80}
                            width={80}
                          />
                        </Form.Check.Label>
                      </Form.Check>
                    </AvatarOptionContainer>
                  )
                })}
              </AvatarRadioContainer>
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </RegisterFormLayout>
  )
}

const RegisterFormLayout = styled('div', RegisterFormStyles)
const AvatarRadioContainer = styled('div', AvatarSelectorStyles)
const AvatarOptionContainer = styled('div', AvatarOptionStyles)
const AvatarTitleLayout = styled('div', AvatarTitleLayoutStyles)
