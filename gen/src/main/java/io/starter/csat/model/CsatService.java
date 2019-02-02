package io.starter.csat.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.starter.csat.api.CsatApiDelegate;
import java.lang.Long;
import java.lang.Object;
import java.lang.String;
import java.time.OffsetDateTime;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Starter Ignite 'JavaGen' Generated Class: 
 * Feb/1/2019 20:43:58 -0800 */
@Service("csatApiDelegate")
public class CsatService implements CsatApiDelegate {
  public Csat CsatBean = new Csat();

  private Logger log = org.slf4j.LoggerFactory
  			.getLogger(io.starter.csat.model.CsatService.class);

  private SqlSessionFactory sqlSessionFactory = io.starter.ignite.security.dao.MyBatisConnectionFactory
  			.getSqlSessionFactory();

  @Autowired
  ObjectMapper objectMapper;

  @Autowired
  HttpServletRequest httpServletRequest;

  public CsatService() {
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setUserId(Long userIdVal) {
    CsatBean.userId = userIdVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setAtlasId(Long atlasIdVal) {
    CsatBean.atlasId = atlasIdVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setComments(String commentsVal) {
    CsatBean.comments = commentsVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setRating(Long ratingVal) {
    CsatBean.rating = ratingVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setKeyVersion(Long keyVersionVal) {
    CsatBean.keyVersion = keyVersionVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setKeySpec(String keySpecVal) {
    CsatBean.keySpec = keySpecVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setOwnerId(Long ownerIdVal) {
    CsatBean.ownerId = ownerIdVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setCreatedDate(OffsetDateTime createdDateVal) {
    CsatBean.createdDate = createdDateVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setModifiedDate(OffsetDateTime modifiedDateVal) {
    CsatBean.modifiedDate = modifiedDateVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setId(Long idVal) {
    CsatBean.id = idVal;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: userId */
  public Long getUserId() {
    return CsatBean.userId;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: atlasId */
  public Long getAtlasId() {
    return CsatBean.atlasId;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: comments */
  public String getComments() {
    return CsatBean.comments;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: rating */
  public Long getRating() {
    return CsatBean.rating;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: keyVersion */
  public Long getKeyVersion() {
    return CsatBean.keyVersion;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: keySpec */
  public String getKeySpec() {
    return CsatBean.keySpec;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: ownerId */
  public Long getOwnerId() {
    return CsatBean.ownerId;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: createdDate */
  public OffsetDateTime getCreatedDate() {
    return CsatBean.createdDate;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: modifiedDate */
  public OffsetDateTime getModifiedDate() {
    return CsatBean.modifiedDate;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800
   * 
   * @see java.lang.Object
   * 
   * @return the value of: id */
  public Long getId() {
    return CsatBean.id;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public HttpServletRequest getHttpServletRequest() {
    return httpServletRequest;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public ObjectMapper getObjectMapper() {
    return objectMapper;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public String getAcceptHeader() {
    return httpServletRequest.getHeader("accept");
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public void setBean(Object bx) {
    CsatBean = (Csat)bx;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public Object getBean() {
    return CsatBean;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public List list() {
    		final org.apache.ibatis.session.SqlSession session = sqlSessionFactory
        				.openSession(true);

        		io.starter.csat.model.dao.CsatCsatExample example = new io.starter.csat.model.dao.CsatCsatExample();
        		io.starter.csat.model.dao.CsatCsatExample.Criteria cx = example
        				.createCriteria();
        		cx.andIdLessThan(getId());

        		final java.util.List<io.starter.csat.model.dao.CsatCsat> rows = session
        				.selectList("io.starter.csat.model.dao.CsatCsatMapper.selectByExample", example);

        		session.close();
        		return rows;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public CsatService load() {
    		final org.apache.ibatis.session.SqlSession session = sqlSessionFactory
        				.openSession(true);

        		io.starter.csat.model.dao.CsatCsat ret = session
        				.selectOne("io.starter.csat.model.dao.CsatCsatMapper.selectByPrimaryKey", getId());

        if(ret!=null){ 
        this.CsatBean = ret.delegate;} else {

         log.error("no results searching io.starter.csat.model.Csat field for : "+getId());
        }
        		session.close();
        		return (ret != null ? this : null);
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public int insert() {
    		final org.apache.ibatis.session.SqlSession session = sqlSessionFactory.openSession(true);
        		int rows = -1;
        		try {
        			rows = session.insert("io.starter.csat.model.dao.CsatCsatMapper.insertSelective", this);
        		// commit performs the actual insert
        		session.commit();
        		session.close();
        } catch (Exception e) {
        			log.error("Could not run INSERT: " + e.toString());
        			throw new io.starter.ignite.generator.IgniteException("Could not run INSERT: " + e.toString());
        		}		return rows;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public int update() {
    		final org.apache.ibatis.session.SqlSession session = sqlSessionFactory.openSession(true);
        		int rows = -1;
        		try {
        			rows = session.update("io.starter.csat.model.dao.CsatCsatMapper.updateByPrimaryKeySelective", this);
        		// commit performs the actual update
        		session.commit();
        		session.close();
        } catch (Exception e) {
        			log.error("Could not run UPDATE: " + e.toString());
        			throw new io.starter.ignite.generator.IgniteException("Could not run INSERT: " + e.toString());
        }
        		return rows;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public int delete() {
    		final org.apache.ibatis.session.SqlSession session = sqlSessionFactory.openSession(true);
        		int rows = -1;
        		try {
        			rows = session.delete("io.starter.csat.model.dao.CsatCsatMapper.deleteByPrimaryKey", getId());
        		// commit performs the actual delete
        		session.commit();
        		session.close();
        } catch (Exception e) {
        			log.error("Could not run DELETE: " + e.toString());
        			throw new io.starter.ignite.generator.IgniteException("Could not run INSERT: " + e.toString());
        		}		return rows;
  }

  /**
   * Starter Ignite 'JavaGen' Generated Method: Feb/1/2019 20:43:58 -0800 */
  public String toJSON() {
    return CsatBean.toJSON();
  }
}
