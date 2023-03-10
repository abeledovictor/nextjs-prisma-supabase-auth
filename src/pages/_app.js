import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/utils/createEmotionCache';
import { ToastProvider } from '@/hooks/useToast';
import { SessionProvider as AuthProvider } from 'next-auth/react';
import { theme } from '@/utils/theme';
import '@/styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, session, ...pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ToastProvider>
          <AuthProvider session={session}>
            <Component {...pageProps} />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
