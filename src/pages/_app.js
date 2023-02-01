import { SessionProvider as AuthProvider } from 'next-auth/react';
import '@/styles/globals.css'

export default function App({ Component, session, ...pageProps }) {
  return <AuthProvider session={session}><Component {...pageProps} /></AuthProvider>
}
