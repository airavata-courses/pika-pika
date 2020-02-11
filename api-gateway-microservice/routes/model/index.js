var router = require('express').Router()
const uuidv1 = require('uuid/v1')
const sendPayload=require('../../utility').sendPayload
const kafka_topic='data-retrieval-service'

router.post('/executeModal',(req,res)=>{
    let uuid=uuidv1()
    // responseMap[uuid]=res
    let message={
        jobID:uuid,
        key:req.body.key,
        bucket:req.body.bucket
    }
    sendPayload(kafka_topic,JSON.stringify(message)).then((data)=>{
        res.send({jobID:uuid})
    }).catch((error)=>{
            res.status(500).send(error)
        })
})

module.exports = router