package postprocessing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PostProcessingApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostProcessingApplication.class, args);
	}

}
