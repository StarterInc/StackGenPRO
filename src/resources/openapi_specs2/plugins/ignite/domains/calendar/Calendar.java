package io.starter.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Vector;

public class Calendar {

	

// relational object setup
	
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar.description
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private String description;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar.owner_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer ownerId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar.remote_url
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private String remoteUrl;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar.timezone
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private String timezone;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column calendar.display_color
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private String displayColor;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar.id
	 * @return  the value of calendar.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar.id
	 * @param id  the value for calendar.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar.description
	 * @return  the value of calendar.description
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar.description
	 * @param description  the value for calendar.description
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar.owner_id
	 * @return  the value of calendar.owner_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getOwnerId() {
		return ownerId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar.owner_id
	 * @param ownerId  the value for calendar.owner_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setOwnerId(Integer ownerId) {
		this.ownerId = ownerId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar.remote_url
	 * @return  the value of calendar.remote_url
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public String getRemoteUrl() {
		return remoteUrl;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar.remote_url
	 * @param remoteUrl  the value for calendar.remote_url
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setRemoteUrl(String remoteUrl) {
		this.remoteUrl = remoteUrl;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar.timezone
	 * @return  the value of calendar.timezone
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public String getTimezone() {
		return timezone;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar.timezone
	 * @param timezone  the value for calendar.timezone
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column calendar.display_color
	 * @return  the value of calendar.display_color
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public String getDisplayColor() {
		return displayColor;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column calendar.display_color
	 * @param displayColor  the value for calendar.display_color
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setDisplayColor(String displayColor) {
		this.displayColor = displayColor;
	}


	private List<CalendarEvent> events = new ArrayList();

	public List<?> getEvents() {
		return events;
	}

	public void setEvents(List<CalendarEvent> events) {
		this.events = events;
	}

	
	/**
	 * logic to check if a date is available on the calendar 
	 * 
	 * @param dt the requested date/time
	 * @param duration in minutes
	 * @return
	 */
	public boolean isAvailable(Date dt, int duration){
		//if(true)
			//return false;
		
		for(CalendarEvent ce : events){
			if(ce.conflicts(dt, duration)){
				return false;
			}
		}
		return true;
	}
}