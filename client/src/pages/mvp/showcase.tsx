import Head from 'next/head'
import ui from '@/styles/page_mvp_showcase.module.scss'
import useSWR from 'swr'
import { useState } from 'react'
import { onfetch } from '@/helpers'
import SidePanel from './components/side_panel'

export default function PageMVPShowcase() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={ui.page_mvp_showcase}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

function Header() {
  return (
    <header>
      <h1>Welcome to visit our workplace for MVP 2023</h1>
    </header>
  )
}
function Footer() {
  const link = {
    vercel: 'https://vercel.com/shawndev5790-gmailcom/a-project-2023/HpApdv4QicanWP8VpZE1K2r41PkM',
    github: 'https://github.com/shawn-dev-5790/a-project-2023',
  }
  return (
    <footer>
      <a href={link.vercel} target='_blank' rel='noopener noreferrer'>
        visit vercel
      </a>
      <a href={link.github} target='_blank' rel='noopener noreferrer'>
        visit github
      </a>
    </footer>
  )
}
function Main() {
  //   const { data, error, isLoading, isValidating } = useSWR<any, any>(() => '/api/getShowcaseList', onfetch)
  const { data, error, isLoading, isValidating } = useSWR<any, any>(() => '/api/display_list', onfetch)
  const currency = new Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' })
  const number = new Intl.NumberFormat('ko', {})
  const onErrorImg = (e: any) => {
    e.target.src = 'https://dummyimage.com/200x200/efefef/444444.png&text=no-image'
  }
  const list = data?.data.data || []
  const getPercent = (value: number, fieldname: string) => {
    const targets = list.map((item: { [k: string]: any }) => item[fieldname])
    const min = Math.min(...targets)
    const max = Math.max(...targets)
    const per = Math.ceil(((value - min) / max) * 100)
    return per
  }
  return (
    <>
      <main>
        <section className={ui.control}>
          <div className={ui.suggestion_list}>
            <strong>추천 정렬 목록</strong>
            <ul>
              <li>
                <span className={ui.wrap_img}>
                  <img
                    loading='lazy'
                    src={'https://dummyimage.com/120x120/F9FFA8/000000.png&text=+ECPM+'}
                    alt={`image of ECPM`}
                    onError={onErrorImg}
                  />
                </span>
                <div>
                  <b>ECPM 지표 기반으로 상품을 노출하세요!</b>
                  <p>ECPM 지표는 1,000번 노출수 대비 기대구매금액을 의미해요</p>
                  <p>다른 지표들과 비교하세요 (노출수, 구매건수, ECPM)</p>
                  <p>다른 상품들과 비교하세요 (ECPM 백분율 환산)</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className={ui.preview}>
          <div className={ui.preview_head}>
            <strong>미리보기</strong>
            <p>추천된 정렬 방식에 따른 미리보기 화면을 제공합니다</p>
          </div>
          {isLoading && 'loading...'}
          <ul className={ui.preview_items}>
            {list.map((item: any, idx: number) => (
              <li key={`${item.item_id}-${item.sequence_no}`}>
                <span className={ui.preview_img}>
                  <img
                    className={ui.g_img}
                    loading='lazy'
                    src={item.main_item_img}
                    alt={`image of ${item.item_name}`}
                    onError={onErrorImg}
                  />
                </span>
                <div className={ui.preview_info}>
                  <div>idx:{idx}</div>
                  <div className={'g_ellipsis_2'}>{item.item_name}</div>
                  <div>{currency.format(item.selling_price)}</div>
                  <div>ecpm={item.ecpm.toFixed(0)}</div>
                  <div>ecpm_per={getPercent(item.ecpm, 'ecpm')}%</div>
                  <div>노출수={number.format(item.imp_cnt)}</div>
                  <div>view_cvr={number.format(item.view_cvr)}</div>
                  <div>구매건수={number.format(item.conversion_cnt)}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className={ui.preview}>
          <div className={ui.preview_head}>
            <strong>정렬된 상품 진열 미리보기</strong>
            <p>추천된 정렬 방식에 따른 미리보기 화면을 제공합니다</p>
          </div>
          {isLoading && 'loading...'}
          <ul className={ui.preview_items}>
            {list
              .map((i: any, idx: number) => ({ ...i, idx }))
              .sort((a: any, b: any) => {
                return b['ecpm'] - a['ecpm']
              })
              .map((item: any) => (
                <li key={`${item.item_id}-${item.sequence_no}`}>
                  <span className={ui.preview_img}>
                    <img
                      className={ui.g_img}
                      loading='lazy'
                      src={item.main_item_img}
                      alt={`image of ${item.item_name}`}
                      onError={onErrorImg}
                    />
                  </span>
                  <div className={ui.preview_info}>
                    <div>idx:{item.idx}</div>
                    <div className={'g_ellipsis_2'}>{item.item_name}</div>
                    <div>{currency.format(item.selling_price)}</div>
                    <div>ecpm={item.ecpm.toFixed(0)}</div>
                    <div>ecpm_per={getPercent(item.ecpm, 'ecpm')}%</div>
                    <div>노출수={number.format(item.imp_cnt)}</div>
                    <div>view_cvr={number.format(item.view_cvr)}</div>
                    <div>구매건수={number.format(item.conversion_cnt)}</div>
                  </div>
                </li>
              ))}
          </ul>
        </section>
        <SidePanel d={list}/>
      </main>
    </>
  )
}
