"use client";
import { Dropdown } from "../Dropdown";
import { LabelTemperature } from "../LabelTemperature";
import Rain from "../../../../public/icon-rain.webp";
import { CityContext } from "@/app/context/CityContext";
import { use, useEffect, useState } from "react";
import moment from "moment";
import { StaticImageData } from "next/image";
import { toggleIcon } from "@/app/functions/toggleIcon";

export function Forecast() {
  const { cityWeather } = use(CityContext);
  const [sampleLabels, setSampleLabels] = useState<string[]>();
  const [daysTemperature, setDaysTemperature] = useState<
    { temperature: number; hour: string; icon: StaticImageData }[]
  >([]);
  useEffect(() => {
    if (cityWeather.hourly) {
      const sampleLabels = [
        ...new Set(
          cityWeather.hourly.time.map((element) => moment(element).format("L"))
        ),
      ];
      setSampleLabels(
        sampleLabels.map((element) => moment(element).format("dddd"))
      );
      const index = cityWeather.hourly.time
        .map((element) => moment(element).format("l"))
        .findIndex((element) => moment(element).isSame(sampleLabels[0]));
      console.log(index);
      const lastIndex = cityWeather.hourly.time
        .map((element) => moment(element).format("l"))
        .findLastIndex((element) => moment(element).isSame(sampleLabels[0]));
      const daysTemperatureArray = [];
      for (let i = index; i <= lastIndex; i++) {
        daysTemperatureArray.push({
          temperature: cityWeather.hourly.temperature_2m[i],
          hour: cityWeather.hourly.time[i],
          icon: toggleIcon(cityWeather.hourly.weather_code[i]),
        });
      }
      setDaysTemperature(daysTemperatureArray);
    }
  }, [cityWeather]);
  return (
    <section className="w-full h-full row-span-4 bg-[hsl(243,27%,20%)] text-white rounded-xl px-6 py-4 overflow-y-auto">
      <div className="flex items-center justify-between h-10">
        <div className="w-full">
          <h6>Hourly forescast</h6>
        </div>
        <Dropdown title="Tuesday" sampleLabels={sampleLabels} />
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        {daysTemperature.map((dt) => (
          <LabelTemperature
            key={dt.hour}
            temperature={dt.temperature.toString()}
            hour={moment(dt.hour).format("h A").toString()}
            icon={dt.icon}
          />
        ))}
      </ul>
    </section>
  );
}
