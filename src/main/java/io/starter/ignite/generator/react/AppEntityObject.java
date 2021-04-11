package io.starter.ignite.generator.react;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Stream;

import javax.validation.constraints.Pattern;

import io.starter.ignite.generator.DBGen;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.starter.ignite.generator.ReactConfigurator;
import io.starter.ignite.generator.annotations.StackgenModelProperty;

import io.starter.ignite.model.DataField;
import io.starter.ignite.security.securefield.SecureField;

import io.starter.toolkit.StringTool;


/**
 * Contains and initializes Redux template Mapping info for a passed in
 * EntityObject. <br/>
 * Example Redux State Template Code:<code>
 * <p>
 * <p>
 * {{#objects}}
 * {{objectname}}Info:{
 * {{#variables}}
 * {{variablename}}: '{{variableval}}',
 * {{/variables}}
 * },
 * {{/objects}}
 *
 * </code>
 *
 * @author John McMahon ~ github: SpaceGhost69 | twitter: @TechnoCharms
 */
public class AppEntityObject {

	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(AppEntityObject.class);

	ReactConfigurator config;
	
	private static final Class<SecureField> SECURE_ANNOTATION_CLASS = SecureField.class;
	private static final Class<DataField> DATA_ANNOTATION_CLASS = DataField.class;
	private static final Class<JsonProperty> FIELD_ANNOTATION_CLASS = JsonProperty.class;

	private static final Class<StackgenModelProperty> ANNOTATION_CLASS = StackgenModelProperty.class;
	private static final Class<SecureField> SECURE_FIELD_ANNOTATION_CLASS = SecureField.class;
	private static final Class<DataField> DATA_FIELD_ANNOTATION_CLASS = DataField.class;
	private static final Class<Pattern> PATTERN_ANNOTATION_CLASS = Pattern.class;
	
	public String GENERATED_MESSAGE = "NOTE: THIS IS A STACKGEN GENERATED FILE: MAY BE OVERWRITTEN";
	public String LICENSE = "GPL 3.0";
	public String COMPANY_INFO = "Starter Inc.";
	public String CONTACT_INFO = "support@stackgen.io";

	public String appname;
	public String appversion;
	public String buildTimestamp;
	public String serverhost;
	public String serverport;
	public String objectname;
	public String objectnamevarname;
	public String objectnameupper;

	private static String rangeReactComponent =
			"          // value={values.{{vx}}}\n\n" +
			"          onChange={e => {\n" +
			"            this.setState({ {{vx}}: e.target.value });\n" +
			"            touched.{{vx}} = true;\n" +
			"          }}\n" +
			"          onAfterChange={e => {\n" +
			"            touched.{{vx}} = false;\n" +
			"          }}\n" +
			"          tooltip={touched.{{vx}} ? 'off' : 'on'}\n" +
			"          tooltipLabel={() => 'choose a value for {{vx}}'}\n\n" ;

	public List<Variable> variables = new ArrayList<>();
	public List<Variable> advanced = new ArrayList<>();
	
	
	public List<EntityObject> dataobjects = new ArrayList<>();
	Map<String,List<Variable>> fieldGroups = new HashMap<String,List<AppEntityObject.Variable>> ();
	
	// view-hints info stored in DataField config
	public String componentspec;

	
	private static Annotation getAnnotationForMethod(Method m, Class<?> lookingFor) {
		Annotation[] decl = m.getDeclaredAnnotations();
		for(Annotation c : decl) {
			Class<?> tn = c.annotationType();
			if(tn.toString().equals(lookingFor.toString())) {
				return c;
			}
		}
		return null;
	}
	
	private static Annotation getAnnotationForField(Field f, Class<?> lookingFor) {
		Annotation[] decl = f.getDeclaredAnnotations();
		for(Annotation c : decl) {
			Class<?> tn = c.annotationType();
			if(tn.toString().equals(lookingFor.toString())) {
				return c;
			}
		}
		return null;
	}
	
