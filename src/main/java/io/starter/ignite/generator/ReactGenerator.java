package io.starter.ignite.generator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <h2>Generates an app from a Swagger Spec</h2>
 *
 * Features the ability to merge spec files from a templates 
 * directory as well as auto-creation of CRUD methods hooked 
 * up to Ignite Data Objects.
 * 	
 * <pre>
 *   - YAML -> Swagger client
 *   - Swagger Client -> entity classes
 *   - Swagger Client -> DML for database
 *   - Swagger CLient -> React-native JS screens
 * </pre>
 * 
 * <h2>NOTE: Generate a SecureField key</h2>
 *<pre>
 *	java io.starter.ignite.generator.Main -Dio.starter.generateKey=<secretkey> -jar StarterIgnite-1.0.1.jar
 *</pre>
 *
 * @author John McMahon (@TechnoCharms)
 *
 */
public class ReactGenerator extends Main implements Configuration {

	protected static final Logger	logger	= LoggerFactory
			.getLogger(ReactGenerator.class);

	/**
	 * a list of file paths to copy
	 * relative to project root
	 */
	private static String[][]		sf		= {
			{ "/src/resources/templates/application.yml",
					"/src/main/resources/application.yml" } };

	public static void main(String[] args) throws Exception {

		String inputSpecFile = "simple_cms.yml"; // "trade_automator.yml";
		args = new String[1];
		args[0] = inputSpecFile;
		Main.main(args);

		// copy React files into gen project
		Main.copyStaticFiles(sf);

		ReactGen.generateReactNative();

	}

}
