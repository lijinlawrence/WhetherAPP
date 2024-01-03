import React from 'react'
import './Current.css'
function Current({current,city}) {
  return (
    <div className='current'>
       <div className='cityside'> <h1 > {city}</h1>
       <h5>Current weather</h5>
       </div>
       
        
        <div className="currentBody">
        <div className='conditionIcon'>
           <img src={current.condition.icon} width={150} />
           <h3>{current.condition.text}</h3>
           </div>
           <div className='conditionContainer'>
            <span><b>Temp: <br /> {current.temp_c}&#8451;</b></span>
            <span><b>Feels like: <br />{current.feelslike_c}</b></span>
            <span><b>Wind Speed: <br />{current.wind_kph}kph</b></span></div>
          </div>
    </div>
  )
}

export default Current