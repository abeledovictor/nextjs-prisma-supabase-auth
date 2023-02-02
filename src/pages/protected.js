import { Button } from "@mui/material"
import Link from 'next/link'
import Layout from "@/components/Layout"

export default function Protected() {
  return (
    <Layout>
      Home route
      <Link href="/" passHref legacyBehavior>
        <Button variant="contained">Go to home (unprotected route)</Button>
      </Link>
    </Layout>
  )
}