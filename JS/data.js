const citiesLoaded = [];

class City{
    constructor(name, condition, temperature, feelsLike, humidity, precipitation){
        this.name = name;
        this.condition = condition;
        this.temperature = temperature;
        this.feelsLike = feelsLike;
        this.humidity = humidity;
        this.precipitation = precipitation;
    }
}

export function getData(cityCode){
    const existingCity = citiesLoaded.find((city) => city.name == cityName);
    if(existingCity != undefined){
        return existingCity;
    }
    else{
        fetch('../config.json')
        .then(response => response.json())
        .then(response => response.apiKey)
        .then(apiKey => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    const data = this.responseText;
                    console.log(data);
                }
            }
            //request.open("GET", `http://dataservice.accuweather.com/locations/v1/search?q=${cityCode}&apikey=${apiKey}`, true);
            request.open("GET", 'http://localhost:8080/', true);
            request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.send();
        })
    }
}