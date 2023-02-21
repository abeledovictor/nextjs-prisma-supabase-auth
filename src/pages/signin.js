import {useEffect, useState} from 'react';
import {Button, Box, TextField, Typography, Paper} from "@mui/material"
import Layout from '@/components/Layout';
import { Google } from '@mui/icons-material';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/router';
import { signIn, useSession } from "next-auth/react";


const ERRORS = {
    EmailSignin: 'The email address does not exist.',
    OAuthAccountNotLinked: 'This account was registered using another OAuth method. Please try with another one.'
}


export default function Signin(props) { 
    const router = useRouter()
    const [email, setEmail] = useState('')
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const { data: session, status } = useSession()
    const loginError = router?.query?.error

    useEffect(() => {
        if(status === 'authenticated') {
            router.push('/')
        }
    }, [status])

    useEffect(() => {
        if(loginError) {
            toast.addToast(ERRORS[loginError] || loginError)
        }
    }, [loginError])

    const handleEmail = () => {
        setLoading(true)
        signIn('email', { email }).then(() => {setLoading(false)}).catch(() => {setLoading(false)})
    }

    const handleGoogle = () => {
        setLoading(true)
        signIn('google').then(() => {setLoading(false)}).catch(() => {setLoading(false)})
    }
    return (
        <Layout>
            <Paper elevation={3} sx={{display: 'grid', gridTemplateRows: 'repeat(auto, 3)', gap: '16px', maxWidth: '600px', m: ['16px', '32px auto'], p: '24px'}}>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Typography gutterBottom sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: ['20px', '30px']}}>Login or create account</Typography>
              </Box>
                <TextField disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} type="email" label="Email" size="small" />
                <Button disabled={loading} onClick={handleEmail} variant="outlined">Join Us with Email</Button>
                <Box sx={{display: 'flex', justifyContent: 'center'}}><Typography variant="body2">Or</Typography></Box>
                <Button disabled={loading} onClick={handleGoogle} size="large" variant="contained" startIcon={<Google />}>Join Us with Google</Button>
            </Paper>
        </Layout>
    )

}