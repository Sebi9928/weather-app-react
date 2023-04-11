import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clientKey,secret } from "../Utils";
import "./City.css"
import { WiStrongWind } from "react-icons/wi";
import { WiRaindrop } from "react-icons/wi";
import { AiFillHeart } from "react-icons/ai";
import Forecast from "./Forecast";

// M am folosit de functia async pentru a prelua datele si informatiile despre
// vremea din fiecare oras din API, cheia fiind cityCode, iar clientKeyu si secret se regasesc
// in Utils.js cu ajutorul carora am putut accesa si prelua datele din API


const City = () => {
const {cityCode}=useParams();
const[cityName,setCityName]=useState('')
const [weatherData,setWeatherData]=useState({})
const[minC,setMinC]=useState(0)
const[maxC,setMaxC]=useState(0)
const[avgC,setTempCurenta]=useState(0)
const[weather,setWeather]=useState(0)
const[icon,setIcon]=useState(0)
const[humidity,setHumidity]=useState(0)
const[wind,setWind]=useState(0)
const[country,setCountry]=useState('')
const[time,setLocalTime]=useState('')
const [favorites, setFavorites] = useState([]);

const getWeatherData=async()=>{
  const response=await fetch(`https://api.aerisapi.com/conditions/summary/${cityCode}?format=json&client_id=${clientKey}&client_secret=${secret}`)
  let data=await response.json()
  setWeatherData(data)
  setMinC(data.response[0].periods[0].temp.minC)
  setMaxC(data.response[0].periods[0].temp.maxC)
  setTempCurenta(data.response[0].periods[0].temp.avgC)
  setWeather(data.response[0].periods[0].weather.primary) 
  setIcon("https://cdn.aerisapi.com/wxicons/v2/"+data.response[0].periods[0].weather.icon)
  setHumidity(data.response[0].periods[0].humidity.avg)
  setWind(data.response[0].periods[0].windSpeed.avgKPH)
  setCountry(data.response[0].place.country.toUpperCase())

//  Mai jos am formatat ora pentru a se putea afisa cu 2-digits la ora si 
//  2-digits la minute in format en-GB

  let timeZones=data.response[0].profile.tz
  const options={
    hour: '2-digit',
    minute: '2-digit',
    timeZone: `${timeZones}`
  }
  let dateToday=new Date().toLocaleString('en-GB',options)
  setLocalTime(dateToday)


  
  console.log(data)
}

const hour = parseInt(time.split(":")[0]);

//Cu ajutorul useEffect ului se face call la functia getWeatherData si seteaza
//city name ul in functie de codul acestuia 

useEffect(()=>{
  getWeatherData()
let cityEdit=cityCode.split(",")[0].charAt(0).toUpperCase()+
cityCode.split(",")[0].slice(1)
setCityName(cityEdit)

},[cityCode]
)



const handleAddFavorite = () => {

  // Aceasta este functia care atunci cand dam click pe iconita preia datele din cardul 
  // respectiv si apoi vor fi trimise si afisate in pagina Favorites


  const cityData = {
    hour,
    time,
    cityName,
    country,
    minC,
    maxC,
    avgC,
    weather,
    icon,
    humidity,
    wind,
  };

  //Preia orasele existente din local storage
  const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Verifica daca orasul respectiv este deja in favorites
  const isAlreadyFavorite = existingFavorites.some((city) => city.cityName === cityName);

  // Adauga orasul respectiv la favorite dupa ce s-a verificat daca nu a fost introdus deja
  if (!isAlreadyFavorite) {
    const updatedFavorites = [...existingFavorites, cityData];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }


}



  return(
    
  <div>
  <div className={ hour >= 6 && hour < 8 ? "morning" :
  hour >= 19 || hour < 6 ? "night" :
  "card"}  >
  <div className="card-header"><h2>{cityName},{country}   
<p className="time">{time}</p></h2>
<div><AiFillHeart className="icn" onClick={handleAddFavorite}/> </div> 

  </div>
 
  <div className="parent">
<div className="div1"><p>Min: {minC}°C </p></div>
<div className="div2"><p>Max: {maxC}°C </p></div>
<div className="div3">
  <p className="avg"> {avgC}°C </p> {weather}</div>
<div className="div4"><p><WiStrongWind size='2.5rem'/>{wind} KM/H </p>
<p><WiRaindrop size='2.5rem'/>{humidity} %</p>

</div>
<div className="div5"><p><img src={icon} width="75px" alt="imgg"/> </p></div>
</div>

  </div>
  <div>
  <Forecast cityCode={cityCode} />
  </div>
 
  </div>


  )}

export default City;
