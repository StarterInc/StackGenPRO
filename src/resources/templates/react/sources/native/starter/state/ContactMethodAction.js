/*
 * Auto-generated ContactMethod actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE CONTACTMETHOD SECTION

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


export const CREATE_CONTACTMETHOD = 'CREATE_CONTACTMETHOD'
export function createContactMethod(u,p,e) {
  return {
    type: CREATE_CONTACTMETHOD,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_CONTACTMETHOD_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_CONTACTMETHOD = 'FAILED_CREATE_CONTACTMETHOD'
export function failedCreateContactMethod(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_ContactMethod_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_ContactMethod_unexpected_server_error);
  }
  // alert('CREATE CONTACTMETHOD Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_CONTACTMETHOD,
    error:e
  }
}

/*
 * @FormParam("ContactMethod") String ContactMethod,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateContactMethod(ContactMethod, password, email, navigator) {

  console.log('ContactMethodAction submitCreateContactMethod: ' + ContactMethod + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createContactMethod(ContactMethod, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ContactMethod/-1/'

    try{
        var reqStr =
        'ContactMethod='+ContactMethod+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'ContactMethod=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('ContactMethodAction submitCreateContactMethod: ' + url + reqStr)

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
        dispatch(receiveContactMethod(json.ContactMethod, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateContactMethod(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_CONTACTMETHOD = 'SETUP_CONTACTMETHOD'
export function onboardContactMethod(json){
  return{
    type:SETUP_CONTACTMETHOD,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_CONTACTMETHOD_LEVEL = 'SET_CONTACTMETHOD_LEVEL'
export const SET_CONTACTMETHODNAME = 'SET_CONTACTMETHODNAME'

// BEGIN FETCH SECTION
export const FETCH_CONTACTMETHOD = 'FETCH_CONTACTMETHOD'
export function fetchContactMethod(u,p) {
  return {
    type: FETCH_CONTACTMETHOD,
    ContactMethod:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_CONTACTMETHOD = 'FAILED_FETCH_CONTACTMETHOD'
export function failedLoginContactMethod(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH CONTACTMETHOD Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_CONTACTMETHOD,
    error:e
  }
}

export const RECEIVE_CONTACTMETHOD = 'RECEIVE_'
export function receiveContactMethod(ContactMethod, json) {
// alert('ContactMethodAction.receivedContactMethod called for: ' +
// json.ContactMethod + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_ContactMethod_unexpected_server_error)
    return failedCreateContactMethod(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(ContactMethod, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchContactMethod(ContactMethod, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ContactMethod/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'ContactMethod='+ContactMethod+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'ContactMethod=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveContactMethod(json.ContactMethod, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginContactMethod(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutContactMethod(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(ContactMethodemail, password) {
  return {
    type: RESET_PASSWORD,
    ContactMethodemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(ContactMethodemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(ContactMethodemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/ContactMethod/'+ContactMethodemail+'/password/initiate'

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
        dispatch(receiveContactMethod(ContactMethod, json))
      )
      .catch(e => e)
  }
}
