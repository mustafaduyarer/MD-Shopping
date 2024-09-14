import { useState } from 'react'
import './App.css'
import RouterConfig from './config/RouterConfig'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <RouterConfig />
      <ToastContainer autoClose={2500} />
   </div>
  )
}

export default App
