var router = require('express').Router()
const uuidv1 = require('uuid/v1')
const sendPayload=require('../../utility').sendPayload
const kafka_topic='front-end-data-retrieval-service'

router.post('/getWeather',(req,res)=>{
    let uuid=uuidv1()
    responseMap[uuid]=res
    let message={
        key:'weather',
        data:req.body,
        resId:uuid
    }
    sendPayload(kafka_topic,JSON.stringify(message))
        .catch((error)=>{
            res.status(500).send(error)
        })
})


router.post('/getRadar',(req,res)=>{
    let uuid=uuidv1()
    responseMap[uuid]=res
    let message={
        key:'radar',
        data:req.body,
        resId:uuid
    }
    sendPayload(kafka_topic,JSON.stringify(message))
        .catch((error)=>{
            res.status(500).send(error)
        })
})


router.post('/getFiles',(req,res)=>{
    let uuid=uuidv1()
    responseMap[uuid]=res
    let message={
        key:'nexradfiles',
        data:req.body,
        resId:uuid
    }
    sendPayload(kafka_topic,JSON.stringify(message))
        .catch((error)=>{
            res.status(500).send(error)
        })
})

module.exports = router