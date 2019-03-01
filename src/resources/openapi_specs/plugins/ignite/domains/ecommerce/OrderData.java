package io.starter.datamodel;

import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;
import java.util.concurrent.CountDownLatch;

import io.starter.model.Calendar;
import io.starter.model.CalendarEvent;
import io.starter.model.Device;
import io.starter.model.Location;
import io.starter.model.LocationExample;
import io.starter.model.Order;
import io.starter.model.OrderDetail;
import io.starter.model.OrderExample;
import io.starter.model.User;
import io.starter.model.Vehicle;
import io.starter.util.ImageUtils;
import io.starter.util.Logger;
import io.starter.util.MathTools;
import io.starter.util.SystemConstants;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
import org.junit.Test;

import com.extentech.ExtenXLS.ExcelReports;
import com.extentech.ExtenXLS.NameHandle;
import com.extentech.ExtenXLS.WorkBookHandle;
import com.vroomengine.ecommerce.Invoice;

import edu.emory.mathcs.backport.java.util.Arrays;

/**
 * VroomEngine REST api
 * 
 * Order representation.
 * 
 * TODO: implement dynamic order detail
 * 
 * @author John McMahon
 * 
 */
@Path("/order/{orderId}")
public class OrderData extends Model implements SystemConstants {

	@GET
	@Produces({ "application/vnd.msexcel" })
	@Path("invoice/xls")
	public String getInvoiceXLS(@PathParam("orderId") Integer orderId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws Exception {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}

		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		example.setOrderByClause("id DESC");
		criteria.andIdEqualTo(orderId);
		Order order = session.selectOne(
				"io.starter.dao.OrderMapper.selectObjByExample", example);

		String filename = "Invoice-" + order.getCustomerId() + "-"
				+ order.getId() + ".xls";

		OutputStream output = servletResponse.getOutputStream();
		servletResponse.setHeader("Content-Disposition",
				"attachment; filename=\"" + filename + "\"");
		servletResponse.setContentType("application/vnd.msexcel");

		String serverHost = servletRequest.getScheme() + "://"
				+ servletRequest.getServerName() + ":"
				+ servletRequest.getServerPort();
		WorkBookHandle nbk = Invoice.generateInvoice(order, output, serverHost,
				ExcelReports.EXCEL_OUTPUT_XLS);

		output.flush();
		output.close();
		return "ok";
	}

	@GET
	@Produces(MediaType.TEXT_HTML)
	@Path("invoice")
	public String getInvoice(@PathParam("orderId") Integer orderId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws Exception {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}

		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		example.setOrderByClause("id DESC");
		criteria.andIdEqualTo(orderId);
		Order order = session.selectOne(
				"io.starter.dao.OrderMapper.selectObjByExample", example);

		final Invoice inv = new Invoice();
		OutputStream output = servletResponse.getOutputStream();

		servletResponse.setContentType("text/html");

		String serverHost = servletRequest.getScheme() + "://"
				+ servletRequest.getServerName() + ":"
				+ servletRequest.getServerPort();
		Invoice.generateInvoice(order, output, serverHost,
				ExcelReports.EXCEL_OUTPUT_HTML);
		output.flush();
		output.close();
		return "ok";

	}

