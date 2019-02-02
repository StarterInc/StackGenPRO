package io.starter.generio.api;

import io.starter.generio.model.LedgerEntry;

import io.starter.ignite.model.DataModelObject;
import io.starter.ignite.generator.IgniteException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import org.json.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * A delegate to be called by the {@link LedgerEntryApiController}}.
 * Implement this interface with a {@link org.springframework.stereotype.Service} annotated class.
 *
 LedgerEntryApi
 ############################## DO NOT EDIT: GENERATED FILE ##############################

    Generated by Starter Ignite: http://starter.io/ignite
    Powered by Swagger Codegen: http://swagger.io
    
    Template file: JavaSpring/apiDelegate.mustache

############################## DO NOT EDIT: GENERATED FILE ##############################
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-01-30T12:20:21.685-08:00")

@EnableWebMvc
public interface LedgerEntryApiDelegate {

    Logger log = LoggerFactory.getLogger(LedgerEntryApiDelegate.class);

    ObjectMapper getObjectMapper();
    
    HttpServletRequest getHttpServletRequest();

    String getAcceptHeader();
    
   
    // Starter Ignite Persistence methods
    
    public void setId(Long idVal);
    
    public int insert();
    
    public int update();

    public int delete();
    
    public String toJSON();
    
    public void setBean(Object o);
    
    public Object getBean();
    
    public List<LedgerEntryApiDelegate> list();
    
    public LedgerEntryApiDelegate load();
    
	// End Starter Ignite Persistence methods
    

