package io.starter.datamodel;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import io.starter.model.User;
import io.starter.util.SystemConstants;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.ibatis.session.SqlSession;
import org.apache.shiro.authz.UnauthorizedException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * VroomEngine REST api
 * 
 * OrderDetail representation.
 * 
 * TODO: implement dynamic order detail
 * 
 * @author John McMahon
 * 
 */
@Path("/orderdetail/{orderDetailId}")
public class OrderDetailData  extends Model implements SystemConstants {

	/**
	 * add order order
	 * 
	 * @param orderId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            order
	 * @param servletRequest
	 * @param servletResponse
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * @throws JSONException
	 * @throws ParseException
	 */
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public String add(@FormParam("orderId") Integer orderId,
			@FormParam("date") String date,
			@FormParam("vehicleId") Integer vehicleId,
			@FormParam("customerId") Integer customerId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws IOException,
			ServletException, JSONException, ParseException {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}

		JSONObject dtx = new JSONObject();



		return dtx.toString();
	}

	/**
	 * update a order order
	 * 
	 * handle the various things that can change:
	 * 
	 * - move to another order - change the start time - change the end time
	 * - change the customer ?? (should we just delete?) - change the vehicle ??
	 * (should we just delete?)
	 * 
	 * @param orderId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            order
	 * @param servletRequest
	 * @param servletResponse
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * @throws JSONException
	 * @throws ParseException
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String update(
			@PathParam("orderDetailId") Integer orderDetailId,
			@FormParam("orderId") Integer orderId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws IOException,
			ServletException, JSONException, ParseException {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}

	
		return "none";
	}

	/**
	 * add order order
	 * 
	 * @param orderId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            order
	 * @param servletRequest
	 * @param servletResponse
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * @throws JSONException
	 * @throws ParseException
	 */
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public String delete(@PathParam("orderId") Integer orderId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws IOException,
			ServletException, JSONException, ParseException {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}
		session.delete("io.starter.dao.OrderDetailEventMapper.delete", orderId);
		session.commit();
		return "{delete:'ok'}";
	}

	/**
	 * list order orders
	 * 
	 * @param orderId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            order
	 * @param servletRequest
	 * @param servletResponse
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * @throws JSONException
	 * @throws ParseException
	 */
	@GET
	@Path("list")
	@Produces(MediaType.APPLICATION_JSON)
	public String list(@QueryParam("orderId") Integer orderId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws IOException,
			ServletException, JSONException, ParseException {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);

		JSONArray ret = new JSONArray();


		// add paging info to work with the JQUery table from:
		// https://github.com/ameyms/tabulate
		boolean USE_PAGED_JQUERY_RESULT = !true;
		if (USE_PAGED_JQUERY_RESULT) {
			JSONObject jb = new JSONObject();
		//	jb.put("items", j);
		//	jb.put("totalPages", 2); // pagination numpages
		//	jb.put("currpage", 1); // pagination tracking
			return jb.toString();
		} else {
		//	return j.toString();
		}
		return "none";
	}
}