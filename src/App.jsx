import React, { useState, useEffect, useCallback } from 'react'
import Current from "./components/Current";
import Navbar from "./components/Navbar";
import Daily from "./components/Daily";
import { debounce } from "lodash"

function App() {
  const [city, setCity] = useState(JSON.parse(localStorage.getItem("defaultCity")))
  const [weather, setWeather] = useState(JSON.parse(localStorage.getItem(`${JSON.parse(localStorage.getItem("defaultCity"))}Weather`)))
  const [screenWidth, setScreenWidth] = useState(document.body.clientWidth)

  useEffect(() => {
    async function getWeather(city) {
      let coordsData = JSON.parse(localStorage.getItem(`${capitalise(city)}Coords`)) || ""
      if (coordsData === ""){
        const coordsResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
        coordsData = await coordsResponse.json()
        localStorage.setItem(`${capitalise(city)}Coords`, JSON.stringify(coordsData))
      }
      const { lat , lon } = coordsData[0]
  
      let weatherData = JSON.parse(localStorage.getItem(`${capitalise(city)}Weather`)) || ""
      if (weatherData === "" || weatherData.current.dt*1000 + 1000*60*5 < Date.now()){
        console.log('Fetching weather - out of date')
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`)
        weatherData = await weatherResponse.json()
        localStorage.setItem(`${capitalise(city)}Weather`, JSON.stringify(weatherData))
      }
  
      setWeather(weatherData)
    }

    getWeather(city)
  }, [city])

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(document.body.clientWidth));
  }, []);

  const APIKey = "30c3e6ac5e44b312b04c4ccf20184f89"

  function capitalise(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  
  function handleSearch(e){
    if (e.key === 'Enter'){
      setCity(capitalise(e.target.value))
      e.target.value = ""
    }
  }

  window.addEventListener("resize", () => 
      {debounce(() => setScreenWidth(screen.width), 20)}
    )

  return (
    <div>
      <Navbar handleSearch={handleSearch} city={city}/>
      <Current current={weather.current}/>
      <Daily current={weather.current} daily={weather.daily} screenWidth={screenWidth} />

    </div>
  );
}

export default App;
