package io.starter.ignite.web;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.NoSuchAlgorithmException;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.starter.ignite.generator.Main;
import io.starter.ignite.generator.SwaggerGen;

public class IgniteServlet implements Servlet {

	private String					message			= "PLEASE ENTER PARAMETER: <br/><a href='?generateKey=true'>generate key</a><br/><a href='?generateService=true'>generate service</a><br/><a href='?specFile='>enter specfile</a>";

	// Ignite output root
	private static String			JAVA_GEN_FOLDER	= (System
			.getProperty("javaGenFolder") != null
					? System.getProperty("javaGenFolder")
					: "/tmp/gen/");

	protected static final Logger	logger			= LoggerFactory
			.getLogger(IgniteServlet.class);

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public ServletConfig getServletConfig() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getServletInfo() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void init(ServletConfig arg0) throws ServletException {

		// Do required initialization
		message = "Starter Ignite Generator";
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// Set response content type
		response.setContentType("text/html");

		// Actual logic goes here.
		PrintWriter out = response.getWriter();
		out.println("<h1>" + message + "</h1>");
	}

	@Override
	public void service(ServletRequest request, ServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
		response.setContentType("text/html");
		if (request.getParameter("generateKey") != null) {
			try {
				out.write("<h1>Encryption Key:</h1><br/>"
						+ Main.generateEncryptionKey(request
								.getParameter("generateKey"))
						+ "");
				out.flush();
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (request.getParameter("generateService") != null) {
			// run that junk
			swaggerPluginMerge();
		} else if (request.getParameter("specFile") != null) {
			SwaggerGen swaggerGen = new SwaggerGen(
					request.getParameter("specFile"));
			out.write("<h1>Successfully Generated:</h1><br/>"
					+ swaggerGen.generate() + " files");
			out.flush();
		} else {
			out = response.getWriter();
			out.println("<h1>" + message + "</h1>");
		}
		//

	}

	public void swaggerPluginMerge() {

		String inputJSON = "{\n"

				+ "  \"adminServerHost\": \"host name of the admin server\",\n"
				+ "  \"adminServerPort\": \"port of the admin server\",\n"
				+ "  \"javaGenPath\": \"/Users/john/workspace2018_IGNITE/IgnitePRO/tmp/gen\",\n"
				+ "  \"artifactId\": \"generio\",\n"
				+ "  \"schemaName\": \"starter\",\n"
				+ "  \"schemaFile\": \"starter_ignite.yml\",\n"
				// + " \"createdDate\": \"2019-01-13T23:52:04.918Z\",\n"
				+ "  \"dbGenDropTable\": \"true\",\n"
				+ "  \"dbHostName\": \"ls-094900477e4b2d50d66dddfaa480f1ac3415eb70.cci10ee08gpg.us-west-2.rds.amazonaws.com\",\n"
				+ "  \"dbName\": \"starter\",\n"
				+ "  \"dbPassword\": \"fr33d0m1\",\n"
				+ "  \"dbUsername\": \"igniteuser\",\n"
				+ "  \"hostName\": \"localhost\",\n"
				+ "  \"hostPort\": \"8099\",\n" + "  \"id\": \"0\",\n"
				+ "  \"starterIgniteSecureKey\": \"W3ngNBCp80mgG0wwjTslfeQoG2hQa9ryqbemTEX01Wg=\",\n"
				+ "  \"keySpec\": \"{keyOwner:111, keySource:'session | system'}\",\n"
				+ "  \"keyVersion\": \"0\",\n"
				// + " \"modifiedDate\": \"2019-01-13T23:52:04.918Z\",\n"
				+ "  \"mybatisJava\": \"" + JAVA_GEN_FOLDER
				+ "/src/main/java/io/starter/generio/model/\",\n"
				+ "  \"mybatisMain\": \"" + JAVA_GEN_FOLDER + "/src/\",\n"
				+ "  \"name\": \"GENERIO Microservice API\",\n"
				+ "  \"ownerId\": \"0\",\n"
				+ "  \"schemaData\": \"(optional) Complete OpenAPI Schema Contents...\",\n"
				+ "  \"status\": \"available\"\n" + "}";

		JSONObject job = new JSONObject(inputJSON);

		// must be done before "Configuration" instantiated for
		// first time... :/
		for (String k : job.keySet()) {
			System.setProperty(k, job.getString(k));
			logger.warn("Setting SysProp from JSON Object): " + k + ":"
					+ job.getString(k));
		}

		SwaggerGen swaggerGen = new SwaggerGen(job);
		assertNotNull(swaggerGen.generate());
	}

}
