import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';
import './Forecast.css'
function Forecast({city,forecast:{forecastday}}) {

    const [expanded, setExpanded] = useState(false)
   console.log(forecastday);
    const handleChange =
      (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
  return (
    <div className='foreCastSection'>
        <h2 className='forcast-heading' style={{marginBottom:'20px'}}>ForeCast for {city}</h2>
        {
            forecastday.map((curDateForecast) =>{
                const{date,day,hour}=curDateForecast;
                const{maxtemp_c,
                    mintemp_c,
                    daily_chance_of_rain,
                    condition:{icon,text}}=day;
                return( 
                  
                <Accordion expanded={expanded === date} sx={{backgroundColor:' rgba(255, 255, 255, 0.388)' , flexWrap:'wrap' }}
                onChange={handleChange(date)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id={date}
                >
                    <img src={icon} alt="" />
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>{date} <br /> ({text })
                  </Typography>
                  <Typography sx={{ width: '33%', flexShrink: 0 }}> <b>Temp:</b>{mintemp_c} &#8451; to {maxtemp_c} &#8451;
                  </Typography>
                  <Typography sx={{ width: '33%', flexShrink: 0 }}> <b>{daily_chance_of_rain}</b>% of rain possible
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                   {
                    hour.map((curHourForeCast,index)=>{
                      return(
                        <div className='hourtrack'>
                         <b>{index}:00</b>
                         <img src={curHourForeCast.condition.icon}  />
                         <div className='progress'>
                         <LinearProgress variant="determinate" color="success" value={(curHourForeCast.temp_c * 100)/maxtemp_c} />
                         {curHourForeCast.temp_c}deg
                         </div>
                        </div>
                      )
                    })
                   }
                  </Typography>
                </AccordionDetails>
              </Accordion>)}
           )
        }
    
      
     
  
      </div>
 
  )
}
export default Forecast