    /**
     * Dispatch the request to the delegate data object method and handle response
     *
     * @see LedgerEntryApi#delete
     */
    default ResponseEntity<Void> delete( Integer  param) {
        if(getObjectMapper() != null && getAcceptHeader() != null) {    
            
	        // delete();  - LedgerEntry
			try {
				Object ret = callMethod("delete", param);
				if (ret != null) {
					if (ret instanceof List) {
						return 
						(ResponseEntity<Void>) getResponse((List<?>) ret);
					} else {
						return 
						(ResponseEntity<Void>) getResponse((Object) ret);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} catch (Exception e) {
				log.error("Failure running method LedgerEntryApi.delete: "
						+ e);
				return new ResponseEntity<>(HttpStatus.  INTERNAL_SERVER_ERROR);
			}
        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default LedgerEntryApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    /**
     * Dispatch the request to the delegate data object method and handle response
     *
     * @see LedgerEntryApi#insert
     */
    default ResponseEntity<LedgerEntry> insert( LedgerEntry  param) {
        if(getObjectMapper() != null && getAcceptHeader() != null) {    
            
	        // insert();  - LedgerEntry
			try {
				Object ret = callMethod("insert", param);
				if (ret != null) {
					if (ret instanceof List) {
						return 
						(ResponseEntity<LedgerEntry>) getResponse((List<?>) ret);
					} else {
						return 
						(ResponseEntity<LedgerEntry>) getResponse((Object) ret);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} catch (Exception e) {
				log.error("Failure running method LedgerEntryApi.insert: "
						+ e);
				return new ResponseEntity<>(HttpStatus.  INTERNAL_SERVER_ERROR);
			}
        // TODO: implement examples    
        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default LedgerEntryApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    /**
     * Dispatch the request to the delegate data object method and handle response
     *
     * @see LedgerEntryApi#list
     */
    default ResponseEntity<List<Object>> list( String  searchparam) {
        if(getObjectMapper() != null && getAcceptHeader() != null) {    
            
	        // list();  - LedgerEntry
			try {
				Object ret = callMethod("list", searchparam);
				if (ret != null) {
					if (ret instanceof List) {
						return 
						(ResponseEntity<List<Object>>) getResponse((List<?>) ret);
					} else {
						return 
						(ResponseEntity<List<Object>>) getResponse((Object) ret);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} catch (Exception e) {
				log.error("Failure running method LedgerEntryApi.list: "
						+ e);
				return new ResponseEntity<>(HttpStatus.  INTERNAL_SERVER_ERROR);
			}
        // TODO: implement examples    
        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default LedgerEntryApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    /**
     * Dispatch the request to the delegate data object method and handle response
     *
     * @see LedgerEntryApi#load
     */
    default ResponseEntity<Object> load( Integer  param) {
        if(getObjectMapper() != null && getAcceptHeader() != null) {    
            
	        // load();  - LedgerEntry
			try {
				Object ret = callMethod("load", param);
				if (ret != null) {
					if (ret instanceof List) {
						return 
						(ResponseEntity<Object>) getResponse((List<?>) ret);
					} else {
						return 
						(ResponseEntity<Object>) getResponse((Object) ret);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} catch (Exception e) {
				log.error("Failure running method LedgerEntryApi.load: "
						+ e);
				return new ResponseEntity<>(HttpStatus.  INTERNAL_SERVER_ERROR);
			}
        // TODO: implement examples    
        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default LedgerEntryApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    /**
     * Dispatch the request to the delegate data object method and handle response
     *
     * @see LedgerEntryApi#update
     */
    default ResponseEntity<Object> update( Integer  param,
         LedgerEntry  param2) {
        if(getObjectMapper() != null && getAcceptHeader() != null) {    
            
	        // update();  - LedgerEntry
			try {
				Object ret = callMethod("update", param , param2);
				if (ret != null) {
					if (ret instanceof List) {
						return 
						(ResponseEntity<Object>) getResponse((List<?>) ret);
					} else {
						return 
						(ResponseEntity<Object>) getResponse((Object) ret);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} catch (Exception e) {
				log.error("Failure running method LedgerEntryApi.update: "
						+ e);
				return new ResponseEntity<>(HttpStatus.  INTERNAL_SERVER_ERROR);
			}
        // TODO: implement examples    
        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default LedgerEntryApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }

	/** 
	* Handle calling the data method on the Starter Ignite Delegate
	*/
	default Object callMethod(String string, Object... args) 
		throws Exception {
		if ("update".equals(string) && args.length == 2) {
			this.setBean(args[1]);
		}
		// hande id
		try {
			Long id = Long.parseLong(args[0].toString());
			// TODO: copy vals
			setId(id);
			// TODO: implement ModelCache
		} catch (Exception e) {
			// other type NP
			setBean(args[0]);
		}

		Method method = this.getClass().getDeclaredMethod(string);
		Object rx = method.invoke(this);

		List<Object> ret = null;
		if (rx != null && "list".equals(string)) {
			// if it *is* a list, don't return empty
			if (rx instanceof List) {
				if (((List<?>) rx).size() > 0) {
					return rx;
				} else {
					return null;
				}
			} else {
				ret = new ArrayList<Object>();
				ret.add(rx);
				return ret;
			}
		}
		return rx;
	}
	
	/**
	 * handle a list result
	 * 
	 * @param rex
	 * @return
	 */
	default ResponseEntity<?> getResponse(List<?> ret) {
		if (((List) ret).size() > 0) {
			Object rx = ((List) ret).get(0);
			if (!(rx instanceof Long)) {
				// convert to list of objects
				List<Object> rex = new ArrayList<Object>();
				for (Object r : (List) ret)rex.add(r);
				return new ResponseEntity<List<Object>>(rex, HttpStatus.OK);
			} else {
				if(rx instanceof Integer){
					if ((Integer) rx > 0)
							return new ResponseEntity<>(HttpStatus.OK);
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				if(rx instanceof Long){
					if ((Long) rx > 0) 
							return new ResponseEntity<>(HttpStatus.OK);
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	/**
	 * handle a single result
	 * 
	 * @param ret
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	default ResponseEntity<?> getResponse(Object ret) throws JsonParseException, JsonMappingException, IOException {
		if (ret instanceof Integer) {
			if ((Integer) ret > 0)
				return new ResponseEntity<>(HttpStatus.OK);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (ret instanceof Long) {
			if ((Long) ret > 0)
				return new ResponseEntity<>(HttpStatus.OK);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		// returns single result
		JSONObject job = new JSONObject(((LedgerEntryApiDelegate)ret).getBean());
		return new ResponseEntity<>(getObjectMapper().readValue(job.toString(), LedgerEntry.class), HttpStatus.OK);
	}
		
}

/* TODO: implement examples
    if (getAcceptHeader().contains("")) {
        try {
                return new ResponseEntity<>(getObjectMapper().readValue("", .class), HttpStatus.NOT_IMPLEMENTED);
        } catch (IOException e) {
            log.error("Couldn't serialize response for content type ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
*/ 
