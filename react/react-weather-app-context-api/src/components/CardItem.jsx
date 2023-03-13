
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import WeatherContext from '../context/Weather';
import { useContext } from 'react';



function CardItem({ item }) {
  const {current} = useContext(WeatherContext)
  const dates = new Date();
  const dateFormat = dates.getFullYear() + "-" +((dates.getMonth()+1).length !== 2 ? "0" + (dates.getMonth() + 1) : (dates.getMonth()+1)) + "-" + (dates.getDate().length !== 2 ?"0" + dates.getDate() : dates.getDate());
  const fullYearType=dateFormat.toString(); 
  
  const date = new Date(item.date);
  const dayNumber = date.getDay()
  const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]
  const day = days[dayNumber]

  return (
    <div style={{ width: "100%", justifyContent: "space-between", marginTop: "20px", marginLeft: "15px"  }}>

      <Card sx={{ maxWidth: 190, }}
        style={{ backgroundColor: "#eee" ,height:"350px"}}
      >
        <CardContent>

          <Typography gutterBottom variant="h6" component="div" style={{marginBottom:"-5px"}}>

            {day}
          </Typography>
        </CardContent>
        <CardMedia style={{ width: "50px", height: "50px", display: "flex", margin: "auto", marginTop: "15px" }}
          sx={{ height: 100 }}
          image={item.day.condition.icon}

        />
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h9" component="div" style={{height:"60px"}}>
            {item.day.condition.text}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {fullYearType===item.date? <div>{Math.floor(current.temp_c) } °C</div>:<div>{Math.floor(item.day.avgtemp_c)} °C</div>}
          </Typography>

        </CardContent>
        <CardActions style={{ justifyContent: "space-between" ,margin:"0 5px",}}>
          <div style={{bottom:"0"}}>

            Min
            <p>{Math.floor(item.day.mintemp_c)} °C</p>
          </div>
          <div>

            Max
            <p>{Math.floor(item.day.maxtemp_c)} °C</p>
          </div>

        </CardActions>
      </Card>
    </div>
  )
}

export default CardItem