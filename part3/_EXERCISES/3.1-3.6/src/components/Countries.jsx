import { useState, useEffect } from "react";

const Countries = ({
  countries,
  handleShow,
  showOne,
  singleCountry,
  weatherInfo,
}) => {
  const count = countries.length;

  if (count > 10) {
    return (
      <>
        <h2>Too many matches, specify another filter.</h2>
      </>
    );
  }
  if (showOne == false && count <= 10 && count > 0) {
    return (
      <>
        <ul>
          {countries.map((x) => {
            return (
              <li>
                {x.name.common}{" "}
                <button
                  onClick={handleShow}
                  className="showBtn"
                  data-name={x.name.common}
                >
                  Show
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  if (showOne == true && Object.keys(weatherInfo).length != 0) {
    return (
      <>
        <section className="singleCountry">
          <div className="btnContainer">
            <button onClick={handleShow}>Show all countries</button>
          </div>
          <h1>{singleCountry[0].name.common}</h1>
          <h2>
            Capital: <span className="infoBit">{singleCountry[0].capital}</span>
          </h2>
          <h2>
            Area: <span className="infoBit">{singleCountry[0].area} sq ft</span>
          </h2>
          <h2 className="lang">Languages:</h2>
          <ul>
            {Object.keys(singleCountry[0].languages).map(function (key) {
              return (
                <li className="infoBitList">
                  {singleCountry[0].languages[key]}
                </li>
              );
            })}
          </ul>
          <h2>Weather in {singleCountry[0].capital}</h2>
          <h4>
            Temperature: {Math.round(weatherInfo.main.temp - 273.15)} Celsius
          </h4>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          />
        </section>
      </>
    );
  }
  if (count == 0) {
    return (
      <>
        <h2>No matches! Try another search!</h2>
      </>
    );
  }
};

export default Countries;
