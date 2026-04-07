import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

interface LabelTemperatureProps {
  icon?: StaticImageData;
  temperature?: string;
  hour?: string;
}

export function LabelTemperature({
  icon,
  temperature,
  hour,
}: LabelTemperatureProps) {
  return (
    <li
      className={clsx(
        "p-2 rounded-xl bg-[hsl(243,23%,24%)] flex items-center justify-between",
        !icon && !temperature && !hour && "p-8"
      )}
    >
      <div className="flex items-center">
        {icon && (
          <Image src={icon} alt="icon" width={50} height={50} quality={100} />
        )}
        <p>{hour}</p>
      </div>
      {temperature && <span className="mr-3">{temperature}°</span>}
    </li>
  );
}