	@GET
	@Produces(MediaType.TEXT_HTML)
	@Path("orderitems")
	public String getInvoiceOrderItems(@PathParam("orderId") Integer orderId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws Exception {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}

		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		example.setOrderByClause("id DESC");
		criteria.andIdEqualTo(orderId);
		Order order = session.selectOne(
				"io.starter.dao.OrderMapper.selectObjByExample", example);

		final Invoice inv = new Invoice();
		OutputStream output = servletResponse.getOutputStream();

		servletResponse.setContentType("text/html");

		String serverHost = servletRequest.getScheme() + "://"
				+ servletRequest.getServerName() + ":"
				+ servletRequest.getServerPort();
		Invoice.generateInvoice(order, output, serverHost,
				ExcelReports.EXCEL_OUTPUT_HTML);
		output.flush();
		output.close();
		return "ok";

	}

	
	/**
	 * add order
	 * 
	 * NOTES:
	 * 
	 * The order has been pre-created in the user session from a list of
	 * available orders, so we use a unique identifier to select from the
	 * available list and attempt to schedule the appointment.
	 * 
	 * If there is a conflict (aka a change to the availability since order
	 * selected) then the order insertion will fail and rollback, and another
	 * selection will need to be made.
	 * 
	 * 
	 * @param orderId
	 *            a temporary id for session list of available orders
	 * 
	 * @param servletRequest
	 * @param servletResponse
	 * @return
	 * @throws Exception
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String add(@PathParam("orderId") Integer orderId,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws Exception {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);
		User ux = (User) servletRequest.getAttribute(SESSION_VAR_USER);
		if (ux == null || ux.getId() == SystemConstants.ANON_USERID) {
			throw new UnauthorizedException(
					"Anonymous Event Creation Prohibited");
		}

		HttpSession sesh = servletRequest.getSession();

		Order[] availables = (Order[]) sesh
				.getAttribute("availableAppointments");
		Order thisOrder = null;

		for (Order ord : availables) {
			if (ord.getId() == orderId) {
				thisOrder = ord;
				break;
			}
		}
		if (thisOrder == null) {
			return "{error:'Order " + orderId + " not found in session.'}";
		}

		// We found a valid order, attempt to persist it
		// Step 1. input requested time and location

		// these are not pre-populated, grab from request
		Integer vehicleId = (Integer)sesh.getAttribute("currentVehicleId");
		Integer customerId = (Integer)sesh.getAttribute("currentCustomerId");
		User customer = (User)sesh.getAttribute("currentCustomer");
		Vehicle vehicle = (Vehicle)sesh.getAttribute("currentVehicle");
		
		thisOrder.setCustomerId(customerId);
		thisOrder.setCustomer(customer);
		thisOrder.setVehicleId(vehicleId);
		thisOrder.setVehicle(vehicle);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		String datestr = sdf.format( thisOrder.getDate());
		
		CalendarEventData.addCalendarEvent(thisOrder.getEvent().getCalendarId(), thisOrder.toString(), SystemConstants.SCHEDULE_TYPE_INSTALL,
				datestr ,thisOrder.getVehicleId(), thisOrder, session);

		CalendarEvent thisOrdEvent = thisOrder.getEvent();
		session.insert("io.starter.dao.OrderMapper.insert", thisOrder);

		List<OrderDetail> deets = thisOrder.getOrderDetails();
		for (OrderDetail ordet : deets) {
			ordet.setOrderId(thisOrder.getId());
			session.insert("io.starter.dao.OrderDetailMapper.insert", ordet);
		}

		session.commit();

		
		final Invoice inv = new Invoice();
		OutputStream output = servletResponse.getOutputStream();

		servletResponse.setContentType("text/html");

		String serverHost = servletRequest.getScheme() + "://"
				+ servletRequest.getServerName() + ":"
				+ servletRequest.getServerPort();
		WorkBookHandle book = Invoice.generateInvoice(thisOrder, output, serverHost,
				ExcelReports.EXCEL_OUTPUT_HTML);
		output.flush();
		output.close();
		
		List recips = new Vector();
		
		User fromUser = new User();
		fromUser.setEmail("john@starter.io");
		fromUser.setId(1);
		fromUser.setUsername("CoInterlockAdmin");
		fromUser.setFirstName("Colorado");
		fromUser.setLastName("Interlock");
		recips.add(fromUser);
		recips.add(ux);
		recips.add(thisOrder.getCustomer());
		

		// send an email with the order estimate
		CountDownLatch latch = new CountDownLatch(1);
		OrderData.sendNotification(ux, recips, 1, thisOrder, "Thank you for scheduling with ColoradoInterlock!", "ESTIMATE", session, latch);
		latch.await();
		
		
		JSONObject dtx = new JSONObject(thisOrder);

		return dtx.toString();
	}

	/**
	 * send an order notification
	 * 
	 * @param output
	 * @param latch
	 * 
	 * @param servletRequest
	 * @param u
	 * @throws Exception
	 */
	public static List sendNotification(User from, List<User> users,
			int calendarId, Order order, String customMessage, String output,
			SqlSession session, CountDownLatch latch) throws Exception {
		if (from == null) {
			throw new ServletException(
					"OrderData.sendNotification cannot have a null FROM User.");
		}
		List failures = new Vector();
		// our notification page. uses string tokens to customize
		String url = MESSAGE_SCHEDULE_INITIATED;

		if (calendarId < 0) { // TODO: use alternate URL for non-content sharing
								// group add
			url = MESSAGE_ALLIANCE_ADD;
		}

		String cost = "";
		try{
			WorkBookHandle book = order.getOrderInvoice();
			NameHandle nam = book.getNamedRange("DATA_INVOICE_TOTAL");
			cost = nam.getCells()[0].getFormattedStringVal();
		}catch(Exception e){
			Logger.error("OrderData.sendNotification Could not get order total: " + e.toString());
		}
		
		Iterator<User> it = users.iterator();
		while (it.hasNext()) {

			User to = it.next();
			String emailAddr = to.getEmail();
			try {
				@SuppressWarnings("rawtypes")
				Map<String, Comparable> params = new HashMap<String, Comparable>();

				params.put("ORDER_ID", order.getId());
				params.put("ESTIMATE_TOTAL",cost);
				params.put("VEHICLE_YEAR", order.getVehicle().getYear());
				params.put("VEHICLE_MAKE", order.getVehicle().getMake());
				params.put("VEHICLE_MODEL", order.getVehicle().getModel());
				SimpleDateFormat sdd = new SimpleDateFormat("EEEE MMMM dd, yyyy");
				SimpleDateFormat sdt = new SimpleDateFormat("h:MMa");

				// get a date object from the date string for date math
				params.put("APPOINTMENT_DATE", sdd.format(order.getEvent().getStart()));
				params.put("APPOINTMENT_TIME", sdt.format(order.getEvent().getStart()));
				params.put("APPOINTMENT_LOCATION", order.getLocation().getCity());
				
				// order detail 0 has the info...
				OrderDetail det = (OrderDetail)order.getOrderDetails().get(0);
				params.put("SERVICE_TYPE", det.getDescription());
				
				params.put("TECHNICIAN_ID", order.getTechnician().getId());
				params.put("TECHNICIAN_NAME", order.getTechnician()
						.getFirstName());
				params.put("TECHNICIAN_AVATAR", order.getTechnician()
						.getAvatarImage());

				params.put("RECIPIENT_FN", order.getCustomer().getFirstName());
				params.put("RECIPIENT_LN", order.getCustomer().getLastName());
				
				if (from != null) {
					params.put("SENDER_UN", from.getUsername());
					params.put("SENDER_UID", from.getId());

				} else {
					params.put("SENDER_UN", "Vroom Scheduler");
					params.put("SENDER_UID", "-1");
				}
				params.put("RECIPIENT_EMAIL", to.getEmail());
				params.put("RECIPIENT_UID", String.valueOf(to.getId()));
				params.put("USERNAME", to.getUsername());

				if (customMessage != null) { // the user hint
					params.put("SENDER_HINT", customMessage);
				}

				if (calendarId > -1)
					params.put("CONTENT_ID", calendarId);

				if (output != null) { // the user hint
					params.put("INVOICE_TEXT", output);
				}
				if (from.getAvatarImage() != null && from.getAvatarImage().length() > 0)
					params.put( "SENDER_IMAGE", ImageUtils.getImageURL(from.getAvatarImage(), from.getId(), -1));
				else
					params.put( "SENDER_IMAGE", "http://starter.io/wp-content/uploads/2013/07/starter-anonymous-avatar_blue_128.png");

				if (calendarId > -1) {
					params.put( "MESSAGE_SUBJECT", to.getFirstName() + ", " + customMessage);
				} else {
					params.put("MESSAGE_SUBJECT", to.getFirstName() + ", You're on your way! " + from.getUsername() + " has scheduled your appointment");
				}
				Sys.sendEmail(url, from, emailAddr, params, session, latch);

				// handle Push notifications
				List Devices = to.getDevices();
				Iterator its = Devices.iterator();
				while (its.hasNext()) {
					Device dve = (Device) its.next();
					Sys.sendSharePushNotification(dve, to, params, session);
				}
			} catch (Exception e) {
				failures.add(emailAddr);
			}
		}

		return failures;
	}

