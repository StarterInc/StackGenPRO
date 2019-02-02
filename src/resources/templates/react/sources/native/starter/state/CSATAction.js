/*
 * Auto-generated Csat actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE CSAT SECTION

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


export const CREATE_CSAT = 'CREATE_CSAT'
export function createCsat(u,p,e) {
  return {
    type: CREATE_CSAT,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_CSAT_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_CSAT = 'FAILED_CREATE_CSAT'
export function failedCreateCsat(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Csat_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Csat_unexpected_server_error);
  }
  // alert('CREATE CSAT Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_CSAT,
    error:e
  }
}

/*
 * @FormParam("Csat") String Csat,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateCsat(Csat, password, email, navigator) {

  console.log('CsatAction submitCreateCsat: ' + Csat + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createCsat(Csat, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Csat/-1/'

    try{
        var reqStr =
        'Csat='+Csat+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Csat=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('CsatAction submitCreateCsat: ' + url + reqStr)

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
        dispatch(receiveCsat(json.Csat, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateCsat(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_CSAT = 'SETUP_CSAT'
export function onboardCsat(json){
  return{
    type:SETUP_CSAT,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_CSAT_LEVEL = 'SET_CSAT_LEVEL'
export const SET_CSATNAME = 'SET_CSATNAME'

// BEGIN FETCH SECTION
export const FETCH_CSAT = 'FETCH_CSAT'
export function fetchCsat(u,p) {
  return {
    type: FETCH_CSAT,
    Csat:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_CSAT = 'FAILED_FETCH_CSAT'
export function failedLoginCsat(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH CSAT Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_CSAT,
    error:e
  }
}

export const RECEIVE_CSAT = 'RECEIVE_'
export function receiveCsat(Csat, json) {
// alert('CsatAction.receivedCsat called for: ' +
// json.Csat + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Csat_unexpected_server_error)
    return failedCreateCsat(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Csat, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchCsat(Csat, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Csat/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Csat='+Csat+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Csat=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveCsat(json.Csat, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginCsat(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutCsat(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Csatemail, password) {
  return {
    type: RESET_PASSWORD,
    Csatemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Csatemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Csatemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Csat/'+Csatemail+'/password/initiate'

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
        dispatch(receiveCsat(Csat, json))
      )
      .catch(e => e)
  }
}
