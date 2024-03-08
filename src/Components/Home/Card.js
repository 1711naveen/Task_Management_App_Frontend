import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

const Card = (props) => {
    
    return (
        <div className='m-5'>
            <div className="card">
                <div className='d-flex justify-content-around'>
                    <div className="card-body">
                        {/* <p>{props.task.dueDate}</p> */}
                        <h5 className="card-title">{props.task.title}</h5>
                        <p className="card-text">{props.task.description}</p>
                    </div>
                    <div>
                        <p className="text-end m-3"><strong>{props.task.type}</strong></p>
                        <Link onClick={() => { props.deleteTask(props.task.id) }} style={{ color: 'red' }}>
                            <MdDeleteOutline className='ms-3 mb-2' style={{ fontSize: "2rem" }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
