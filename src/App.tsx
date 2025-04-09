import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import AddingForm from './components/AddingForm'
import { TaskProps } from './types/TaskProps';

function App() {
  const [taskList, setTaskList] = useState<TaskProps[]>([])

  const addTask = (title: string, description: string) => {
    const newTask = {
      title,
      description,
    }

    setTaskList([...taskList, newTask])
  }

  return (
    <>
      <h1>My App</h1>
      <AddingForm addTask={addTask}></AddingForm>
      <TaskList taskList={taskList}></TaskList>
    </>
  )
}

export default App; 
