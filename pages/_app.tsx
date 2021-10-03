import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import "./styles.css"
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'


// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        session={pageProps.session}
      >
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  )
}
