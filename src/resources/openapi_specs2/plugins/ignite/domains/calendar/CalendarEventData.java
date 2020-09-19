package io.starter.datamodel;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.starter.model.Calendar;
import io.starter.model.CalendarEvent;
import io.starter.model.CalendarEventExample;
import io.starter.model.CalendarExample;
import io.starter.model.Order;
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

import com.extentech.toolkit.Logger;

/**
 * VroomEngine REST api
 * 
 * Calendar representation.
 * 
 * TODO: implement dynamic calendar from Resource Allocation Model
 * 
 * @author John McMahon
 * 
 */
@Path("/calendarevent/{eventId}")
public class CalendarEventData implements SystemConstants {

	/**
	 * add calendar event
	 * 
	 * @param calendarId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            event
	 * @param servletRequest
	 * @param servletResponse
	 * @return
	 * @throws Exception
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String add(@FormParam("calendarId") Integer calendarId,
			@FormParam("date") String date,
			@FormParam("vehicleId") Integer vehicleId,
			@FormParam("customerId") Integer customerId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws Exception {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
				"Anonymous Event Creation Prohibited");
		}
		String cdesc = "TODO: rest api added";
		try {
			String dtx1 = CalendarEventData.addCalendarEvent(calendarId, cdesc,
					SystemConstants.SCHEDULE_TYPE_CALIBRATION, date, vehicleId,
					null, session);
			return dtx1;
		} catch (Exception e) {
			if (e.toString().contains("Duplicate")) {
				String w = "Invalid Schedule Request: Event conflicts with Existing Schedule.";
				Logger.logWarn(w);
				return w;
			}
			throw e;
		}
	}

	/**
	 * create a fully formed calendar event
	 * 
	 * @param calendarId
	 * @param date
	 * @param vehicleId
	 * @param customerId
	 * @param session
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * @throws JSONException
	 * @throws ParseException
	 */
	public static String addCalendarEvent(Integer calendarId, String title,
			int type, String date, Integer vehicleId, Order order,
			SqlSession session) throws IOException, ServletException,
			JSONException, ParseException {

		// Step 1. input requested time and location
		Date requestedDateTime = new java.util.Date(System.currentTimeMillis());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		// long: -105.038
		// lat: 39.5425

		// get a date object from the date string for date math
		GregorianCalendar gc = new GregorianCalendar();

		JSONObject dtx = new JSONObject();

		Calendar mycal = session.selectOne(
				"io.starter.dao.CalendarMapper.selectObjByPrimaryKey",
				calendarId);
		dtx.put("title", title);
		dtx.put("editable", "true");
		dtx.put("color", "#111111");
		dtx.put("backgroundColor", "#" + mycal.getDisplayColor());

		// log the data
		CalendarEvent cal = new CalendarEvent();
		cal.setTitle(title);
		cal.setType(type);
		cal.setCalendarId(calendarId);
		cal.setStatus(SystemConstants.SCHEDULE_STATUS_TENTATIVE); // until

		if(order!=null){ // associate with the order
			cal.setTitle(order.toString());
		}
		// set a url
		String urx = "/order.jsp?order_id="+order.getId();
		// dtx.put("url", urx);
		cal.setUrl(urx);

		// get a date object from the date string for date math
		if (date.indexOf("T") == -1) {
			String w = "Invalid Schedule Request: Schedule must contain a time.";
			Logger.logWarn(w);
			return w;
		}
		Date dtt = sdf.parse(date);
		gc.setTime(dtt);

		cal.setStart(dtt);
		dtx.put("start", gc.getTime());

		gc.add(GregorianCalendar.HOUR, 3); // 3 hour slot
		cal.setEnd(gc.getTime());
		dtx.put("end", gc.getTime());

		session.insert("io.starter.dao.CalendarEventMapper.insert", cal);
		session.commit();

		if(order!=null){
			order.setEvent(cal);
			order.setEventId(cal.getId());
		}
		return dtx.toString();
	}

