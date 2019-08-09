package io.starter.ignite.plugin;

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

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import com.squareup.javapoet.FieldSpec;
import com.squareup.javapoet.MethodSpec;

import io.starter.ignite.generator.Gen;
import io.starter.ignite.generator.Generator;
import io.starter.ignite.generator.react.EntityObject;
import io.starter.ignite.util.FileUtil;
import io.starter.toolkit.StringTool;

/**
 * 
 * PluginGen is a simple way to create StackGen plugins.
 * 
 * SG Plugins live in a github repo and can be pulled down to include all the bits needed to 
 * create a loadable, reusable SG plugin.
 * 
 * Using a mustache plugin template, and a GitHub repo, PluginGen then uses Mustache templates
 * to generate service backend and React front end(s).
 * 
 * 
 * Mustache lib used:
 * https://github.com/spullara/mustache.java
 *
 * @author John McMahon (@TechnoCharms)
 */
public class PluginGen extends Gen implements Generator {

	protected static final Logger			logger							= LoggerFactory
			.getLogger(PluginGen.class);

	private static final String				PLUGIN_TEMPLATE_FOLDER			= null;

	private static final String				PLUGIN_OUTPUT_FOLDER			= null;

	private static final String				PLUGIN_NAME						= null;

	private static final String				PLUGIN_EXPORT_FOLDER			= null;

	private static final String				PLUGIN_TEMPLATE_SOURCES_FOLDER	= null;

	private static final String				PLUGIN_TEMPLATE_APP_FOLDER		= null;
	public static List<PluginEntityObject>	PLUGIN_DATA_OBJECTS				= new ArrayList<PluginEntityObject>();

	/**
	 * copy the resulting output to the export folder
	 *
	 * @param gen
	 * @throws IOException
	 */
	private static void export(PluginGen gen) throws IOException {
		logger.info("Exporting: " + PLUGIN_EXPORT_FOLDER + PLUGIN_NAME + " to: "
				+ PLUGIN_OUTPUT_FOLDER);
		FileUtil.copyFolder(PLUGIN_EXPORT_FOLDER
				+ PLUGIN_NAME, PLUGIN_OUTPUT_FOLDER + PLUGIN_NAME);
	}

	/**
	 * Create Entity Objects which are basically schema of Objects with
	 * configuration data for the React Native generation
	 *
	 * @param gen
	 * @throws Exception
	 */
	static void generateEntitiesFromModelFolder(PluginGen gen) throws Exception {
		logger.info("Iterate Data Object Entities and create React App Entity Classes...");
		String[] modelFiles = Gen.getModelFileNames();

		// load the newly compiled classes this should point to the
		// top of the package structure
		final URLClassLoader classLoader = new URLClassLoader(
				new URL[] { new File(JAVA_GEN_SRC_FOLDER).toURI().toURL(),
						new File(JAVA_GEN_RESOURCES_FOLDER).toURI().toURL() });

		for (String mf : modelFiles) {
			String cn = mf.substring(0, mf.indexOf("."));
			// cn = cn + ".class";
			cn = IGNITE_MODEL_PACKAGE + "." + cn;
			logger.info("Loading Classes from ModelFile: " + cn);
			try {
				createAppEntities(gen, classLoader.loadClass(cn));
			} catch (Exception e) {
				logger.error("PluginGen.generateEntitesFromModel failed: "
						+ e.toString());
			}
		}
		classLoader.close();
	}

	private static void createAppEntities(PluginGen gen, Class<?> forName) {

		if (gen == null)
			throw new IllegalStateException(
					"No PluginGen context in createAppEntities");
		if (PLUGIN_NAME == null)
			throw new IllegalStateException("No AppName in createAppEntities");
		if (forName == null)
			throw new IllegalStateException(
					"No Class defined in createAppEntities");

		PluginEntityObject ap = new PluginEntityObject(PLUGIN_NAME, forName);
		PLUGIN_DATA_OBJECTS.add(ap);
	}

