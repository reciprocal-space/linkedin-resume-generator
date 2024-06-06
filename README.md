This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install the project dependencies: `npm install`

Next add a LinkedIn session cookie from your browser to an `.env.local` file; the variable should be called `SESSION_COOKIE` 
(the cookie can be found by logging in to LinkedIn and then opening up your cookies and selecting the value of the `li_at` cookie) 

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
