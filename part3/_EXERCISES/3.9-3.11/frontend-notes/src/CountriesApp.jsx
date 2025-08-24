// // NOTES CODE
import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import { getCountries, getWeather } from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showOne, setShowOne] = useState(false);
  const [singleCountry, setSingleCountry] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});

  // Getting all the countries from the database
  useEffect(() => {
    getCountries().then((countries) => {
      setCountries(countries);
      console.log(countries);
    });
  }, []);

  useEffect(() => {
    if (showOne === true) {
      getWeather(
        singleCountry[0].capitalInfo.latlng[0],
        singleCountry[0].capitalInfo.latlng[1]
      )
        .then((weather) => {
          setWeatherInfo({ ...weather });
          console.log(weather);
        })
        .catch((error) => console.log(error));
    }
  }, [showOne]);

  // Hanlde input to the search
  const handleSearch = (e) => {
    setShowOne(false);
    setSearch(e.target.value.toLowerCase());
    let searchList = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .match(e.target.value.toLowerCase());
    });
    setSearchedCountries(searchList);
  };

  const handleShow = (e) => {
    e.preventDefault;
    if (showOne == false) {
      setShowOne(true);
      setSingleCountry([
        ...countries.filter((x) => x.name.common == e.target.dataset.name),
      ]);
    } else {
      setShowOne(false);
    }
  };

  console.log(searchedCountries.length);

  return (
    <>
      <section>
        find countries:&nbsp;
        <input value={search} onChange={handleSearch} />
        {search && (
          <Countries
            countries={searchedCountries}
            handleShow={handleShow}
            showOne={showOne}
            singleCountry={singleCountry}
            weatherInfo={weatherInfo}
          ></Countries>
        )}
      </section>
    </>
  );
};

export default App;
