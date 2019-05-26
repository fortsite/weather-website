const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/b80a6fa614b642cbc93c3e5ee8c4f3e3/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unabel to connect mapbox to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { summary } = body.daily.data[0];

      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. The high today is ${
          body.daily.data[0].temperatureHigh
        } with a low of ${
          body.daily.data[0].temperatureLow
        }. There is a ${precipProbability}% change of rain`
      );
    }
  });
};
module.exports = forecast;
