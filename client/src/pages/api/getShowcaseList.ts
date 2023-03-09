// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const url =
    'https://v1.nocodeapi.com/minsungpark/google_sheets/OthpHeBtizqChcOU?tabId=data&filterBy=cate_id&filterValue=106'

  axios.get(url).then(({ data }) =>
    res.json({
      code: 200,
      message: 'success',
      data,
    })
  )
}