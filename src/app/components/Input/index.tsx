"use client";
import Image from "next/image";
import Search from "../../../../public/icon-search.svg";
import {
  ChangeEvent,
  SyntheticEvent,
  useActionState,
  useState,
  useTransition,
} from "react";
import clsx from "clsx";

async function getCityName(name: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`;
  const response = await fetch(url);
  console.log(await response.json());
}

export function Input() {
  const [focus, setFocus] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await getCityName(country);
    });
  };
  return (
    <div className="mt-15 max-w-185 w-full flex items-start justify-center flex-col relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center text-white gap-3 w-full"
      >
        <div
          className={clsx(
            "px-5 py-3 w-[85%] focus:border focus:border-white bg-[hsl(243,23%,24%)] rounded-lg flex items-center gap-4",
            focus ? "border border-white" : ""
          )}
        >
          <Image src={Search} alt="search" />
          <input
            type="text"
            placeholder="Search for a place..."
            className="outline-none w-full placeholder:text-white"
            onFocus={(e) => setFocus(true)}
            onBlur={(e) => setFocus(false)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCountry(e.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className="px-5 w-[15%] py-2.5 cursor-pointer bg-[hsl(233,67%,56%)] rounded-xl text-2xl"
        >
          Search
        </button>
      </form>
      <div className="w-[83.5%] rounded-lg p-3 z-99 h-45 absolute top-15 bg-[hsl(243,23%,24%)]">
        <ul className="">
          <li className="bg-[hsl(243,23%,30%)] p-2 text-white rounded-lg">
            Country
          </li>
        </ul>
      </div>
    </div>
  );
}
