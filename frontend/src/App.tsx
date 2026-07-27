import './App.css'
import { Button } from './components/Button'
import { Plusicon } from './icons/Plusicon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <>
      <div>
        <Button variant='primary' text='Add Content' startIcon={Plusicon()} />
        <Button variant='secondary' text='share Brain' startIcon={<ShareIcon />} />
      </div>

    </>
  )
}

export default App
