import { Button } from "@mui/material"
import Link from 'next/link'
import Layout from "@/components/Layout"

export default function Home() {
  return (
    <Layout>
      Home route
      <Link href="/protected" passHref legacyBehavior>
        <Button variant="contained">Go to protected route</Button>
      </Link>
    </Layout>
  )
}