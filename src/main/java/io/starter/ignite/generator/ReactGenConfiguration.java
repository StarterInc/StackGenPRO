package io.starter.ignite.generator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import io.starter.ignite.generator.react.AppEntityObject;

/**
 * Global Configuration
 * <p>
 * The following values can be set as System properties *BEFORE THIS CLASS IS REFERENED*
 * <p>
 * or on the command line:
 *
 * @author John McMahon ~ github: SpaceGhost69 | twitter: @TechnoCharms
 */
public interface ReactGenConfiguration extends Configuration {

	// ## React

	public static List<String>		SKIP_LIST						= new ArrayList<>(
			Arrays.asList(".class"));

	static String[]					hideFields						= {
			"createdDate", "modifiedDate", "ownerId", "keySpec", "keyVersion" };

	public static List<String>		HIDE_FIELD_LIST					= new ArrayList<>(
			Arrays.asList(hideFields));

	// default is to NOT geneerate the whole shebang...
	public static boolean			REACT_SKIP_STACKGEN				= (System
			.getProperty("REACT_SKIP_STACKGEN") != null
					? Boolean.getBoolean("REACT_SKIP_STACKGEN")
					: true);

	public static String			REACT_APP_NAME					= (System
			.getProperty("REACT_APP_NAME") != null
					? System.getProperty("REACT_APP_NAME")
					: "StackGen");

	public static String			REACT_TEMPLATE_FOLDER			= (System
			.getProperty("REACT_TEMPLATE_FOLDER") != null
					? System.getProperty("REACT_TEMPLATE_FOLDER")
					: rootFolder + SOURCE_RESOURCES + "/templates/react/");

	public static String			REACT_TEMPLATE_APP_FOLDER		= REACT_TEMPLATE_FOLDER
			+ "IgniteApp/js";

	public static String			REACT_TEMPLATE_SOURCES_FOLDER	= REACT_TEMPLATE_FOLDER
			+ "sources/js";

	// external React Project Path
	public static String			REACT_EXPORT_FOLDER				= (System
			.getProperty("REACT_EXPORT_FOLDER") != null
					? System.getProperty("REACT_EXPORT_FOLDER")
					: genOutputFolder + "/src/main/react/");

	public static String			REACT_APP_OUTPUT_FOLDER			= (System
			.getProperty("REACT_APP_OUTPUT_FOLDER") != null
					? System.getProperty("REACT_APP_OUTPUT_FOLDER")
					: rootFolder + "/tmp/REACT_EXPORT/");

	public List<AppEntityObject>	REACT_DATA_OBJECTS				= new ArrayList<AppEntityObject>();
}
