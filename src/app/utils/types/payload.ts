export interface Payload {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_mean: number[];
    temperature_2m_min: number[];
    time: string[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    relative_humidity_2m: number[];
    temperature_2m: number[];
    precipitation: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    apparent_temperature: number[];
  };
  hourly_units: {
    precipitation: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    apparent_temperature: string;
  };
}
