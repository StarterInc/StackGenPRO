package io.starter.ignite.generator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <h2>Generates an app from a Swagger Spec</h2>
 * <p>
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
 * <pre>
 * 	java io.starter.ignite.generator.Main -Dio.starter.generateKey=<secretkey> -jar StarterIgnite-1.0.1.jar
 * </pre>
 *
 * @author John McMahon (@TechnoCharms)
 */
public class ReactGenerator extends Main implements ReactGenConfiguration {

    protected static final Logger logger = LoggerFactory
            .getLogger(ReactGenerator.class);

    /**
     * a list of file paths to copy
     * relative to project root
     */
    private static String[][] sf = {
            {"/lib/StarterIgnite-1.2.1-SNAPSHOT.jar",
                    "/lib/StarterIgnite-1.2.1-SNAPSHOT.jar"},

            {"/src/resources/templates/application.yml",
                    "/src/main/resources/application.yml"},

            {"/src/resources/templates/log4j.properties",
                    "/src/main/resources/log4j.properties"},

            {"/logs/logfile_placeholder.txt",
                    "/logs/logfile_placeholder.txt"},

            {"/src/resources/templates/starter-ignite-banner.txt",
                    "/src/main/java/io/starter/spring/boot/starter-ignite-banner.txt"}};

    public static void main(String[] args) throws Exception {

        // String inputSpecFile = "simple_cms.yml"; // simple_cms
        args = new String[1];
        if (args.length == 1 && args[0] == null)
            args[0] = System.getProperty("schemaFile");

        if (!REACT_SKIP_STACKGEN) {
            Main.main(args);

            // copy Ignite files into gen project
            Main.copyStaticFiles(staticFiles);
        }

        // copy React files into gen project
        Main.copyStaticFiles(sf);

        ReactGen.generateReactNative();

    }

}
