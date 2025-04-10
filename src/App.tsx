import React, { useState } from 'react'
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

  const editTask = (id: string, fieldType: string) => {
    if (document.querySelector('#inputForChange')) {
      return
    }
    
    const editableElement = document.querySelector(`#${[fieldType]}`)
    editableElement instanceof HTMLElement && (editableElement.style.display = 'none')

    let inputField = document.createElement("input");
    inputField.value = editableElement?.textContent ?? "";
    inputField.id = 'inputForChange';

    editableElement?.parentNode instanceof HTMLElement && editableElement.parentNode.insertBefore(inputField, editableElement.nextSibling);
    
    inputField.focus()

    if (inputField) {
      inputField.addEventListener('blur', () => {
        saveEditedElement(inputField.value, id, fieldType)
        inputField.remove()
        editableElement instanceof HTMLElement && (editableElement.style.display = '')
      });
    }
  }

  const saveEditedElement = (newValue: string, id: string, fieldType: string) => {
    console.log('fieldType', fieldType);
    const newArray = taskList.map(task => task.id === id ? {...task, [fieldType]: newValue} : task)

    setTaskList(newArray)
    
  }

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter(task => task.id !== id))
  }

  return (
    <>
      <h1>My App</h1>
      <AddingForm addTask={addTask}></AddingForm>
      <TaskList taskList={taskList} editTaskFunk={editTask} deleteTaskFunk={deleteTask}></TaskList>
    </>
  )
}

export default App; 
