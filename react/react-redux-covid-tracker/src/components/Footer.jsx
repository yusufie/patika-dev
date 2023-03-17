import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className='container'>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-3 my-1 border-top">
            <p className='fs-5 text-dark'>&copy; 2023</p>
            <ul className="list-unstyled d-flex">
                <li className="ms-2"><Link to="https://github.com/" className="link-dark"><BsGithub className='fs-3 text-success'/></Link></li>
                <li className="ms-2"><Link to="https://www.linkedin.com/" className="link-dark"><BsLinkedin className='fs-3 text-success' /></Link></li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer