import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({chartData}) => {
  return (
    <div className='container'>
        <div className="row">
            <div className="col d-flex flex-column align-items-center justify-content-center">
                <BarChart width={600} height={300} data={chartData} margin={{   top: 5,   right: 30,   left: 20,   bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#7F0FFF" />
                </BarChart>
            </div>
        </div>
  </div>
  )
}

export default Chart