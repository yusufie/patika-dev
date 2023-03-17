import React from 'react'
import { useSelector } from 'react-redux'
import { formatCountryName, formatName, formatDate} from '../assets/format'


const Card = ({data}) => {
  const {selectedCountry} = useSelector((state) => state.covidTracker)

  const formattedCountryName = formatCountryName(selectedCountry)
  const formattedName = formatName(data.name)
  const formattedDate = formatDate(data.date);

  return (
  <div className="col-auto text-dark">
    <div className={`card text-center mb-4 rounded-3 shadow-sm border-${data.color}`}>
        <div className={`card-header py-3 text-bg-${data.color} border-${data.color}`}>
            <h4 className="my-0 fw-normal">{data.name}</h4>
        </div>
        <div className="card-body">
            <h1 className="card-title">{data.value.toLocaleString()}</h1>
            <ul className="list-unstyled mt-3 mb-4">
                <li><span className="fs-6 fw-bold">Last Updated At: </span>{formattedDate}</li>
                <li>Number of {formattedName} cases of COVID-19 from {formattedCountryName}</li>
            </ul>
        </div>
    </div>
    </div> 
  )
}

export default Card