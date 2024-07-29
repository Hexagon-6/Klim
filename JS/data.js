const citiesLoaded = [];

class City{
    constructor(code, condition, temperature, feelsLike, humidity, precipitation, etc){
        this.code = code;
        this.condition = condition;
        this.temperature = temperature;
        this.feelsLike = feelsLike;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.etc = etc;
    }
}
function filterData(cityCode, json) {
    const [PIntensity, PType, PProbability] = [json.PrecipitationIntensity, json.PrecipitationType, json.PrecipitationProbability];

    const code = cityCode;
    const condition = json.IconPhrase;
    const temperature = fahrenheitToCelsius(json.Temperature.Value) + '°';
    const feelslike = fahrenheitToCelsius(json.RealFeelTemperature.Value) + '°';
    const humidity = json.RelativeHumidity + '%';
    const precipitation = json.HasPrecipitation ? `${PIntensity} ${PType.toLowerCase()} (${PProbability}% chance)` : `None (${PProbability}% chance)`;
    const etc = json;

    return new City(code, condition, temperature, feelslike, humidity, precipitation, etc);
}

// TODO check if request can be made directly in metric values
function fahrenheitToCelsius(f) {
    var c = (5 / 9) * (f - 32);
    if (c - Math.floor(c) < 0.5) {
        return Math.floor(c);
    } else {
        return Math.ceil(c);
    }
}
//TODO check if request can be made in spanish
export function setData(cityCode){
    return new Promise(function(resolve, reject){
        const existingCity = citiesLoaded.find((city) => city.code == cityCode);
        if(existingCity != undefined){
            resolve(existingCity);
        }
        else{
            const request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                let data;
                if(this.readyState == 4 && this.status == 200){
                    data = JSON.parse(this.responseText);
                    data = data.map(hour => filterData(cityCode, hour));
                    resolve(data);
                }
            }
            request.open("GET", 'http://localhost:8080/', true);
            request.send();
        }
    });
}
