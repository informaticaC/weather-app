import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios, { AxiosError, isAxiosError } from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading  from "./components/Loading";
import ErrorView from './components/ErrorView'

function App() {
  const [latlon, setLatlon] = useState() //usado para geolocation
  const [location, setLocation] = useState('') //usado para el ingreso manual de la localidad
  const [weather, setWeather] = useState()
  const [error, setError] = useState(false)
  const defaultLocation = 'London, Uk'

  useEffect(() => { //aquí se intena geolocalizar la ubicación delusuario
    const success = (pos) => {
      
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setLatlon(obj)
      
    }
    const error = (err) => {
      // console.log("El usuario bloqueo la geolocalización",err.code);
      ErrorView(err);
      setError(err)
      setLocation(defaultLocation)
    }
    navigator.geolocation.getCurrentPosition(success, error )
  }, [])

  useEffect(() =>{ //se muestra la geolocalización o bien se selecciona una localización manualmente
    if(latlon){
      const apikey = 'f054e09ba76d80b0ea24c122a6a6d982'
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`
      //const url = `https://api.openweathermap.org/data/2.5/weather?q=Crespo,ar&APPID=f054e09ba76d80b0ea24c122a6a6d982 `

      axios.get(url)
      .then(res => setWeather(res.data) )

    }else if(location){ // se mostrarán los datos del tiempo de la localización ingresada en el input
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=f054e09ba76d80b0ea24c122a6a6d982 `
      axios.get(url)
      .then(res => {
        setError(false)
        setWeather(res.data)})
      .catch(e => setError(e))
      // setLocation('')
    }
  }, [latlon, location]) //aquí agrego el useState location para que cargue los datos al ingresar algo en el input
  
  const handleSubmit = (e)=> {
    e.preventDefault()
    // console.log(e.target.inputLocation.value)
    setLocation(e.target.inputLocation.value)
    setLatlon(false)
    e.target.inputLocation.value =''
  }
  
  const showCard = ()=> {return (
    <div className='content_card'>
      <h1>Weather App</h1>
      <div className='error'>
        {
          error?
          `It seems that the city does not exist, please try again!`
          :''
        }
        </div> 
      
      <form className="select-loc" action="" onSubmit={handleSubmit} >
          <input type="text" name="" id="inputLocation" />
          <button className='button'>Select location</button>
      </form>
     
      
      <WeatherCard weather = {weather} error = {error}/>
      
    </div>
    
  )}

  return (
    <div className="App">
      
        {weather?
           <div className="card"> {showCard()} </div>  
          :<Loading />
        }
            
    </div>
  )
}

export default App
