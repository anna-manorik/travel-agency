import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import AddingForm from './components/AddingForm'
import { TaskProps } from './types/TaskProps';
import { nanoid } from 'nanoid';

function App() {
  const [taskList, setTaskList] = useState<TaskProps[]>([])

  const addTask = (title: string, description: string) => {
    const newTask = {
      id: nanoid(),
      title,
      description,
    }

    setTaskList([...taskList, newTask])
  }

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter(task => task.id !== id))
  }

  return (
    <>
      <h1>My App</h1>
      <AddingForm addTask={addTask}></AddingForm>
      <TaskList taskList={taskList} deleteTaskFunk={deleteTask}></TaskList>
    </>
  )
}

export default App; 
