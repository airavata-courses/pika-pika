from kafka import KafkaProducer
from kafka import KafkaConsumer
import json

producer = KafkaProducer(bootstrap_servers=['kafka-service:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x).encode('utf-8'))

consumer = KafkaConsumer(
    'post-processing-service',
     bootstrap_servers=['kafka-service:9092'],
     auto_offset_reset='earliest',
     enable_auto_commit=True,
     group_id='post-processing-group',
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

def on_send_success(record_metadata):
    print('[kafka-producer -> ' + record_metadata.topic + ']: broker update success')

def on_send_error(excp):
    log.error('Producer error', exc_info=excp)

def main():
    for message in consumer:
        message = message.value
        print("Message received : " +str(message))
        producer.send('session-management-service', value=message) \
        .add_callback(on_send_success) \
        .add_errback(on_send_error)

if __name__ == '__main__':
    main()