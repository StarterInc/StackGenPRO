package io.starter.ignite;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.json.JSONObject;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import io.starter.ignite.web.StackGenUtils;

public class StackGenUtilsIT {

	@Test
	public void testInstantiateSchemaFromURL() throws JsonParseException, JsonMappingException, IOException {

		String hostURL = "http://localhost:8100/api-docs";
		JSONObject job = StackGenUtils.loadSchema(hostURL);
		assertNotNull(job);

	}

	// testX
	@Test
	public void testX() throws JsonParseException, JsonMappingException, IOException {

		String hostURL = "http://localhost:8100/api-docs";
		JSONObject job = StackGenUtils.loadSchema(hostURL);

		assertNotNull(job);

	}

}
