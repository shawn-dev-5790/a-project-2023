import Head from 'next/head'
import useSWR from 'swr'
import ui from '@/styles/DisplayList.module.css'
import { IData, IErrorData } from './api/display_list'
import { useState } from 'react'
import { IItemOfDisplayList } from './api/display_list'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function DisplayList() {
  const { data, error, isLoading, isValidating } = useSWR<IData, IErrorData>(() => `/api/display_list`, fetcher)
  const [cateId, setCateId] = useState<string>('100')
  const [sortField, setSortField] = useState<string>('sequence_no')
  const [fieldNames, setFieldNames] = useState<string[]>([])

  const onChangeFieldNames = (e: any) => {
    const name = e.target.value
    const fieldNamesToUpdate = !!fieldNames.find((field) => field === name)
      ? fieldNames.filter((field) => field !== name)
      : fieldNames.concat([name])
    setFieldNames(fieldNamesToUpdate)
  }
  const onChangeSortField = (e: any) => {
    const sort = e.target.value
    if (sort !== 'sequence_no') {
      const fieldNamesToUpdate = !!fieldNames.find((field) => field === sort) ? fieldNames : fieldNames.concat([sort])
      setFieldNames(fieldNamesToUpdate)
    }
    setSortField(sort)
  }

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  const getList = (cateBy: string = '', sortBy: string = '') => {
    const displayList = data.data.display_list || []
    if (!(cateBy && sortBy)) return displayList
    const res = displayList.filter(({ cate_id }) => cate_id === cateBy)
    res.sort((a: any, b: any) => b[sortBy] - a[sortBy])
    return res
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={ui.main}>
        <div className={ui.container}>
          <div className={ui.c_control}>
            <div>
              <h2>상품 진열 !</h2>
              <div className={ui.g_desc}>
                <p>티어 벳지라는것으로 순서를 표현했습니다.</p>
                <p>해당 필드의 min max 를 기준으로 백분율을 구하고, 20% 단위로 티어를 부여 하였습니다.</p>
                <p>max click_cnt 10000</p>
                <p>min click_cnt 900</p>
                <p>이라고 가정하였을때 상품의 click_cnt가 2000 이라면,</p>
                <p>{Math.ceil(((2000 - 900) / 10000) * 100)}% 이고 이것은 5티어에 해당합니다.</p>
                <p> 티어는 20% 단위로 5개로 나누었습니다.</p>
              </div>
              <p></p>
            </div>
            <section>
              <div>
                <h3>
                  카테고리 설정
                  <button className={ui.g_tag} type='button' onClick={() => setCateId('100')}>
                    Reset
                  </button>
                </h3>
                <div className={ui.g_group_tags}>
                  <Input
                    type='radio'
                    name='cateId'
                    value='100'
                    hook={{ value: cateId, onChange: (e: any) => setCateId(e.target.value) }}
                  />
                  <Input
                    type='radio'
                    name='cateId'
                    value='99'
                    hook={{ value: cateId, onChange: (e: any) => setCateId(e.target.value) }}
                  />
                </div>
              </div>
            </section>
            <section>
              <div>
                <h3>
                  정렬 필드 설정
                  <button
                    className={ui.g_tag}
                    type='button'
                    onClick={() => {
                      setSortField('sequence_no')
                      setFieldNames([])
                    }}
                  >
                    Reset
                  </button>
                </h3>
                <div className={ui.g_group_tags}>
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='sequence_no'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='imp_cnt'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='view_cnt'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='click_cnt'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='addcart_cnt'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='conversion_cnt'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='conversion_amt'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='ctr'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='view_cvr'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='imp_cvr'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                  <Input
                    type='radio'
                    name='fieldSort'
                    value='ecpm'
                    hook={{ value: sortField, onChange: onChangeSortField }}
                  />
                </div>
              </div>
            </section>
            <section>
              <div>
                <h3>
                  필드 설정
                  <button className={ui.g_tag} type='button' onClick={() => setFieldNames([])}>
                    Reset
                  </button>
                </h3>
                <div className={ui.g_group_tags}>
                  <Input
                    type='checkbox'
                    name='field'
                    value='imp_cnt'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='view_cnt'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='click_cnt'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='addcart_cnt'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='conversion_cnt'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='conversion_amt'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='ctr'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='view_cvr'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='imp_cvr'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                  <Input
                    type='checkbox'
                    name='field'
                    value='ecpm'
                    hook={{ value: fieldNames, onChange: onChangeFieldNames }}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className={ui.c_preview}>
            <Preview list={getList(cateId, sortField)} fieldNames={fieldNames} />
          </div>
        </div>
      </main>
    </>
  )
}
function Input(props: { type: string; name: string; value: any; hook: any }) {
  const id = props.name + props.value
  const checked = props.hook.value.includes(props.value)

  return (
    <>
      <input
        hidden={true}
        type={props.type}
        id={id}
        name={props.name}
        value={props.value}
        checked={checked}
        onChange={props.hook.onChange}
      />
      <label className={[ui.g_tag, !!checked && ui.g_tag_active].filter((v) => !!v).join(' ')} htmlFor={id}>
        {props.value}
      </label>
    </>
  )
}
function TierBadge({ percent }: { percent: number }) {
  const tier5 = percent < 20 && percent >= 0
  const tier4 = percent < 40 && percent >= 20
  const tier3 = percent < 60 && percent >= 40
  const tier2 = percent < 80 && percent >= 60
  const tier1 = percent <= 100 && percent >= 80
  return (
    <div className={ui.g_tier_badge}>
      {tier1 && <img src='https://s-lol-web.op.gg/images/icon/icon-tier-1.svg' alt='tier badge 1' />}
      {tier2 && <img src='https://s-lol-web.op.gg/images/icon/icon-tier-2.svg' alt='tier badge 2' />}
      {tier3 && <img src='https://s-lol-web.op.gg/images/icon/icon-tier-3.svg' alt='tier badge 3' />}
      {tier4 && <img src='https://s-lol-web.op.gg/images/icon/icon-tier-4.svg' alt='tier badge 4' />}
      {tier5 && <img src='https://s-lol-web.op.gg/images/icon/icon-tier-5.svg' alt='tier badge 5' />}
    </div>
  )
}
function Preview(props: { list: IItemOfDisplayList[]; fieldNames: string[] }) {
  const currency = new Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' })
  const number = new Intl.NumberFormat('ko', {})
  const onErrorImg = (e: any) => {
    e.target.src = 'https://dummyimage.com/200x200/efefef/444444.png&text=No+Img'
  }
  return (
    <section className={ui.s_preview}>
      <div className={ui.preview_head}>
        <h3 className={ui.g_tit}>미리보기</h3>
        <p className={ui.g_desc}>지정된 정렬방식에 따른 상품 진열을 미리보기 하실 수 있습니다. 현재의 정렬기준...</p>
      </div>
      <ul className={ui.list_preview}>
        {props.list.map((item) => (
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
              <div className={ui.g_ellipsis_1}>{item.item_name}</div>
              <div>{currency.format(item.selling_price)}</div>
            </div>
            {props.fieldNames.length > 0 && (
              <div className={ui.preview_detail}>
                {props.fieldNames.map((f) => {
                  const i: { [k: string]: any } = item
                  const v = i[f]
                  const l = props.list.map((i: { [k: string]: any }) => i[f])
                  const min = Math.min(...l)
                  const max = Math.max(...l)
                  const p = Math.ceil(((v - min) / max) * 100)
                  return (
                    <dl key={f}>
                      <dt>
                        <TierBadge percent={p} />
                        <span>{f}</span>
                      </dt>
                      <dd>{number.format(v)}</dd>
                    </dl>
                  )
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
