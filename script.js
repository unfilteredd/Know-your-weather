document.addEventListener('DOMContentLoaded' , ()=> {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-messag");


    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; 

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) return;
        
        
        try {
            const weatherData =  await fetchWeatherData(city)
            displayWeatherData(weatherData);
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; 
      const response =  await fetch(url);
      console.log(typeof response);
      console.log("RESPONSE", response);

      if(!response.ok){
        throw new Error("City Not Found");
      }
      const data =  await response.json()
      return data
    }

    function displayWeatherData(data) {
       console.log(data);
       const {name, main, weather} = data;
       cityNameDisplay.textContent =  name;
       temperatureDisplay.textContent = `Temperature : ${main.temp}`
       descriptionDisplay.textContent = `Description : ${weather[0].description}`

       weatherInfo.classList.remove('hidden');
       errorMessage.classList.add('hidden');
       temperatureDisplay.textContent = `Temperature : ${main.temp}`
       descriptionDisplay.textContent = `Description : ${weather[0].description}`

    };

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
    

})