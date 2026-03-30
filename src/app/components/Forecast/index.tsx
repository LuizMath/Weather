import { Dropdown } from "../Dropdown";
import { LabelTemperature } from "../LabelTemperature";
import Rain from "../../../../public/icon-rain.webp";

export function Forecast() {
  return (
    <section className="w-full h-full row-span-4 bg-[hsl(243,27%,20%)] text-white rounded-xl px-6 py-4 overflow-y-auto">
      <div className="flex items-center justify-between h-10">
        <div className="w-full">
          <h6>Hourly forescast</h6>
        </div>
        <Dropdown
          title="Tuesday"
          sampleLabels={[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]}
        />
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
        <LabelTemperature icon={Rain} temperature="59" hour="9 AM" />
      </ul>
    </section>
  );
}
