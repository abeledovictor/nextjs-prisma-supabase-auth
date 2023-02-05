import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

// Using auto generated default value
// For more info about pages check https://next-auth.js.org/configuration/options#pages
const NEXT_AUTH_DEFAULT_URL = '/api/auth/signin'

export default function useProtectedRoute() {
    const router = useRouter()
    const { data: session, status } = useSession()
    useEffect(() => {
        if(status === 'unauthenticated') {
            router.push(NEXT_AUTH_DEFAULT_URL)
        }
    }, [status])
}
