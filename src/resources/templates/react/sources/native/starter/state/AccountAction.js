/*
 * Auto-generated Account actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE ACCOUNT SECTION

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


export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export function createAccount(u,p,e) {
  return {
    type: CREATE_ACCOUNT,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_ACCOUNT_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_ACCOUNT = 'FAILED_CREATE_ACCOUNT'
export function failedCreateAccount(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Account_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Account_unexpected_server_error);
  }
  // alert('CREATE ACCOUNT Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_ACCOUNT,
    error:e
  }
}

/*
 * @FormParam("Account") String Account,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateAccount(Account, password, email, navigator) {

  console.log('AccountAction submitCreateAccount: ' + Account + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createAccount(Account, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Account/-1/'

    try{
        var reqStr =
        'Account='+Account+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Account=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('AccountAction submitCreateAccount: ' + url + reqStr)

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
        dispatch(receiveAccount(json.Account, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateAccount(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_ACCOUNT = 'SETUP_ACCOUNT'
export function onboardAccount(json){
  return{
    type:SETUP_ACCOUNT,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_ACCOUNT_LEVEL = 'SET_ACCOUNT_LEVEL'
export const SET_ACCOUNTNAME = 'SET_ACCOUNTNAME'

// BEGIN FETCH SECTION
export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'
export function fetchAccount(u,p) {
  return {
    type: FETCH_ACCOUNT,
    Account:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_ACCOUNT = 'FAILED_FETCH_ACCOUNT'
export function failedLoginAccount(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH ACCOUNT Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_ACCOUNT,
    error:e
  }
}

export const RECEIVE_ACCOUNT = 'RECEIVE_'
export function receiveAccount(Account, json) {
// alert('AccountAction.receivedAccount called for: ' +
// json.Account + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Account_unexpected_server_error)
    return failedCreateAccount(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Account, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchAccount(Account, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Account/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Account='+Account+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Account=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveAccount(json.Account, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginAccount(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutAccount(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Accountemail, password) {
  return {
    type: RESET_PASSWORD,
    Accountemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Accountemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Accountemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Account/'+Accountemail+'/password/initiate'

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
        dispatch(receiveAccount(Account, json))
      )
      .catch(e => e)
  }
}
