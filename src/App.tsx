import { useState } from 'react'
import './App.css'
import Task from './components/Task'

function App() {
  const [isCompleted, toggleComplete] = useState(false)
  const state = {
    title: 'first task',
    description: 'this is the first task of my app'
  }


  return (
    <>
      <h1>My App</h1>
      <Task title={state.title} description={state.description} isCompleted={isCompleted} toggleComplete={toggleComplete} />
    </>
  )
}

export default App
