import { useState } from 'react'
import './App.css'
import RouterConfig from './config/RouterConfig'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <RouterConfig/>
   </div>
  )
}

export default App
