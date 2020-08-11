package io.starter.stackgen.web;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

/**
 * The web app
 * 
 * @author john
 *
 */
@SpringBootApplication
@ComponentScan(basePackages = { "io.starter.stackgen.web", "io.swagger.configuration" })
public class StackGenAppLauncher {

	private static final boolean PRINT_BEANS = false;

	public static void main(String[] args) {
		SpringApplication.run(StackGenAppLauncher.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {

			if (PRINT_BEANS) {
				System.out.println("Beans Provided by Spring Boot:");

				String[] beanNames = ctx.getBeanDefinitionNames();
				Arrays.sort(beanNames);
				for (String beanName : beanNames) {
					System.out.println(beanName);
				}
			}

		};
	}

}