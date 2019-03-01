package io.starter.model;

import java.util.Date;
import java.util.GregorianCalendar;

public class CalendarEvent {

	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.calendar_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer calendarId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.title
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private String title;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.start
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Date start;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.end
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Date end;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.url
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private String url;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.status
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer status;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.type
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer type;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar_event.resource_calendar_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer resourceCalendarId;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.id
	 * @return  the value of calendar_event.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.id
	 * @param id  the value for calendar_event.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.calendar_id
	 * @return  the value of calendar_event.calendar_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getCalendarId() {
		return calendarId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.calendar_id
	 * @param calendarId  the value for calendar_event.calendar_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setCalendarId(Integer calendarId) {
		this.calendarId = calendarId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.title
	 * @return  the value of calendar_event.title
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.title
	 * @param title  the value for calendar_event.title
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.start
	 * @return  the value of calendar_event.start
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Date getStart() {
		return start;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.start
	 * @param start  the value for calendar_event.start
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setStart(Date start) {
		this.start = start;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.end
	 * @return  the value of calendar_event.end
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Date getEnd() {
		return end;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.end
	 * @param end  the value for calendar_event.end
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setEnd(Date end) {
		this.end = end;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.url
	 * @return  the value of calendar_event.url
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.url
	 * @param url  the value for calendar_event.url
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.status
	 * @return  the value of calendar_event.status
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.status
	 * @param status  the value for calendar_event.status
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.type
	 * @return  the value of calendar_event.type
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.type
	 * @param type  the value for calendar_event.type
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar_event.resource_calendar_id
	 * @return  the value of calendar_event.resource_calendar_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getResourceCalendarId() {
		return resourceCalendarId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar_event.resource_calendar_id
	 * @param resourceCalendarId  the value for calendar_event.resource_calendar_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setResourceCalendarId(Integer resourceCalendarId) {
		this.resourceCalendarId = resourceCalendarId;
	}

	/**
	 * check that the passed in date is not between the start and end times of
	 * this event, thus conflicting
	 * 
	 * @param dtx
	 * @param duration
	 * @return
	 */
	public boolean conflicts(Date starts, int duration) {

		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(starts);
		gc.add(GregorianCalendar.MINUTE, duration);
		Date ends = gc.getTime();

		Date thisStarts = this.getStart();
		Date thisEnds = this.getEnd();

		if (ends.before(thisStarts))
				return false;
		else if (starts.after(thisEnds))
				return false;
		else if ((starts.after(thisStarts)) && (starts.before(thisEnds)))
			return true;
		else if ((ends.after(thisStarts)) && (ends.before(thisEnds)))
			return true;
		else
			return true;

	}

}