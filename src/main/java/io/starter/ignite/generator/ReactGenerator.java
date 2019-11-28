package io.starter.ignite.generator;

import java.security.NoSuchAlgorithmException;

import java.io.File;
import java.io.IOException;

import org.aspectj.util.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
public class ReactGenerator extends Main implements ReactGenConfiguration, CommandLineRunner {

	protected static final Logger logger = LoggerFactory.getLogger(ReactGenerator.class);

	/**
	 * a list of file paths to copy relative to project root
	 */
	private static String[][] sf = {
			{ "/lib/StarterIgnite-1.2.1-SNAPSHOT.jar", "/lib/StarterIgnite-1.2.1-SNAPSHOT.jar" },

			{ "/src/resources/templates/application.yml", "/src/main/resources/application.yml" },

			{ "/src/resources/templates/log4j.properties", "/src/main/resources/log4j.properties" },

			{ "/logs/logfile_placeholder.txt", "/logs/logfile_placeholder.txt" },

			{ "/src/resources/templates/starter-ignite-banner.txt",
					"/src/main/java/io/starter/spring/boot/starter-ignite-banner.txt" } };

	public static void main(String[] args) throws Exception {
		
		checkLog4j();
		SpringApplication.run(ReactGenerator.class, args);

	}

	
	@Override
	public void run(String... args) throws IllegalArgumentException, IllegalAccessException, NoSuchAlgorithmException {

		// String inputSpecFile = "simple_cms.yml"; // simple_cms
		args = new String[1];
		if (args.length == 1 && args[0] == null)
			args[0] = System.getProperty("schemaFile");

		if (!REACT_SKIP_STACKGEN) {
			super.run(args);

			// copy Ignite files into gen project
			copyStaticFiles(staticFiles);
		}

		// copy React files into gen project
		copyStaticFiles(sf);
		try {
			ReactGen.generateReact();
		} catch (Exception e) {
			throw new RuntimeException(e.toString());
		}

	}

}
