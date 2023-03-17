import React from "react"
import heroImg from "../assets/hero.png"
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse d-flex align-items-center py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img src={heroImg} className="d-block mx-auto img-fluid" alt="hero" width="300" height="300" loading="lazy" />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3 text-success">Stay healthy, stay strong together</h1>
          <p className="lead text-dark">The Covid-19 pandemic has affected everyone around the world in different ways. During these challenging times, it's important that we all take care of our health and well-being. We need to work together to prevent the spread of the virus, support our communities and loved ones, and emerge from this pandemic stronger than before.</p>
          <Link to="/statistics" >
            <button type="button" className="btn btn-danger text-light btn-lg px-4 me-md-2">See More</button>
          </Link>
        </div>
      </div>
      </div>
  </header>
  )
}

export default Header
