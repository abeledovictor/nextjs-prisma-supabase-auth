This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create a new project at supabase.co

Second, edit .env variables check .env.example for inspiration. You will need to also setup Google OAuth ( https://console.cloud.google.com/ )

On Google Auth console add http://localhost:3000/api/auth/callback/google as redirect URI

If you don't want Google auth you can disable it at src/pages/api/auth/[...nextauth].js by commenting out GoogleProvider

After that run

```bash
npx prisma migrate dev
```


### You can customize the Email login / signup email if you want:

Check https://next-auth.js.org/providers/email#customizing-emails


### You can also customize sign in / sign up page if you want. or create a custom component for it

Check https://next-auth.js.org/providers/email#customizing-emails


### You can customize your welcome email

Check sendWelcomeEmail function at src/pages/api/auth/[...nextauth].js