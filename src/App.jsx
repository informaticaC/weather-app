import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios, { AxiosError, isAxiosError } from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading  from "./components/Loading";

function App() {
  const [latlon, setLatlon] = useState() //usado para geolocation
  const [location, setLocation] = useState('') //usado para el ingreso manual de la localidad
  const [weather, setWeather] = useState()

  useEffect(() => {
    const success = (pos) => {
      // console.log(pos.cords)
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setLatlon(obj)
    }
    const error = (err) => {
      console.log(err)
    }
    navigator.geolocation.getCurrentPosition(success, error )
  }, [])

  useEffect(() =>{
    if(latlon){
      const apikey = 'f054e09ba76d80b0ea24c122a6a6d982'
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`
      //const url = `https://api.openweathermap.org/data/2.5/weather?q=Crespo,ar&APPID=f054e09ba76d80b0ea24c122a6a6d982 `

      axios.get(url)
      .then(res => setWeather(res.data) )
    }else if(location){
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=f054e09ba76d80b0ea24c122a6a6d982 `
      axios.get(url)
      .then(res => setWeather(res.data))
      // setLocation('')
    }
  }, [latlon, location])
  


  const handleSubmit = (e)=> {
    e.preventDefault()
    console.log(e.target.inputLocation.value)
    setLocation(e.target.inputLocation.value)
    setLatlon(false)
    e.target.inputLocation.value =''
  }
  
  const showCard = ()=> {return (
    <div>
      <h1>Weather App</h1>
      <div className="select-input">
        <form action="" onSubmit={handleSubmit} >
          <input type="text" name="" id="inputLocation" />
          <button>Select location</button>
        </form>
      </div>
      <WeatherCard weather = {weather}/>
    </div>
  )}

  return (
    <div className="App">
      
      {weather?
         showCard() 
        :<Loading />
      }
      
    </div>
  )
}

export default App
