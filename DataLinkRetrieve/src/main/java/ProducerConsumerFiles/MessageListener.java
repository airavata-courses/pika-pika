package ProducerConsumerFiles;

import Entity.MessageEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MessageListener {

    public static final String TOPIC = "data-retrieval-service";

    public MessageEntity messageEntity;

    @KafkaListener(topics = TOPIC, groupId = "test-consumer-group")
    public void consume(String message) {
        messageEntity.setDataRetrievalData(message);
        System.out.println("Received Message: " + message);
    }

}


