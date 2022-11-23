import { useState } from 'react'
import { Pokedex } from './components/Pokedex'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Pokedex />
    </div>
  )
}

export default App
