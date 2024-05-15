import { useState,useEffect} from 'react'
import './App.css'
function App() {
  const [meteo,setMeteo] = useState({})
  const [isReady, setReady] = useState(false)
    useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=12.5833&lon=-16.2719&appid=e2d3b06e77222672eec505121b10c154&units=metric ')
    .then(result => result.json())
    .then(jsonresult => {
    meteo.city = jsonresult.name 
    meteo.temp = jsonresult.main.temp
    meteo.main  = jsonresult.weather[0].main
    meteo.desc = jsonresult.weather[0].description
    meteo.icon = jsonresult.weather[0].icon
    meteo.sunrise = jsonresult.sys.sunrise
    meteo.sunset = jsonresult.sys.sunset
    meteo.longitude = jsonresult.coord.lon
    meteo.latitude = jsonresult.coord.lat
    meteo.theme = jsonresult.main.temp < 15 ? "App theme-froid" : jsonresult.main.temp > 25 ? "App theme-chaud" : "App theme-normal"
    setMeteo({...meteo})
    setReady(true)
    })
    .catch(err => console.error(err))
    }, [])
    if (isReady) {
      return (<>
        <section>
          <h1 >My Weather App</h1>
            <div className={meteo.theme}>
              <p><span>city</span> <span>{meteo.city}</span></p>
              <p><span>Temperature</span> <span>{meteo.temp} °C</span></p>
              <p><span>main</span> <span>{meteo.main}</span></p>
              <p><span>Description</span><span>{meteo.desc}</span></p>
              <p><span>illustration</span></p>
              <img src={`http://openweathermap.org/img/wn/${meteo.icon}@2x.png`} alt="Weather icon"/>
              <p><span>sunrise</span><span>{meteo.sunrise}</span></p>
              <p><span>sunset</span><span>{meteo.sunset}</span></p>
              </div>
        </section>
        <section>
          <h1 >Put coordinates</h1>
          <form>
            <div>
              <label htmlFor="longitude">Longitude</label>
              <input type="text" id="longitude" value={meteo.longitude}/>
            </div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input type="text" id="latitude" value={meteo.latitude}/>
            </div>
          </form>
        </section>
      </>)
    } else {
      return <div>Loading...</div>
    }
}

export default App
