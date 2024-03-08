import React, { useEffect, useState } from 'react'
import Card from './Card'

const Task = () => {

  const initialTask = [];
  const [task, setTask] = useState(initialTask);

  const getTask = async () => {
    //API Call
    const respone = await fetch('http://13.233.113.50:8080/task', {
      method: 'GET'
    });
    const json = await respone.json();
    setTask(json)
  }
  const deleteTask = async (id) => {
    const response = await fetch(`http://13.233.113.50:8080/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    const newTasks = task.filter((temp) => { return temp.id !== id })
    setTask(newTasks)
  }

  useEffect(() => {
    getTask();
  }, [])


  return (
    <div className='container'>
      <h1 className='text-center'>Tasks</h1>
      {task.map((tempTask) => {
        return <Card key={tempTask.id} task={tempTask} deleteTask={deleteTask} />
      })}
    </div>
  )
}

export default Task
