package ProducerConsumerFiles;

import Entity.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageProducer {

    public static final String TOPIC = "model-execution-service";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public MessageEntity messageEntity;

    public void produce(String userName) {

        kafkaTemplate.send(TOPIC, messageEntity.getDataRetrievalData());
    }
}