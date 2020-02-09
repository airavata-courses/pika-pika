from pykafka import KafkaClient
import subset
import json


client = KafkaClient(hosts="127.0.0.1:9092")

topic =client.topics['postprocess']
producer = topic.get_sync_producer()

def get_kafka_client():
    return KafkaClient(hosts='127.0.0.1:9092')
# client = get_kafka_client()
def events():
	
	# print(bytes(subset_data[0]))
	#producer.produce(message.encode('ascii'))
	# print(len(subset_data))
	for i in client.topics['model-execution-service'].get_simple_consumer():
		print('data:{0}\n\n'.format(i.value.decode()))
		data=json.loads(i.value.decode())
		subset_data=subset.subset(data['bucket'],data['key'])
		# print(subset_data)
		producer.produce(bytes('{"url":"'+subset_data+'"}','ascii'))	
events()