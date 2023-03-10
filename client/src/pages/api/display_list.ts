import type { NextApiRequest, NextApiResponse } from 'next'
import ITEM_DISPLAY_LIST from './data/display_list.json'

export interface IItemOfDisplayList {
  cate_id: string
  item_id: string
  sequence_no: number
  item_name: string
  selling_price: number
  main_item_img: string
  reg_dtm: string
  edit_dtm: string
  imp_cnt: number
  view_cnt: number
  click_cnt: number
  addcart_cnt: number
  conversion_cnt: number
  conversion_amt: number
  ctr: number
  view_cv?: number
  imp_cvr: number
  ecpm: number
}

export interface IData {
  code: string
  message: string
  data: { data: IItemOfDisplayList[] }
}

export interface IErrorData {
  code: string
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IData>) {
  const http_res = {
    code: '200',
    message: 'success-get-dummy-data',
    data: { data: ITEM_DISPLAY_LIST },
  }
  res.status(200).json(http_res)
}
