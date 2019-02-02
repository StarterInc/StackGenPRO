/**
 * NOTE: This class is auto generated by the swagger code generator program (2.4.0-SNAPSHOT).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 
 ############################## DO NOT EDIT: GENERATED FILE ##############################

    Generated by Starter Ignite: http://starter.io/ignite
    Powered by Swagger Codegen: http://swagger.io
    
    Template file: JavaSpring/api.mustache

############################## DO NOT EDIT: GENERATED FILE ##############################
 */
package io.starter.generio.api;

import io.starter.generio.model.ApiSpec;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-01-30T12:20:21.685-08:00")

@Api(value = "ApiSpec", description = "the ApiSpec API")
public interface ApiSpecApi {

    ApiSpecApiDelegate getDelegate();

    @ApiOperation(value = "Delete an ApiSpec from the system", nickname = "delete", notes = "Starter Ignite Auto Generated ApiSpec:delete", authorizations = {
        @Authorization(value = "automator_auth", scopes = {
            
            })
    }, tags={ "", })
    @ApiResponses(value = {  })
    @RequestMapping(value = "/ApiSpec/{param}",
        method = RequestMethod.DELETE)
    default ResponseEntity<Void> delete(@Min(0)@ApiParam(value = "Retreive a single result by ID",required=true) @PathVariable("param") Integer param) {
        return getDelegate().delete(param);
    }


    @ApiOperation(value = "Insert a new ApiSpec into the system", nickname = "insert", notes = "Starter Ignite Auto Generated ApiSpec:insert", response = ApiSpec.class, authorizations = {
        @Authorization(value = "automator_auth", scopes = {
            
            })
    }, tags={ "", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Results fetched OK", response = ApiSpec.class) })
    @RequestMapping(value = "/ApiSpec/{param}",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    default ResponseEntity<ApiSpec> insert(@ApiParam(value = "Updated JSON data" ,required=true )  @Valid @RequestBody ApiSpec param) {
        return getDelegate().insert(param);
    }


    @ApiOperation(value = "Listing", nickname = "list", notes = "Starter Ignite Auto Generated Listing", response = Object.class, responseContainer = "List", authorizations = {
        @Authorization(value = "automator_auth", scopes = {
            
            })
    }, tags={ "", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "", response = Object.class, responseContainer = "List") })
    @RequestMapping(value = "/ApiSpec/list/{searchparam}",
        method = RequestMethod.GET)
    default ResponseEntity<List<Object>> list(@ApiParam(value = "Search example: JSON",required=true) @PathVariable("searchparam") String searchparam) {
        return getDelegate().list(searchparam);
    }


    @ApiOperation(value = "Load a ApiSpec from the system", nickname = "load", notes = "Starter Ignite Auto Generated ApiSpec:load", response = Object.class, authorizations = {
        @Authorization(value = "automator_auth", scopes = {
            
            })
    }, tags={ "", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Results fetched OK", response = Object.class) })
    @RequestMapping(value = "/ApiSpec/{param}",
        method = RequestMethod.GET)
    default ResponseEntity<Object> load(@Min(0)@ApiParam(value = "Retreive a single result by ID",required=true) @PathVariable("param") Integer param) {
        return getDelegate().load(param);
    }


    @ApiOperation(value = "Update a ApiSpec in the system", nickname = "update", notes = "Starter Ignite Auto Generated ApiSpec:update", response = Object.class, authorizations = {
        @Authorization(value = "automator_auth", scopes = {
            
            })
    }, tags={ "", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Results fetched OK", response = Object.class) })
    @RequestMapping(value = "/ApiSpec/{param}",
        method = RequestMethod.PUT)
    default ResponseEntity<Object> update(@Min(0)@ApiParam(value = "Retreive a single result by ID",required=true) @PathVariable("param") Integer param,@ApiParam(value = "Updated JSON data" ,required=true )  @Valid @RequestBody ApiSpec param2) {
        return getDelegate().update(param, param2);
    }

}
