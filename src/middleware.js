export { default } from "next-auth/middleware"

// Add an array with proctected routes
export const config = { matcher: ["/protected"] }