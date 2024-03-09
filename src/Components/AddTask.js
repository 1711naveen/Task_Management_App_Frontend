import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [task, settask] = useState({ title: "", type: "", dueDate: "", description: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://13.233.113.50:8080/task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // referrerPolicy: "unsafe_url",
            body: JSON.stringify({ title: task.title, type: task.type, dueDate: task.dueDate, description: task.description })
        });
        settask({
            title: '',
            type: 'Default',
            dueDate: '',
            description: '',
        });
        const json = await response.json();
        navigate('/');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        settask({
            ...task,
            [name]: value,
        });
    };

    return (
        <div className='container'>
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title' value={task.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Type:</label>
                    <select className="form-select" aria-label="Default select example" name='type' value={task.type} onChange={handleChange}>
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
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Description:</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' value={task.description} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddTask
