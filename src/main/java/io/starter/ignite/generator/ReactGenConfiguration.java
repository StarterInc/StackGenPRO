package io.starter.ignite.generator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import io.starter.ignite.generator.react.AppEntityObject;

/**
 * Global Configuration
 * 
 * The following values can be set as System properties or on the command line:
 * 
 * @author John McMahon (@TechnoCharms)
 *
 */
public interface ReactGenConfiguration extends Configuration {

	// ## React

	public static List<String>		SKIP_LIST						= new ArrayList<>(
			Arrays.asList(".class"));

	public static String			REACT_APP_NAME					= (System
			.getProperty("REACT_APP_NAME") != null
					? System.getProperty("REACT_APP_NAME")
					: "SimpleCMS");

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
					: rootFolder + "/gen/REACT_EXPORT/");

	public static String			REACT_APP_OUTPUT_FOLDER			= rootFolder
			+ "/tmp/react/";

	public List<AppEntityObject>	REACT_DATA_OBJECTS				= new ArrayList<AppEntityObject>();
}