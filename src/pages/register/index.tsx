import { styled } from '@stitches/react'
import { RegisterStyles } from './Register.styles'
import { RegisterForm } from '@/src/ui/components/RegisterForm'

const Register = () => {
  return (
    <RegisterLayout>
      <h1>Register</h1>
      <RegisterForm />
    </RegisterLayout>
  )
}

export default Register

const RegisterLayout = styled('div', RegisterStyles)
