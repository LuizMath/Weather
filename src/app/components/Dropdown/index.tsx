"use client";
import Image from "next/image";
import Arrow from "../../../../public/icon-dropdown.svg";
import clsx from "clsx";
import CheckMark from "../../../../public/icon-checkmark.svg";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Options } from "@/app/utils/types/options";

interface DropdownProps {
  title: string;
  icon?: string;
  labels?: { label: string; title: string[] }[];
  setDayCode?: Dispatch<SetStateAction<number>>;
  sampleLabels?: string[];
}

export function Dropdown({
  title,
  labels,
  icon,
  sampleLabels,
  setDayCode,
}: DropdownProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>({
    celsius: true,
    farenheit: false,
    kmh: true,
    mph: false,
    millimeters: true,
    inches: false,
  });
  const checkOptions = (option: string) => {
    switch (option.replace(/\//g, "")) {
      case "celsius":
        return setOptions({ ...options, celsius: true, farenheit: false });
      case "farenheit":
        return setOptions({ ...options, celsius: false, farenheit: true });
      case "kmh":
        return setOptions({ ...options, kmh: true, mph: false });
      case "mph":
        return setOptions({ ...options, kmh: false, mph: true });
      case "millimeters":
        return setOptions({ ...options, millimeters: true, inches: false });
      case "inches":
        return setOptions({ ...options, millimeters: false, inches: true });
      default:
        break;
    }
  };
  return (
    <div className="w-80 flex items-end justify-end flex-col">
      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className={clsx(
          "flex items-center justify-center w-30 gap-2 text-base cursor-pointer  px-7 rounded-lg py-1.5",
          visible ? "border border-solid border-white" : "",
          sampleLabels
            ? "mt-75 bg-[hsl(243,23%,30%)]"
            : labels
            ? "bg-[hsl(243,27%,20%)]"
            : "mt-7 bg-[hsl(243,23%,30%)]"
        )}
      >
        {icon && (
          <Image src={icon} alt={icon} width={15} height={15} quality={100} />
        )}
        {title}
        <Image
          src={Arrow}
          alt="arrow"
          quality={100}
          className={clsx(visible ? "rotate-180" : "")}
        />
      </div>
      <div
        className={clsx(
          "w-50 p-2 mt-3 rounded-lg bg-[hsl(243,27%,20%)] shadow-[0px_5px_15px_rgba(0,0,0,0.35)] transition-all duration-200 ease-in flex flex-col gap-2 z-99",
          visible ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {icon && (
          <div className="py-2 px-2 w-full bg-[hsl(243,23%,30%)] rounded-lg border border-solid border-white">
            Switch to imperial
          </div>
        )}
        {labels?.map((label) => (
          <Fragment key={label.label}>
            <div>
              <span className="text-[hsl(240,6%,70%)]">{label.label}</span>
            </div>
            {label.title.map((label) => (
              <div
                onClick={() => checkOptions(label)}
                className={clsx(
                  "py-1.5 px-1.5 rounded-lg cursor-pointer flex items-center justify-between",
                  options[label.replace(/\//g, "") as keyof Options] &&
                    "bg-[hsl(243,23%,30%)]"
                )}
                key={label}
              >
                <p>{label}</p>
                {options[label.replace(/\//g, "") as keyof Options] && (
                  <Image src={CheckMark} alt="checkmark" quality={100} />
                )}
              </div>
            ))}
            {label.label != "Precipitation" && (
              <hr className="text-[hsl(243,23%,30%)]" />
            )}
          </Fragment>
        ))}
        {sampleLabels?.map((sampleLabel, i) => (
          <p
            className={clsx(
              "p-1 hover:bg-[hsl(243,23%,30%)] cursor-pointer rounded-lg",
              title === sampleLabel ? "bg-[hsl(243,23%,30%)]" : ""
            )}
            onClick={() => {
              setDayCode!(i);
              setVisible(!visible);
            }}
            key={sampleLabel}
          >
            {sampleLabel}
          </p>
        ))}
      </div>
    </div>
  );
}
