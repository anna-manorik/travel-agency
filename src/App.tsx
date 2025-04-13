import React, { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import AddingForm from './components/AddingForm'
import { TaskProps } from './types/TaskProps';
import FilterForm from './components/FilterForm'
import SearchForm from './components/SearchForm'
import { nanoid } from 'nanoid';

function App() {
  const [taskList, setTaskList] = useState<TaskProps[]>([])
  const [filteredTaskList, setFilteredTaskList] = useState<TaskProps[]>([])
  const [notFound, setNotFound] = useState(false);

  const addTask = (title: string, description: string, category: string) => {
    const newTask = {
      id: nanoid(),
      title,
      description,
      category,
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
    // setFilteredTaskList(newArray)
  }

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter(task => task.id !== id))
  }

  const filterTasks = (category: string) => {
    if(category === 'All') {
      setFilteredTaskList(taskList)
      return
    }
    setFilteredTaskList(taskList.filter(task => task.category === category))
  }

  const searchTasks = (searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredTaskList(taskList)
      setNotFound(false)
      return
    }

    const filtered = taskList.filter(task => task.title.includes(searchValue))
    setFilteredTaskList(filtered)
    setNotFound(filtered.length === 0)
  }

  return (
    <>
      <h1 className='text-green-900 text-lg font-black'>My App</h1>
      <AddingForm addTask={addTask}></AddingForm>
      <FilterForm filterTasksFunk={filterTasks}></FilterForm>
      <SearchForm searchFunk={searchTasks}></SearchForm>
      {filteredTaskList.length > 0 ? (
        <TaskList
          taskList={filteredTaskList}
          editTaskFunk={editTask}
          deleteTaskFunk={deleteTask}
        />
      ) : notFound ? (
        <p>Any results 😢</p>
      ) : (
        <TaskList
          taskList={taskList}
          editTaskFunk={editTask}
          deleteTaskFunk={deleteTask}
        />
      )}
    </> 
  )
}

export default App; 
