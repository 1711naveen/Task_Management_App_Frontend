import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosGitBranch } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import PDFDownloader from './PDFDownloader';

const Navbar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mt-2">
                                <Link className="nav-link active" aria-current="page" to="/add">Add Task</Link>
                            </li>
                            <li className="nav-item mt-3">
                                <PDFDownloader/>
                            </li>
                            <li className="nav-item mt-2">
                                <Link className="nav-link" to="https://github.com/1711naveen/Task_Management_App_Frontend" target='_blank'>
                                    <span className=''>
                                        <button type="button" className="btn btn-primary" >
                                            <IoIosGitBranch />
                                            <FaStar />
                                        </button>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
