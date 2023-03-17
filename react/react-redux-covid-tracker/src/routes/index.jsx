import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Symptoms from '../pages/Symptoms';
import Statistics from '../pages/Statistics';

const Routers = () => {
  return (
    <>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>

    </>
  );
};

export default Routers;