package io.starter.ignite.web;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import de.codecentric.boot.admin.server.config.AdminServerProperties;

@Configuration
@PropertySources({ @PropertySource("classpath:application.properties") })
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	protected static final Logger	logger	= LoggerFactory
			.getLogger(WebSecurityConfig.class);

	private final String			adminContextPath;

	public WebSecurityConfig(AdminServerProperties adminServerProperties) {
		this.adminContextPath = adminServerProperties.getContextPath();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
        successHandler.setTargetUrlParameter("redirectTo");
        successHandler.setDefaultTargetUrl(adminContextPath + "/");

        http.authorizeRequests()
            .antMatchers(adminContextPath + "/assets/**").permitAll() 
            .antMatchers(adminContextPath + "/index.html").permitAll()
            .anyRequest().authenticated() 
            .and()
        .formLogin().loginPage(adminContextPath + "/index.html").successHandler(successHandler).and() 
        .logout().logoutUrl(adminContextPath + "/logout").and()
        .httpBasic().and()
     // by default uses a Bean by the name of corsConfigurationSource
        .cors().and()
        .csrf()
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())  
            .ignoringAntMatchers(
                adminContextPath + "/instances",   
                adminContextPath + "/actuator/**"  
            );
        // @formatter:on
	}

	@Value("${io.starter.stackgen.CORSOrigins:localhost}")
	public String	CORSOrigins;

	@Value("${io.starter.stackgen.CORSMapping:/**}")
	public String	CORSMapping;

	/**
	 * the CORS configuration for the REST api
	 * 
	 * @return
	 */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		logger.warn("Initializing CORS Config Origins: CORSOrigins "
				+ CORSOrigins);
		logger.warn("Initializing CORS Config Mapping: CORSMapping "
				+ CORSMapping);
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(CORSOrigins));
		configuration.setAllowedMethods(Arrays
				.asList("GET", "POST", "INSERT", "DELETE", "HEAD", "OPTIONS"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration(CORSMapping, configuration);
		return source;
	}
}
