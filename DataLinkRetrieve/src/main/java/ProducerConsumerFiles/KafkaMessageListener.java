package ProducerConsumerFiles;

import Entity.MessageEntity;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaMessageListener {

    private static Logger logger = LogManager.getLogger(KafkaMessageListener.class);
    public static final String TOPIC = "data-retrieval-service";
    static public MessageEntity messageEntity = new MessageEntity();

    @Autowired
    KafkaMessageProducer kafkaProducer;

    @KafkaListener(topics = TOPIC, groupId = "data-retrieval-group")
    public void consume(String message) {
        logger.info("message produced at " + TOPIC + " : " + message);
        kafkaProducer.produce(message);
        messageEntity.setDataRetrievalData(message);
    }

}


