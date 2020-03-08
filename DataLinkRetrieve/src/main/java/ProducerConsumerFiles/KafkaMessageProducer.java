package ProducerConsumerFiles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaMessageProducer {

    public static final String TOPIC = "model-execution-service";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void produce(String message) {
        this.kafkaTemplate.send(TOPIC, message);
    }
}