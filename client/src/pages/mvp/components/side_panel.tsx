import React, { useState } from 'react'
import ui from '@/styles/page_mvp_showcase.module.scss'

import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, Title } from 'chart.js/auto';

export default function SidePanel({ d }: any) {
  const [openSidePanel, setOpenSidePanel] = useState(false)
  const onToggleSidePanel = () => setOpenSidePanel(!openSidePanel)
  Chart.register(LinearScale, Title);
  const data = d.map((obj: any) => {
    const newObj = { ...obj };
    newObj.x = newObj.ctr;
    newObj.y = newObj.click_cnt;
    newObj.name = newObj.item_name
    delete newObj.ctr;
    delete newObj.click_cnt;
    delete newObj.item_name;
    return newObj;
  })


  // console.log(data)

  const dataSet = {
    datasets: [
      {
        data,
      },
    ],
  };

  const options: any = {
    plugins: {
      datalabels: {
        color: 'white',
        display: function(context:any) {
          return context.dataset.data[context.dataIndex] > 15;
        },
        font: {
          weight: 'bold'
        },
        formatter: Math.round
      },


      tooltip: {
        callbacks: {
          label: function (context: any) {
            // let label = context.dataset.label || '';

            // if (context.parsed.name) {
            //   label += context.parsed.name;
            // }
            // if (context.parsed.x !== null) {
            //   label += 'ctr: ' + context.parsed.x + '\n';
            // }
            // if (context.parsed.y !== null) {
            //   label += '클릭율: ' + context.parsed.y;
            // }
            
            const label = `
            ctr : ${context.parsed.x}\n,
            클릭수: ${context.parsed.y}
            `

            return label;
          }
        },
        labels: {
          render: 'label',
          fontColor: '#000',
          fontSize: 14,
        },
      },
      elements: {
        point: {
          radius: 5,
          hitRadius: 10,
          hoverRadius: 10,
          hoverBorderWidth: 2,
          pointStyle: 'circle',
          borderWidth: 1,
          // backgroundColor: function(context:any) {
          //   const index = context.dataIndex;
          //   const value = data[index];
          //   return value.color;
          // },
          // 포인트에 라벨을 추가
          text: function(context:any) {
            const index = context.dataIndex;
            const value = data[index];
            return value.label;
          },
          // 포인트 라벨의 폰트 스타일 및 색상 설정
          font: {
            family: 'Arial',
            size: 12,
            weight: 'bold',
            color: '#333',
          },
        },
      },
    }
  }
  return (
    <div className={[ui.side, openSidePanel && ui.open].filter((cn) => !!cn).join(' ')} >
      <button className={ui.btn_side_toggle} type='button' onClick={onToggleSidePanel}>
        side
      </button>
      <Scatter data={dataSet} options={options} />

    </div >
  )
}
