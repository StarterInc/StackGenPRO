package io.starter.ignite;

import io.starter.ignite.generator.ReactConfigurator;
import io.starter.ignite.generator.react.AppEntityObject;
import io.starter.ignite.generator.react.AppEntityObject.Variable;
import io.starter.ignite.security.crypto.EncryptionUtil;
import io.starter.stackgentest.model.User;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static org.junit.Assert.assertEquals;

public class EnumTest {

    ReactConfigurator config = new ReactConfigurator();

    @Before
    public void setup() throws NoSuchAlgorithmException {
        // transient encryption key
        final String stx = EncryptionUtil.generateKey();

        System.setProperty("starterIgniteSecureKey", stx);
    }

    @Test
    @Ignore
    public void testEnumsListed() throws NoSuchAlgorithmException {
        final User s = new User();
        // transient encryption key
        final String stx = EncryptionUtil.generateKey();

        System.setProperty("starterIgniteSecureKey", stx);
        final AppEntityObject ap = new AppEntityObject(config.REACT_APP_NAME, s.getClass(), config);

        assertEquals("There should be 18 fields on this User object", ap.variables.size(), 18);

        Class enumClass = null;
        for (Variable v : ap.variables) {
            if (v.enumClass != null) {
                enumClass = v.enumClass;
            }
        }
        assertEquals("The enumClass should be set for status variable: ", enumClass.getTypeName(), "io.starter.stackgentest.model.User$StatusEnum"); // always the same index here?
    }

}