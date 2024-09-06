import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CarForm from './carform.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CarForm />
    </>
  )
}

export default App
