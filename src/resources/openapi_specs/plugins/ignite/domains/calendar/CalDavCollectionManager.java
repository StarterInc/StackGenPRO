package com.vroomengine;

import java.io.IOException;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.UUID;

import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.Property;
import net.fortuna.ical4j.model.ValidationException;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VTimeZone;
import net.fortuna.ical4j.model.property.DtStamp;
import net.fortuna.ical4j.model.property.Uid;

import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.osaf.caldav4j.CalDAVCalendarCollection;
import org.osaf.caldav4j.exceptions.CalDAV4JException;
import org.osaf.caldav4j.exceptions.ResourceNotFoundException;
// import org.osaf.caldav4j.ResourceNotFoundException;
import org.osaf.caldav4j.methods.CalDAV4JMethodFactory;
import org.osaf.caldav4j.methods.DeleteMethod;
import org.osaf.caldav4j.methods.GetMethod;
import org.osaf.caldav4j.methods.MkCalendarMethod;
import org.osaf.caldav4j.util.CaldavStatus;
import org.osaf.caldav4j.util.CalendarComparator;
import org.osaf.caldav4j.util.ICalendarUtils;

;

/**
 * this class binds a CalendarCollection (a folder of events) to a Caldav Client
 * giving a complete Caldav Browser
 * 
 * @author rpolli@babel.it
 * 
 */
public class CalDavCollectionManager extends CalDAVCalendarCollection {

	BaseCaldavClient client = null;
	private CalDAV4JMethodFactory methodFactory = new CalDAV4JMethodFactory();

	/**
	 * associates a CalendarCollection to a BaseCalDavClient, pointing to a
	 * default folder
	 */
	public CalDavCollectionManager(BaseCaldavClient c) {
		super();
		client = c;

		setHostConfiguration(c.hostConfig);
		setMethodFactory(methodFactory);

		setCalendarCollectionRoot();
	}

	// BaseCaldavClient Wrappers
	public String getUsername() {
		return client.getCalDavSeverUsername();
	}

