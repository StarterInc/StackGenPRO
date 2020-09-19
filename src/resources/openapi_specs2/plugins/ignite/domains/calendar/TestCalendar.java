package io.starter;

import static org.junit.Assert.*;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;

import io.starter.datamodel.CalendarEventData;
import io.starter.model.Calendar;
import io.starter.model.CalendarEvent;
import io.starter.security.dao.MyBatisConnectionFactory;
import io.starter.util.SystemConstants;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;

/**
 * A junit tester for db interaction with the Calendar categories
 * 
 * @author nick
 * 
 */
public class TestCalendar implements SystemConstants {

	SqlSessionFactory sqlSessionFactory;

	@Before
	public void setup() {

		sqlSessionFactory = MyBatisConnectionFactory.getSqlSessionFactory();
	}

	/**
	 * 
	 * add calendar event
	 *
	 * @throws IOException
	 * @throws ServletException
	 * @throws JSONException
	 * @throws ParseException
	 */
	@Test
	public void testAddCalendarEvent() throws IOException, ServletException,
			JSONException, ParseException {

		Integer calendarId = 1;
		// Step 1. input requested time and location
		Date requestedDateTime = new java.util.Date(System.currentTimeMillis());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		String date = sdf.format(requestedDateTime);
		Integer vehicleId = 1;
		SqlSession session = sqlSessionFactory.openSession(true);
		String cdesc = "testAddCalendarEvent: ADDED TEST EVENT";
		CalendarEventData.addCalendarEvent(calendarId, cdesc, SystemConstants.SCHEDULE_TYPE_REPAIR, date, vehicleId, null, session);

	}

	
	@Test
	public void testGetExistingCalendar() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);
		Calendar cal = session.selectOne(
				"io.starter.dao.CalendarMapper.selectObjByPrimaryKey", 1);

		assertEquals("Calendar", cal.getDescription());

		session.close();
	}

	@Test
	public void testGetEventsByCalendar() throws Exception {
		sqlSessionFactory = MyBatisConnectionFactory.getSqlSessionFactory();
		SqlSession session = sqlSessionFactory.openSession(true);

		Calendar cal = session.selectOne(
				"io.starter.dao.CalendarMapper.selectObjByPrimaryKey", 1);

		assertTrue(cal.getEvents().size() > 1);

		List<CalendarEvent> results = (List<CalendarEvent>) cal.getEvents();
		for (CalendarEvent t : results) {
			assertTrue(t.getStart()
					.before(new Date(System.currentTimeMillis())));

		}

		session.close();
	}
}
