package io.starter.ignite.generator;

import java.security.NoSuchAlgorithmException;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

/**
 * <h2>Generates an app from a Swagger Spec</h2>
 * <p>
 * Features the ability to merge spec files from a templates directory as well
 * as auto-creation of CRUD methods hooked up to Ignite Data Objects.
 *
 * <pre>
 *   - YAML -> Swagger client
 *   - Swagger Client -> entity classes
 *   - Swagger Client -> DML for database
 *   - Swagger CLient -> React-native JS screens
 * </pre>
 *
 * <h2>NOTE: Generate a SecureField key</h2>
 *
 * <pre>
 * 	java io.starter.ignite.generator.Main -Dio.starter.generateKey=<secretkey> -jar StarterIgnite-1.0.1.jar
 * </pre>
 *
 * @author John McMahon ~ github: SpaceGhost69 | twitter: @TechnoCharms
 */
@SpringBootApplication
@Order(Ordered.HIGHEST_PRECEDENCE) // run after Main Generator
public class ReactGenerator extends Main implements ReactGenConfiguration, CommandLineRunner {

	protected static final Logger logger = LoggerFactory.getLogger(ReactGenerator.class);

	/**
	 * a list of file paths to copy relative to project root
	 */
	private static String[][] sf = {
			// { "/lib/StarterIgnite-1.2.1-SNAPSHOT.jar",
			// "/lib/StarterIgnite-1.2.1-SNAPSHOT.jar" },

			{ "/src/resources/templates/application.yml", "/src/main/resources/application.yml" },

			{ "/src/resources/templates/log4j.properties", "/src/main/resources/log4j.properties" },

			{ "/logs/logfile_placeholder.txt", "/logs/logfile_placeholder.txt" },

			{ "/src/main/java/io/starter/spring/boot/stackgen-pro.txt",
					"/src/main/java/io/starter/spring/boot/stackgen-pro.txt" } };

	public static void main(String[] args) throws Exception {

		Main.checkLog4j();
		if (args == null) {
			args = new String[0];
		}
		SpringApplication app = new SpringApplication(ReactGenerator.class);
		app.setWebApplicationType(WebApplicationType.NONE);
		ConfigurableApplicationContext context = app.run(args);
		context.close();
		System.exit(0);
	}

	@Override
	public void run(String... args) throws IllegalArgumentException, IllegalAccessException, NoSuchAlgorithmException {

		// String inputSpecFile = "simple_cms.yml"; // simple_cms
		args = new String[1];
		if (args.length == 1 && args[0] == null) {
			args[0] = System.getProperty("schemaFile");
		}

		if (!ReactGenConfiguration.skipBackendGen) {
			super.run(args);

			// copy Ignite files into gen project
			Main.copyStaticFiles(Main.staticFiles);

		}

		if (!Configuration.skipReactGen) {
			// copy React files into gen project
			Main.copyStaticFiles(ReactGenerator.sf);
			try {
				ReactGen.generateReact();
			} catch (final Exception e) {
				throw new IgniteException(e.toString());
			}
		} else {
			ReactGenerator.logger.info("Skipping React Generation");
		}

	}
	
	/**
	 * Create and initialize a new SwaggerGen from a JSON config object
	 *
	 * @param inputSpec JSONObject containing config data
	 * @return
	 */
	public static void generateApp(JSONObject config) throws Exception {

		try {
			Configuration.copyJSONConfigToSysprops(config);
		} catch (IllegalArgumentException | IllegalAccessException e) {
			Main.logger
					.error("Copying Configuration values from JSON to Sysprops failed while starting App Generation");
			e.printStackTrace();
		}
		Main.generateStack(config.getString("schemaFile"));

	}
}
