## 2차

1. 정렬방법
   - 필드 별로 정렬하기 (커스텀)
   - 카드 (자동: 제안하는 정렬 방식을 추천)
2. 차트 표현 방법
   - 지금 선택된 지표 기준으로 차트 생성
   - 차트에서 지표를 변경 할 수 있음
3. 사이드 패널에서 추가할 내용
   - 내부 정보를 어느 정도까지 보여줄지
   - 다른 상품군과 비교하는 섹션
4. 표현하고자 하는 그래프
   - https://archive.nytimes.com/www.nytimes.com/interactive/2013/05/25/sunday-review/corporate-taxes.html

## Pre 3차

화면 노출
좌측 : 기본 상품 진열
우측 : 스케터 그래프
사이드 : 디테일 정보

x 클릭률 (ctr)
y 구매전환율 (view_cvr)
t 노출수 (imp_cnt)

스케일 조절

다이나믹 인터렉션 리스트 to 그래프

https://divers-secure-static-files.s3.amazonaws.com/reports/10000480896f2b61d2d9f887fe44bf4df36a9/item_report_2023-03-20.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATJ2CRN5KX73WPYWJ%2F20230320%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T063136Z&X-Amz-Expires=100&X-Amz-SignedHeaders=host&X-Amz-Signature=ff72d6d17623b2f5e7ece1dc656ba5d37084666bc9c9d6127b49f7c984410392

## Pre 4차

! 우선적으로는 진단 기능에 집중한다.

1. 사분면 그래프는 상품id 기준이 아니다. (좌표를 기준으로 하고, x-range 중간값, y-range 중간값) range의 중간값은 API 
1-1. 최초 zoomIn scale(1)
1-2. 초기 데이터 범위를 지정할 수 있으면 좋겠다. (기준은 노출수 imp_cnt) slice :100개단위

2. 목록 화면에서 노출에서 row(1부터 시작) 의 수가 궁금 ( 한 행에 노출하는 상품의 수 )

3. 목록 API 사면분면 정보를 내려준다.
3-1. (보류 : 의견) 같은 사분면 내에서 스코어링.. 처리

4. 목록 화면에서 카테고리 별로 데이터 업데이트를 해야 한다.

5. Axis 의 속성을 바꿀수 있도록 할 수 있음 좋겠다.

> 로딩처리는 실 개발에서... api를 사용에서 로딩 시간이 꽤 크다