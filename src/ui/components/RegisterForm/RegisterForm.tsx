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

type Values = {
  email: string
  password: string
  confirmPassword: string
  username: string
  firstName: string
  surname: string
  avatarSeed: string
}

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

  async function handleSubmit(values: Values) {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${origin}/api/auth/callback`,
        data: {
          username: values.username,
          fullname: `${values.firstName} ${values.surname}`,
          avatar_seed: values.avatarSeed,
        },
      },
    })

    if (error) {
      console.error(`Error: ${error} `)
    } else {
      router.push(`profile/${values.username}`)
    }
  }

  return (
    <RegisterFormLayout style={RegisterFormStyles}>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
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
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
          values,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <h3>Mi perfil</h3>
              <Form.Group controlId="validationFirstName" as={Col}>
                <FloatingLabel
                  controlId="floatingInput1"
                  label="Nombre"
                  className="mb-3">
                  <Form.Control
                    type="text"
                    name="firstName"
                    autoCapitalize="true"
                    value={values.firstName}
                    placeholder="Nombre"
                    onChange={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    isInvalid={!!touched.firstName && !!errors.firstName}
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
                    name="Apellido"
                    autoCapitalize="true"
                    value={values.surname}
                    placeholder="Surname"
                    onChange={handleChange('surname')}
                    onBlur={handleBlur('surname')}
                    isInvalid={!!touched.surname && !!errors.surname}
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
                    name="Nombre de usuario"
                    autoComplete="new-username"
                    defaultValue={values.username}
                    placeholder="Username"
                    onChange={handleChange('username')}
                    onBlur={handleBlur('username')}
                    isInvalid={!!touched.username && !!errors.username}
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
                  className="mb-3">
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    isInvalid={!!touched.email && !!errors.email}
                    required
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <h3>Contraseña</h3>
            <Form.Group controlId="validationPassword">
              <FloatingLabel
                controlId="floatingInput5"
                label="Contraseña"
                className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Contraseña"
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  isInvalid={!!touched.password && !!errors.password}
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
                  placeholder="Repetir contraseña"
                  autoComplete="new-password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  isInvalid={
                    !!touched.confirmPassword && !!errors.confirmPassword
                  }
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
              Registrarme
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
