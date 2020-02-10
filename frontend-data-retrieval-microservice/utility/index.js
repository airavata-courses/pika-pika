const AWS = require("../connection").AWS;
const producer = require("../connection").producer;
const axios = require("axios");

const fetchNEXRAD = date => {
  let kafka_topic = "model-execution-service";
  //Sample key - 2019/06/26/KVWX/KVWX20190626_221105_V06
  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket: "noaa-nexrad-level2",
    Prefix: date
  };

  return new Promise((resolve, reject) => {
    new AWS.S3({ apiVersion: "2006-03-01" }).listObjects(
      bucketParams,
      (error, data) => {
        if (error) {
          reject({ error: error });
        }

        let payloads = [
          {
            topic: kafka_topic,
            messages: JSON.stringify(data)
          }
        ];
        // console.log();
        var i = 0;
        let mySet = new Set();
        for (i = 0; i < data.Contents.length; i++) {
          // console.log(data.Contents[i].Key.split("/")[3]);
          mySet.add(data.Contents[i].Key.split("/")[3]);
        }
        console.log(mySet);
        return resolve(mySet);
        // producer.send(payloads, (error, data) => {
        //     if (error) {
        //         reject({error:error})
        //     } else {
        //     console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
        //     resolve()
        //     }
        // })
      }
    );
  });
};

const fetchNEXRADFiles = (date, radar) => {
  let kafka_topic = "model-execution-service";
  //Sample key - 2019/06/26/KVWX/KVWX20190626_221105_V06
  // Create the parameters for calling listObjects
  var empty = "";
  var bucketParams = {
    Bucket: "noaa-nexrad-level2",
    Prefix: empty.concat(date, "/", radar)
  };

  return new Promise((resolve, reject) => {
    new AWS.S3({ apiVersion: "2006-03-01" }).listObjects(
      bucketParams,
      (error, data) => {
        if (error) {
          reject({ error: error });
        }

        let payloads = [
          {
            topic: kafka_topic,
            messages: JSON.stringify(data)
          }
        ];
        // console.log();
        var i = 0;
        let mySet = new Set();
        for (i = 0; i < data.Contents.length; i++) {
          //  console.log(data.Contents[i].Key);
          mySet.add(data.Contents[i].Key.split("/")[4]);
        }
        console.log(mySet);
        return resolve(mySet);
        // producer.send(payloads, (error, data) => {
        //     if (error) {
        //         reject({error:error})
        //     } else {
        //     console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
        //     resolve()
        //     }
        // })
      }
    );
  });
};

const fetchCurrentWeather = (lat, lon) => {
  let kafka_topic = "model-execution-service";
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=";
  var curDate = Date.now();
  var apiKey = "911925417b222d6ddf930d79bff2a40d";
  url = url + lat + "&lon=" + lon + "&appid=" + apiKey;
  console.log(url);
  return axios.get(url);
};

module.exports = { fetchNEXRAD, fetchNEXRADFiles, fetchCurrentWeather };
