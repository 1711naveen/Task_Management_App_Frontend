import React, { useEffect, useState } from 'react'
import { MdOutlineDelete } from "react-icons/md";

const Task = () => {

  const initialTask = [];
  const [task, setTask] = useState(initialTask);
  const [dates, setDates] = useState([]);

  const getTask = async () => {
    //API Call
    const respone = await fetch('http://3.110.134.173:8080/task', {
      method: 'GET',
    });
    const json = await respone.json();
    setDates(json.map(item => new Date(item.dueDate)));
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

  const getShortDate = (date) => {
    // Extracting only the date part (YYYY-MM-DD)
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    getTask();
  }, [])


  return (
    <div className='container'>
      <h1 className='text-center'>Tasks</h1>
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">Task Type</th>
            <th scope="col">Actions</th>
            <th scope="col">Due Date(YYYY-MM-DD)</th>
          </tr>
        </thead>
        <tbody>
          {task.map((item, index) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => { deleteTask(item.id) }}><MdOutlineDelete style={{ fontSize: "1.2em" }} /></button>
              </td>
              <td>{getShortDate(dates[index])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Task
