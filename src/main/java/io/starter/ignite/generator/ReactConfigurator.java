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

	private static final long serialVersionUID = 1333322222L;

		List<String> SKIP_LIST = new ArrayList<>(Arrays.asList(".class"));

		String[] hideFields = { "ownerId", "keySpec", "keyVersion" };

		public List<String> HIDE_FIELD_LIST = new ArrayList<>(Arrays.asList(hideFields));

		// default is to NOT geneerate the whole shebang...
		public boolean skipBackendGen =  Boolean.parseBoolean(SystemConstants.getValueOrDefault("skipBackendGen" , "false"));

		public String REACT_APP_NAME = SystemConstants.getValueOrDefault("REACT_APP_NAME" , "StackGen Generated App");

		public String REACT_TEMPLATE_FOLDER = SystemConstants.getValueOrDefault("REACT_TEMPLATE_FOLDER", "");

				// (SystemConstants.getValue("REACT_TEMPLATE_FOLDER") != null
				//? SystemConstants.getValue("REACT_TEMPLATE_FOLDER")
				// : SystemConstants.rootFolder + "/" + ReactConfigurator.getSourceResources() + "/templates/react/");

		// external React Project Path
		public String REACT_EXPORT_FOLDER = SystemConstants.getValueOrDefault("REACT_EXPORT_FOLDER", getGenOutputFolder() + "/REACT_EXPORT/");

		private String root;
		private String genOutFolder;

		@Override
		public String getGenOutputFolder() {
			if(this.genOutFolder != null){
				return this.genOutFolder;
			}
			String outputDir = SystemConstants.getValue("genOutputFolder");
			return (outputDir != null ? outputDir : getRootFolder() + getJavaGenFolderName());
		}

		public String REACT_APP_OUTPUT_FOLDER = SystemConstants.getValueOrDefault("REACT_APP_OUTPUT_FOLDER", getRootFolder() + "/REACT_OUTPUT/");

		private String getRootFolder(){
			if(this.root != null){
				return this.root;
			}
			return SystemConstants.rootFolder;
		}
		public void setRootFolder(String rootFolder){
			this.root = rootFolder;
		}
		public void setGenOutFolder(String genOutFolder){
			this.genOutFolder = genOutFolder;
		}

		List<AppEntityObject> REACT_DATA_OBJECTS = new ArrayList<>();
}