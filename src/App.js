import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./components/search";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import City from "./pages/City";
import Favorites from "./pages/Favorites";

// M-am folosit de BrowserRouter pentru a crea un navbar in care am introdus
// niste link uri catre cateva orase din APi
// In interiorul navbar ului am introdus linku catre pagina destinata oraselor favorite
// pe langa asta am implementat un search bar cu autocomplete

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar">
          <Link to="/city/bucharest,ro ">
            <div className="lnk">Bucharest</div>
          </Link>
          <Link to="/city/budapest,hu ">
            <div className="lnk">Budapest</div>
          </Link>
          <Link to="/city/warsaw,pl ">
            <div className="lnk">Warsaw</div>
          </Link>
          <Link to="/city/new york,us ">
            <div className="lnk">New York</div>
          </Link>
          <Link to="/city/favorites ">
            <div className="lnk">Favorites</div>
          </Link>
          <Search className="search"></Search>
        </nav>
        <Routes>
          <Route path="/city/:cityCode" element={<City />} />
          <Route path="/city/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
