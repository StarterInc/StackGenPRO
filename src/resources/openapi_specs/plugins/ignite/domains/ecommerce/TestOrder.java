package io.starter;

import static org.junit.Assert.*;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.CountDownLatch;

import io.starter.datamodel.OrderData;
import io.starter.model.CalendarEvent;
import io.starter.model.Location;
import io.starter.model.Order;
import io.starter.model.OrderDetail;
import io.starter.model.OrderExample;
import io.starter.model.Payment;
import io.starter.model.PaymentExample;
import io.starter.model.Product;
import io.starter.model.ProductExample;
import io.starter.model.User;
import io.starter.security.dao.MyBatisConnectionFactory;
import io.starter.util.StringWriteBuffer;
import io.starter.util.SystemConstants;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import com.extentech.ExtenXLS.CellHandle;
import com.extentech.ExtenXLS.CellRange;
import com.extentech.ExtenXLS.ExcelReports;
import com.extentech.ExtenXLS.FormulaHandle;
import com.extentech.ExtenXLS.HTMLWorkBookWriter;
import com.extentech.ExtenXLS.NameHandle;
import com.extentech.ExtenXLS.RowHandle;
import com.extentech.ExtenXLS.WorkBookHandle;
import com.extentech.ExtenXLS.WorkSheetHandle;
import com.extentech.formats.XLS.CellNotFoundException;
import com.extentech.formats.XLS.FormulaNotFoundException;
import com.extentech.formats.XLS.RowNotFoundException;
import com.vroomengine.ecommerce.Invoice;

/**
 * 
 * A junit tester for Orders
 * 
 * @author nick
 * 
 */
public class TestOrder implements SystemConstants {

	SqlSessionFactory sqlSessionFactory;

	@Before
	public void setup() {

		sqlSessionFactory = MyBatisConnectionFactory.getSqlSessionFactory();
	}

