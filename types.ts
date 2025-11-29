export interface Activity {
  time: string;
  title: string;
  description: string;
  emoji: string;
}

export interface WeatherInfo {
  temp: string; // e.g., "12°C / 5°C"
  condition: string; // e.g., "Sunny", "Cloudy"
  icon: 'sun' | 'cloud' | 'rain' | 'cloud-sun';
}

export interface DayPlan {
  day: number;
  date: string; // e.g., "12-07"
  weather: WeatherInfo;
  theme: string;
  transportation: string;
  shopping: string[];
  schedule: Activity[];
}

export interface TripData {
  title: string;
  summary: string;
  days: DayPlan[];
}