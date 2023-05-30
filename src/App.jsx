import { useState } from 'react'
import Hero from './UIComponents/Hero'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="main">
      <Hero />
    </div>
      
    </>
  )
}

export default App
