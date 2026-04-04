"use client";
import { Card } from "../Card";
import { DailyForecastCard } from "../DailyForecast";
import { Forecast } from "../Forecast";
import { use, useEffect, useState } from "react";
import { CityContext } from "@/app/context/CityContext";
import moment from "moment";
import { toggleIcon } from "@/app/functions/toggleIcon";
import Image, { StaticImageData } from "next/image";
import { Sunny } from "@/app/export/icon";

export function MainWeatherArea() {
  const { city, cityWeather } = use(CityContext);
  const [dayTempMinMax, setDayTempMinMax] =
    useState<
      { tempMin: number; tempMax: number; day: string; icon: StaticImageData }[]
    >();
  useEffect(() => {
    if (cityWeather.daily) {
      const dayTempMinMax = [];
      for (let i = 0; i <= 6; i++) {
        dayTempMinMax.push({
          tempMin: Math.floor(cityWeather.daily.temperature_2m_min[i]),
          tempMax: Math.ceil(cityWeather.daily.temperature_2m_max[i]),
          icon: toggleIcon(
            cityWeather.daily.weather_code[i]
          ) as StaticImageData,
          day: moment(cityWeather.daily.time[i]).format("ddd"),
        });
      }
      setDayTempMinMax(dayTempMinMax);
    }
  }, [cityWeather]);
  return (
    <section className="w-[80%] h-170 grid grid-cols-[2fr_1fr] grid-rows-[auto_auto] mt-10 mb-30">
      <div className="bg-desktop bg-no-repeat h-74 bg-cover rounded-xl w-[95%] bg-center flex items-center justify-between p-10 text-white">
        <div className="flex items-start flex-col gap-3">
          <span className="font-dm font-bold text-3xl">
            {city !== undefined
              ? `${city.name}, ${city.country}`
              : "Berlin, Germany"}
          </span>
          <p className="font-dm font-light text-xl">
            {cityWeather.daily !== undefined
              ? `${moment(cityWeather.daily.time[0]).format("dddd")}, ${moment(
                  cityWeather.daily.time[0]
                ).format("ll")}`
              : "Tuesday, Aug 5, 2025"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-6">
          <Image
            width={100}
            height={100}
            src={
              cityWeather.daily
                ? toggleIcon(cityWeather.daily.weather_code[0])
                : Sunny
            }
            alt="icon"
          />
          <span className="italic font-dm text-8xl">
            {cityWeather.daily !== undefined
              ? cityWeather.daily.temperature_2m_mean[0]
              : "60"}
            °
          </span>
        </div>
      </div>
      <Forecast />
      <div className="w-[95%] flex justify-between gap-2 mt-5">
        <Card title="Feels Like" information="64" />
        <Card title="Humidity" information="46%" />
        <Card title="Wind" information="9 mph" />
        <Card title="Precipitation" information="0 in" />
      </div>
      <div className="mt-10">
        <p className="text-white font-semibold">Daily forecast</p>
      </div>
      <div className="w-[95%] text-white col-start-1 col-end-2 flex justify-between flex-row gap-3 mt-7">
        {dayTempMinMax?.map((dtm) => (
          <DailyForecastCard
            key={dtm.day}
            temperatures={[`${dtm.tempMax}`, `${dtm.tempMin}`]}
            day={dtm.day}
            icon={dtm.icon}
          />
        ))}
      </div>
    </section>
  );
}
