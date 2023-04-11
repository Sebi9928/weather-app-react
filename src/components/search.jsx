import { ReactSearchAutocomplete } from "react-search-autocomplete";
import React from "react";
import { useNavigate} from "react-router-dom";

const Search = () => {

  let navigation=useNavigate()

  const items = [
    {
      id: 0,
      name: "Paris",
      country: "fr",
    },
    {
      id: 1,
      name: "Guangzhou",
      country: "guangdong",
    },
    {
      id: 2,
      name: "Toronto",
      country: "on",
    },
    {
      id: 5,
      name: "Mykonos",
      country: "gr",
    },
    {
      id: 6,
      name: "Milan",
      country: "it",
    },
    {
      id: 7,
      name: "Madrid",
      country: "es",
    },
    {
      id: 8,
      name: "Stockholm",
      country: "se",
    },
    {
      id: 9,
      name: "Australia",
      country: "au",
    },
    {
      id: 10,
      name: "Honolulu",
      country: "usa",
    },
  ];



  const handleSelect=(item)=>{
navigation(`/city/${item.name},${item.country}`)

  }
  return (
    <div style={{ width: 400 }}>
      <ReactSearchAutocomplete 
      items={items}
      onSelect={handleSelect}
      
      />
    </div>
  );
};

export default Search;
