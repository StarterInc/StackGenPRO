package io.starter.generio.api;

import org.springframework.stereotype.Controller;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-01-30T12:20:21.685-08:00")

@Controller
/**
 TagApi
 ############################## DO NOT EDIT: GENERATED FILE ##############################

    Generated by Starter Ignite: http://starter.io/ignite
    Powered by Swagger Codegen: http://swagger.io
    
    Template file: JavaSpring/apiController.mustache

############################## DO NOT EDIT: GENERATED FILE ##############################
 
 Ignite Version: 
 
 */
public class TagApiController implements TagApi {

    
    @org.springframework.beans.factory.annotation.Autowired
    private TagApiDelegate delegate = null;

	/**
	* No-Args Constructor for classloading.
	*/
	public TagApiController() {
		// do not use
    }
    
    @org.springframework.beans.factory.annotation.Autowired
    public TagApiController(TagApiDelegate delegate) {
        this.delegate = delegate;
    }

    @Override
    public TagApiDelegate getDelegate() {
        return delegate;
    }
}
