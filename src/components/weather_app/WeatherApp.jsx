import React, { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import { FiSearch } from "react-icons/fi";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");
  const [bgImage, setBgImage] = useState(null);

  const handleOnChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const search = async () => {
    const openWeatherMapApiKey = "9be78cbc916d954af2d9b21cbea83fc3";
    const unsplashAccessKey = "odE4KxFXEPZsGXJaf0IIkrwmXIn1oXGW7ZXKxU_kfcU";

    // Fetch weather data
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${openWeatherMapApiKey}`;

    try {
      let response = await fetch(weatherUrl);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        setError("");

        // Fetch city photo using Unsplash API
        const unsplashResponse = await fetch(
          `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashAccessKey}`
        );
        const unsplashData = await unsplashResponse.json();

        if (unsplashResponse.ok) {
          const photoUrl = unsplashData.urls.regular;
          setBgImage(photoUrl);
        } else {
          console.error("Error fetching Unsplash photo:", unsplashData.errors);
        }
      } else {
        setError("No data found. Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <div
      className="min-h-screen min-w-screen flex items-center justify-center" style={{ backgroundImage: `url('${bgImage}')`, backgroundSize: "cover" }}
    >
      <div className="w-100 max-w-screen-md p-6 rounded-lg border-2 border-white shadow-lg bg-opacity-90 bg-indigo-800">
        <div className="relative mx-auto text-gray-200 mb-5">
          <input
            type="search"
            value={city}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown} 
            placeholder="Search here"
            className="CityInput border-2 border-gray-300 bg-white w-full h-12 px-5 pl-5 pr-16 rounded-full text-gray-800 focus:outline-none focus:border-indigo-500 transition duration-300"
          />
          <button
            type="button"
            onClick={() => search()}
            className="absolute right-0 top-0 mt-2 mr-5 mt-0 text-gray-200 cursor-pointer"
          >
            <FiSearch size={30}/>
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="icon mr-2">
            <WiDaySunny size={"10em"} className="text-yellow-300" />
          </div>
          <div className="temp text-5xl font-bold text-white transition duration-500">
            {weather?.main?.temp}°C
          </div>
        </div>
        <div className="text-center text-lg font-semibold mb-4 text-red-300">{error}</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="element w-full md:w-40 bg-black bg-opacity-50 p-4 rounded-lg md:mb-0 text-white">
            <div className="humidity-percentage text-xl font-bold">
              {weather?.main?.humidity}%
            </div>
            <div className="text">Humidity</div>
          </div>
          <div className="element w-full md:w-40 bg-black bg-opacity-50 p-4 rounded-lg text-white">
            <div className="wind-rate text-xl font-bold">{weather?.wind?.speed}km/h</div>
            <div className="text">Wind Speed</div>
          </div>
          <div className="element w-full md:w-40 bg-black bg-opacity-50 p-4 rounded-lg text-white">
            <div className="wind-rate text-xl font-bold">{weather?.main?.feels_like}</div>
            <div className="text">Feels like</div>
          </div>
          <div className="element w-full md:w-40 bg-black bg-opacity-50 p-4 rounded-lg text-white">
            <div className="wind-rate text-xl font-bold">{weather?.main?.pressure}</div>
            <div className="text">Pressure</div>
          </div>
        </div>
      </div>
    </div>
  );
}
