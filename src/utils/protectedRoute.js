import { AUTH_OPTIONS } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"


export function protectedRoute(redirectUrl = '/') {
    return async (context) => {
        const session = await getServerSession(context.req, context.res, AUTH_OPTIONS)

        if (!session) {
          return {
            redirect: {
              destination: redirectUrl,
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