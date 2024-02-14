import { HeaderNav } from '@/src/ui/components/Navbar'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { type AppProps } from 'next/app'
import { useState } from 'react'
import SSRProvider from 'react-bootstrap/SSRProvider'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SSRProvider>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}>
        <HeaderNav />
        <Component {...pageProps} />
      </SessionContextProvider>
    </SSRProvider>
  )
}

export default MyApp
