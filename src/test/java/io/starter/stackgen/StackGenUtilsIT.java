package io.starter.stackgen;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import io.starter.ignite.generator.react.AppEntityObject;
import io.starter.stackgen.web.StackGenUtils;

public class StackGenUtilsIT {

	@Test
	public void testCamelToFriendly() throws JsonParseException, JsonMappingException, IOException {

		final String input = "someReallyLongVarname";
		final String output = AppEntityObject.convertCamelToFriendly(input);

		Assert.assertEquals(output, "Some Really Long Varname");

	}

	@Test
	@Ignore
	public void testInstantiateSchemaFromURL() throws JsonParseException, JsonMappingException, IOException {

		final String hostURL = "https://sgdev.stackgen.io:8443/api-docs";
		final JSONObject job = StackGenUtils.loadSchema(hostURL);
		Assert.assertNotNull(job);

	}
}
