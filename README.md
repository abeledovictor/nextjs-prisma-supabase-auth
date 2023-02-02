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

### Customize protected / auth-required routes

Use protectedRoute function from src/utils/protectedRoute.js 

You should use it in page's getServerSideProp. See an example in src/pages/protected.js

### Image uploads with Supabase

Check src/pages/api/image-upload/index.js and src/utils/supabaseDb.js

You will need to include some more env variables and uncomment the code to add S3 image storage using Supabase API

Files in Supabase Storage are stored in buckets. Those buckets are just containers for our files. We can create as many buckets as we want and organize them in whichever way suits our project best.

For this course, we just need one single bucket that will hold all our public images.

So, let's create this public bucket from our Supabase dashboard:

Go to the "Storage" section.
Click "Create Bucket".
Enter the bucket name. Let's use "supavacation" (in lowercase).
Check "Make bucket public".
Click "Create Bucket".

Since we are leveraging the next/image component in our app and storing our images in a remote location, we must add Supabase to the list of image provider domains in our next.config.js file.

So copy the hostname of your file URL, which should have the following structure <random_string>.supabase.in and add it in the images.domains config in the next.config.js file as shown below:

```
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cectocdqshqvzdchewkg.supabase.in'],
  },
};
```

Last step:

Even if we set our bucket as public, we must define some security rules to be able to manipulate our media files inside our bucket through the Supabase API.

So, let's add those rules from our dashboard:

Go to the "Storage" section.
Click "Policies" in the sidebar.
Click "New Policy" and "Create a policy from scratch".
Give your policy a unique name.
Check the checkboxes to allow the following operations: SELECT, INSERT, UPDATE, and DELETE.
Add the following SQL conditional expression to apply those rules only to our single bucket: bucket_id = 'YOUR_BUCKET_ID'.
And click "Save policy".

### GET and POST requests

Check src/hooks/requests.js

We use SWR for get requests.

For post requests we use a custom hook that mutates SWR GET requests that match the route from the POST requests... ideally we should have a matching GET request for each POST route where this mutation (as they call it in SWR) is made. There's no need to refetch GET requests, SWR handles it when calling mutate()


### Sample Counter model

This repo provides Counter model as sample ( prisma/schema.prisma ), and src/pages/api/counter/index.js as a sample api endpoint that handles a super basic CRUD operation.

You can remove the model before performing your first prisma migration to avoid having in on your DB altogether.