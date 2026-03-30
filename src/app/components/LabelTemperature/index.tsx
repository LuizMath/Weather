import Image, { StaticImageData } from "next/image";

interface LabelTemperatureProps {
  icon: StaticImageData;
  temperature: string;
  hour: string;
}

export function LabelTemperature({
  icon,
  temperature,
  hour,
}: LabelTemperatureProps) {
  return (
    <li className="p-2 rounded-xl bg-[hsl(243,23%,24%)] flex items-center justify-between">
      <div className="flex items-center">
        <Image src={icon} alt="icon" width={50} height={50} quality={100} />
        <p>{hour}</p>
      </div>
      <span className="mr-3">{temperature}°</span>
    </li>
  );
}
