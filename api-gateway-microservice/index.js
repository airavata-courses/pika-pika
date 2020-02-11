const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const request=require('request')
const consumer=require('./connection').consumer
const cors=require('cors')
global.responseMap={}

const PORT = 4000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || PORT, function() {
    console.log("Server is running on Port: " + PORT)
})

app.use('/api', require('./routes'))

consumer.on('message', (message)=>{
    console.log('Message on Topic-> '+message.topic)
    let value=JSON.parse(message.value)
    try{
        if(value['error']==null){
            responseMap[value['resId']].send(value['data'])
        }
        else{
            responseMap[value['resId']].status(500).send(value['error'])
        }
    }
    catch(error) {
        console.log("Consumer Error!")
    }

})
consumer.on('error', (error)=>{
    console.log('error', error)
})