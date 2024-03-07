import { RegisterForm } from '@/src/ui/components/RegisterForm'
import { styled } from '@stitches/react'
import { RegisterStyles } from './Register.styles'

export default function RegisterPage() {
  return (
    <RegisterLayout>
      <h1>Crear una cuenta</h1>
      <RegisterForm />
    </RegisterLayout>
  )
}

const RegisterLayout = styled('div', RegisterStyles)
