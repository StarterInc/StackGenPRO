package io.starter.ignite.generator.react;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.starter.ignite.generator.ReactGenConfiguration;
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
 * @author John McMahon (@TechnoCharms)
 */
public class AppEntityObject implements ReactGenConfiguration {

	private static final org.slf4j.Logger			logger					= LoggerFactory
			.getLogger(AppEntityObject.class);

	private static final Class<SecureField>			SECURE_ANNOTATION_CLASS	= SecureField.class;
	private static final Class<JsonProperty>		FIELD_ANNOTATION_CLASS	= JsonProperty.class;
	private static final Class<ApiModelProperty>	ANNOTATION_CLASS		= ApiModelProperty.class;

	public String									appname;
	public String									serverhost				= ReactGenConfiguration.defaultHostname;
	public String									serverport				= ReactGenConfiguration.defaultPort;
	public String									objectname;
	public String									objectnamevarname;
	public String									objectnameupper;

	public List<Variable>							variables				= new ArrayList<Variable>();
	public List<EntityObject>						dataobjects				= new ArrayList<EntityObject>();

	/**
	 * Wrap a class with our JSON Redux state templated output
	 *
	 * @param cx
	 */
	public AppEntityObject(String app, Class<?> cx) {

		appname = app;
		objectname = cx.getName().substring(cx.getName().lastIndexOf(".") + 1);
		objectnameupper = objectname.toUpperCase();
		objectnamevarname = String.valueOf(objectname.charAt(0)).toLowerCase()
				+ objectname.substring(1);

		// add variables find by annotated method
		Stream.of(cx.getDeclaredMethods()).filter(s -> {
			return (s.getAnnotation(ANNOTATION_CLASS)) != null;
		}).forEach(s -> {
			processMethod(s);
			if (!isValid())
				logger.error("WARNING: AppEntityObject is invalid: "
						+ s.toString());
		});
		// add variables find by annotated method
		Stream.of(cx.getDeclaredFields()).filter(s -> {
			return true;
		}).forEach(s -> {
			processField(s);
			if (!isValid())
				logger.error("WARNING: AppEntityObject is invalid: "
						+ s.toString());
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

			logger.warn("FIELD FOUND: " + f.getName());

			SecureField fa = f.getAnnotation(SECURE_ANNOTATION_CLASS);
			JsonProperty jf = f.getAnnotation(FIELD_ANNOTATION_CLASS);
			Object val = null;
			if (jf != null)
				val = jf.value();
			else
				val = fa.strength();

			logger.warn("FIELD FOUND: " + f.getName());

		} catch (SecurityException e) {

			logger.error("FIELD ERROR: " + f.getName()); // skip
		}

	}

	/**
	 * set values from data object class
	 *
	 * @param s
	 * @param cx 
	 */
	private void processMethod(Method s) {

		JsonProperty jf = s.getAnnotation(FIELD_ANNOTATION_CLASS);
		ApiModelProperty apia = s.getAnnotation(ANNOTATION_CLASS);

		Object val = null;
		if (jf != null)
			val = jf.value();
		else
			val = apia.example();

		if (!apia.hidden() && val != null) {
			logger.info("Processing : " + s.toGenericString() + " :" + val);

			val = (getReturnValue(s) != null ? getReturnValue(s) : "");
			String name = apia.name();
			if (name.equals("")) {
				name = s.getName().replaceAll("get", "");
			}
			name = StringTool.getLowerCaseFirstLetter(name);

			if (!HIDE_FIELD_LIST.contains(name)) {
				Variable v = new Variable(name, val);
				v.defaultValue = apia.example();
				v.description = apia.value();
				v.required = apia.required();

				try {
					Extension[] els = apia.extensions();
					if (els != null && els[0].properties() != null) {
						ExtensionProperty[] p = els[0].properties();
						// v.description = p[0].name();
					}
				} catch (Exception e) {
					; // this is why we don't rely on sketchy props, smartbear
				}
				v.variableType = ("".equals(apia.dataType()) ? v.variableType
						: apia.dataType());

				variables.add(v);
			}

		} else {
			logger.error("Skipping Invalid : " + s.toGenericString() + " :"
					+ val);
		}

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
	 * @return
	 */
	public boolean isValid() {

		if (appname == null)
			return false;

		if (objectname == null)
			return false;

		if (objectnameupper == null)
			return false;

		return true;
	}

	/**
	 * provide pretty representation
	 */
	@Override
	public String toString() {
		String sbout = "AppEntityObject: " + this.objectname + "\r\n";
		for (Variable v : variables) {
			sbout += v.toString() + "\r\n";
		}
		return sbout;
	}

	static class Variable {

		public boolean	required		= false;
		public Object	variableval;
		public String	variablename;
		public String	validationString;
		public String	defaultValue;
		public String	description;
		public Object	variableType	= "string";

		Variable(String variablename, Object variableval) {
			this.variablename = variablename;
			this.variableval = variableval;
		}

		@Override
		public String toString() {
			return this.variablename + " : " + this.variableval;
		}
	}
}