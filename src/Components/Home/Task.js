import React, { useEffect, useState } from 'react'

const Task = () => {

  const initialTask = [];
  const [task, setTask] = useState(initialTask);

  const getTask = async () => {
    //API Call
    const respone = await fetch('http://3.110.134.173:8080/task', {
      method: 'GET',
    });
    const json = await respone.json();
    setTask(json)
  }
  const deleteTask = async (id) => {
    const response = await fetch(`http://3.110.134.173:8080/task/${id}`, {
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {task.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Task
