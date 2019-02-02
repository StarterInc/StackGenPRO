/*
 * Auto-generated ApiSpec actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE APISPEC SECTION

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


export const CREATE_APISPEC = 'CREATE_APISPEC'
export function createApiSpec(u,p,e) {
  return {
    type: CREATE_APISPEC,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_APISPEC_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_APISPEC = 'FAILED_CREATE_APISPEC'
export function failedCreateApiSpec(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_ApiSpec_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_ApiSpec_unexpected_server_error);
  }
  // alert('CREATE APISPEC Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_APISPEC,
    error:e
  }
}

/*
 * @FormParam("ApiSpec") String ApiSpec,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateApiSpec(ApiSpec, password, email, navigator) {

  console.log('ApiSpecAction submitCreateApiSpec: ' + ApiSpec + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createApiSpec(ApiSpec, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ApiSpec/-1/'

    try{
        var reqStr =
        'ApiSpec='+ApiSpec+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'ApiSpec=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('ApiSpecAction submitCreateApiSpec: ' + url + reqStr)

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
        dispatch(receiveApiSpec(json.ApiSpec, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateApiSpec(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_APISPEC = 'SETUP_APISPEC'
export function onboardApiSpec(json){
  return{
    type:SETUP_APISPEC,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_APISPEC_LEVEL = 'SET_APISPEC_LEVEL'
export const SET_APISPECNAME = 'SET_APISPECNAME'

// BEGIN FETCH SECTION
export const FETCH_APISPEC = 'FETCH_APISPEC'
export function fetchApiSpec(u,p) {
  return {
    type: FETCH_APISPEC,
    ApiSpec:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_APISPEC = 'FAILED_FETCH_APISPEC'
export function failedLoginApiSpec(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH APISPEC Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_APISPEC,
    error:e
  }
}

export const RECEIVE_APISPEC = 'RECEIVE_'
export function receiveApiSpec(ApiSpec, json) {
// alert('ApiSpecAction.receivedApiSpec called for: ' +
// json.ApiSpec + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_ApiSpec_unexpected_server_error)
    return failedCreateApiSpec(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(ApiSpec, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchApiSpec(ApiSpec, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ApiSpec/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'ApiSpec='+ApiSpec+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'ApiSpec=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveApiSpec(json.ApiSpec, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginApiSpec(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutApiSpec(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(ApiSpecemail, password) {
  return {
    type: RESET_PASSWORD,
    ApiSpecemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(ApiSpecemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(ApiSpecemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ApiSpec/'+ApiSpecemail+'/password/initiate'

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
        dispatch(receiveApiSpec(ApiSpec, json))
      )
      .catch(e => e)
  }
}
