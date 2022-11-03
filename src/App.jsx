import { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className="text-4xl text-purple-500 animate-pulse">Hello World!</h1>
    </div>
  )
}

export default App
