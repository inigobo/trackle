import { styled } from '@stitches/react'
import { Formik } from 'formik'
import { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Image,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import * as yup from 'yup'
import { getSGV, getUser, updateProfile } from '../../../services/apiCalls'
import {
  AvatarOptionStyles,
  AvatarSelectorStyles,
  AvatarTitleLayoutStyles,
  ModifyProfileModalLayoutStyles,
} from './ModifyProfileModal.styles'

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
  username: yup.string().min(4, 'Too short!').max(12, 'Too long!'),
  email: yup.string().email('Invalid email').required('Required'),
  oldPassword: yup.string().when('username', (username, schema) => {
    if (username) {
      return schema.test(
        'password-correct',
        'Current password needed to modify profile',
        async value => {
          const user = await getUser(username)
          if (user && user.password === value) {
            return true
          } else {
            return false
          }
        }
      )
    }
    return schema
  }),
  newPassword: yup.string().min(6, 'Too short!').max(50, 'Too long!'),
  confirmPassword: yup.string().when('newPassword', {
    is: val => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Both password need to be the same'),
  }),
})

const ModifyProfileModal = ({ currentUser }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [avatarSeeds, setAvatarSeeds] = useState([
    currentUser.avatarSeed,
    ...Array.from({ length: 3 }, () =>
      (Math.random() + 1).toString(36).substring(7)
    ),
  ])

  const handleRegenerateAvatar = () => {
    setAvatarSeeds([
      currentUser.avatarSeed,
      ...Array.from({ length: 3 }, () =>
        (Math.random() + 1).toString(36).substring(7)
      ),
    ])
  }

  const submitHandler = async event => {
    const newPassword =
      event.newPassword.length === 0 ? event.oldPassword : event.newPassword
    try {
      const updatedUser = await updateProfile(
        {
          username: event.username,
          fullName: `${event.firstName} ${event.surname}`,
          email: event.email,
          avatarSeed: event.avatarSeed,
          password: newPassword,
        },
        currentUser.id
      )
      setShow(false)
      console.log(updatedUser)
    } catch (error) {
      console.error(error)
    }
  }

  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      Regenerate
    </Tooltip>
  )

  return (
    <ModifyProfileModalLayout>
      <Button variant="outline-secondary" onClick={handleShow}>
        Edit profile
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Modify Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={submitHandler}
            onChange={console.log}
            validateOnChange={false}
            initialValues={{
              username: currentUser.username,
              email: currentUser.email,
              oldPassword: '',
              firstName: currentUser.fullName.split(' ')[0],
              surname: currentUser.fullName.split(' ')[1],
              newPassword: '',
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
                        disabled
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
                    label="Old password"
                    className="mb-3">
                    <Form.Control
                      type="password"
                      name="oldPassword"
                      autoComplete="new-password"
                      placeholder="Password"
                      value={values.oldPassword}
                      onChange={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      isInvalid={touched.oldPassword && errors.oldPassword}
                      required
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.oldPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="validationNewPassword">
                  <FloatingLabel
                    controlId="floatingInput88"
                    label="New password"
                    className="mb-3">
                    <Form.Control
                      type="password"
                      name="newPassword"
                      autoComplete="new-password"
                      placeholder="Password"
                      value={values.newPassword}
                      onChange={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      isInvalid={touched.newPassword && errors.newPassword}
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.newPassword}
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
                      isInvalid={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <AvatarTitleLayout>
                  <h3>Avatar</h3>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 150, hide: 100 }}
                    overlay={renderTooltip}>
                    <Button
                      variant="outline-dark"
                      onClick={handleRegenerateAvatar}
                      className="rounded-circle"
                      alt={'Regenerate'}
                      style={{
                        margin: '1em 1em 1em 1em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}></Button>
                  </OverlayTrigger>
                </AvatarTitleLayout>
                <Form.Group controlId="validationNewAvatar">
                  <AvatarRadioContainer>
                    {avatarSeeds.map((seed, index) => {
                      return (
                        <div key={'rad' + index}>
                          {index === 0 ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignContent: 'center',
                                flexWrap: 'wrap',
                                fontWeight: 500,
                              }}>
                              Current
                            </div>
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignContent: 'center',
                                flexWrap: 'wrap',
                                fontWeight: 500,
                              }}>
                              {' '}
                              Option {index}
                            </div>
                          )}
                          <AvatarOptionContainer
                            key={'av' + index.toString()}
                            className={
                              seed.toString() === values.avatarSeed
                                ? 'selected'
                                : ''
                            }
                            style={{ borderRadius: '0.5em' }}>
                            <Form.Check
                              id={'avc' + index.toString()}
                              defaultChecked={index === 0}
                              css={{
                                '&.form-check': {
                                  height: '0',
                                  width: '0',
                                },
                              }}>
                              <Form.Check.Input
                                name="group1"
                                id={'avi' + index.toString()}
                                type="radio"
                                value={seed.toString()}
                                onChange={handleChange('avatarSeed')}
                                onBlur={handleBlur('avatarSeed')}
                              />
                              <Form.Check.Label id={'lbl' + index.toString()}>
                                <Image
                                  src={getSGV(seed)}
                                  alt={`Option ${index}`}
                                  height={80}
                                  width={80}
                                />
                              </Form.Check.Label>
                            </Form.Check>
                          </AvatarOptionContainer>
                        </div>
                      )
                    })}
                  </AvatarRadioContainer>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </ModifyProfileModalLayout>
  )
}

export default ModifyProfileModal

const ModifyProfileModalLayout = styled('div', ModifyProfileModalLayoutStyles)
const AvatarRadioContainer = styled('div', AvatarSelectorStyles)
const AvatarOptionContainer = styled('div', AvatarOptionStyles)
const AvatarTitleLayout = styled('div', AvatarTitleLayoutStyles)
