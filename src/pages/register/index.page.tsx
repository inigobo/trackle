import { styled } from '@stitches/react'
import { RegisterStyles } from './Register.styles'
import { RegisterForm } from '@/src/ui/components/RegisterForm'

const RegisterPage = () => {
  return (
    <RegisterLayout>
      <h1>Register</h1>
      <RegisterForm />
    </RegisterLayout>
  )
}

export default RegisterPage

const RegisterLayout = styled('div', RegisterStyles)
