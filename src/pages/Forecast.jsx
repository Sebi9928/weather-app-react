import React, { useEffect, useState } from "react";
import { clientKey,secret } from "../Utils";
import "./Forecast.css"

// In componenta Forecast am folosit un useEffect pentru a prealua datele din Apiu pentru
// forecast, iar apoi le-am afisat utilizand un map in functie de zi


const Forecast = ({cityCode}) => {
    const [forecastData, setForecastData] = useState([]);
  
    useEffect(() => {
      const fetchForecastData = async () => {
        const response = await fetch(`https://api.aerisapi.com/forecasts/${cityCode}?format=json&client_id=${clientKey}&client_secret=${secret}`);
        const data = await response.json();
        setForecastData(data.response[0].periods.slice(1, 8)); 
      };
  
      fetchForecastData();
    }, [cityCode]);
  
  
    return (
      <div className="forecast">
          {forecastData.map((day) => (
             <div className="forecast-card">
            <div className="img-for"><img
            src={`https://cdn.aerisapi.com/wxicons/v2/${day.icon}`}
            alt={day.weather}
          /></div>
           <div className="textBox">
           <div className="textContent">
           <p className="txt-fr" key={day.dateTimeISO}>{day.dateTimeISO.slice(5, 10)}</p>
              </div>
              <p className="p-fr">{day.weather}</p>
              <p className="p-fr">{day.maxTempC}°C / {day.minTempC}°C</p>
              </div>
            </div>
            
          ))}
        </div>
    
    );
  };
  export default Forecast