	/**
	 * add the Row groupings and group the fields together
	 * in the form output (regardless of Schema list order)
	 */
	private void processFormGroups() {
		Iterator keys = fieldGroups.keySet().iterator();
		for(List<Variable> group : fieldGroups.values()) {
			String keyName = keys.next().toString();
			Variable v1 = group.get(0);
			// advancedList.indexOf('"+ v1.variablename +"') === -1 && (
			v1.formRowStart = "{advancedList.indexOf(\"" + v1.variablename + "\") === -1  && " +
					"<Accordion><Card style={{width:'100%'}}>" +
					"<Card.Header><Accordion.Toggle as={Row} variant='link' eventKey='" +
					keyName + "' >" +
					AppEntityObject.convertToFriendly(keyName) + "</Accordion.Toggle>" +
					"</Card.Header><Accordion.Collapse eventKey=\"" +
					keyName + "\"><Card.Body><Form.Row>";
			group.get(group.size()-1).formRowEnd = "</Form.Row></Card.Body>" +
					"</Accordion.Collapse></Card></Accordion>}";

			// group the fields in the output
			int groupPos = variables.indexOf(v1);
			for(Variable vx : group){
				if(variables.remove(vx)) {
					variables.add(groupPos++, vx);
				}
			}
		}
		
	}
	
	/**
	 * Wrap a class with our JSON Redux state templated output
	 *
	 * @param cx
	 */
	public AppEntityObject(String app, Class<?> cx, ReactConfigurator cfg) {

		this.config = cfg;
		serverhost = config.defaultHostname;
		serverport = config.defaultPort;
		appname = app;
		appversion = cfg.getArtifactVersion();
		buildTimestamp = DateTimeFormatter.ofPattern("MM/dd/yyyy - hh:mm").format(ZonedDateTime.now());
		objectname = cx.getName().substring(cx.getName().lastIndexOf(".") + 1);
		objectnameupper = objectname.toUpperCase();
		objectnamevarname = String.valueOf(objectname.charAt(0)).toLowerCase() + objectname.substring(1);
		
		// add variables find by annotated method
		Stream.of(cx.getDeclaredMethods()).filter(s -> {
			Annotation decl =getAnnotationForMethod(s,AppEntityObject.ANNOTATION_CLASS);
			return decl != null;
		}).forEach(s -> {
			try {
				processMethod(s, cx);
			} catch (Exception e) {
				AppEntityObject.logger.error("AppEntityObject is invalid: " + s.toString());
				e.printStackTrace();
			}
			if (!isValid()) {
				AppEntityObject.logger.warn("AppEntityObject is invalid: " + s.toString());
			}
		});
		processFormGroups();

	}
	
	private static String[] getRegexPatternAnnotatedValue(Method mtd)
			throws Exception {
		Annotation ano =
				getAnnotationForMethod(mtd, AppEntityObject.PATTERN_ANNOTATION_CLASS);
		if(ano == null) {
			return null;
		}
		String[] px = new String[2];
		try{
			px[0] = (String) ano.annotationType().getMethod("regexp").invoke(ano);
			px[1] = (String) ano.annotationType().getMethod("message").invoke(ano);

		}catch(NoSuchMethodException e){
			logger.warn("Cant get annotation value: " + e); // normal
		}
		return px;
	}

