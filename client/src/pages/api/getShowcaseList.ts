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

/**
 *
 * curl --location --request GET "https://v1.nocodeapi.com/minsungpark/google_sheets/OthpHeBtizqChcOU?tabId=data&filterBy=cate_id&filterValue=100"
 * 
 * 
 * API 공유드립니다.
매일 오전 8-10시 사이에 갱신됩니다.
따라서 당일 오전 8-10시까지 정의된 노출 순서 & 최근 1주일 지표 결과를 API로 확인할 수 있습니다.
다음과 같이 호출하시면 됩니다.
filterBy는 검색조건을 의미하며, filterValue는 검색하는 값입니다.
즉, 아래 예시는 카테고리 아이디 100만 조회하는 결과입니다.
curl --location --request GET "https://v1.nocodeapi.com/minsungpark/google_sheets/OthpHeBtizqChcOU?tabId=data&filterBy=cate_id&filterValue=100"  
컬럼의 의미는 다음과 같습니다.
(API 응답에는 있으나 정의하지 않은 필드는 무시하셔도 됩니다)
지표는 imp_cnt, ctr, conversion_cnt, conversion_amt, view_cvr만 사용하셔도 됩니다.
cate_id - 카테고리 아이디
item_id - 상품 아이디
sequence_no - 노출 순서
item_name - 상품 이름
selling_price - 판매가격
main_item_img - 상품 이미지 URL
reg_dtm - 상품 등록일시
edit_dtm - 상품 수정일시
imp_cnt - 노출수
view_cnt - 조회수
click_cnt - 클릭수
addcart_cnt - 장바구니 담기 수
conversion_cnt - 구매건수
conversion_amt - 구매금액
ctr - 클릭률(노출수 대비 클릭수)
view_cvr - 구매전환율(조회수 대비 구매건수)
ecpm - 1천번 노출수 대비 기대구매금액
 */
