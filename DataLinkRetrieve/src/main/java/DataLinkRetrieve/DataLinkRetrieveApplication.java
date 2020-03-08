package DataLinkRetrieve;

import ProducerConsumerFiles.KafkaMessageListener;
import ProducerConsumerFiles.KafkaMessageProducer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DataLinkRetrieveApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataLinkRetrieveApplication.class, args);
    }

    @Bean
    public KafkaMessageProducer messageProducer() {
        return new KafkaMessageProducer();
    }

    @Bean
    public KafkaMessageListener messageListener() {
        return new KafkaMessageListener();
    }

}
