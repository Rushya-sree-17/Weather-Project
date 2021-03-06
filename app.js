const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {

  const query = req.body.city_name;
  const apiKey = "apikey";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in "+query+" is " + temp + " degree Celsius<h1>");
      res.write("<h2>The weather is currently " + weatherDescription + "<h2>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
  });

})


app.listen(3000, function() {
  console.log("Server started listening at port 3000");
})