	/**
	 * update a order order
	 * 
	 * handle the various things that can change:
	 * 
	 * - move to another order - change the start time - change the end time -
	 * change the customer ?? (should we just delete?) - change the vehicle ??
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
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public String update(@PathParam("orderId") Integer orderId,
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
		throw new RuntimeException("OrderData.update() NOT IMPLEMENTED");
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

		// TODO: delete order details

		session.delete("io.starter.dao.OrderMapper.delete", orderId);

		// TODO: delete order details
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
			// jb.put("items", j);
			// jb.put("totalPages", 2); // pagination numpages
			// jb.put("currpage", 1); // pagination tracking
			return jb.toString();
		} else {
			// return j.toString();
		}
		throw new RuntimeException("OrderData.list() NOT IMPLEMENTED");
	}

	/**
	 * Step 1. Next possible appointment is 3 days from now (read from setting)
	 * 
	 * Step 2. select all technicians that have a home location or do offsites
	 * in a radius of X miles if YES available, then list technicians
	 * 
	 * if NO available then LOOP next closest location AND offsite technicians
	 * 
	 * @throws Exception
	 */
	@GET
	@Path("available")
	@Produces(MediaType.APPLICATION_JSON)
	public String listAvailable(
			@QueryParam("requestedDate") String requestedDate,
			@QueryParam("zip") Integer zip,
			@Context HttpServletRequest servletRequest,
			@Context HttpServletResponse servletResponse) throws IOException,
			ServletException, JSONException, ParseException {

		SqlSession session = (SqlSession) servletRequest
				.getAttribute(SESSION_VAR_SQLSESSION);

		Order[] availables = new Order[10];
		HttpSession sesh = servletRequest.getSession();
		sesh.setAttribute("availableAppointments", availables);

		// Step 1. input requested time and location
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mma");
		Date requestedDateTime = sdf.parse(requestedDate);
		// get a date object from the date string for date math
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(requestedDateTime);

		// TODO: figure out if this requested time is too soon, add time
		// gc.add(GregorianCalendar.HOUR, 72);

		requestedDateTime = gc.getTime();
		double lat1 = 0.0d, lng1 = 0.0d;
		Location closestloc = LocationData.findByZip(zip, session);

		// Step 3. LOOP load calendar for bay and technician resource(s)
		Set<Location> unavailableLocations = new java.util.HashSet<Location>();
		boolean running = true;
		int count = 0;
		while (running) {
			Order ord = OrderData.findAvailable(requestedDateTime, closestloc,
					lat1, lng1, session, unavailableLocations);
			if (ord == null) { // none available anywhere... try next time slot
				gc.add(GregorianCalendar.HOUR, 3);
				requestedDateTime = gc.getTime();
				gc.setTime(requestedDateTime);

				// reset search and add some distance
				// lat1 = Math.random() * 100;
				// lng1 = Math.random() * -100;

				unavailableLocations = new HashSet<Location>();
				unavailableLocations.addAll(Arrays.asList(availables));
				closestloc = LocationData.findClosest(lat1, lng1, session,
						unavailableLocations);
			} else if (ord != null) {
				int idx = ord.getEvent().getCalendarId();
				ord.setId(count * -1);
				String ddf = sdf.format(requestedDateTime);
				availables[count++] = ord;
				unavailableLocations.add(closestloc);
				if (availables.length == count)
					running = false;
				Logger.log(ord.toString());
				closestloc = LocationData
						.findClosest(lat1, lng1, session, null); // refresh
			}
		}
		JSONArray ret = new JSONArray(availables);
		return ret.toString();
	}

