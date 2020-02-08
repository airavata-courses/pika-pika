package postprocessing;

import ProducerConsumerFiles.MessageListener;
import ProducerConsumerFiles.MessageProducer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PostProcessingApplication {

    public static void main(String[] args) throws InterruptedException {

        ConfigurableApplicationContext context = SpringApplication.run(PostProcessingApplication.class, args);
        MessageProducer producer = context.getBean(MessageProducer.class);
        MessageListener listener = context.getBean(MessageListener.class);
        while(true) {
            producer.sendMessage("Hello, World!");
            Thread.sleep(10000);
        }

    }

    @Bean
    public MessageProducer messageProducer() {
        return new MessageProducer();
    }

    @Bean
    public MessageListener messageListener() {
        return new MessageListener();
    }

}