	public static void generateReact() throws Exception {
		// System.setProperty("user.dir",
		// "/user/projects/StarterIgnite/StarterIgniteServer");
		// System.setProperty("user.dir",
		// "/StarterIgniteServer");

		List<String> alreadyAdded = new ArrayList<String>(); // dedupe
		PluginGen gen = new PluginGen();
		generateEntitiesFromModelFolder(gen);

		File[] templateFiles = Gen.getSourceFilesInFolder(new File(
				PLUGIN_TEMPLATE_FOLDER), FOLDER_SKIP_LIST);

		List<EntityObject> objnames = new ArrayList<EntityObject>();
		int i = 0;
		for (PluginEntityObject oa : PLUGIN_DATA_OBJECTS) {
			objnames.add(new EntityObject(oa.objectname, i++));
		}

		for (Object o : templateFiles) {
			String fname = o.toString();
			String shortName = fname.substring(fname.lastIndexOf("/") + 1);

			// NEEDED? fname = PluginGen.renamePaths(fname,
			// PLUGIN_NAME);

			// for each object in system, create a REDUX
			// action and reducer from templates
			if (shouldParse(shortName)) {
				for (PluginEntityObject aeo : PLUGIN_DATA_OBJECTS) {

					// read in template file
					String foutp = StringTool
							.replaceText(fname, "objectName", aeo.objectname);

					// mustache
					aeo.dataobjects = objnames;
					if (!alreadyAdded.contains(foutp)) {
						generateFromTemplate(aeo, fname, foutp);
						alreadyAdded.add(foutp);
					}
				}
			} else {
				// single file mustache
				generateFromTemplate(gen, fname, null);
			}
		}

		// copy the files to the target project folder
		export(gen);

		logger.error("TODO: FIX RUN NPM");

		// run npm to build and run react native app!
		// String[] args1 = { "npm", "install" };
		// RunCommand.runSafe("npm", args1);

	}

	private static boolean shouldParse(String shortName) {
		// if(shortName.contains("objectName") || true)
		// return true;
		return true;
	}

	/**
	 * @param mf
	 * @param appVals
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	private static void copyFileTemplate(Object gen, String fname, String multifile) throws IOException, FileNotFoundException {

		String foutp = StringTool.replaceText(fname, PLUGIN_TEMPLATE_APP_FOLDER
				+ "/", PLUGIN_EXPORT_FOLDER + PLUGIN_NAME + "/starter/");

		// read in template file
		if (multifile != null) {
			foutp = StringTool.replaceText(multifile, PLUGIN_TEMPLATE_APP_FOLDER
					+ "/", PLUGIN_EXPORT_FOLDER + PLUGIN_NAME + "/starter/");
		}

		File fout = new File(foutp);
		File finp = new File(fname);

		logger.info("Copying : " + fname + " to " + foutp);
		fout.mkdirs();
		if (fout.isDirectory())
			fout.delete();
		if (!finp.isDirectory()) {
			try {
				Reader fread = new FileReader(finp);

				fout.delete();
				fout.createNewFile();
				Writer fwriter = new FileWriter(fout);

				fwriter.flush();
			} catch (Exception e) {
				logger.error("Failed to copy file template: " + e);
			}
		}
	}

	/**
	 * @param mf
	 * @param appVals
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	private static void generateFromTemplate(Object gen, String fname, String multifile) throws IOException, FileNotFoundException {

		MustacheFactory mf = new DefaultMustacheFactory();
		String foutp = StringTool
				.replaceText(fname, PLUGIN_TEMPLATE_SOURCES_FOLDER, PLUGIN_EXPORT_FOLDER
						+ PLUGIN_NAME + "/");

		foutp = StringTool
				.replaceText(foutp, PLUGIN_TEMPLATE_FOLDER, PLUGIN_EXPORT_FOLDER
						+ PLUGIN_NAME + "/");

		// read in template file
		if (multifile != null) {
			foutp = StringTool
					.replaceText(multifile, PLUGIN_TEMPLATE_SOURCES_FOLDER, PLUGIN_EXPORT_FOLDER
							+ PLUGIN_NAME + "/");
		}

		File fout = new File(foutp);
		File finp = new File(fname);

		fout.mkdirs();
		if (fout.isDirectory())
			fout.delete();
		if (!fout.exists()) {
			fout.mkdirs();
			fout.delete();
		}
		if (!finp.isDirectory()) {
			try {
				Reader fread = new FileReader(finp);

				fout.delete();
				fout.createNewFile();
				Writer fwriter = new FileWriter(fout);

				logger.info("Mustaching template: " + finp + " to output file: "
						+ fout);
				Mustache reactmf = mf.compile(fread, PLUGIN_OUTPUT_FOLDER);

				// if we are dealing with a sub-object
				reactmf.execute(fwriter, gen);

				fwriter.flush();
			} catch (Exception e) {
				logger.error("Failed to generate from template: " + e);
			}
		}
	}

	@Override
	public Object createSetter(Field fld) {
		String fieldName = fld.getName();
		if (fieldName.startsWith("ajc$")) // skip aspects
			return null;

		Class fieldType = fld.getType();
		String fldName = StringTool.proper(fieldName);
		fldName = "get" + fldName;

		String ret = fldName;

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
	public void generate(String className, List<FieldSpec> fieldList, List<MethodSpec> getters, List<MethodSpec> setters) throws Exception {}

}
