/*
 * Auto-generated AuditLog actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE AUDITLOG SECTION

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


export const CREATE_AUDITLOG = 'CREATE_AUDITLOG'
export function createAuditLog(u,p,e) {
  return {
    type: CREATE_AUDITLOG,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_AUDITLOG_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_AUDITLOG = 'FAILED_CREATE_AUDITLOG'
export function failedCreateAuditLog(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_AuditLog_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_AuditLog_unexpected_server_error);
  }
  // alert('CREATE AUDITLOG Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_AUDITLOG,
    error:e
  }
}

/*
 * @FormParam("AuditLog") String AuditLog,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateAuditLog(AuditLog, password, email, navigator) {

  console.log('AuditLogAction submitCreateAuditLog: ' + AuditLog + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createAuditLog(AuditLog, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/AuditLog/-1/'

    try{
        var reqStr =
        'AuditLog='+AuditLog+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'AuditLog=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('AuditLogAction submitCreateAuditLog: ' + url + reqStr)

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
        dispatch(receiveAuditLog(json.AuditLog, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateAuditLog(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_AUDITLOG = 'SETUP_AUDITLOG'
export function onboardAuditLog(json){
  return{
    type:SETUP_AUDITLOG,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_AUDITLOG_LEVEL = 'SET_AUDITLOG_LEVEL'
export const SET_AUDITLOGNAME = 'SET_AUDITLOGNAME'

// BEGIN FETCH SECTION
export const FETCH_AUDITLOG = 'FETCH_AUDITLOG'
export function fetchAuditLog(u,p) {
  return {
    type: FETCH_AUDITLOG,
    AuditLog:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_AUDITLOG = 'FAILED_FETCH_AUDITLOG'
export function failedLoginAuditLog(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH AUDITLOG Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_AUDITLOG,
    error:e
  }
}

export const RECEIVE_AUDITLOG = 'RECEIVE_'
export function receiveAuditLog(AuditLog, json) {
// alert('AuditLogAction.receivedAuditLog called for: ' +
// json.AuditLog + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_AuditLog_unexpected_server_error)
    return failedCreateAuditLog(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(AuditLog, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchAuditLog(AuditLog, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/AuditLog/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'AuditLog='+AuditLog+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'AuditLog=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveAuditLog(json.AuditLog, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginAuditLog(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutAuditLog(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(AuditLogemail, password) {
  return {
    type: RESET_PASSWORD,
    AuditLogemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(AuditLogemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(AuditLogemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/AuditLog/'+AuditLogemail+'/password/initiate'

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
        dispatch(receiveAuditLog(AuditLog, json))
      )
      .catch(e => e)
  }
}
