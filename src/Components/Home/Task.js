import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Task = () => {

  const ref = useRef(null);
  const refClose = useRef(null)

  const initialTask = [];
  const [task, setTask] = useState(initialTask);
  const [editTask, seteditTask] = useState({ id: "", title: "", description: "", type: "", dueDate: "" })
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
    console.log(json)

    const newTasks = task.filter((temp) => { return temp.id !== id })
    setTask(newTasks)
  }

  const editingTask = async (id, title, description, type, dueDate) => {
    const response = await fetch(`http://3.110.134.173:8080/task/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ title, description, type, dueDate })
    });
    const json = await response.json();
    console.log(json)

    let newTask = JSON.parse(JSON.stringify(task))
    // Logic to edit in client
    for (let index = 0; index < newTask.length; index++) {
      const element = newTask[index];
      if (element.id === id) {
        newTask[index].title = title;
        newTask[index].description = description;
        newTask[index].type = type;
        newTask[index].dueDate = dueDate;
        break;
      }
    }
    setTask(newTask);
  }

  const updateTask = (item) => {
    ref.current.click();
    seteditTask({ id: item.id, title: item.title, description: item.description, type: item.type, dueDate: item.dueDate })
  }

  const getShortDate = (date) => {
    // Extracting only the date part (YYYY-MM-DD)
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    getTask();
  }, [])

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    seteditTask({
      ...editTask,
      [name]: value,
    });
  };

  const handleClick = () => {
    editingTask(editTask.id, editTask.title, editTask.description, editTask.type, editTask.dueDate)
    refClose.current.click();
  }


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
                <button type="button" className="btn btn-primary mx-2" onClick={() => { updateTask(item) }}><FiEdit /></button>
                <button type="button" className="btn btn-danger" onClick={() => { deleteTask(item.id) }}><MdOutlineDelete style={{ fontSize: "1.2em" }} /></button>
              </td>
              <td>{getShortDate(dates[index])}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title:</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title' value={editTask.title} onChange={handleModalChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Type:</label>
                  <select className="form-select" aria-label="Default select example" name='type' value={task.type} onChange={handleModalChange}>
                    <option value="Default">Default</option>
                    <option value="Done">Done</option>
                    <option value="Todo">Todo</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Due Date:</label>
                  <div>
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    <input
                      type="date"
                      name="dueDate"
                      value={task.dueDate}
                      onChange={handleModalChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Description:</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' value={editTask.description} onChange={handleModalChange} required />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task
