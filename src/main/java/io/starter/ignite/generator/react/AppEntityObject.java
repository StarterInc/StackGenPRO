package io.starter.ignite.generator.react;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.starter.ignite.generator.ReactGenConfiguration;
import io.starter.ignite.model.DataField;
import io.starter.ignite.security.securefield.SecureField;
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
public class AppEntityObject implements ReactGenConfiguration {

	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(AppEntityObject.class);

	private static final Class<SecureField> SECURE_ANNOTATION_CLASS = SecureField.class;
	private static final Class<DataField> DATA_ANNOTATION_CLASS = DataField.class;
	private static final Class<JsonProperty> FIELD_ANNOTATION_CLASS = JsonProperty.class;

	private static final Class<ApiModelProperty> ANNOTATION_CLASS = ApiModelProperty.class;

	public String GENERATED_MESSAGE = "NOTE: THIS IS A STACKGEN GENERATED FILE: MAY BE OVERWRITTEN";
	public String LICENSE = "GPL 3.0";
	public String COMPANY_INFO = "Starter Inc.";
	public String CONTACT_INFO = "support@stackgen.io";

	public String appname;
	public String serverhost = ReactGenConfiguration.defaultHostname;
	public String serverport = ReactGenConfiguration.defaultPort;
	public String objectname;
	public String objectnamevarname;
	public String objectnameupper;

	public List<Variable> variables = new ArrayList<>();
	public List<EntityObject> dataobjects = new ArrayList<>();

	// view-hints info stored in DataField config
	public String componentspec;

	/**
	 * Wrap a class with our JSON Redux state templated output
	 *
	 * @param cx
	 */
	public AppEntityObject(String app, Class<?> cx) {

		appname = app;
		objectname = cx.getName().substring(cx.getName().lastIndexOf(".") + 1);
		objectnameupper = objectname.toUpperCase();
		objectnamevarname = String.valueOf(objectname.charAt(0)).toLowerCase() + objectname.substring(1);

		// add variables find by annotated method
		Stream.of(cx.getDeclaredMethods()).filter(s -> {
			return (s.getAnnotation(AppEntityObject.ANNOTATION_CLASS)) != null;
		}).forEach(s -> {
			processMethod(s);
			if (!isValid()) {
				AppEntityObject.logger.error("WARNING: AppEntityObject is invalid: " + s.toString());
			}
		});

		// add variables find by annotated method
		Stream.of(cx.getDeclaredFields()).filter(s -> {
			return true;
		}).forEach(s -> {
			processField(s);
			if (!isValid()) {
				AppEntityObject.logger.error("WARNING: AppEntityObject is invalid: " + s.toString());
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

	/**
	 * set values from data object class
	 *
	 * @param s
	 *
	 */
	private void processMethod(Method s) {
		final JsonProperty jf = s.getAnnotation(AppEntityObject.FIELD_ANNOTATION_CLASS);
		final ApiModelProperty apia = s.getAnnotation(AppEntityObject.ANNOTATION_CLASS);
		final DataField df = s.getAnnotation(AppEntityObject.DATA_ANNOTATION_CLASS);
		Object val = null;
		if (jf != null) {
			val = jf.value();
		} else {
			val = apia.example();
		}
		if (!apia.hidden() && (val != null)) {
			// logger.info("Processing : " + s.toGenericString() + " :" + val);
			val = (getReturnValue(s) != null ? getReturnValue(s) : "");
			String name = apia.name();
			if (name.equals("")) {
				name = s.getName().replaceAll("get", "");
			}
			name = StringTool.getLowerCaseFirstLetter(name);
			if (!ReactGenConfiguration.HIDE_FIELD_LIST.contains(name)) {
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
						if (apia.maxLength() > 256) {
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

					if (!v.variableFieldYupSchemaType.equals("")) {
						if (apia.required()) {
							v.variableFieldYupSchemaType += ".required()";
						}
						v.variableFieldYupSchemaType += ",";
					}

				} catch (NoSuchFieldException | SecurityException e1) {
					e1.printStackTrace();
					throw new RuntimeException("ERROR in AppEntityObject.processMethod : " + s.toGenericString() + " :"
							+ "ERROR_AEO_PM_" + name);
				}
				v.defaultValue = apia.example();
				v.description = apia.value();
				v.required = (apia.required() ? "required" : "");

				// TODO: fix hidden fields
				v.hidden = (apia.hidden() ? "hidden" : ""); // does not work?

				try {
					final Extension[] els = apia.extensions();
					if ((els != null) && (els[0].properties() != null)) {
						final ExtensionProperty[] p = els[0].properties();
						v.description = p[0].name();
					}
				} catch (final Exception e) {
					// this is why we don't rely on sketchy props, guys
				}

				// the React configuration from Swagger/OpenAPI
				handleStackGenExtensions(v, apia);

				variables.add(v);
			}

		} else {
			if (!apia.hidden()) {
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

	static class Variable {

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