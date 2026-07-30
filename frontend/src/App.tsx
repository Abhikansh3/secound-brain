import './App.css'
import { Button } from './components/Button'
import { Plusicon } from './icons/Plusicon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'
import { CreateContentModal } from './components/CreateContentModal'
import { useState } from 'react'
function App() {
  const [modalOpen, setModalOpen] = useState(true)
  return (
    <>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} />
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex justify-end gap-2'>
          <Button variant='primary' text='Add Content' startIcon={Plusicon()} onClick={() => {
            setModalOpen(true)
          }} />
          <Button variant='secondary' text='share Brain' startIcon={<ShareIcon />} />
        </div>
        <div className='flex gap-2'>
          <Card title='hello' type='youtube' link='https://www.youtube.com/watch?v=tL9Lw250spc' />
          <Card title='hello' type='twitter' link='https://x.com/incentivising/status/2081674449925931467' />
        </div>
      </div>

    </>
  )
}

export default App
