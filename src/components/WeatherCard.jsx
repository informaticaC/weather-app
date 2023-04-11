import React, { useEffect, useState } from 'react'
import App from '../App';

const WeatherCard = ({weather, error}) => {
    // console.log(weather)
    const [temperature, setTemperature] = useState()
    const [celsiusShowing, setCelsiusshowing] = useState(true) //uso para saber si la unidad de temp se muestra en Celsius o no
    const celsius = (weather?.main.temp - 273.15).toFixed(1)
    const farenheit = (celsius * 9/5 + 32).toFixed(1) 
    
    useEffect(()=>{
      setTemperature({celsius,farenheit})
    }
    ,[weather])
    
    function handleClick() { // no usé función de flecha
      setCelsiusshowing(!celsiusShowing) //sólo porque extraño las de siempre :)
      return
    }

    const capitalize = (e)=> {
      let textUppercase='';
      for (const word of e.split(' ')) {
        textUppercase += word.split('')[0].toUpperCase()+word.slice(1)+' ';
      }
      return textUppercase.trim()
    }

return (
    <article>
      <h4>{weather?.name}, {weather?.sys.country}</h4>
       
      <section>
        <div className="section--head">
          <h6>"{capitalize(weather?.weather[0].description)}"</h6>
          <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="icon"/>
        </div>          
                      
        <ul className="weather-list">
          <li className="weather-list-items">Wind Speed: <b>{weather?.wind.speed}</b>  m/s</li>
          <li className="weather-list-items">Clouds: <span><b>{weather?.clouds.all}</b> %</span></li>
          <li className="weather-list-items">Pressure: <b>{weather?.main.pressure}</b>  hPa</li>
        </ul>
        <footer>
            <div>{
            celsiusShowing?
              `${temperature?.celsius} °C`
              :`${temperature?.farenheit} °F`
            }</div>
            
          <button onClick={handleClick} className='button'>Change to {
            celsiusShowing?
            '°F'
            :'°C'
          }</button>
        </footer>
      </section>
    </article>
   
  )
}

export default WeatherCard