import Image, { StaticImageData } from "next/image";

interface DailyForecastProps {
  day: string;
  icon: StaticImageData;
  temperatures: string[];
}
export function DailyForecastCard({
  day,
  icon,
  temperatures,
}: DailyForecastProps) {
  return (
    <article className="w-25 h-40 bg-[hsl(243,27%,20%)] rounded-xl p-3 flex flex-col items-center justify-between">
      <div>
        <p>{day}</p>
      </div>
      <div>
        <Image src={icon} alt="icon" width={50} height={50} quality={50} />
      </div>
      <div className="w-full flex flex-row justify-between">
        {temperatures.map((temp) => (
          <p key={temp}>{temp}°</p>
        ))}
      </div>
    </article>
  );
}
