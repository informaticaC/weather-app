import React, { useEffect, useState } from 'react'
import App from '../App';

const WeatherCard = ({weather}) => {
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

return (
    <article>
          <div>
            <h4>{weather?.name}, {weather?.sys.country}</h4>
            <section>
              <div className="section--head">
                <h6>"{weather?.weather[0].description}"</h6>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="icon"/>
              </div>          
                            
              <ul className="weather-list">
                <li className="weather-list-items">Wind Speed: {weather?.wind.speed} m/s</li>
                <li className="weather-list-items">Clouds: {weather?.clouds.all}</li>
                <li className="weather-list-items">Pressure: {weather?.main.pressure} hPa</li>
              </ul>
              <footer>
                  <div>{
                  celsiusShowing?
                    `${temperature?.celsius} °C`
                    :`${temperature?.farenheit} °F`
                  }</div>
                  
                <button onClick={handleClick}>Change to {
                  celsiusShowing?
                  '°F'
                  :'°C'
                }</button>
              </footer>
            </section>
          </div>
    </article>
   
  )
}

export default WeatherCard