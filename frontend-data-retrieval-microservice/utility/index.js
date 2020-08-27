const AWS = require("../connection").AWS;
const producer = require("../connection").producer;
const axios = require("axios");

const fetchRadar = date => {
	let kafka_topic = "model-execution-service";
	//Sample key - 2019/06/26/KVWX/KVWX20190626_221105_V06
	// Create the parameters for calling listObjects
	var bucketParams = {
		Bucket: "noaa-nexrad-level2",
		Prefix: date.date
	};

	return new Promise((resolve, reject) => {
		new AWS.S3({ apiVersion: "2006-03-01" }).listObjects(
			bucketParams,
			(error, data) => {
				if (error) {
					return reject({ error: error });
				}

				let payloads = [
					{
						topic: kafka_topic,
						messages: JSON.stringify(data)
					}
				];
				var i = 0;
				let mySet = new Set();
				for (i = 0; i < data.Contents.length; i++) {
					mySet.add(data.Contents[i].Key.split("/")[3]);
				}
				return resolve(Array.from(mySet));

			}
		);
	});
};

const fetchNEXRADFiles = (data) => {
	let kafka_topic = "model-execution-service";
	//Sample key - 2019/06/26/KVWX/KVWX20190626_221105_V06
	// Create the parameters for calling listObjects
	var date = data.date
	var radar = data.radar
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
					return reject({ error: error });
				}

				let payloads = [
					{
						topic: kafka_topic,
						messages: JSON.stringify(data)
					}
				];
				var i = 0;
				let mySet = new Set();
				for (i = 0; i < data.Contents.length; i++) {
					mySet.add(data.Contents[i].Key.split("/")[4]);
				}
				return resolve(Array.from(mySet));

			}
		);
	});
};

const fetchCurrentWeather = (data) => {
	var lat = parseFloat(data.lat)
	var lon = parseFloat(data.lon)
	var url = "https://api.openweathermap.org/data/2.5/weather?lat=";
	var apiKey = "911925417b222d6ddf930d79bff2a40d";
	url = url + lat + "&lon=" + lon + "&appid=" + apiKey;
	return new Promise((resolve, reject) => {
		axios.get(url).then((res, err) => {
			if (err)
				return reject({ error: err });
			return resolve(res.data.main);

		}).catch(error => {
			console.error(error);
			reject(error)
		});
	})
};

let sendPayload = async (kafka_topic, message) => {
	let payloads = [
		{
			topic: kafka_topic,
			messages: message
		}
	]
	producer.send(payloads, (error, data) => {
		if (error) {
			throw new Error(error)
		} else {
			console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success')
			return
		}
	})
}


module.exports = { fetchRadar, fetchNEXRADFiles, fetchCurrentWeather, sendPayload };
