package io.starter.ignite.generator.react;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.starter.ignite.generator.ReactConfigurator;

import io.starter.ignite.model.DataField;
import io.starter.ignite.security.securefield.SecureField;
import io.starter.stackgentest.model.User;
import io.starter.toolkit.StringTool;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.Extension;
import io.swagger.annotations.ExtensionProperty;

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

	private static final Class<ApiModelProperty> ANNOTATION_CLASS = ApiModelProperty.class;

	public String GENERATED_MESSAGE = "NOTE: THIS IS A STACKGEN GENERATED FILE: MAY BE OVERWRITTEN";
	public String LICENSE = "GPL 3.0";
	public String COMPANY_INFO = "Starter Inc.";
	public String CONTACT_INFO = "support@stackgen.io";

	public String appname;
	public String serverhost;
	public String serverport;
	public String objectname;
	public String objectnamevarname;
	public String objectnameupper;

	public List<Variable> variables = new ArrayList<>();
	public List<EntityObject> dataobjects = new ArrayList<>();

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
			} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				AppEntityObject.logger.error("AppEntityObject is invalid: " + s.toString());
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (!isValid()) {
				AppEntityObject.logger.warn("AppEntityObject is invalid: " + s.toString());
			}
		});

		// add variables find by annotated field
		Stream.of(cx.getDeclaredFields()).filter(s -> {
			return true;
		}).forEach(s -> {
			// processField(s);
			if (!isValid()) {
				AppEntityObject.logger.warn("AppEntityObject is invalid: " + s.toString());
			}
		});
	}

	/**
	 * set values from data object class
	 *
	 * @param s
	 * @param cx
	 */
	private void processField(Field f) {
		try {
			final SecureField fa = f.getAnnotation(AppEntityObject.SECURE_ANNOTATION_CLASS);
			final JsonProperty jf = f.getAnnotation(AppEntityObject.FIELD_ANNOTATION_CLASS);
			final DataField df = f.getAnnotation(AppEntityObject.DATA_ANNOTATION_CLASS);
			Object val = null;
			if (jf != null) {
				val = jf.value();
			} else {
				val = fa.strength();
				// logger.trace("FIELD FOUND: " + f.getName());
			}
		} catch (final SecurityException e) {
			AppEntityObject.logger.error("FIELD ERROR: " + f.getName()); // skip
		}

	}

	public static Object getAPIAnnotatedValue(Method method, String vName) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		Annotation ano = getAnnotationForMethod(method, AppEntityObject.ANNOTATION_CLASS);
		if(ano == null) {
			return null;
		}
		return ano.annotationType().getMethod(vName).invoke(ano);
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
			        if(!field.getName().equals("value") && !field.getName().contains("ENUM$VALUES")) {
			        	enumOptions += "<option>" + field.getName() + "</option> \r\n";
			        }
			    }	
			    enumOptions += "</Field> \r\n";
			}
		}
		
		Object val = getAPIAnnotatedValue(s, "example");
		boolean hidden = (Boolean)getAPIAnnotatedValue(s, "hidden");
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
						if ((int)getAPIAnnotatedValue(s, "maxLength") > 256) {
							v.variableFieldType = "as=\"textarea\"";
						} else {
							v.variableFieldType = "type=\"text\"";
						}

						break;

					case "boolean":

						v.variableFieldType = "type=\"checkbox\"";
						v.variableFieldYupSchemaType += "bool()";
						// ok here is where we would want to look up alt configured components
						// v.variableFieldType = "type=\"switch\"";
						break;

					case "integer":
						v.variableFieldYupSchemaType += "number()";
						v.variableFieldType = "type=\"text\"";
						break;

					case "float":
						v.variableFieldYupSchemaType += "number()";
						v.variableFieldType = "type=\"text\"";
						break;

					case "double":
						v.variableFieldYupSchemaType += "number()";
						v.variableFieldType = "type=\"text\"";
						break;

					case "long":
						v.variableFieldYupSchemaType += "number()";
						v.variableFieldType = "type=\"text\"";
						break;

					case "hidden":
						v.variableFieldYupSchemaType += "string()";
						v.variableFieldType = "type=\"hidden\"";
						break;

					default:
						v.variableFieldYupSchemaType = "";
						v.variableFieldType = "type=\"text\"";
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

				} catch (NoSuchFieldException | SecurityException e1) {
					e1.printStackTrace();
					throw new RuntimeException("ERROR in AppEntityObject.processMethod : " + s.toGenericString() + " :"
							+ "ERROR_AEO_PM_" + name);
				}
				v.defaultValue = getAPIAnnotatedValue(s, "example").toString();
				v.description = getAPIAnnotatedValue(s, "value").toString();
				v.required =  ((boolean) getAPIAnnotatedValue(s, "required") ? "required" : "");

				// TODO: fix hidden fields
				v.hidden = (hidden ? "hidden" : ""); // does not work?

				
				/*
				try {
					final Extension[] els = apia.extensions();
					if ((els != null) && (els[0].properties() != null)) {
						final ExtensionProperty[] p = els[0].properties();
						v.description = p[0].name();
					}
				} catch (final Exception e) {
					// this is why we don't rely on sketchy props, guys
				}*/

				// the React configuration from Swagger/OpenAPI
				// handleStackGenExtensions(v, apia);

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
	 * process datafield annotation values (extension) ie: component
	 *
	 * @param datafield
	 * @return
	 */
	private String handleStackGenExtensions(Variable v, ApiModelProperty apia) {

		// StackGen Extensions:
		final String fld = apia.dataField();

		final boolean sec = apia.secureField();
		return fld;

	}

	/**
	 * @param s
	 */
	private Object getReturnValue(Method s) {
		Object ret = null;
		switch (s.getReturnType().toString()) {
		case "long":
			ret = new Long(0l);
			break;
		case "Long":
			ret = new Long(0l);
			break;
		}
		return ret;
	}

	/**
	 * sanity check and ensure compliance with reality
	 *
	 */
	public boolean isValid() {

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
		public Class enumClass = null;
		public String enumOptions = "";
		public String fieldEndTag = "/>"; // close tags by default
		
		public String required = "";
		public String hidden = "";
		public Object variableval;
		public String variablename;
		public String validationString;
		public String defaultValue;
		public String description;

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