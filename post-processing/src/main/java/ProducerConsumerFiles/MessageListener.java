package ProducerConsumerFiles;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;

import java.util.concurrent.CountDownLatch;

public class MessageListener {

    private CountDownLatch latch = new CountDownLatch(3);

    @Value(value = "${message.topic.name}")
    private String topicName;

    public CountDownLatch getLatch() {
        return latch;
    }

    @KafkaListener(topics = "test-topic", groupId = "test-consumer-group")
    public void listen(String message) {
        System.out.println("Received Messasge in group foo: " + message);
        latch.countDown();
    }
}
