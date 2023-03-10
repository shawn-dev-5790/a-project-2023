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
    newObj.label = newObj.item_name
    delete newObj.ctr;
    delete newObj.click_cnt;
    delete newObj.item_name;
    return newObj;
  })



  const dataSet = {
    datasets: [
      {
        label: 'Scatter Chart',
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
      }


      // tooltip: {
      //   callbacks: {
      //     label: function (context: any) {
      //       var label = context.dataset.label || '';

      //       if (label) {
      //         label += context.label;
      //       }
      //       if (context.parsed.x !== null) {
      //         label += 'asdasd: ' + context.parsed.x + ', ';
      //       }
      //       if (context.parsed.y !== null) {
      //         label += 'y: ' + context.parsed.y;
      //       }

      //       return label;
      //     }
      //   },
      //   labels: {
      //     render: 'label',
      //     fontColor: '#000',
      //     fontSize: 14,
      //   },
      // },
      // elements: {
      //   point: {
      //     radius: 5,
      //     hitRadius: 10,
      //     hoverRadius: 10,
      //     hoverBorderWidth: 2,
      //     pointStyle: 'circle',
      //     borderWidth: 1,
      //     // backgroundColor: function(context:any) {
      //     //   const index = context.dataIndex;
      //     //   const value = data[index];
      //     //   return value.color;
      //     // },
      //     // ???????????? ????????? ??????
      //     text: function(context:any) {
      //       const index = context.dataIndex;
      //       const value = data[index];
      //       return value.label;
      //     },
      //     // ????????? ????????? ?????? ????????? ??? ?????? ??????
      //     font: {
      //       family: 'Arial',
      //       size: 12,
      //       weight: 'bold',
      //       color: '#333',
      //     },
      //   },
      // },
      // ...
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