	/**
	 * update a calendar event
	 * 
	 * handle the various things that can change:
	 * 
	 * - move to another calendar - change the start time - change the end time
	 * - change the customer ?? (should we just delete?) - change the vehicle ??
	 * (should we just delete?)
	 * 
	 * @param calendarId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            event
	 * @param servletRequest
	 * @param servletResponse
	 * @return
	 * @throws Exception
	 */
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public String update(@PathParam("eventId") Integer eventId,
			@FormParam("calendarId") Integer calendarId,
			@FormParam("start") String start, @FormParam("end") String end,
			@FormParam("vehicleId") Integer vehicleId,
			@FormParam("customerId") Integer customerId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws Exception {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}

		// get cached
		CalendarEvent cal = session.selectOne(
				"io.starter.dao.CalendarEventMapper.selectByPrimaryKey",
				eventId);

		Calendar mycal = session.selectOne(
				"io.starter.dao.CalendarMapper.selectObjByPrimaryKey",
				calendarId);

		// add to cache

		/*
		 * dtx.put("title", "Vehicle Installation"); Date dtt = new Date( (long)
		 * (System.currentTimeMillis() + (Math.random() * 100000)));
		 * GregorianCalendar gc = new GregorianCalendar(); gc.setTime(dtt);
		 * dtx.put("start", gc.getTime()); gc.add(GregorianCalendar.HOUR, 8); //
		 * 3 hour slot dtx.put("end", gc.getTime());
		 * 
		 * dtx.put("editable", "true"); dtx.put("color", "#222222");
		 * dtx.put("backgroundColor", "#ff9900"); dtx.put("allDay", "null");
		 * dtx.put("constraint", "null"); dtx.put("url", return dtx.toString();
		 */

		JSONObject dtx = new JSONObject();

		dtx.put("title", "Installation #" + customerId);
		dtx.put("editable", "true");
		dtx.put("color", "#222222");
		dtx.put("backgroundColor", "#ff9900");

		// log the data
		cal.setTitle("Installation");
		cal.setType(1);
		cal.setCalendarId(calendarId);
		cal.setStatus(1);

		// set a url
		String urx = "/table_view.jsp?tablename=Vehicle&query=id:" + vehicleId;
		// dtx.put("url", urx);
		cal.setUrl(urx);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		// get a date object from the date string for date math
		Date dtt = sdf.parse(start);

		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(dtt);

		int startminutes = gc.get(GregorianCalendar.MINUTE);

		cal.setStart(dtt);
		dtx.put("start", gc.getTime());

		Date endt = sdf.parse(end);
		gc.setTime(endt);
		cal.setEnd(gc.getTime());
		dtx.put("end", gc.getTime());

		// check for conflicts
		int endminutes = gc.get(GregorianCalendar.MINUTE);

		int duration = endminutes - startminutes;

		boolean avail = mycal.isAvailable(dtt, duration);
		if (avail) {
			try {
				session.update(
						"io.starter.dao.CalendarEventMapper.updateByPrimaryKey",
						cal);
				session.commit();
				return dtx.toString();
			} catch (Exception e) {
				if (e.toString().contains("Duplicate")) {
					String w = "Invalid Schedule Request: Starts at the Same Time as Existing Event.";
					Logger.logWarn(w);
					return w;
				}
				throw e;
			}
		} else {
			String w = "Invalid Schedule Request: Conflicts with Existing Event.";
			Logger.logWarn(w);
			return w;
		}
	}

	/**
	 * add calendar event
	 * 
	 * @param calendarId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            event
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
	public String delete(@PathParam("eventId") Integer eventId,
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
		session.insert("io.starter.dao.CalendarEventMapper.delete", eventId);
		session.commit();
		return "{delete:'ok'}";
	}

	/**
	 * list calendar events
	 * 
	 * @param calendarId
	 * @param date
	 *            -- a string representation of the requested datetime for the
	 *            event
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
	public String list(@QueryParam("calendarId") Integer calendarId,
			@QueryParam("start") String start, @QueryParam("end") String end,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws IOException,
			ServletException, JSONException, ParseException {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);

		JSONArray ret = new JSONArray();

		CalendarEventExample example = new CalendarEventExample();
		io.starter.model.CalendarEventExample.Criteria criteria = example
				.createCriteria();
		example.setDistinct(true);

		if (calendarId != null) {
			criteria.andCalendarIdEqualTo(calendarId);
		}
		
		Map calendars = new HashMap(); // cache these once per call... otherwise performance death
		CalendarExample examplecal = new CalendarExample();
		io.starter.model.CalendarExample.Criteria criteriacal = examplecal
				.createCriteria();
		example.setDistinct(true);
		List<Calendar> cals = session.selectList(
				"io.starter.dao.CalendarMapper.selectByExample", examplecal);
		
		for(Calendar cx : cals){
			calendars.put(cx.getId(), cx);
		}
		
		List<CalendarEvent> results = session.selectList(
				"io.starter.dao.CalendarEventMapper.selectByExample", example);

				// return the JSON result
		JSONArray j = new JSONArray(results);

		for (int x = 0; x < j.length(); x++) { // FOR NOW MOCK UP SOME INSTALLS
			JSONObject dtx = j.getJSONObject(x);
			Calendar mycal = (Calendar)calendars.get(((CalendarEvent)results.get(x)).getCalendarId());
			if (mycal != null) {
				dtx.put("backgroundColor", "#" + mycal.getDisplayColor());
			} else {
				int type = dtx.getInt("type");
				switch (type) {

				case -1:
					dtx.put("backgroundColor", "#" + mycal.getDisplayColor());

					break;

				case 0:
					dtx.put("backgroundColor", "#" + mycal.getDisplayColor());

					break;

				case 1:
					dtx.put("backgroundColor", "#" + mycal.getDisplayColor());

					break;

				case 2:
					dtx.put("backgroundColor", "#" + mycal.getDisplayColor());

					break;

				default:
					dtx.put("backgroundColor", "#" + mycal.getDisplayColor());

				}
			}
			dtx.put("editable", "true");

			dtx.put("color", "#111111");

			// fullcalendar.io date format (converting to this)
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

			// mysql date format (converting from this)
			SimpleDateFormat sdfd = new SimpleDateFormat(
					"EEE MMM d HH:mm:ss zzz yyyy");
			// Sat Mar 14 08:30:00 PDT 2015

			// get a date object from the date string for date math
			Date dtt = sdfd.parse(dtx.getString("start"));
			GregorianCalendar gc = new GregorianCalendar();
			gc.setTime(dtt);
			dtx.put("start", sdf.format(dtt));
			dtt = sdfd.parse(dtx.getString("end"));
			gc.setTime(dtt);
			dtx.put("end", sdf.format(dtt));
		}

		// add paging info to work with the JQUery table from:
		// https://github.com/ameyms/tabulate
		boolean USE_PAGED_JQUERY_RESULT = !true;
		if (USE_PAGED_JQUERY_RESULT) {
			JSONObject jb = new JSONObject();
			jb.put("items", j);
			jb.put("totalPages", 2); // pagination numpages
			jb.put("currpage", 1); // pagination tracking
			return jb.toString();
		} else {
			return j.toString();
		}

	}
}