import React from 'react'
import {  FaHands } from 'react-icons/fa'
import {  IoMdPeople } from 'react-icons/io'
import {  RiSurgicalMaskLine } from 'react-icons/ri'
import {  SiCrowdsource } from 'react-icons/si'
import contentImg from "../assets/photo1.png"

const Content = () => {
  return (
    <main className='container'>
    <div className="row row-cols-1 row-cols-md-2 align-items-md-center">
      <div className="col d-flex flex-column align-items-center">
        <img src={contentImg} className="img-fluid" alt="covid" width="800" height="800" loading="lazy" />
      </div>

      <div className="col">
        <div className="row row-cols-1 row-cols-sm-2 g-4">
          <div className="col d-flex flex-column gap-2">
            <RiSurgicalMaskLine className='fs-1 px-1 text-bg-success text-light rounded-3'/>
            <h4 className="fw-semibold mb-0 text-dark">Wearing a mask</h4>
            <p className="text-muted"> Wearing a mask helps to prevent the spread of the virus by blocking respiratory droplets from being transmitted to others.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <IoMdPeople className='fs-1 px-1 text-bg-success text-light rounded-3'/>
            <h4 className="fw-semibold mb-0">Social distance</h4>
            <p className="text-muted">Social distancing helps to reduce the spread of the virus by limiting close contact between people.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <FaHands className='fs-1 px-1 text-bg-success text-light rounded-3'/>
            <h4 className="fw-semibold mb-0">Washing hands</h4>
            <p className="text-muted">Frequent hand washing helps to prevent the spread of the virus by removing the virus from the hands.</p>
          </div>

          <div className="col d-flex flex-column gap-2">
            <SiCrowdsource className='fs-1 px-1 text-bg-success text-light rounded-3'/>
            <h4 className="fw-semibold mb-0">Avoiding crowded places</h4>
            <p className="text-muted">This helps to prevent the spread of the virus by reducing the likelihood of close contact with infected individuals.</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  )
}

export default Content