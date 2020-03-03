package ProducerConsumerFiles;

import DataLinkRetrieve.DataLinkRetrieveApplication;
import lombok.extern.log4j.Log4j2;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.kafka.annotation.KafkaListener;

import java.util.concurrent.CountDownLatch;

@Log4j2
public class MessageListener {

    Logger logger = LogManager.getLogger(MessageListener.class);
    private CountDownLatch latch = new CountDownLatch(3);

    public CountDownLatch getLatch() {
        return latch;
    }

    @KafkaListener(topics = "#{'${consumer.topic.name}'}", groupId = "test-consumer-group")
    public void listen(String message) {
        DataLinkRetrieveApplication.producer.sendMessage(message);
        logger.info("Producer is producing message : " + message);
        latch.countDown();
    }
}
