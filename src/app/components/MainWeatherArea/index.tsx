import { Card } from "../Card";
import { DailyForecastCard } from "../DailyForecast";
import { Forecast } from "../Forecast";
import Rain from "../../../../public/icon-rain.webp";

export function MainWeatherArea() {
  return (
    <section className="w-[80%] h-170 grid grid-cols-[2fr_1fr] grid-rows-[auto_auto] mt-10 mb-30">
      <div className="bg-desktop bg-no-repeat h-74 bg-cover rounded-xl w-[95%] bg-center flex items-center justify-between p-10 text-white">
        <div className="flex items-start flex-col gap-3">
          <span className="font-dm font-bold text-3xl">Berlin, Germany</span>
          <p className="font-dm font-light text-xl">Tuesday, Aug 5, 2025</p>
        </div>
        <span className="italic font-dm text-8xl">60°</span>
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
        <DailyForecastCard icon={Rain} temperatures={["20", "10"]} day="Tue" />
        <DailyForecastCard icon={Rain} temperatures={["20", "10"]} day="Wed" />
        <DailyForecastCard icon={Rain} temperatures={["20", "10"]} day="Thu" />
        <DailyForecastCard icon={Rain} temperatures={["20", "10"]} day="Fri" />
        <DailyForecastCard icon={Rain} temperatures={["20", "10"]} day="Sat" />
        <DailyForecastCard icon={Rain} temperatures={["20", "10"]} day="Sun" />
        <DailyForecastCard icon={Rain} temperatures={["20", "10"]} day="Mon" />
      </div>
    </section>
  );
}
