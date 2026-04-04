"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Payload } from "../utils/types/payload";
import { City } from "../utils/types/city";

interface Props {
  children: ReactNode;
}

interface CityContext {
  city: City | undefined;
  setCity: Dispatch<SetStateAction<City | undefined>>;
  cityWeather: Payload;
  setCityWeather: Dispatch<SetStateAction<Payload>>;
}

export const CityContext = createContext({} as CityContext);

export const CityContextProvider = ({ children }: Props) => {
  const [cityWeather, setCityWeather] = useState<Payload>({} as Payload);
  const [city, setCity] = useState<City>();
  return (
    <CityContext.Provider
      value={{ cityWeather, setCityWeather, city, setCity }}
    >
      {children}
    </CityContext.Provider>
  );
};
