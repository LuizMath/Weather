"use client";
import Image from "next/image";
import Search from "../../../../public/icon-search.svg";
import {
  ChangeEvent,
  SyntheticEvent,
  use,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import clsx from "clsx";
import { City } from "@/app/utils/types/city";
import { CityContext } from "@/app/context/CityContext";
import moment from "moment";

async function getCityName(name: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`;
  const response = await fetch(url);
  return response.json();
}

async function getWeatherForecast(city: City) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude.toPrecision(
    4
  )}&longitude=${city.longitude.toPrecision(
    4
  )}&daily=weather_code,temperature_2m_mean,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&timezone=America%2FSao_Paulo`;
  const response = await fetch(url);
  return response.json();
}

export function Input() {
  const { setCity, setCityWeather } = use(CityContext);
  const [focus, setFocus] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [country, setCountry] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const cities = await getCityName(country);
      setCities(cities.results);
      console.log(cities.results);
      if (!visible) {
        setVisible(!visible);
      }
    });
  };
  const getCityParams = async (city: City) => {
    const cityPromise = await getWeatherForecast(city);
    console.log(cityPromise);
    setCityWeather(cityPromise);
    if (country === "") return;
    setVisible(!visible);
  };
  useEffect(() => {
    getCityParams({
      name: "Berlin",
      latitude: 52.52,
      longitude: 13.41,
      country: "Germany",
    });
  }, []);
  return (
    <div className="mt-15 max-w-185 w-full flex items-start justify-center flex-col relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center text-white gap-3 w-full"
      >
        <div
          className={clsx(
            "px-5 py-3 w-[85%] focus:border focus:border-white bg-[hsl(243,23%,24%)] rounded-lg flex items-center gap-4",
            focus ? "border border-white" : ""
          )}
        >
          <Image src={Search} alt="search" />
          <input
            type="text"
            placeholder="Search for a place..."
            className="outline-none w-full placeholder:text-white"
            onFocus={(e) => setFocus(true)}
            onBlur={(e) => setFocus(false)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCountry(e.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className="px-5 w-[15%] py-2.5 cursor-pointer bg-[hsl(233,67%,56%)] rounded-xl text-2xl"
        >
          Search
        </button>
      </form>
      <div
        className={clsx(
          "w-[83.5%] rounded-lg p-3 z-99 h-45 absolute top-15 bg-[hsl(243,23%,24%)] overflow-y-auto",
          visible ? "visible" : "invisible"
        )}
      >
        <ul className="flex items-center gap-3 flex-col">
          {cities.map((city) => (
            <li
              key={city.longitude}
              onClick={() => {
                getCityParams(city);
                setCity(city);
              }}
              className="bg-[hsl(243,23%,30%)] p-2 text-white rounded-lg w-full cursor-pointer"
            >
              {city.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
