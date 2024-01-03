
import { useEffect, useState } from 'react';
import './App.css';
import Current from './components/Current';
import Forecast from './components/Forecast';


const autoCompleteURL='https://api.weatherapi.com/v1/search.json?key= 73cdf1979b7146b1a3d50309240301&q='

const weatherURL =(city) => `https://api.weatherapi.com/v1/forecast.json?key= 73cdf1979b7146b1a3d50309240301&q=${city}&days=7&aqi=no&alerts=no
`

function App() {
  const[city,setCity]=useState('');
  const[citySuggestion,setCitySuggestion]=useState([]);
 const[clicked,setClicked]=useState(false);
 const[current,setCurrent]=useState();
 const [location ,setLocation]=useState('')
 const[forecast,setForecast]=useState();


  const handleClick = async (clickedCity) =>{
    setCity(clickedCity);
    setClicked(true);

    const resp = await fetch(weatherURL(city));
    const data =await resp.json();
    setCurrent(data.current);
    setForecast(data.forecast);
    setLocation(data.location.name)
  }

  useEffect(()=>{
    const getDataAfterTimeout =setTimeout(()=>{  const fetchCitySuggestion = async ()=>{
      const resp= await fetch(autoCompleteURL+city)
      const data=await resp.json()
      const citySuggestion = data.map(curData => `${curData.name},${curData.region},${curData.country}`)
      setCitySuggestion(citySuggestion);
     };
     if(!clicked && city.length > 2) {
      fetchCitySuggestion();
     }else{
      setCitySuggestion([]);
      setClicked(false)}
    });

    return() => clearTimeout(getDataAfterTimeout)
 },[city]); 

  return (
    <div className="App">
    <div className='header'>Whether App</div>
    <div className='app_body'>
      <input  spellcheck="false" type="text" className="citytextbox" placeholder='Enter The City Name'
      value={city}
      onChange={(event)=>setCity(event.target.value)}/>
     

      {citySuggestion.length > 0 && (  <div className='suggestionWrapper'>
      {citySuggestion.map((curCity) =>(
        <div className='suggestion' onClick={()=>handleClick(curCity)}>
          {curCity}
        </div>
      ))}</div>)}

      {current&& <Current current={current} city={location}/> }
      {forecast && <Forecast forecast={forecast} city={location}/> }
    
    </div>
    </div>

  
);
 
}

export default App;
