package com.vroomengine;

import static org.junit.Assert.*;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.SocketException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Dur;
import net.fortuna.ical4j.model.ParameterList;
import net.fortuna.ical4j.model.Property;
import net.fortuna.ical4j.model.ValidationException;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.parameter.PartStat;
import net.fortuna.ical4j.model.property.Attendee;
import net.fortuna.ical4j.model.property.Description;
import net.fortuna.ical4j.model.property.Summary;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.osaf.caldav4j.exceptions.CalDAV4JException;
import org.osaf.caldav4j.util.ICalendarUtils;

/**
 * TODO: Connect to a CalDav Server and perform the normal operations
 * 
 * TODO: connect to various implementations
 * 
 * basecamp:
 * https://github.com/basecamp/bcx-api/blob/master/sections/calendar_events.md
 * GCal: https://developers.google.com/google-apps/calendar/caldav/v2/guide#
 * connecting_to_googles_caldav_server
 * 
 * 
 * @author John McMahon ~ github: SpaceGhost69 | twitter: @TechnoCharms
 * 
 */
public class TestCalDAV {
	private static Base64 base64 = new Base64();

	// Google test calendar URL
	// https://apidata.googleusercontent.com/caldav/v2/calid/user
	public static String CALDAV_SCHEME = "https";
	public static String CALDAV_PROTOCOL = CALDAV_SCHEME + "://";
	public static String CALDAV_HOST = "apidata.googleusercontent.com";
	public static String CALDAV_PATH = "/caldav/v2/";

	private static final String ENC = "UTF-8";
	public static boolean DEBUG = !false;
	private static String calUser = "vroomengineapp@gmail.com";
	private static String calId = "ohpg1q3rp7kcbcaufd7pk12b64";
	public static final String cryptoSpec = "HmacSHA1";

	// gcal
	public static String key = "263268003148-0fnoueqko11h09blre0603smt62fmkh1.apps.googleusercontent.com";
	public static String secret = "0D2XZgpQf6peqgzGAHt7CTlF";
	
	public static final String CALDAV_SERVER_WEBDAV_ROOT = CALDAV_PATH;
	public static final String CALDAV_SERVER_USERNAME = calUser;
	public static final int CALDAV_SERVER_PORT = 443;
	public static final String CALDAV_SERVER_HOST = CALDAV_HOST;
	public static final String CALDAV_SERVER_PASSWORD = secret;
	public static final String CALDAV_SERVER_PROTOCOL = CALDAV_SCHEME;
	
	// A TEST

	@Test
	public void listCalendars() {
		try {
			System.out.print(getCalendarEvents("events"));
		} catch (Exception e) {
			fail("List Calendars Failed: " + e.toString());
		}
	}

	/**
	 * get a JSON Object from GCAL
	 * 
	 * @param noun
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeyException
	 * @throws URISyntaxException
	 * @throws IOException
	 * @throws JSONException
	 */
	public static JSONObject getCalendarEvents(String noun)
			throws UnsupportedEncodingException, NoSuchAlgorithmException,
			InvalidKeyException, URISyntaxException, IOException, JSONException {
		String path = CALDAV_PATH + calUser + "/events/";

		HttpClient httpclient = new DefaultHttpClient();
		List<NameValuePair> qparams = new ArrayList<NameValuePair>();

		// These params should producted in key
		qparams.add(new BasicNameValuePair("oauth_consumer_key", key));
		qparams.add(new BasicNameValuePair("oauth_nonce", ""
				+ (int) (Math.random() * 100000000)));
		qparams.add(new BasicNameValuePair("oauth_signature_method", cryptoSpec));
		qparams.add(new BasicNameValuePair("oauth_timestamp", ""
				+ (System.currentTimeMillis() / 1000)));
		qparams.add(new BasicNameValuePair("q", path));

		String params = URLEncoder.encode(URLEncodedUtils.format(qparams, ENC),
				ENC);

		if (DEBUG)
			System.out.println("URL encoded parameters: " + params);

		List<NameValuePair> qparams2 = new ArrayList<NameValuePair>();

		qparams2.add(new BasicNameValuePair("SKU", "DELETEME"));

		String res = stringify(qparams2);
		if (DEBUG)
			System.out.println("json: " + res);

		// generate the oauth_signature
		String uxx = CALDAV_PROTOCOL + CALDAV_HOST + path;

		String signature = getSignature("GET", URLEncoder.encode(uxx, ENC),
				params);

		// add SIGNATURE to params list last
		qparams.add(new BasicNameValuePair("oauth_signature", signature));

		// generate URI which lead to access_token and token_secret.
		URI uri = URIUtils.createURI(CALDAV_SCHEME, CALDAV_HOST, -1, path,
				URLEncodedUtils.format(qparams, ENC), null);

		if (DEBUG)
			System.out.println("Get Token and Token Secrect from:"
					+ uri.toString());

		// http://chukl.es/wc-api/v1/products?oauth_consumer_key=ck_c0a177bc6be966af7e10b5e0d1550678&oauth_nonce=99814116&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1411603626&oauth_signature=aCBhaAQc28xEKA8an1g3%2BZE5EaM%3D
		// https://apidata.googleusercontent.com/caldav/v2/vroomengineapp@gmail.com/events/?oauth_consumer_key=263268003148-0fnoueqko11h09blre0603smt62fmkh1.apps.googleusercontent.com&oauth_nonce=37400234&oauth_signature_method=HmacSHA1&oauth_timestamp=1425682836&q=%2Fcaldav%2Fv2%2Fvroomengineapp%40gmail.com%2Fevents%2F&oauth_signature=4qSEAcXpV%2F2L7C%2BGp0Jbc9JsYRM%3D
		HttpGet getRequest = new HttpGet(uri);

		getRequest.addHeader("Content-Type", "application/json");
		getRequest.addHeader("Accept", "application/json");

		if (DEBUG)
			System.out.println("Token and Token Secrect:");
		//
		HttpResponse response = httpclient.execute(getRequest);
		HttpEntity entity = response.getEntity();
		StringBuffer returnObjStr = new StringBuffer();
		if (entity != null) {
			InputStream instream = entity.getContent();
			int len;
			byte[] tmp = new byte[2048];
			while ((len = instream.read(tmp)) != -1) {
				returnObjStr.append(new String(tmp, 0, len, ENC));
			}
		}
		String df = returnObjStr.toString();
		JSONObject retObj = new JSONObject(df);
		return retObj;
	}

