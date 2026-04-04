import {
  Drizzle,
  OverCast,
  PartyCloud,
  Rain,
  Snow,
  Storm,
  Sunny,
} from "../export/icon";

export function toggleIcon(number: number) {
  switch (true) {
    case number == 0:
      return Sunny;
    case number > 0 && number < 4:
      return PartyCloud;
    case number > 44 && number < 49:
      return OverCast;
    case number > 50 && number < 56:
      return Rain;
    case number > 60 && number < 68:
      return Drizzle;
    case number > 70 && number < 78:
      return Snow;
    case number > 94 && number < 100:
      return Storm;
    default:
      return Rain;
  }
}
