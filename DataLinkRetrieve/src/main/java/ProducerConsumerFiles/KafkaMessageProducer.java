package ProducerConsumerFiles;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaMessageProducer {

    public static final String TOPIC = "model-execution-service";

    private static Logger logger = LogManager.getLogger(KafkaMessageProducer.class);

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void produce(String message) {
        logger.info("message produced at " + TOPIC + " : " + message);
        this.kafkaTemplate.send(TOPIC, message);
    }
}