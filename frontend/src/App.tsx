import './App.css'
import { Button } from './components/Button'
import { Plusicon } from './icons/Plusicon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'
function App() {

  return (
    <>
      <div>
        <Button variant='primary' text='Add Content' startIcon={Plusicon()} />
        <Button variant='secondary' text='share Brain' startIcon={<ShareIcon />} />
        <Card title='hello' type='youtube' link='https://www.youtube.com/watch?v=tL9Lw250spc' />
        <Card title='hello' type='twitter' link='https://x.com/incentivising/status/2081674449925931467' />
      </div>

    </>
  )
}

export default App
