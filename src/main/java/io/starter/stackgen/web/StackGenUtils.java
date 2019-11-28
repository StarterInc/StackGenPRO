package io.starter.stackgen.web;

import java.io.IOException;
import java.net.URL;

import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class StackGenUtils {
	public String			message;

	public static String	API_JSON_URL	= "/api-docs";

	public StackGenUtils(String message) {
		this.message = message;
	}

	/**
	 * 
	 * @param hostURL the host to load the api schema
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	public static JSONObject loadSchema(String hostURL) throws JsonParseException, JsonMappingException, IOException {

		// Connect to the URL using java's native library
		URL url = new URL(hostURL);

		// Convert to a JSON object to print data
		ObjectMapper mapper = new ObjectMapper();
		// Don't fail on incoming JSON missing fields
		mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

		return mapper.readValue(url, JSONObject.class);
	}
}