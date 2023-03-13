import React from 'react'
import WeatherContext from '../context/Weather'
import { useContext } from 'react'
import CardItem from './CardItem';


function Table() {
    const { weather } = useContext(WeatherContext);
    console.log(weather)
    return (
        <div style={{position:"relative",display:'flex',}} className="mobile">
          {
            weather.map((item)=>{
              return(

                <CardItem  key={item.date_epoch} item={item}/>
              )

            })
          }

        </div>
    )
}

export default Table