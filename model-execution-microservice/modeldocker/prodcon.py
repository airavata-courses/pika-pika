import subset
import json
from kafka import KafkaProducer
from kafka import KafkaConsumer

producer = KafkaProducer(bootstrap_servers=['127.0.0.1:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x).encode('utf-8'))

consumer = KafkaConsumer(
    'model-execution-service',
     bootstrap_servers=['127.0.0.1:9092'],
     auto_offset_reset='earliest',
     enable_auto_commit=True,
     group_id='model-execution-group',
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

def on_send_success(record_metadata):
    print('[kafka-producer -> ' + record_metadata.topic + ']: broker update success')

def on_send_error(excp):
    log.error('Producer error', exc_info=excp)

def main():
	for message in consumer:
		message = message.value
		print("Message received : " +str(message))
		try:
			plot_url=subset.subset(message['bucket'],message['key'])
			message['url']=plot_url
			producer.send('post-processing-service', value=message).add_callback(on_send_success).add_errback(on_send_error)
		except Exception as e:
			print(str(e))

if __name__ == '__main__':
	main()
	