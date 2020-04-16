package io.starter.ignite;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;
import java.security.NoSuchAlgorithmException;

import org.junit.Before;
import org.junit.Test;

import io.starter.stackgentest.model.User;
import io.starter.ignite.generator.ReactGenConfiguration;
import io.starter.ignite.generator.react.AppEntityObject;
import io.starter.ignite.generator.react.AppEntityObject.Variable;
import io.starter.ignite.security.crypto.EncryptionUtil;

public class EnumTest {

	@Before
	public void setup() throws NoSuchAlgorithmException {
		// transient encryption key
		final String stx = EncryptionUtil.generateKey();

		System.setProperty("starterIgniteSecureKey", stx);
	}

	@Test
	public void testEnumsListed() {
		final User s = new User();
		
		final AppEntityObject ap = new AppEntityObject(ReactGenConfiguration.REACT_APP_NAME, s.getClass());
		
		assertEquals("There should be 18 fields on this User object", ap.variables.size(), 18);
		
		Class enumClass = null;
		for(Variable v : ap.variables) {
			if(v.enumClass != null) {
				enumClass = v.enumClass;
			}
		}
		assertEquals("The enumClass should be set for status variable: " , enumClass.getTypeName(), "io.starter.stackgentest.model.User$StatusEnum"); // always the same index here?
	}

}