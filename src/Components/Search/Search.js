import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    // Async and Await Approach

    // const res = await fetch(
    //   `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
    //   geoApiOptions
    // );
    //   const resJson = await res.json();
    //   console.log("Result",resJson);
    //   const options = [];
    //   resJson.data.map((city) => {options.push({value: `${city.latitude} ${city.longitude}`, label: `${city.name} ${city.countryCode}`})});
    // return {
    //     options: options,
    //     hasMore: false,
    // };

    // Then Approach

    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search }
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
