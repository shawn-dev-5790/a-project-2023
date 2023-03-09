import type { AppProps } from 'next/app'
import '@/styles/_globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