	/**
	 * check the location for an appointment matching the date
	 * 
	 * @param dtx
	 * @param loc
	 * @param session
	 * @return
	 */
	public static Order findAvailable(Date dtx, Location loc,
			double requestedLat, double requestedLong, SqlSession session,
			Set unavailableLocations) {
		if (loc == null)
			return null;
		List<User> technicians = loc.getTechnicians();

		Calendar cal = null;
		Calendar selectedTech = null;
		User technician = null;
		for (User usr : technicians) {
			cal = usr.getCalendar();
			boolean avail = cal.isAvailable(dtx, 180); // TODO: check 3 hour time slot?
			if (avail) {
				selectedTech = cal;
				technician = usr;
				break;
			}
		}

		// if no match, that means no available techs
		// iterate the service bay calendars
		// mostly pertains to free/busy or hours of operation
		Calendar selectedBay = null;
		List<Calendar> serviceBayCalendars = loc.getCalendars();
		for (Calendar calx : serviceBayCalendars) {
			boolean avail = calx.isAvailable(dtx, 180); // 180 minute
														// appointment
			// Logger.log("Checking " + loc.getCity() + " "
			// + calx.getDescription() + ": " + avail);
			if (avail) {
				selectedBay = calx;
				break;
			}
		}
		// if no match, that means no available service bays
		// TODO: check for remote service techs
		if ((selectedTech != null) && (selectedBay != null)) { // found a match
			Order ord = new Order();
			ord.setDate(dtx);
			ord.setTechnician(technician);
			ord.setDate(dtx);
			ord.setDescription("Install at " + loc.getCity() + " in "
					+ selectedBay.getDescription());
			OrderDetail dt = new OrderDetail();
			dt.setQty(1);
			dt.setDescription("Install Intoxalock");
			dt.setDate(dtx);

			CalendarEvent event = new CalendarEvent();
			ord.setEvent(event);
			event.setCalendarId(cal.getId());
			ord.setEvent(event);
			ord.setLocationId(loc.getId());
			ord.setLocation(loc);
			ord.getOrderDetails().add(dt);
			return ord;
		} else {
			unavailableLocations.add(loc);
			Location nextClosest = LocationData.findClosest(requestedLat,
					requestedLong, session, unavailableLocations);
			if (nextClosest != null) {
				// make a recursive call, tracking all of the unavailable
				return OrderData.findAvailable(dtx, nextClosest, requestedLat,
						requestedLong, session, unavailableLocations); // recursive...
			} else {
				return null;
			}
		}
	}
}