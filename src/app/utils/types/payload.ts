export interface Payload {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_mean: number[];
    temperature_2m_min: number[];
    time: string[];
    weather_code: number[];
    wind_speed_10m_max: number[];
  };
  hourly: {
    time: string[];
    relative_humidity_2m: number[];
    temperature_2m: number[];
    precipitation: number[];
    weather_code: number[];
  };
}