	public void deletePath(String path) {
		DeleteMethod delete = new DeleteMethod(path);
		try {
			client.executeMethod(getHostConfiguration(), (HttpMethod) delete);
		} catch (HttpException e) {
			// TODO catch and throw a Caldav4jException
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * assumes that URL is function of uid
	 * 
	 * @param uid
	 * @throws CalDAV4JException
	 */
	public void deleteComponentByUid(String uid) throws CalDAV4JException {
		if ((uid != null) && (!"".equals(uid))) {
			deletePath(getCalendarCollectionRoot() + "/" + uid + ".ics");
			return;
		}
		throw new CalDAV4JException("Item not found"
				+ getCalendarCollectionRoot() + "/" + uid + ".ics");
	}

	/**
	 * crea una nuova cartella in path
	 * 
	 * @param path
	 * @return 0 if ok statusCode on error
	 * @throws Exception
	 */
	public int mkDirectory(String path) {
		MkCalendarMethod mk = new MkCalendarMethod();
		mk.setPath(path);

		try {
			client.executeMethod(getHostConfiguration(), (HttpMethod) mk);
		} catch (HttpException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		int statusCode = mk.getStatusCode();
		return (statusCode == CaldavStatus.SC_CREATED) ? 0 : statusCode;

	}

	/**
	 * list file/folders
	 * 
	 * @param path
	 * @return
	 * @throws IOException
	 */
	public int listCalendar(String path) throws IOException {
		// now let's try and get it, make sure it's there
		GetMethod get = new GetMethod();
		get.setPath(path);

		try {
			client.executeMethod(getHostConfiguration(), get);
		} catch (HttpException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println("listCalendar()" + get.getResponseBodyAsString());

		int statusCode = get.getStatusCode();
		return (statusCode == CaldavStatus.SC_OK) ? 0 : statusCode;

	}

	/**
	 * @param beginDate
	 * @param endDate
	 * @return a collection of events in the given time-interval
	 * @throws CalDAV4JException
	 */
	public List<Calendar> getEventResources(Date beginDate, Date endDate)
			throws CalDAV4JException {
		CalDAV4JMethodFactory mf = new CalDAV4JMethodFactory();
		setMethodFactory(mf);

		return getEventResources(client, beginDate, endDate);
	}

	/**
	 * @param y
	 *            year
	 * @param m
	 *            month
	 * @return a list of event in the given month/year
	 * @throws CalDAV4JException
	 */
	public List<Calendar> getEventResourcesByMonth(int y, int m)
			throws CalDAV4JException {
		Date beginDate = ICalendarUtils.createDateTime(y, m, 0, null, true); // uses
																				// no
																				// timezone,
																				// and
																				// UTC

		GregorianCalendar c = new GregorianCalendar();
		c.setTime(beginDate);
		c.add(GregorianCalendar.MONTH, 1);

		Date endDate = ICalendarUtils.createDateTime(
				c.get(GregorianCalendar.YEAR), c.get(GregorianCalendar.MONTH),
				c.get(GregorianCalendar.DATE), null, true);

		return getEventResources(beginDate, endDate);
	}

	/**
	 * sort a Calendar list by date
	 * 
	 * @param calendars
	 * @return
	 */
	public List<Calendar> sortByStartDate(List<Calendar> calendars) {
		Collections.sort(calendars, new CalendarComparator());
		return calendars;

	}

	/**
	 * 
	 * @return VEvent marked with an UID if success, null on error TODO should
	 *         throw more exceptions
	 * @throws CalDAV4JException
	 */
	public VEvent addEvent(VEvent ve, VTimeZone vtz) throws CalDAV4JException {

		if (ve.getProperty(Property.UID) == null) {
			Uid uid = new Uid(new DateTime().toString() + "-"
					+ UUID.randomUUID().toString() + "-" + getUsername());

			ve.getProperties().add(uid);
		}

		addEvent(client, ve, null);
		return ve;

	}

	/**
	 * modify an event with the same Uid of the given one
	 * 
	 * @param ve
	 * @param vtz
	 * @return ve on success, null on failure
	 * @throws ValidationException
	 */
	public VEvent editEvent(VEvent ve, VTimeZone vtz)
			throws ValidationException {
		try {
			ICalendarUtils.addOrReplaceProperty(ve, new DtStamp());
			ve.validate();
			updateMasterEvent(client, ve, vtz);
			return ve;
		} catch (CalDAV4JException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	/** sets Collection home .. ;) */
	public void setCalendarCollectionRoot(String path) {
		if (path == null) {
			path = client.getCalDavSeverWebDAVRoot() + "/" + getUsername()
					+ "/";
		}
		super.setCalendarCollectionRoot(path);
	}

	public void setCalendarCollectionRoot() {
		setCalendarCollectionRoot(null);
	}

	public String getCalendarCollectionRoot() {
		return super.getCalendarCollectionRoot();
	}

	public void setRelativePath(String path) {
		String home = client.getCalDavSeverWebDAVRoot() + "/" + getUsername()
				+ "/";
		if (path == null) {
			path = home;
		} else {
			home += path;
		}

		super.setCalendarCollectionRoot(home);
	}

	/**
	 * @see super()
	 * @param uid
	 * @return Calendar if object exists, null if not exists
	 * 
	 * @throws CalDAV4JException
	 */
	public Calendar getCalendarForEventUID(String uid)
			throws CalDAV4JException, ResourceNotFoundException {
		return super.getCalendarForEventUID(client, uid);
	}

	/**
	 * @see super
	 * @param propertyName
	 * @param beginDate
	 * @param endDate
	 * @throws CalDAV4JException
	 * @Deprecated {@link getComponentPropertyByTimestamp}
	 */
	public List<String> getEventPropertyByTimestamp(String propertyName,
			Date beginDate, Date endDate) throws CalDAV4JException {
		return super.getEventPropertyByTimestamp(client, propertyName,
				beginDate, endDate);
	}

	/**
	 * see super
	 * 
	 * @param componentName
	 * @param propertyName
	 * @param propertyFilter
	 * @param beginDate
	 * @param endDate
	 * @throws CalDAV4JException
	 *             if can't connect
	 */
	public List<String> getComponentPropertyByTimestamp(String componentName,
			String propertyName, String propertyFilter, Date beginDate,
			Date endDate) throws CalDAV4JException {
		return super.getComponentPropertyByTimestamp(client, componentName,
				propertyName, propertyFilter, beginDate, endDate);
	}

	/**
	 * 
	 * @param uid
	 * @return
	 * @throws CalDAV4JException
	 *             if can't connect
	 * @throws ResourceNotFoundException
	 *             if can't find object
	 * @see super
	 */
	public String getPathToResourceForEventId(String uid)
			throws CalDAV4JException, ResourceNotFoundException {
		return super.getPathToResourceForEventId(client, uid);
	}

	public List<String> getEventPropertyByTimestamp(BaseCaldavClient client2,
			String uid, java.util.Date beginDate, java.util.Date endDate) {
		// TODO Auto-generated method stub
		return null;
	}

}