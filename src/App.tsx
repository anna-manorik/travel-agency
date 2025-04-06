import { useState } from 'react'
import './App.css'
import Task from './components/Task'

function App() {
  const [count, setCount] = useState(0)
  const state = {
    title: 'first task',
    description: 'this is the first task of my app'
  }

  return (
    <>
      <h1>My App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Task title={state.title} description={state.description} isCompleted={false} />
    </>
  )
}

export default App
