/*
 * Auto-generated ModelApiResponse actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE MODELAPIRESPONSE SECTION

/* TOOD: implement offline updates
const action = userId => ({
  type: 'FOLLOW_USER',
  payload: { userId },
  meta: {
    offline: {
      effect: //...,
      rollback: { type: 'FOLLOW_USER_ROLLBACK', meta: { userId }}  
     }
  }
});

*/


export const CREATE_MODELAPIRESPONSE = 'CREATE_MODELAPIRESPONSE'
export function createModelApiResponse(u,p,e) {
  return {
    type: CREATE_MODELAPIRESPONSE,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_MODELAPIRESPONSE_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_MODELAPIRESPONSE = 'FAILED_CREATE_MODELAPIRESPONSE'
export function failedCreateModelApiResponse(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_ModelApiResponse_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_ModelApiResponse_unexpected_server_error);
  }
  // alert('CREATE MODELAPIRESPONSE Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_MODELAPIRESPONSE,
    error:e
  }
}

/*
 * @FormParam("ModelApiResponse") String ModelApiResponse,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateModelApiResponse(ModelApiResponse, password, email, navigator) {

  console.log('ModelApiResponseAction submitCreateModelApiResponse: ' + ModelApiResponse + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createModelApiResponse(ModelApiResponse, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ModelApiResponse/-1/'

    try{
        var reqStr =
        'ModelApiResponse='+ModelApiResponse+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'ModelApiResponse=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('ModelApiResponseAction submitCreateModelApiResponse: ' + url + reqStr)

    var request = new Request(url, {
      method: 'PUT',
      credentials: 'same-origin', headers: {

        // 'Accept': 'application/json', // x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
     // mode: 'cors',
     // redirect: 'follow',
      body: reqStr
    });

    fetch(request)
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveModelApiResponse(json.ModelApiResponse, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateModelApiResponse(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_MODELAPIRESPONSE = 'SETUP_MODELAPIRESPONSE'
export function onboardModelApiResponse(json){
  return{
    type:SETUP_MODELAPIRESPONSE,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_MODELAPIRESPONSE_LEVEL = 'SET_MODELAPIRESPONSE_LEVEL'
export const SET_MODELAPIRESPONSENAME = 'SET_MODELAPIRESPONSENAME'

// BEGIN FETCH SECTION
export const FETCH_MODELAPIRESPONSE = 'FETCH_MODELAPIRESPONSE'
export function fetchModelApiResponse(u,p) {
  return {
    type: FETCH_MODELAPIRESPONSE,
    ModelApiResponse:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_MODELAPIRESPONSE = 'FAILED_FETCH_MODELAPIRESPONSE'
export function failedLoginModelApiResponse(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH MODELAPIRESPONSE Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_MODELAPIRESPONSE,
    error:e
  }
}

export const RECEIVE_MODELAPIRESPONSE = 'RECEIVE_'
export function receiveModelApiResponse(ModelApiResponse, json) {
// alert('ModelApiResponseAction.receivedModelApiResponse called for: ' +
// json.ModelApiResponse + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_ModelApiResponse_unexpected_server_error)
    return failedCreateModelApiResponse(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(ModelApiResponse, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchModelApiResponse(ModelApiResponse, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ModelApiResponse/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'ModelApiResponse='+ModelApiResponse+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'ModelApiResponse=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }
    // console.log(reqStr)

    var request = new Request(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {

        // 'Accept': 'application/json', // x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
     // mode: 'cors',
     // redirect: 'follow',
      body: reqStr
    });

    fetch(request)
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveModelApiResponse(json.ModelApiResponse, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginModelApiResponse(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutModelApiResponse(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(ModelApiResponseemail, password) {
  return {
    type: RESET_PASSWORD,
    ModelApiResponseemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(ModelApiResponseemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(ModelApiResponseemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ModelApiResponse/'+ModelApiResponseemail+'/password/initiate'

  // console.log(JSON.stringify(params));

    var reqStr = 'password='+password+'&devicetoken=2123123'

  // console.log(reqStr)
    var request = new Request(url, {
      method: 'POST',
      credentials: 'same-origin', headers: {

        // 'Accept': 'application/json', // x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
     // mode: 'cors',
     // redirect: 'follow',
      body: reqStr
    });

    fetch(request)
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveModelApiResponse(ModelApiResponse, json))
      )
      .catch(e => e)
  }
}
