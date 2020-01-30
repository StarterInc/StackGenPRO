package io.starter.ignite.generator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import io.starter.ignite.generator.react.AppEntityObject;
import io.starter.ignite.util.SystemConstants;

/**
 * Global Configuration
 * <p>
 * The following values can be set as System properties *BEFORE THIS CLASS IS
 * REFERENED*
 * <p>
 * or on the command line:
 *
 * @author John McMahon ~ github: SpaceGhost69 | twitter: @TechnoCharms
 */
public interface ReactGenConfiguration extends Configuration {

	// ## React

	List<String> SKIP_LIST = new ArrayList<>(Arrays.asList(".class"));

	String[] hideFields = { "ownerId", "keySpec", "keyVersion" };

	List<String> HIDE_FIELD_LIST = new ArrayList<>(Arrays.asList(ReactGenConfiguration.hideFields));

	// default is to NOT geneerate the whole shebang...
	boolean skipBackendGen = (System.getProperty("skipBackendGen") != null ? Boolean.getBoolean("skipBackendGen")
			: true);

	String REACT_APP_NAME = (System.getProperty("REACT_APP_NAME") != null ? System.getProperty("REACT_APP_NAME")
			: "StackGen");

	String REACT_TEMPLATE_FOLDER = (System.getProperty("REACT_TEMPLATE_FOLDER") != null
			? System.getProperty("REACT_TEMPLATE_FOLDER")
			: SystemConstants.rootFolder + Configuration.SOURCE_RESOURCES + "/templates/react/");

	String REACT_TEMPLATE_APP_FOLDER = ReactGenConfiguration.REACT_TEMPLATE_FOLDER + "IgniteApp/js";

	String REACT_TEMPLATE_SOURCES_FOLDER = ReactGenConfiguration.REACT_TEMPLATE_FOLDER + "sources/js";

	// external React Project Path
	String REACT_EXPORT_FOLDER = (System.getProperty("REACT_EXPORT_FOLDER") != null
			? System.getProperty("REACT_EXPORT_FOLDER")
			: Configuration.genOutputFolder + "/src/main/react/");

	String REACT_APP_OUTPUT_FOLDER = (System.getProperty("REACT_APP_OUTPUT_FOLDER") != null
			? System.getProperty("REACT_APP_OUTPUT_FOLDER")
			: SystemConstants.rootFolder + "/tmp/REACT_EXPORT/");

	List<AppEntityObject> REACT_DATA_OBJECTS = new ArrayList<>();
}
