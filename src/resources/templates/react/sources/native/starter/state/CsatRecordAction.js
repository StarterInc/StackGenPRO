/*
 * Auto-generated CsatRecord actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE CSATRECORD SECTION

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


export const CREATE_CSATRECORD = 'CREATE_CSATRECORD'
export function createCsatRecord(u,p,e) {
  return {
    type: CREATE_CSATRECORD,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_CSATRECORD_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_CSATRECORD = 'FAILED_CREATE_CSATRECORD'
export function failedCreateCsatRecord(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_CsatRecord_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_CsatRecord_unexpected_server_error);
  }
  // alert('CREATE CSATRECORD Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_CSATRECORD,
    error:e
  }
}

/*
 * @FormParam("CsatRecord") String CsatRecord,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateCsatRecord(CsatRecord, password, email, navigator) {

  console.log('CsatRecordAction submitCreateCsatRecord: ' + CsatRecord + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createCsatRecord(CsatRecord, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/CsatRecord/-1/'

    try{
        var reqStr =
        'CsatRecord='+CsatRecord+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'CsatRecord=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('CsatRecordAction submitCreateCsatRecord: ' + url + reqStr)

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
        dispatch(receiveCsatRecord(json.CsatRecord, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateCsatRecord(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_CSATRECORD = 'SETUP_CSATRECORD'
export function onboardCsatRecord(json){
  return{
    type:SETUP_CSATRECORD,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_CSATRECORD_LEVEL = 'SET_CSATRECORD_LEVEL'
export const SET_CSATRECORDNAME = 'SET_CSATRECORDNAME'

// BEGIN FETCH SECTION
export const FETCH_CSATRECORD = 'FETCH_CSATRECORD'
export function fetchCsatRecord(u,p) {
  return {
    type: FETCH_CSATRECORD,
    CsatRecord:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_CSATRECORD = 'FAILED_FETCH_CSATRECORD'
export function failedLoginCsatRecord(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH CSATRECORD Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_CSATRECORD,
    error:e
  }
}

export const RECEIVE_CSATRECORD = 'RECEIVE_'
export function receiveCsatRecord(CsatRecord, json) {
// alert('CsatRecordAction.receivedCsatRecord called for: ' +
// json.CsatRecord + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_CsatRecord_unexpected_server_error)
    return failedCreateCsatRecord(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(CsatRecord, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchCsatRecord(CsatRecord, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/CsatRecord/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'CsatRecord='+CsatRecord+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'CsatRecord=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveCsatRecord(json.CsatRecord, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginCsatRecord(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutCsatRecord(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(CsatRecordemail, password) {
  return {
    type: RESET_PASSWORD,
    CsatRecordemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(CsatRecordemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(CsatRecordemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/CsatRecord/'+CsatRecordemail+'/password/initiate'

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
        dispatch(receiveCsatRecord(CsatRecord, json))
      )
      .catch(e => e)
  }
}
