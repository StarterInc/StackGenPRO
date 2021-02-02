package io.starter.stackgen.web;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@Order(101)
@PropertySources({ @PropertySource("classpath:application.properties") })
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	protected static final Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

	private final String adminContextPath = "";

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
		successHandler.setTargetUrlParameter("redirectTo");
		successHandler.setDefaultTargetUrl(adminContextPath + "/");

		http.authorizeRequests().antMatchers(adminContextPath + "/assets/**").permitAll()
				.antMatchers(adminContextPath + "/index.html").permitAll().anyRequest().authenticated().and()
				.formLogin().loginPage(adminContextPath + "/index.html").successHandler(successHandler).and().logout()
				.logoutUrl(adminContextPath + "/logout").and().httpBasic().and()
				// by default uses a Bean by the name of corsConfigurationSource
				.cors().and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
				.ignoringAntMatchers(adminContextPath + "/instances", adminContextPath + "/actuator/**");
		// @formatter:on
	}

	@Value("${io.starter.stackgen.CORSOrigins:localhost}")
	public String CORSOrigins;

	@Value("${io.starter.stackgen.CORSMapping:/**}")
	public String CORSMapping;

	/**
	 * the CORS configuration for the REST api
	 * 
	 * @return
	 */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		logger.warn("SGP-WSC: Initializing CORS Config Origins: CORSOrigins " + CORSOrigins);
		logger.warn("SGP-WSC: Initializing CORS Config Mapping: CORSMapping " + CORSMapping);
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(CORSOrigins));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "INSERT", "DELETE", "HEAD", "OPTIONS"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration(CORSMapping, configuration);
		return source;
	}

	ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("Starter StackGen API")
				.description("Starter StackGen API")
				.license("AGPL 3.0")
				.licenseUrl("https://www.gnu.org/licenses/agpl-3.0.html")
				.termsOfServiceUrl("")
				.version("1.0.4")
				.contact(new Contact("","", "info@StackGen.io"))
				.build();
	}

	@Bean
	public Docket customImplementation(){
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("io.starter.StackGenUI.api"))
				.build()
				.directModelSubstitute(org.threeten.bp.LocalDate.class, java.sql.Date.class)
				.directModelSubstitute(org.threeten.bp.OffsetDateTime.class, java.util.Date.class)
				.apiInfo(apiInfo());
	}

}
