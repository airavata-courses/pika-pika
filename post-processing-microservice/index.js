const consumer=require('./connection').consumer

consumer.on('message', (message)=>{
    console.log('Message on Topic -> '+message.topic)
    console.log(message.value)  
  })
consumer.on('error', (error)=>{
    console.log('error', error)
  })
