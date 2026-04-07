import { MainTitle } from "./components/MainTitle";
import { Input } from "./components/Input";
import { MainWeatherArea } from "./components/MainWeatherArea";

export default async function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <MainTitle />
      <Input />
      <MainWeatherArea />
    </div>
  );
}