	private static Object getAnnotatedValue(Field field, String vName, Class cx)
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		Annotation ano = 
				getAnnotationForField(field, cx);
		if(ano == null) {
			return null;
		}
		return ano.annotationType().getMethod(vName).invoke(ano);
	}

	private static Object getAPIAnnotatedValue(Method method, String vName)
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		Annotation ano = 
				getAnnotationForMethod(method, AppEntityObject.ANNOTATION_CLASS);
		if(ano == null) {
			return null;
		}
		Object ret = null;
		try{
			ret = ano.annotationType().getMethod(vName).invoke(ano);
		}catch(NoSuchMethodException e){
			logger.warn("Cant get annotation value: " + e); // normal
		}
		return ret;
	}
	
	/**
	 * set values from data object class
	 *
	 * @param s
	 * @param cx 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 *
	 */
	private void processMethod(Method s, Class<?> cx) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		
		// get a handle on any Enum setting
		Class ptype = s.getReturnType();
		Class[] allClasses = cx.getDeclaredClasses();
		
		Class enumClass  = null;
		String enumOptions = "";
		// find the parameter type in the class's enums
		for(Class<?> c : allClasses) {
			if(c.getTypeName().equals(ptype.getTypeName())) {
				enumClass = c;
				Field[] allFields = c.getDeclaredFields();
			    for (Field field : allFields) {
			        if(!field.getName().equals("value") &&
							!field.getName().contains("$VALUES")) {
			        	enumOptions += "		<option>" + field.getName() + "</option> \r\n";
			        }
			    }	
			    enumOptions += "</Field> \r\n";
			}
		}

		Class returnDataType = s.getReturnType();
		Object val = getAPIAnnotatedValue(s, "example");
		int maxLength = (int)getAPIAnnotatedValue(s, "maxLength");
		Double minimum = (Double)getAPIAnnotatedValue(s, "minimum");
		Double maximum = (Double)getAPIAnnotatedValue(s, "maximum");
		String format = (String)getAPIAnnotatedValue(s, "format");

		// ignore if undefined
		if(minimum.equals(Double.MIN_VALUE)
				&& maximum.equals(Double.MAX_VALUE)){
			minimum = null;
			maximum = null;
		}
		boolean hidden = (Boolean)getAPIAnnotatedValue(s, "hidden");
		boolean readOnly = (Boolean)getAPIAnnotatedValue(s, "readOnly");

		if (!hidden && (val != null)) {
			// logger.info("Processing : " + s.toGenericString() + " :" + val);
			val = (getReturnValue(s) != null ? getReturnValue(s) : "");
			String name = getAPIAnnotatedValue(s, "name").toString();
			if (name.equals("")) {
				name = s.getName().replaceAll("get", "");
			}
			name = StringTool.getLowerCaseFirstLetter(name);
			if (!config.HIDE_FIELD_LIST.contains(name)) {
				final Variable v = new Variable(name, val);

				Field f;
				try {
					f = s.getDeclaringClass().getDeclaredField(name);
					final String tf = f.getType().toString();
					v.variableType = tf.substring(tf.lastIndexOf(".") + 1).toLowerCase();
					v.variableFieldYupSchemaType = name + " : yup.";
					switch (v.variableType) {

					case "string":
						v.variableFieldYupSchemaType += "string()";
						if (maxLength > 256) {
							v.variableFieldType = "as=\"textarea\"";
							v.extraClassName = "bigEditor";
						} else {
							v.variableFieldType = "type=\"text\"";
						}
						if(readOnly)
							v.variableFieldType += " readonly ";

						break;

					case "boolean":

						v.variableFieldType = "type=\"checkbox\"";
						if(readOnly)
							v.variableFieldType += " readonly ";

						v.variableFieldYupSchemaType += "bool()";
						// ok here is where we would want to look up alt configured components
						// v.variableFieldType = "type=\"switch\"";
						break;

					case "hidden":
						v.variableFieldYupSchemaType += "string()";
						v.variableFieldType = "type=\"hidden\"";
						break;

					case "integer":
					case "double":
					case "float":
					case "long":
						if(maximum != null && minimum != null){ // use slider
							v.variableFieldType = " type=\"range\" " + rangeReactComponent.replace("{{vx}}", v.variablename )+ " min={"+ minimum +"} max={"+ maximum +"} ";
						}else {
							v.variableFieldType = "type=\"text\"";
						}
						v.variableFieldYupSchemaType += "number()";
						if(readOnly)
							v.variableFieldType += " readonly ";

						break;

					default:
						v.variableFieldYupSchemaType = "";
						v.variableFieldType = "type=\"text\"";
						if(readOnly)
							v.variableFieldType += " readonly ";

						break;

					}

					// handle enums
					if(enumClass != null) {
						logger.info("Setting Enum Options: " + enumOptions);
						v.variableFieldType = "as=\"select\"";
						v.enumOptions = enumOptions;
						v.enumClass = enumClass;
						v.fieldEndTag = ">"; // do no close the field end tag
					}
					
					if (!v.variableFieldYupSchemaType.equals("")) {
						if ((boolean)getAPIAnnotatedValue(s, "required")) {
							v.variableFieldYupSchemaType += ".required()";
						}
						v.variableFieldYupSchemaType += ",";
					}
					String[] regexpValidation = getRegexPatternAnnotatedValue(s);
					if (regexpValidation != null) {
					    // TODO: implement JSON schema validation here (for JSON pattern fields)
						if(format.equalsIgnoreCase("json")) {
							v.schemaValidationString = regexpValidation[0];
						} else if(format.equalsIgnoreCase("markdown")){
								v.schemaValidationString = regexpValidation[0];
						} else {
							v.validationString = regexpValidation[0];
							v.validationFailedMessage = "TODO: implement pattern regexp fail message"; //regexpValidation[1];
							v.variableFieldYupSchemaType = v.variablename + ": yup.string().matches(/";
							v.variableFieldYupSchemaType += regexpValidation[0];
							v.variableFieldYupSchemaType += "/,'" + regexpValidation[1] + "'),";
						}
					}
					

				} catch (Exception e1) {
					e1.printStackTrace();
					throw new RuntimeException("ERROR in AppEntityObject.processMethod : " + s.toGenericString() + " :"
							+ "ERROR_AEO_PM_" + name);
				}
				v.defaultValue = getAPIAnnotatedValue(s, "example").toString();
				v.description = getAPIAnnotatedValue(s, "value").toString();
				v.required =  ((boolean) getAPIAnnotatedValue(s, "required") ? "required" : "");

				// TODO: fix hidden fields
				v.hidden = (hidden ? "hidden" : ""); // does not work?

				
				// the React configuration from Swagger/OpenAPI
                Boolean advancedField = (Boolean)AppEntityObject.getAnnotatedValue(f, "advanced", AppEntityObject.DATA_FIELD_ANNOTATION_CLASS);
                if(advancedField!=null && advancedField){
                    advanced.add(v);
                }
				String fieldGroupConfig = (String)AppEntityObject.getAnnotatedValue(f, "fieldGroup", AppEntityObject.DATA_FIELD_ANNOTATION_CLASS);
				if(fieldGroupConfig != null && !fieldGroupConfig.equals("")){
					// extract the form group for this item
					logger.trace("fieldGroupConfig for: " + v +":" + fieldGroupConfig);
					v.fieldGroup = fieldGroupConfig;
					List<Variable> fgList = fieldGroups.get(fieldGroupConfig);
					if(fgList == null) {
						fgList = new ArrayList<Variable>();
					}
					fgList.add(v);
					fieldGroups.put(fieldGroupConfig, fgList);
				}
				
				String componentConfig = (String)AppEntityObject.getAnnotatedValue(f, "component", AppEntityObject.DATA_FIELD_ANNOTATION_CLASS);
				if(componentConfig != null && !componentConfig.equals("")){
					// extract the form group for this item
					logger.trace("componentConfig for: " + v +":" + componentConfig);
					if(returnDataType.equals(OffsetDateTime.class)) {
						v.component = " type=\"" + componentConfig + "\"";
					}else {
						v.component = " as={" + componentConfig + "}";
					}
				}

				if(format.equalsIgnoreCase("json")){
					v.variableFieldType = "as={JsonComponent}";
				}else if(format.equalsIgnoreCase("markdown")){
					v.variableFieldType = "as={MarkdownComponent}";
				}else if(format.equalsIgnoreCase("password")){
					v.variableFieldType = "type=\"password\"";
				}
				Object secureFieldType = AppEntityObject.getAnnotatedValue(f, "type", AppEntityObject.SECURE_FIELD_ANNOTATION_CLASS);
				
				if(secureFieldType != null){
					try {
						int secureFieldStrength = (int) AppEntityObject.getAnnotatedValue(f, "strength", AppEntityObject.SECURE_FIELD_ANNOTATION_CLASS);
						
						// extract the form group for this item
						logger.warn("SecureField Type for: " + v +":" + secureFieldType + " Strength: " + secureFieldStrength);
						
						// if it is a HASHED then it's a password, use password field
						if((secureFieldType).toString().equals("HASHED")){
							v.variableFieldType = "type=\"password\"";
						}
					}catch(Exception e) {
						// normal, secureField set with defaults
					}
					// strength... does it affect UI ever?
				}

				// handle the special cases
				if(returnDataType.equals(OffsetDateTime.class)){
				//	v.variableFieldYupSchemaType += v.variablename + ": date(),";
					v.variableFieldType = "type=\"datetime-local\"";
				}
				if(!v.component.equals("")){
					v.variableFieldType = v.component;
				}
				if(v.variablename.equalsIgnoreCase("id")){
					v.variableFieldYupSchemaType = "";
				}
				variables.add(v);
			}

		} else {
			if (hidden) {
				AppEntityObject.logger.warn("Skipping Hidden Field: " + s.toGenericString() + " :" + val);
			} else {
				AppEntityObject.logger.error("Skipping Field Possible Error: " + s.toGenericString() + " :" + val);
			}

		}
	}

	/**
	 * @param s
	 */
	private Object getReturnValue(Method s) {
		Object ret = null;
		switch (s.getReturnType().toString()) {
		case "long":
			ret = 0l;
			break;
		case "Long":
			ret = 0l;
			break;
		}
		return ret;
	}

	/**
	 * sanity check and ensure compliance with reality
	 *
	 */
	private boolean isValid() {

		if (appname == null) {
			return false;
		}

		if (objectname == null) {
			return false;
		}

		if (objectnameupper == null) {
			return false;
		}

		return true;
	}

	/**
	 * provide pretty representation
	 */
	@Override
	public String toString() {
		String sbout = "AppEntityObject: " + objectname + "\r\n";
		for (final Variable v : variables) {
			sbout += v.toString() + "\r\n";
		}
		return sbout;
	}

	public static class Variable {

		// enumhandling
		public Class<?> enumClass = null;
		public String enumOptions = "";
		public String fieldEndTag = "/>"; // close tags by default
		
		public String required = "";
		public String hidden = "";
		public Object variableval;
		public String variablename;
		public String validationString;
		public String validationFailedMessage;
		public String defaultValue;
		public String description;

		public String fieldGroup = "";
		public String component = "";
		public String formRowStart = "";
		public String formRowEnd = "";
		
		public String variableType = ""; // simple string of Javascript data type (string, number, object)
		public String variableFieldType = ""; // the 'type="text"' output text
		public String variableFieldYupSchemaType = ""; // the Yup schema data type

		// StackGen Extensions
		public String secure;
		public String dataField;
		public String componentView;
		public String componentList;
		public String componentEdit;
		public String componentAdd;
		public String componentLookup;
		public String displayName;
		public String extraClassName;
		public String schemaValidationString; // used by JSON and YAML to validate (provided as a URL or literal)

		Variable(String variablename, Object variableval) {
			this.variablename = variablename;
			displayName = AppEntityObject.convertCamelToFriendly(variablename);
			this.variableval = variableval;
		}

		@Override
		public String toString() {
			return variablename + " : " + variableval;
		}
	}

	public static String convertToFriendly(String camelin) {
		camelin = camelin.replace("_", " ");
		camelin = camelin.replace("-", " ");

		final char[] chars = camelin.toCharArray();
		final StringBuffer buf = new StringBuffer();
		for (int i = 0; i < chars.length; i++) {
			// if there is a single upper-case letter, then it's a
			// case-word

			if ((i > 0) && ((i + 1) < chars.length)) {
				if(Character.isWhitespace(chars[i - 1])) {
					buf.append(Character.toUpperCase(chars[i]));
				}else{
					buf.append(chars[i]);
				}
			} else if (i == 0) {
				buf.append(Character.toUpperCase(chars[i]));
			} else {
				buf.append(Character.toLowerCase(chars[i]));
			}
		}
		return buf.toString();
	}

	public static String convertCamelToFriendly(String camelin) {
		final char[] chars = camelin.toCharArray();
		final StringBuffer buf = new StringBuffer();
		for (int i = 0; i < chars.length; i++) {
			// if there is a single upper-case letter, then it's a
			// case-word
			if (Character.isUpperCase(chars[i])) {
				if ((i > 0) && ((i + 1) < chars.length)) {
					if (Character.isLowerCase(chars[i - 1])) {
						buf.append(" ");
						buf.append(Character.toUpperCase(chars[i]));
					}
				}
			} else if (i == 0) {
				buf.append(Character.toUpperCase(chars[i]));
			} else {
				buf.append(Character.toLowerCase(chars[i]));
			}
		}
		return buf.toString();
	}

}