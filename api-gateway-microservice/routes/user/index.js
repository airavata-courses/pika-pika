var router = require('express').Router()
const uuidv1 = require('uuid/v1')
const sendPayload = require('../../utility').sendPayload
const kafka_topic = 'user-management-service'

router.post('/signin', (req, res) => {
	let uuid = uuidv1()
	responseMap[uuid] = res
	let message = {
		key: 'signin',
		data: req.body,
		resId: uuid
	}
	sendPayload(kafka_topic, JSON.stringify(message))
		.catch((error) => {
			res.status(500).send(error)
		})
})

router.post('/register', (req, res) => {
	let uuid = uuidv1()
	responseMap[uuid] = res
	let message = {
		key: 'register',
		data: req.body,
		resId: uuid
	}
	sendPayload(kafka_topic, JSON.stringify(message))
		.catch((error) => {
			res.status(500).send(error)
		})
})

router.post('/updateRecord', (req, res) => {
	let uuid = uuidv1()
	responseMap[uuid] = res
	let message = {
		key: 'updateRecord',
		data: req.body,
		resId: uuid
	}
	sendPayload(kafka_topic, JSON.stringify(message))
		.catch((error) => {
			res.status(500).send(error)
		})
})

router.post('/getJobList', (req, res) => {
	let uuid = uuidv1()
	responseMap[uuid] = res
	let message = {
		key: 'getJobList',
		data: req.body,
		resId: uuid
	}
	sendPayload(kafka_topic, JSON.stringify(message))
		.catch((error) => {
			res.status(500).send(error)
		})
})

module.exports = router