import Head from 'next/head'
import { Box } from '@mui/material'
import { useSession, signOut } from 'next-auth/react';
import Nav from '../Nav'

export default function Layout(props) {
    const {title, children} = props
    const { data: session, status } = useSession();
    return (
        <>
        <Head>
          <title>{title || 'App'}</title>
        </Head>
        <Box sx={{width: '100%', height: '100%'}}>
            <Nav isLogged={!!session} logout={signOut} />
            <Box maxWidth="xl" sx={{width: '100%', height: 'calc(100% - 69px)', overflow: 'auto', padding: '16px'}} component="main">
                {children}
            </Box>
        </Box>
        </>
    )
}