	@Test
	public void testGetPayment() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);

		PaymentExample example = new PaymentExample();
		example.setDistinct(true);

		List<Payment> payments = session.selectList(
				"io.starter.dao.PaymentMapper.selectByExample", example);

		/*
		 * 
		 * Order order = session.selectOne(
		 * "io.starter.dao.OrderMapper.selectByPrimaryKey", 1);
		 */
		assertEquals("Partial payment", ((Payment) payments.get(0)).getNotes());

		session.close();
	}

	@Test
	public void testGetProduct() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);

		ProductExample example = new ProductExample();
		io.starter.model.ProductExample.Criteria criteria = example
				.createCriteria();

		example.setDistinct(true);

		Product prod = session.selectOne(
				"io.starter.dao.ProductMapper.selectByPrimaryKey", 1);

		/*
		 * 
		 * Order order = session.selectOne(
		 * "io.starter.dao.ProductMapper.selectByPrimaryKey", 1);
		 */
		assertEquals("Draeger device", prod.getDescription());
		session.close();
	}

	@Test
	public void testOrderInvoice() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);

		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		criteria.andIdEqualTo(2);
		
		example.setOrderByClause("id DESC");
		Order thisOrder = (Order) session.selectOne(
				"io.starter.dao.OrderMapper.selectObjByExample", example);

		assert(thisOrder.getPayments().size() == 2);
		assert(thisOrder.getOrderDetails().size() == 3);

		/*
		 * 
		 * Order order = session.selectOne(
		 * "io.starter.dao.OrderMapper.selectByPrimaryKey", 1);
		 */
		assertEquals("New Installation", thisOrder.getDescription());
		Invoice inv = new Invoice();
		
		OutputStream fous = new ByteArrayOutputStream();
		User fromUser = new User();
		fromUser.setEmail("john@starter.io");
		fromUser.setId(1);
		fromUser.setUsername("VroomAdmin");
		fromUser.setFirstName("Vroom");
		fromUser.setLastName("Scheduler");
		User toUser = new User();
		List recips = new Vector();
		recips.add(fromUser);
		
		toUser.setEmail("andres@starter.io");
		toUser.setId(1000);
		toUser.setUsername("Andres");
		toUser.setFirstName("Andres");
		toUser.setLastName("Acosta");
		recips.add(toUser);
		
		WorkBookHandle book = Invoice.generateInvoice(thisOrder, fous, "http://localhost:8080", ExcelReports.EXCEL_OUTPUT_HTML);
		NameHandle nam = book.getNamedRange("DATA_INVOICE_TOTAL");
		String cost = nam.getCells()[0].getFormattedStringVal();
		
		assert(cost.equals("-$4.34"));
		
		// send an email with the order estimate
		CountDownLatch latch = new CountDownLatch(1);
		OrderData.sendNotification(fromUser, recips, 1, thisOrder, "Thank you for scheduling with Vroom!", cost, session, latch);
		latch.await();
		
		File fout = new File(System.getProperty("user.dir") + "/test/Invoice-"
				+ thisOrder.getCustomerId() + "-" + thisOrder.getId() + ".xls");
		
		fous = new FileOutputStream(fout);
		
		WorkBookHandle bklx = Invoice.generateInvoice(thisOrder, fous, "", ExcelReports.EXCEL_OUTPUT_XLS);
		
		session.close();
	}

	
	@Test
	public void testOrderScheduleConfirm() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);

		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		criteria.andIdEqualTo(2);
		
		example.setOrderByClause("id DESC");
		Order thisOrder = (Order) session.selectOne(
				"io.starter.dao.OrderMapper.selectObjByExample", example);

		assert(thisOrder.getPayments().size() == 2);
		assert(thisOrder.getOrderDetails().size() == 3);

		/*
		 * 
		 * Order order = session.selectOne(
		 * "io.starter.dao.OrderMapper.selectByPrimaryKey", 1);
		 */
		assertEquals("New Installation", thisOrder.getDescription());
		Invoice inv = new Invoice();
		
		OutputStream fous = new ByteArrayOutputStream();
		User fromUser = new User();
		fromUser.setEmail("john@starter.io");
		fromUser.setId(1);
		fromUser.setUsername("VroomAdmin");
		fromUser.setFirstName("Vroom");
		fromUser.setLastName("Scheduler");
		User toUser = new User();
		List recips = new Vector();
		recips.add(fromUser);
		
		toUser.setEmail("andres@starter.io");
		toUser.setId(1000);
		toUser.setUsername("Andres");
		toUser.setFirstName("Andres");
		toUser.setLastName("Acosta");
		recips.add(toUser);
		
		WorkBookHandle book = Invoice.generateOrderDetails(thisOrder, fous, "http://localhost:8080", ExcelReports.EXCEL_OUTPUT_HTML);
		NameHandle nam = book.getNamedRange("DATA_INVOICE_TOTAL");
		String cost = nam.getCells()[0].getFormattedStringVal();
		
		assert(cost.equals("-$4.34"));
		
		// send an email with the order estimate
		CountDownLatch latch = new CountDownLatch(1);
		OrderData.sendNotification(fromUser, recips, 1, thisOrder, "Thank you for scheduling with Vroom!", cost, session, latch);
		latch.await();
		
		File fout = new File(System.getProperty("user.dir") + "/test/OrderConfirm-"
				+ thisOrder.getCustomerId() + "-" + thisOrder.getId() + ".xls");
		
		fous = new FileOutputStream(fout);
		
		WorkBookHandle bklx = Invoice.generateInvoice(thisOrder, fous, "", ExcelReports.EXCEL_OUTPUT_XLS);
		
		session.close();
	}

	
	@Test
	public void testInsertOrder() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);

		// create a new order (lol)
		Order ord = new Order();
		ord.setCustomerId(1652);
		ord.setDescription("New Installation");
		ord.setLocationId(6);
		ord.setPurchaseOrder("AZ3333");
		ord.setSalesId(1);
		ord.setDate(new Date(System.currentTimeMillis()));
		ord.setAdjustment(0.0f);
		ord.setEventId(1);

		session.insert("io.starter.dao.OrderMapper.insert", ord);

		// now some details
		int orderId = ord.getId();

		OrderDetail det1 = new OrderDetail();
		det1.setDescription("Install Intoxalock");
		det1.setPrice(44.44f);
		det1.setOrderId(orderId);
		det1.setQty(1);
		det1.setAdjustment(.1f); // 10% discount
		det1.setProductId(7);
		session.insert("io.starter.dao.OrderDetailMapper.insert", det1);

		// 16 extra tech charge
		OrderDetail det2 = new OrderDetail();
		det2.setDescription("Extra Time Technician");
		det2.setPrice(75.00f);
		det2.setOrderId(orderId);
		det2.setQty(1);
		det2.setProductId(16);
		session.insert("io.starter.dao.OrderDetailMapper.insert", det2);


		// 16 extra tech charge
		OrderDetail det3 = new OrderDetail();
		det3.setDescription("Extra Time Overtime Technician");
		det3.setPrice(45.75f);
		det3.setOrderId(orderId);
		det3.setQty(3);
		det1.setAdjustment(5.00f); // $5 discount
		det3.setProductId(17);
		session.insert("io.starter.dao.OrderDetailMapper.insert", det3);

		JSONObject dtx = new JSONObject();

		dtx.put("title", "Installation #" + 1652);
		dtx.put("editable", "true");
		dtx.put("color", "#222222");
		dtx.put("backgroundColor", "#ff9900");

		// log the data
		CalendarEvent cal = new CalendarEvent();
		cal.setTitle("Installation");
		cal.setType(-1);
		cal.setCalendarId(1);
		cal.setStatus(1);

		// set a url
		String urx = "/table_view.jsp?tablename=Order&query=id:" + orderId;
		// dtx.put("url", urx);
		cal.setUrl(urx);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		// get a date object from the date string for date math
		Date dtt = ord.getDate();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(dtt);

		cal.setStart(dtt);
		dtx.put("start", gc.getTime());

		gc.add(GregorianCalendar.HOUR, 3); // 3 hour slot
		cal.setEnd(gc.getTime());
		dtx.put("end", gc.getTime());

		int cv = session.insert("io.starter.dao.CalendarEventMapper.insert", cal);
		
		ord.setEventId(cv);

		session.update("io.starter.dao.OrderMapper.updateByPrimaryKey", ord);

		session.commit();

		
		
		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		criteria.andIdEqualTo(orderId);
		List<Order> orders = session.selectList(
				"io.starter.dao.OrderMapper.selectObjByExample", example);

		Order thisOrder = (Order) orders.get(0);
		assertTrue(thisOrder.getPayments().size() == 0);
		assertTrue(((User) thisOrder.getCustomer()).getFirstName().equals(
				"Pinky"));

		assertTrue(thisOrder.getOrderDetails().size() == 3);

		/*
		 * 
		 * Order order = session.selectOne(
		 * "io.starter.dao.OrderMapper.selectByPrimaryKey", 1);
		 */
		assertEquals("New Installation", thisOrder.getDescription());

		
		
		File fout = new File(System.getProperty("user.dir") + "/test/Invoice-"
				+ thisOrder.getCustomerId() + "-" + thisOrder.getId() + ".xls");
		FileOutputStream foux = new FileOutputStream(fout);
		Invoice.generateInvoice(thisOrder, foux, "http://localhost:8080", ExcelReports.EXCEL_OUTPUT_XLS);

		
		File fouthml = new File(System.getProperty("user.dir")
				+ "/test/Invoice-" + thisOrder.getCustomerId() + "-"
				+ thisOrder.getId() + ".html");
		FileOutputStream fous = new FileOutputStream(fouthml);
		Invoice.generateInvoice(thisOrder, fous, "http://localhost:8080", ExcelReports.EXCEL_OUTPUT_HTML);


		session.close();
	}


	@Test
	public void testGetExistingOrder() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);

		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		criteria.andIdEqualTo(2);
		
		example.setOrderByClause("id DESC");
		Order thisOrder = (Order) session.selectOne(
				"io.starter.dao.OrderMapper.selectObjByExample", example);
		assertTrue(thisOrder.getPayments().size() == 2);

		assertTrue(thisOrder.getOrderDetails().size() == 4);

		/*
		 * 
		 * Order order = session.selectOne(
		 * "io.starter.dao.OrderMapper.selectByPrimaryKey", 1);
		 */
		assertEquals("New Installation",
				thisOrder.getDescription());

		session.close();
	}

	@Test
	public void testGetEventsByOrder() throws Exception {
		SqlSession session = sqlSessionFactory.openSession(true);

		OrderExample example = new OrderExample();
		io.starter.model.OrderExample.Criteria criteria = example
				.createCriteria();

		// TODO: seems like a good place for a Lambda!
		example.setDistinct(true);
		criteria.andIdEqualTo(2);
		
		example.setOrderByClause("id DESC");
		Order thisOrder = (Order) session.selectOne(
				"io.starter.dao.OrderMapper.selectObjByExample", example);
		/*
		 * 
		 * Order order = session.selectOne(
		 * "io.starter.dao.OrderMapper.selectByPrimaryKey", 1);
		 */
		assertEquals(thisOrder.getEvent().getStart().toString(), "Fri Apr 06 17:12:28 PDT 2012");

		session.close();
	}
}
