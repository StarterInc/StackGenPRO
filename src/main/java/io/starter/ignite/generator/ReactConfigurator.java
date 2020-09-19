package io.starter.ignite.generator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import io.starter.ignite.generator.react.AppEntityObject;
import io.starter.ignite.util.SystemConstants;

/**
 * 
 * @author John McMahon ~ github: SpaceGhost69 | twitter: @TechnoCharms
 *
 */
public class ReactConfigurator extends StackGenConfigurator{
	// ## React

		/**
	 * 
	 */
	private static final long serialVersionUID = 1333322222L;

		List<String> SKIP_LIST = new ArrayList<>(Arrays.asList(".class"));

		String[] hideFields = { "ownerId", "keySpec", "keyVersion" };

		public List<String> HIDE_FIELD_LIST = new ArrayList<>(Arrays.asList(hideFields));

		// default is to NOT geneerate the whole shebang...
		boolean skipBackendGen = (System.getProperty("skipBackendGen") != null ? Boolean.getBoolean("skipBackendGen")
				: true);

		public String REACT_APP_NAME = (System.getProperty("REACT_APP_NAME") != null ? System.getProperty("REACT_APP_NAME")
				: "StackGen");

		String REACT_TEMPLATE_FOLDER = (System.getProperty("REACT_TEMPLATE_FOLDER") != null
				? System.getProperty("REACT_TEMPLATE_FOLDER")
				: SystemConstants.rootFolder + "/" + ReactConfigurator.getSourceResources() + "/templates/react/");

		String REACT_TEMPLATE_SOURCES_FOLDER = REACT_TEMPLATE_FOLDER + "sources/js";

		// external React Project Path
		String REACT_EXPORT_FOLDER = (System.getProperty("REACT_EXPORT_FOLDER") != null
				? System.getProperty("REACT_EXPORT_FOLDER")
				: getGenOutputFolder() + "/src/main/react/");

		String REACT_APP_OUTPUT_FOLDER = (System.getProperty("REACT_APP_OUTPUT_FOLDER") != null
				? System.getProperty("REACT_APP_OUTPUT_FOLDER")
				: SystemConstants.rootFolder + "/tmp/REACT_EXPORT/");

		List<AppEntityObject> REACT_DATA_OBJECTS = new ArrayList<>();
}