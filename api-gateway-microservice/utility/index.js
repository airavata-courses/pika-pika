const producer=require('../connection').producer

const sendPayload=(kafka_topic,message)=>{
    return new Promise((resolve,reject)=>{
        let payloads = [
            {
            topic: kafka_topic,
            messages: message
            }
        ]
        producer.send(payloads, (error, data) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
            console.log('[kafka-producer -> '+kafka_topic+']: broker update success')
            resolve(data)
            }
        })
    })
}
module.exports={sendPayload}