	private static String stringify(List<NameValuePair> list) {
		StringBuilder b = new StringBuilder();
		b.append('{');
		boolean first = true;

		for (Iterator<NameValuePair> iterator = list.iterator(); iterator
				.hasNext();) {
			if (first)
				first = false;
			else
				b.append(",");

			NameValuePair next = iterator.next();

			b.append("\"" + next.getName() + "\"");

			b.append(':');

			b.append("\"" + next.getValue() + "\"");

		}

		b.append('}');
		return b.toString();
	}

	/**
	 * Test method
	 * 
	 * @param args
	 * @throws CalDAV4JException
	 * @throws SocketException
	 * @throws URISyntaxException
	 */
	@Test
	public void testCalDav() throws CalDAV4JException, SocketException,
			URISyntaxException {

		final String CALDAV_SERVER = ""; 
		final String CALDAV_PORT = "443"; 
	
		System.out.println("Creating Caldav Client..");
		BaseCaldavClient cli = new BaseCaldavClient(CALDAV_HOST, CALDAV_PORT,
				CALDAV_SERVER_PROTOCOL,
				CALDAV_SERVER_WEBDAV_ROOT, CALDAV_SERVER_USERNAME,
				CALDAV_SERVER_PASSWORD);

		System.out.println("Opening a collection..");
		CalDavCollectionManager cdm = new CalDavCollectionManager(cli);
		cdm.setRelativePath("events");

		Random r = new Random();
		int newDay = r.nextInt(30);

		System.out.println("create a dummy event..");
		// create date for event
		Date beginDate = ICalendarUtils.createDateTime(2007, 8, 9, newDay, 0,
				null, true);
		Date endDate = ICalendarUtils.createDateTime(2007, 8, 7, null, true);
		Dur duration = new Dur("3H");

		// test for getByTimestamp
		Date startDTSTART = ICalendarUtils.createDateTime(2007, 5, 7, null,
				true);
		Date endDTSTART = ICalendarUtils.createDateTime(2007, 11, 10, null,
				true);

		// create new event
		VEvent nve = new VEvent();
		cdm.addEvent(nve, null);

		System.out.println("modify the event..");
		// modify event
		Description d = new Description("Caldav4j Event");

		ParameterList pl = new ParameterList();
		pl.add(PartStat.ACCEPTED);
		Attendee invitato = new Attendee(pl, "mailto:rpolli@example.com");

		ICalendarUtils.addOrReplaceProperty(nve, nve.getUid());
		ICalendarUtils.addOrReplaceProperty(nve, new Summary(
				"I changed the summary!"));
		ICalendarUtils.addOrReplaceProperty(nve, invitato);
		ICalendarUtils.addOrReplaceProperty(nve, invitato);
		ICalendarUtils.addOrReplaceProperty(nve, d);

		// re-get event
		System.out.println("Retrieve the event..");
		Calendar pippo = cdm.getCalendarForEventUID((org.osaf.caldav4j.methods.HttpClient) ((HttpClient) cdm.client),
				nve.getUid().getValue());
		try {
			cdm.editEvent(nve, null);
		} catch (ValidationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("dump the event..\n" + pippo.toString() + "\n");

		List<String> lc = cdm.getEventPropertyByTimestamp(cdm.client,
				Property.UID, beginDate, endDate);
		for (String cal : lc) {
			System.out.println("UID=" + cal);
		}
	}

	// / UTIL METHODS
	/**
	 * 
	 * @param url
	 *            the url for "request_token" URLEncoded.
	 * @param params
	 *            parameters string, URLEncoded.
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeyException
	 */
	public static String getSignature(String method, String url, String params)
			throws UnsupportedEncodingException, NoSuchAlgorithmException,
			InvalidKeyException {

		if (method == null)
			method = "GET";

		/**
		 * base has three parts, they are connected by "&": 1) protocol 2) URL
		 * (need to be URLEncoded) 3) Parameter List (need to be URLEncoded).
		 */
		StringBuilder base = new StringBuilder();
		base.append(method);
		base.append("&");
		base.append(url);
		base.append("&");
		base.append(params);

		if (DEBUG)
			System.out.println("String for oauth_signature generation:" + base);

		byte[] keyBytes = secret.getBytes(ENC);
		SecretKey key = new SecretKeySpec(keyBytes, cryptoSpec);

		Mac mac = Mac.getInstance(cryptoSpec);
		mac.init(key);

		// encode it, base64 it, change it to string and return.
		byte[] ss = mac.doFinal(base.toString().getBytes(ENC));
		String stx = new String(base64.encode(ss), ENC);

		return stx.trim();
	}

}