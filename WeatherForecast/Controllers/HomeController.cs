using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace WeatherForecast.Controllers
{
    public class HomeController : Controller
    {
        string apiKey = "d2eea58d7dc30d90a3b7140ec154646d";
        public async Task<IActionResult> Index()
        {
           var data =  await CurrentWeather("erfurt", "json");
            return View();
        }

        public async Task<JObject> CurrentWeather(string cityName = "", string dataMode = "")
        {
            var client = new HttpClient();

            var uri = new Uri($"https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}&mode={dataMode}");

            var response = await client.GetAsync(uri);

            string result = await response.Content.ReadAsStringAsync();

            JObject jsonObject = JObject.Parse(result);

            return jsonObject;


        }
    }
}
