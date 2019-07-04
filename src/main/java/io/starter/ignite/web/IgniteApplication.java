package io.starter.ignite.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

import de.codecentric.boot.admin.server.config.EnableAdminServer;

@EnableAdminServer
@SpringBootApplication
@Configuration
@PropertySources({ @PropertySource("classpath:application.properties") })
public class IgniteApplication {
	protected static final Logger logger = LoggerFactory
			.getLogger(IgniteApplication.class);

	public static void main(String[] args) {

		// ConfigurationProperties.synch(System.getProperties());

		SpringApplication.run(IgniteApplication.class, args);
	}

	// @Value("${foo:bar}")
	// public String fooBar;

	@Value("${spring.datasource.driver-class-name:org.h2.Driver}")
	public String	dbDriver;

	@Value("${spring.datasource.username:ignite}")
	public String	dbUser;

	@Value("${spring.datasource.password:ignite}")
	public String	dbPassword;

	@Value("${spring.datasource.url:jdbc:mysql://127.0.0.1:3306/ignite-spring-boot?characterEncoding=UTF-8}")
	public String	dbUrl;

	@Bean
	public ServletRegistrationBean<IgniteServlet> IgniteServletBean() {
		ServletRegistrationBean<IgniteServlet> bean = new ServletRegistrationBean<IgniteServlet>(
				new IgniteServlet(), "/ignite/*");
		bean.setLoadOnStartup(1);
		return bean;
	}

}
