import { useState } from 'react'
import Hero from './UIComponents/Hero'
import Skills from './UIComponents/Skills'
import Experience from './UIComponents/Experience'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="main">
      <Hero />
      <Skills />
      <Experience />
    </div>
      
    </>
  )
}

export default App
