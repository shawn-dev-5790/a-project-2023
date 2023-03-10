import Head from 'next/head'
import Link from 'next/link'
import ui from '@/styles/page_index.module.scss'

export default function PageIndex() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageIndexCont />
    </>
  )
}

function PageIndexCont() {
  const link = {
    vercel: 'https://vercel.com/shawndev5790-gmailcom/a-project-2023/HpApdv4QicanWP8VpZE1K2r41PkM',
    github: 'https://github.com/shawn-dev-5790/a-project-2023',
  }
  return (
    <div className={ui.page_index}>
      <header>
        <h1>Welcome to visit our workplace for MVP 2023.</h1>
      </header>
      <main>
        <section>
          <h2>MVP's</h2>
          <ul>
            <li>
              <Link href='/mvp/showcase'>showcase</Link>
            </li>
          </ul>
        </section>
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
