const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const consumer = require("./connection").consumer;
const utility = require("./utility");

const PORT = 4000;

const app = express();
app.use(bodyParser.json());

consumer.on("message", message => {
  console.log("Message on Topic -> " + message.topic);
  console.log(message.value);
  let NEXRADKey = JSON.parse(message.value)["key"];
});
consumer.on("error", error => {
  console.log("error", error);
});
// utility
//   .fetchNEXRAD("2020/02/05")
//   .then(value => {
//     console.log("Data Submitted!");
//   })
//   .catch(error => {
//     console.error(error);
//   });

//let date = JSON.parse(message.value)["date"];
//let radar = JSON.parse(message.value)["radar"];

// let date = "2020/02/05";
// let radar = "KAMX";
// utility
//   .fetchNEXRADFiles(date, radar)
//   .then(value => {
//     console.log("Data Submitted!");
//   })
//   .catch(error => {
//     console.error(error);
//   });

let lat = "30.30";
let lon = "-98.03";
utility
  .fetchCurrentWeather(lat, lon)
  .then(value => {
    console.log(value.data.main);
  })
  .catch(error => {
    console.error(error);
  });
