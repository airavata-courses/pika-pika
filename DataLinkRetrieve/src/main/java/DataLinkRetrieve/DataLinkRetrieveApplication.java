package DataLinkRetrieve;

import ProducerConsumerFiles.MessageListener;
import ProducerConsumerFiles.MessageProducer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DataLinkRetrieveApplication {

	public static MessageProducer producer;
	public static MessageListener listener;
	static ConfigurableApplicationContext context;

	public static void initialize() {
		producer = context.getBean(MessageProducer.class);
		listener = context.getBean(MessageListener.class);
	}

	public static void main(String[] args) {

		context = SpringApplication.run(DataLinkRetrieveApplication.class, args);
		initialize();
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
