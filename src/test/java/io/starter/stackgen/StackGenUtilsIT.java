package io.starter.stackgen;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.json.JSONObject;
import org.junit.Ignore;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import io.starter.stackgen.web.StackGenUtils;

public class StackGenUtilsIT {

	@Test
	@Ignore
	public void testInstantiateSchemaFromURL() throws JsonParseException, JsonMappingException, IOException {

		String hostURL = "https://sgdev.stackgen.io:8443/api-docs";
		JSONObject job = StackGenUtils.loadSchema(hostURL);
		assertNotNull(job);

	}
}
