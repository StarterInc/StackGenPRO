package io.starter.model;

import java.util.Date;

public class Payment {

	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column payment.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column payment.order_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer orderId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column payment.user_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Integer userId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column payment.date
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Date date;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column payment.amount
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private Float amount;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column payment.notes
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	private String notes;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column payment.id
	 * @return  the value of payment.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column payment.id
	 * @param id  the value for payment.id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column payment.order_id
	 * @return  the value of payment.order_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getOrderId() {
		return orderId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column payment.order_id
	 * @param orderId  the value for payment.order_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column payment.user_id
	 * @return  the value of payment.user_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column payment.user_id
	 * @param userId  the value for payment.user_id
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column payment.date
	 * @return  the value of payment.date
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Date getDate() {
		return date;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column payment.date
	 * @param date  the value for payment.date
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setDate(Date date) {
		this.date = date;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column payment.amount
	 * @return  the value of payment.amount
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public Float getAmount() {
		return amount;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column payment.amount
	 * @param amount  the value for payment.amount
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setAmount(Float amount) {
		this.amount = amount;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column payment.notes
	 * @return  the value of payment.notes
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public String getNotes() {
		return notes;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column payment.notes
	 * @param notes  the value for payment.notes
	 * @mbggenerated  Tue Apr 07 16:38:07 PDT 2015
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}
}