import React from 'react'
import contentImg from "../assets/photo3.png"

const Symptoms = () => {
  return (
    <main>
      <section className='container my-3'>
        <div className='row text-center'>
          <h1 className="text-success">Covid-19 Symptoms</h1>
          <p className="fs-5 text-dark">Corona viruses are a type of virus. There are many different kinds, and some cause disease.</p>
          <p className="fs-5 text-dark">A newly identified type has caused a recent outbreak of respiratory.</p>
        </div>
          <figure className='row'>
            <div className="d-flex justify-content-center align-items-center">
              <img className="d-block mx-auto img-fluid" alt="covid" src={contentImg} />
            </div>
          </figure>
        </section>
    </main>
  )
}

export default Symptoms