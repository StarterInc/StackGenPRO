package io.starter.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

/**
 * a simple program to work with woocommerce token and token secret.
 * 
 * Thanks for the basic idea goes to:
 * https://github.com/mrtexaznl
 * 
 * @author John McMahon
 * @author Mark Zang
 * 
 */
public class OAuthForWooCommerce {

	private static final String cryptoSpec = "HmacSHA1";
	private static final String ENC = "UTF-8";
	private static Base64 base64 = new Base64();
	public static boolean DEBUG = false;

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

		if(DEBUG)
			System.out.println("String for oauth_signature generation:" + base);

		byte[] keyBytes = WooConfig.secret.getBytes(ENC);
		SecretKey key = new SecretKeySpec(keyBytes, cryptoSpec);

		Mac mac = Mac.getInstance(cryptoSpec);
		mac.init(key);

		// encode it, base64 it, change it to string and return.
		byte[] ss = mac.doFinal(base.toString().getBytes(ENC));
		String stx = new String(base64.encode(ss), ENC);

		return stx.trim();
	}

	public static HttpResponse doPost(String uri, Map requestHeaders,
			Map requestHttpParameters) throws IOException {

		HttpClient client = new DefaultHttpClient();

		HttpPost postMethod = new HttpPost(uri);

		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		// HttpParams params = new BasicHttpParams();

		if (requestHttpParameters != null) {
			Set paramNames = requestHttpParameters.keySet();

			for (Iterator it = paramNames.iterator(); it.hasNext();) {
				String paramName = (String) it.next();
				String paramValue = (String) requestHttpParameters
						.get(paramName);

				nameValuePairs
						.add(new BasicNameValuePair(paramName, paramValue));

				if (DEBUG) {
					System.out.println("http param: " + paramName + "="
							+ paramValue);
				}
			}
		}

		postMethod.setEntity(new UrlEncodedFormEntity(nameValuePairs));

		// add all the request headers
		if (requestHeaders != null) {
			Set headers = requestHeaders.keySet();
			for (Iterator it = headers.iterator(); it.hasNext();) {
				String headerName = (String) it.next();
				String headerValue = (String) requestHeaders.get(headerName);

				postMethod.addHeader(headerName, headerValue);

				if (DEBUG) {
					System.out.println("http header: " + headerName + "="
							+ headerValue);
				}
			}
		}
		HttpResponse response = client.execute(postMethod);
		return response;
	}
}


/**
 * 
 * @author John
 */
class WooConfig {
	public static final String cryptoSpec = "HMAC-SHA1";
	public static String key = "ck_c0a177bc6be966af7e10b5e0d1550678";
	public static String secret = "cs_4596af311e1368467feee8733812c975";

	public static int WOO_API_VERSION = 2;
	public static String WOO_SCHEME = "http";
	public static String WOO_HOST = "chukl.es";
	public static String WOO_PROTOCOL = WOO_SCHEME + "://";
	public static String WOO_API_PATH = "/wc-api/v" + WooConfig.WOO_API_VERSION
			+ "/";

}