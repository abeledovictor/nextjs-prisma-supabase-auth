export { default } from "next-auth/middleware"

const PROTECTED_ROUTES = ["/protected"]

export const config = { matcher: PROTECTED_ROUTES }