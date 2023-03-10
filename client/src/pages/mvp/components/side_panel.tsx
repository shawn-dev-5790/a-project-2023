import React, { useState } from 'react'
import ui from '@/styles/page_mvp_showcase.module.scss'
export default function SidePanel() {
  const [openSidePanel, setOpenSidePanel] = useState(false)
  const onToggleSidePanel = () => setOpenSidePanel(!openSidePanel)
  return (
    <div className={[ui.side, openSidePanel && ui.open].filter((cn) => !!cn).join(' ')}>
      <button className={ui.btn_side_toggle} type='button' onClick={onToggleSidePanel}>
        side
      </button>
      side side
    </div>
  )
}
