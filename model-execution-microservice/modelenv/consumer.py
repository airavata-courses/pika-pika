from pykafka import KafkaClient

def get_kafka_client():
    return KafkaClient(hosts='127.0.0.1:9092')
client = get_kafka_client()
def events():
    for i in client.topics['testFrontEnd'].get_simple_consumer():
        print('data:{0}\n\n'.format(i.value.decode()))
events()