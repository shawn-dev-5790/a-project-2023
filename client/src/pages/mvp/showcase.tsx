import Head from 'next/head'
import ui from '@/styles/page_mvp_showcase.module.scss'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function PageMVPShowcase() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <PageMVPShowcaseCont />
    </>
  )
}

function PageMVPShowcaseCont() {
  const link = {
    vercel: 'https://vercel.com/shawndev5790-gmailcom/a-project-2023/HpApdv4QicanWP8VpZE1K2r41PkM',
    github: 'https://github.com/shawn-dev-5790/a-project-2023',
  }

  const { data, error, isLoading, isValidating } = useSWR<any, any>(() => '/api/getShowcaseList', fetcher)

  return (
    <div className={ui.page_mvp_showcase}>
      <header>
        <h1>Welcome to visit our workplace for MVP 2023.</h1>
      </header>
      <main>
        {isLoading && 'loading...'}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
      <footer>
        <a href={link.vercel} target='_blank' rel='noopener noreferrer'>
          visit vercel
        </a>
        <a href={link.github} target='_blank' rel='noopener noreferrer'>
          visit github
        </a>
      </footer>
    </div>
  )
}
