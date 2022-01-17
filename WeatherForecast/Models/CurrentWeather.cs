using System;

namespace WeatherForecast.Models
{
    public class CurrentWeather
    {
        public int CityId { get; set; }
        public int CityName { get; set; }
        public int CurrentTemperature { get; set; }
        public int MinimumTemperatur { get; set; }
        public int MaximumTemperature { get; set; }
        public int AirPressure { get; set; }
        public int Humidity { get; set; }
        public int WindSpeed { get; set; }
        public int WindDirection { get; set; }
        public int CloudCoverCondition { get; set; }
    }
}
