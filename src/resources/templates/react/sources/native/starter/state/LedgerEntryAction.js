/*
 * Auto-generated LedgerEntry actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE LEDGERENTRY SECTION

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


export const CREATE_LEDGERENTRY = 'CREATE_LEDGERENTRY'
export function createLedgerEntry(u,p,e) {
  return {
    type: CREATE_LEDGERENTRY,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_LEDGERENTRY_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_LEDGERENTRY = 'FAILED_CREATE_LEDGERENTRY'
export function failedCreateLedgerEntry(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_LedgerEntry_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_LedgerEntry_unexpected_server_error);
  }
  // alert('CREATE LEDGERENTRY Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_LEDGERENTRY,
    error:e
  }
}

/*
 * @FormParam("LedgerEntry") String LedgerEntry,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateLedgerEntry(LedgerEntry, password, email, navigator) {

  console.log('LedgerEntryAction submitCreateLedgerEntry: ' + LedgerEntry + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createLedgerEntry(LedgerEntry, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/LedgerEntry/-1/'

    try{
        var reqStr =
        'LedgerEntry='+LedgerEntry+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'LedgerEntry=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('LedgerEntryAction submitCreateLedgerEntry: ' + url + reqStr)

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
        dispatch(receiveLedgerEntry(json.LedgerEntry, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateLedgerEntry(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_LEDGERENTRY = 'SETUP_LEDGERENTRY'
export function onboardLedgerEntry(json){
  return{
    type:SETUP_LEDGERENTRY,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_LEDGERENTRY_LEVEL = 'SET_LEDGERENTRY_LEVEL'
export const SET_LEDGERENTRYNAME = 'SET_LEDGERENTRYNAME'

// BEGIN FETCH SECTION
export const FETCH_LEDGERENTRY = 'FETCH_LEDGERENTRY'
export function fetchLedgerEntry(u,p) {
  return {
    type: FETCH_LEDGERENTRY,
    LedgerEntry:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_LEDGERENTRY = 'FAILED_FETCH_LEDGERENTRY'
export function failedLoginLedgerEntry(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH LEDGERENTRY Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_LEDGERENTRY,
    error:e
  }
}

export const RECEIVE_LEDGERENTRY = 'RECEIVE_'
export function receiveLedgerEntry(LedgerEntry, json) {
// alert('LedgerEntryAction.receivedLedgerEntry called for: ' +
// json.LedgerEntry + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_LedgerEntry_unexpected_server_error)
    return failedCreateLedgerEntry(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(LedgerEntry, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchLedgerEntry(LedgerEntry, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/LedgerEntry/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'LedgerEntry='+LedgerEntry+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'LedgerEntry=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveLedgerEntry(json.LedgerEntry, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginLedgerEntry(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutLedgerEntry(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(LedgerEntryemail, password) {
  return {
    type: RESET_PASSWORD,
    LedgerEntryemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(LedgerEntryemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(LedgerEntryemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/LedgerEntry/'+LedgerEntryemail+'/password/initiate'

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
        dispatch(receiveLedgerEntry(LedgerEntry, json))
      )
      .catch(e => e)
  }
}
