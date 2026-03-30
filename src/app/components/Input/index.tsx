"use client";
import Image from "next/image";
import Search from "../../../../public/icon-search.svg";
import {
  ChangeEvent,
  SyntheticEvent,
  useActionState,
  useState,
  useTransition,
} from "react";
import clsx from "clsx";
import { City } from "@/app/utils/types/city";

async function getCityName(name: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`;
  const response = await fetch(url);
  return response.json();
}

async function getWeatherForecast(city: City) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude.toPrecision(4)}&longitude=${city.longitude.toPrecision(4)}&daily=temperature_2m_mean,wind_speed_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,precipitation`;
  const response = await fetch(url);
  return response.json();
}

export function Input() {
  const [focus, setFocus] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<City>();
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const cities = await getCityName(country);
      setCities(cities.results);
      console.log(cities.results);
      setVisible(!visible);
    });
  };
  const getCityParams = async (city: City) => {
    const cityPromise = await getWeatherForecast(city);
    console.log(cityPromise);
    setCity(cityPromise);
    setVisible(!visible);
  };
  return (
    <div className="mt-15 max-w-185 w-full flex items-start justify-center flex-col relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center text-white gap-3 w-full"
      >
        <div
          className={clsx(
            "px-5 py-3 w-[85%] focus:border focus:border-white bg-[hsl(243,23%,24%)] rounded-lg flex items-center gap-4",
            focus ? "border border-white" : "",
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
          visible ? "visible" : "invisible",
        )}
      >
        <ul className="flex items-center gap-3 flex-col">
          {cities.map((city) => (
            <li
              key={city.longitude}
              onClick={() => getCityParams(city)}
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
