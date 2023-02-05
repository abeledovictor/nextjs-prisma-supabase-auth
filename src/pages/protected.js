import { Button, Box, Typography } from "@mui/material"
import Link from 'next/link'
import Layout from "@/components/Layout"
import {useSWR, usePostSWR} from '@/hooks/requests'
import useProtectedRoute from "@/hooks/useProtectedRoute"

export default function Protected() {
  const { data, isLoading, error } = useSWR('/api/counter')
  const [postReq, isLoadingPost] = usePostSWR('/api/counter')
  useProtectedRoute()

  return (
    <Layout>
      <Link href="/" passHref legacyBehavior>
        <Button variant="contained">Go to home (unprotected route)</Button>
      </Link>
      <Box>
            <Typography>Counter example using Prisma, Api routes and Supabase</Typography>
            <Box>
                <Box>{`Counter: ${isLoading ? 'loading...' : data?.count}`}</Box>
                <Box>
                  <Button
                    disabled={isLoading || isLoadingPost}
                    onClick={() => {postReq({count: data?.count + 1})}}
                  >
                    Increment
                  </Button>
                </Box>
            </Box>
        </Box>
    </Layout>
  )
}