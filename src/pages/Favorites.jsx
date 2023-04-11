import React, { useEffect, useState } from "react";
import { WiStrongWind } from "react-icons/wi";
import { WiRaindrop } from "react-icons/wi";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Favorite.css"

// In componenta Favorite am folosit un useEffect pentru a prelua datele din 
// local storage si pentru a le seta in matricea useState
// Am utilizat metoda map pentru a parcurge matricea si de a afisa cate un card 
// pentru fiecare oras adaugat la favorite
// In interiorul cardului am introdus un icon care atunci cand dam click pe el cardul orasului
// respectiv este sters si local storage ul este updated 

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesData = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesData);
  }, []);

  return (
    <div className="fav">
        {favorites.map((cityData,index) => (
              <div className={cityData.hour >= 6 && cityData.hour < 8 ? "morning" :
              cityData.hour >= 20 || cityData.hour < 6 ? "night" :
              "card"}  >
              <div className="card-header"><h2>{cityData.cityName},{cityData.country}  
              <AiFillCloseCircle className="icn" onClick={() => {
            const newFavorites = [...favorites];
            newFavorites.splice(index, 1);
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
          }}/>
            <p className="time">{cityData.time}</p></h2>
              </div>
              <div className="parent">
            <div className="div1"><p>Min: {cityData.minC}°C </p></div>
            <div className="div2"><p>Max: {cityData.maxC}°C </p></div>
            <div className="div3">
              <p className="avg"> {cityData.avgC}°C </p> {cityData.weather}</div>
            <div className="div4"><p><WiStrongWind size='2.5rem'/>{cityData.wind} KM/H </p>
            <p><WiRaindrop size='2.5rem'/>{cityData.humidity} %</p>
            
            </div>
            <div className="div5"><p><img src={cityData.icon} width="75px" alt="imgg"/> </p></div>
            </div>
            
              </div>


        ))}

    </div>
  );
};

export default Favorites;