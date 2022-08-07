const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=793ac5a69577bb8936b394f74f7ea4a1&query=${long},${lat}&units=m`;
    //json: true sets response body to JSON and adds header, no need to parse
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast server', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 
                `. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.` 
                + `The humidity is ${body.current.humidity}%.`);
        }   
    });
}

module.exports = forecast;