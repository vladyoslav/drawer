import type { AppProps } from 'next/app'

import '@/global/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main vladyoslav-drawer-wrapper="">
      <Component {...pageProps} />
    </main>
  )
}
