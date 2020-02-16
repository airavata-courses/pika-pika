from pykafka import KafkaClient
import subset
import json

client = KafkaClient(hosts="127.0.0.1:9092")
topic =client.topics['post-processing-service']
producer = topic.get_sync_producer()

def get_kafka_client():
    return KafkaClient(hosts='127.0.0.1:9092')
# client = get_kafka_client()
def events():
	
	# print(bytes(subset_data[0]))
	#producer.produce(message.encode('ascii'))
	# print(len(subset_data))
	
	for i in client.topics['model-execution-service'].get_simple_consumer():
		print('data : {0}\n\n'.format(i.value.decode()))
		data=json.loads(i.value.decode())
		subset_data=subset.subset(data['bucket'],data['key'])
		try:
			result=data
			result["url"]=subset_data
			# result={"jobID":data["jobID"],"bucket":data['bucket']
			# ,"key":data['key'],"url":subset_data}
			result=json.dumps(result)
			producer.produce(bytes(result,'utf-8'))
		except Exception as e:
			print(str(e))
events()