package ProducerConsumerFiles;

import DataLinkRetrieve.DataLinkRetrieveApplication;
import org.springframework.kafka.annotation.KafkaListener;

import java.util.concurrent.CountDownLatch;

public class MessageListener {

    private CountDownLatch latch = new CountDownLatch(3);

    public CountDownLatch getLatch() {
        return latch;
    }

    @KafkaListener(topics = "#{'${consumer.topic.name}'}", groupId = "test-consumer-group")
    public void listen(String message) {
        System.out.println("Received Message: " + message);
        DataLinkRetrieveApplication.producer.sendMessage(message);
        latch.countDown();
    }
}
