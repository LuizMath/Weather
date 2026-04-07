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
import { ThreeDot } from "react-loading-indicators";
import clsx from "clsx";
export function MainWeatherArea() {
  const { city, cityWeather } = use(CityContext);
  const [dayTempMinMax, setDayTempMinMax] =
    useState<
      { tempMin: number; tempMax: number; day: string; icon: StaticImageData }[]
    >();
  const [weatherInformations, setWeatherInformations] = useState<{
    precipitation: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
  }>();
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
    if (cityWeather.hourly) {
      const currentHour = moment().startOf("hour").format("YYYY-MM-DDTHH:00");
      const i = cityWeather.hourly.time.findIndex((element) =>
        moment(element).isSame(currentHour)
      );
      setWeatherInformations({
        feelsLike: cityWeather.hourly.apparent_temperature[i],
        precipitation: cityWeather.hourly.precipitation[i],
        windSpeed: cityWeather.hourly.wind_speed_10m[i],
        humidity: cityWeather.hourly.relative_humidity_2m[i],
      });
    }
  }, [cityWeather]);
  return (
    <section className="w-[80%] h-170 bg-slate-500 max-[1362px]:h-250 grid grid-cols-[2fr_1fr] grid-rows-[auto_auto] mt-10 mb-30 max-[1362px]:grid-cols-[1fr] justify-items-center">
      <div
        className={clsx(
          "bg-no-repeat h-74 bg-cover rounded-xl w-[95%] bg-center flex items-center justify-between p-10 text-white",
          cityWeather.daily ? "bg-desktop" : "bg-[hsl(243,27%,20%)]"
        )}
      >
        {cityWeather.daily ? (
          <>
            {" "}
            <div className="flex items-start flex-col gap-3">
              <span className="font-dm font-bold text-3xl">
                {city !== undefined
                  ? `${city.name}, ${city.country}`
                  : "Berlin, Germany"}
              </span>
              <p className="font-dm font-light text-xl">
                {cityWeather.daily !== undefined
                  ? `${moment(cityWeather.daily.time[0]).format(
                      "dddd"
                    )}, ${moment(cityWeather.daily.time[0]).format("ll")}`
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
          </>
        ) : (
          <div className="w-full flex items-center justify-center flex-col">
            <ThreeDot color="hsl(240,6%,70%)" size="small" />
            <h6 className="text-[hsl(240,6%,70%)]">Loading...</h6>
          </div>
        )}
      </div>
      <Forecast />
      <div className="w-[95%] flex justify-between flex-wrap gap-2 mt-5 bg-slate-700">
        <Card
          title="Feels Like"
          information={`${
            cityWeather && weatherInformations
              ? `${
                  weatherInformations &&
                  Math.floor(weatherInformations.feelsLike)
                }${
                  cityWeather.hourly_units &&
                  cityWeather.hourly_units.apparent_temperature.replace(
                    /[a-zA-Z]/g,
                    ""
                  )
                }`
              : "-"
          }`}
        />
        <Card
          title="Humidity"
          information={`${
            cityWeather && weatherInformations
              ? `${weatherInformations && weatherInformations.humidity}${
                  cityWeather.hourly_units &&
                  cityWeather.hourly_units.relative_humidity_2m
                }`
              : "-"
          }`}
        />
        <Card
          title="Wind"
          information={`${
            cityWeather && weatherInformations
              ? `${
                  weatherInformations &&
                  Math.floor(weatherInformations.windSpeed)
                } ${
                  cityWeather.hourly_units &&
                  cityWeather.hourly_units.wind_speed_10m
                }`
              : "-"
          }`}
        />
        <Card
          title="Precipitation"
          information={`${
            cityWeather && weatherInformations
              ? `${weatherInformations && weatherInformations.precipitation} ${
                  cityWeather.hourly_units &&
                  cityWeather.hourly_units.precipitation
                }`
              : "-"
          }`}
        />
      </div>
      <div className="mt-10 w-[95%]">
        <p className="text-white font-semibold">Daily forecast</p>
      </div>
      <div className="w-[95%] max-[1362px]:grid max-[1362px]:grid-cols-[repeat(auto-fit,100px)] justify-stretch text-white min-[1362px]:col-start-1 min-[1362px]:col-end-2 gap-3 mt-7">
        {dayTempMinMax ? (
          dayTempMinMax.map((dtm) => (
            <DailyForecastCard
              key={dtm.day}
              temperatures={[`${dtm.tempMax}`, `${dtm.tempMin}`]}
              day={dtm.day}
              icon={dtm.icon}
            />
          ))
        ) : (
          <>
            {Array.from({ length: 7 }).map((_, index) => (
              <DailyForecastCard key={index} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
