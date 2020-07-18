
package io.starter.ignite.generator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Field;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import com.squareup.javapoet.MethodSpec;

import io.starter.ignite.generator.react.AppEntityObject;
import io.starter.ignite.generator.react.EntityObject;
import io.starter.ignite.util.FileUtil;
import io.starter.toolkit.StringTool;

/**
 *
 * ReactGen uses Java introspection to scan the StackGen generated REST/Model
 * classes and derive front-end configuration information.
 *
 * ReactGEn then uses Mustache templates to generate React front end(s).
 *
 * Mustache lib used: https://github.com/spullara/mustache.java
 *
 * @author John McMahon ~ github: SpaceGhost69 | twitter: @TechnoCharms
 *
 */
@Component
public class ReactGen extends Gen implements Generator {

	protected static final Logger logger = LoggerFactory.getLogger(ReactGen.class);

	static ReactConfigurator config = new ReactConfigurator();
	
	@Override
	@Bean
	public StackGenConfigurator getConfig() {
		return config;
	}
	
	/**
	 *
	 * Copy the resulting output to the export folder
	 *
	 * @param gen
	 * @throws IOException
	 *
	 */
	private static void export(ReactGen gen) throws IOException {
		ReactGen.logger.info("Exporting: " + config.REACT_EXPORT_FOLDER
				+ config.REACT_APP_NAME + " to: " + config.REACT_APP_OUTPUT_FOLDER);
		FileUtil.copyFolder(config.REACT_EXPORT_FOLDER + config.REACT_APP_NAME,
				config.REACT_APP_OUTPUT_FOLDER + config.REACT_APP_NAME);
	}

	/**
	 *
	 * Create Entity Objects which are basically schema of Objects with
	 * configuration data for the React Native generation
	 *
	 * @param gen
	 * @throws Exception
	 *
	 */
	void generateEntitiesFromModelFolder(ReactGen gen) throws Exception {
		ReactGen.logger.info("Iterate Data Object Entities and create React App Entity Classes...");
		final String[] modelFiles = getModelFileNames();

		// load the newly compiled classes this should point to the
		// top of the package structure
		final URLClassLoader classLoader = new URLClassLoader(
				new URL[] { new File(config.getJavaGenSourceFolder()).toURI().toURL(),
						new File(config.getJavaGenResourcesFolder()).toURI().toURL() });

		for (final String mf : modelFiles) {
			String cn = mf.substring(0, mf.indexOf("."));
			// cn = cn + ".class";
			cn = config.getIgniteModelPackage() + "." + cn;
			ReactGen.logger.info("Loading Classes from ModelFile: " + cn);
				ReactGen.createAppEntities(gen, classLoader.loadClass(cn));
		}
		classLoader.close();
	}

	private static void createAppEntities(ReactGen gen, Class<?> forName) {

		if (gen == null) {
			throw new IllegalStateException("No ReactGen context in createAppEntities");
		}
		if (config.REACT_APP_NAME == null) {
			throw new IllegalStateException("No AppName in createAppEntities");
		}
		if (forName == null) {
			throw new IllegalStateException("No Class defined in createAppEntities");
		}

		final AppEntityObject ap = new AppEntityObject(config.REACT_APP_NAME, forName, config);
		config.REACT_DATA_OBJECTS.add(ap);
	}

