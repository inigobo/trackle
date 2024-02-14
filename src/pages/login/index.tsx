import LoginForm from '@/src/ui/components/LoginForm/LoginForm'
import { createClient } from '@/utils/supabase/component'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LoginStyles } from './Login.styles'

const Login = () => {
  const router = useRouter()
  const supabase = createClient()

  // async function signUp() {
  //   const { error } = await supabase.auth.signUp({ email, password })
  //   if (error) {
  //     console.error(error)
  //   }
  //   router.push('/')
  // }

  return (
    <LoginLayout>
      <h1>Login</h1>
      <LoginForm />
      {/* <SupaAuthForm /> */}
    </LoginLayout>
  )
}
export default Login

const LoginLayout = styled('div', LoginStyles)
