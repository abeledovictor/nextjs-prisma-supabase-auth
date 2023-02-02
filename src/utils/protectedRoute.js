import { AUTH_OPTIONS } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

// Using auto generated default value
// For more info about pages check https://next-auth.js.org/configuration/options#pages
const NEXT_AUTH_DEFAULT_URL = '/api/auth/signin'

export function protectedRoute(redirectUrl) {
    const redirectTo = redirectUrl || NEXT_AUTH_DEFAULT_URL
    return async (context) => {
        const session = await getServerSession(context.req, context.res, AUTH_OPTIONS)

        if (!session) {
          return {
            redirect: {
              destination: redirectTo,
              permanent: false,
            },
          }
        }
      
        return {
          props: {
            session,
          },
        }
    }
}