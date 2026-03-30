"use client";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import { Dropdown } from "../Dropdown";
import Units from "../../../../public/icon-units.svg";

export function Header() {
  return (
    <header className="h-40 text-white flex items-center justify-center">
      <div className="flex items-center justify-between w-[80%]">
        <Image src={Logo} alt="logo" width={200} height={200} quality={100} />
        <div className="mt-110">
          <Dropdown
            icon={Units}
            labels={[
              { label: "Temperature", title: ["celsius", "farenheit"] },
              { label: "Wind Speed", title: ["km/h", "mph"] },
              { label: "Precipitation", title: ["millimeters", "inches"] },
            ]}
            title="Units"
          />
        </div>
      </div>
    </header>
  );
}
