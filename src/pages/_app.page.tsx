import { HeaderNav } from '@/src/ui/components/Navbar'
import { User } from '@supabase/supabase-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import SSRProvider from 'react-bootstrap/SSRProvider'
import '@/src/styles/globals.css'

export type MainPageProps = {
  user: User
}

function MyApp({ Component, pageProps }: AppProps<MainPageProps>) {
  return (
    <SSRProvider>
      <HeaderNav user={pageProps.user} />
      <Component {...pageProps} />
    </SSRProvider>
  )
}

export default MyApp