	public void generateReact() throws Exception {
		// System.setProperty("user.dir",
		// "/user/projects/StarterIgnite/StarterIgniteServer");
		// System.setProperty("user.dir",
		// "/StarterIgniteServer");

		final List<String> alreadyAdded = new ArrayList<>(); // dedupe
		final ReactGen gen = new ReactGen();
		generateEntitiesFromModelFolder(gen);

		final File[] templateFiles = getSourceFilesInFolder(new File(config.REACT_TEMPLATE_FOLDER),
				config.FOLDER_SKIP_LIST);

		final List<EntityObject> objnames = new ArrayList<>();
		int i = 0;
		for (final AppEntityObject oa : config.REACT_DATA_OBJECTS) {
			objnames.add(new EntityObject(oa.objectname, i++));
		}

		for (final Object o : templateFiles) {
			final String fname = o.toString();
			final String shortName = fname.substring(fname.lastIndexOf("/") + 1);

			// for each object in system, create a REDUX
			// action and reducer from templates
			if (ReactGen.shouldParse(shortName)) {
				for (final AppEntityObject aeo : config.REACT_DATA_OBJECTS) {

					// read in template file
					final String foutp = StringTool.replaceText(fname, "objectName", aeo.objectname);

					// mustache
					aeo.dataobjects = objnames;
					if (!alreadyAdded.contains(foutp)) {
						ReactGen.generateFromTemplate(aeo, fname, foutp);
						alreadyAdded.add(foutp);
					}
				}
			} else {
				// single file mustache
				ReactGen.generateFromTemplate(gen, fname, null);
			}
		}

		// copy the files to the target project folder
		ReactGen.export(gen);

		ReactGen.logger.info("Done processing " + config.REACT_DATA_OBJECTS.size() + " React Objects");

		// TODO: conditionally run maven build

	}

	private static boolean shouldParse(String shortName) {
		// if(shortName.contains("objectName") || true)
		// return true;
		return true;
	}

	/**
	 *
	 * generate output file from input template file and spec object
	 *
	 * @param gen       generation config object
	 * @param fmame     output file name
	 * @param multifile whether this template is a folder containing template files
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	private static void generateFromTemplate(Object gen, String fname, String multifile)
			throws IOException, FileNotFoundException {

		final MustacheFactory mf = new DefaultMustacheFactory();
		String foutp = StringTool.replaceText(fname, config.REACT_TEMPLATE_SOURCES_FOLDER,
				config.REACT_EXPORT_FOLDER + config.REACT_APP_NAME + "/");

		foutp = StringTool.replaceText(foutp, config.REACT_TEMPLATE_FOLDER,
				config.REACT_EXPORT_FOLDER + config.REACT_APP_NAME + "/");

		// read in template file
		if (multifile != null) {
			foutp = StringTool.replaceText(multifile, config.REACT_TEMPLATE_SOURCES_FOLDER,
					config.REACT_EXPORT_FOLDER + config.REACT_APP_NAME + "/");
		}

		final File fout = new File(foutp);
		final File finp = new File(fname);

		fout.mkdirs();
		if (fout.isDirectory()) {
			fout.delete();
		}
		if (!fout.exists()) {
			fout.mkdirs();
			fout.delete();
		}
		if (!finp.isDirectory()) {
			try {
				final Reader fread = new FileReader(finp);

				fout.delete();
				fout.createNewFile();
				final Writer fwriter = new FileWriter(fout);

				// logger.trace("Mustaching template: " + finp + " to output file: " + fout);
				final Mustache reactmf = mf.compile(fread, config.REACT_APP_OUTPUT_FOLDER);

				// if we are dealing with a sub-object
				reactmf.execute(fwriter, gen);

				fwriter.flush();
			} catch (final Exception e) {
				ReactGen.logger.error("Failed to generate from template: " + e);
			}
		}
	}

	@Override
	public Object createSetter(Field fld) {
		final String fieldName = fld.getName();
		if (fieldName.startsWith("ajc$")) {
			return null;
		}

		String fldName = StringTool.getUpperCaseFirstLetter(fieldName);
		fldName = "get" + fldName;

		final String ret = fldName;

		return ret;
	}

	@Override
	public Object createAccessor(Field f) {
		return null;
	}

	@Override
	public Object createMember(Field f) {
		return null;
	}

	@Override
	public void generate(String className, List<Object> fieldList, List<MethodSpec> getters,
			List<MethodSpec> setters) throws Exception {
	}

}
