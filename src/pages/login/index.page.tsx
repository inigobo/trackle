import LoginForm from '@/src/ui/components/LoginForm/LoginForm'
import { styled } from '@stitches/react'
import { LoginStyles } from './Login.styles'

const LoginPage = () => {
  return (
    <LoginLayout>
      <h1>Iniciar sesión</h1>
      <LoginForm />
    </LoginLayout>
  )
}
export default LoginPage

const LoginLayout = styled('div', LoginStyles)
