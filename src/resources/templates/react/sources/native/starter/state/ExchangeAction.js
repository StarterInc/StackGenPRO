/*
 * Auto-generated Exchange actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE EXCHANGE SECTION

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


export const CREATE_EXCHANGE = 'CREATE_EXCHANGE'
export function createExchange(u,p,e) {
  return {
    type: CREATE_EXCHANGE,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_EXCHANGE_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_EXCHANGE = 'FAILED_CREATE_EXCHANGE'
export function failedCreateExchange(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Exchange_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Exchange_unexpected_server_error);
  }
  // alert('CREATE EXCHANGE Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_EXCHANGE,
    error:e
  }
}

/*
 * @FormParam("Exchange") String Exchange,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateExchange(Exchange, password, email, navigator) {

  console.log('ExchangeAction submitCreateExchange: ' + Exchange + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createExchange(Exchange, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Exchange/-1/'

    try{
        var reqStr =
        'Exchange='+Exchange+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Exchange=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('ExchangeAction submitCreateExchange: ' + url + reqStr)

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
        dispatch(receiveExchange(json.Exchange, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateExchange(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_EXCHANGE = 'SETUP_EXCHANGE'
export function onboardExchange(json){
  return{
    type:SETUP_EXCHANGE,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_EXCHANGE_LEVEL = 'SET_EXCHANGE_LEVEL'
export const SET_EXCHANGENAME = 'SET_EXCHANGENAME'

// BEGIN FETCH SECTION
export const FETCH_EXCHANGE = 'FETCH_EXCHANGE'
export function fetchExchange(u,p) {
  return {
    type: FETCH_EXCHANGE,
    Exchange:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_EXCHANGE = 'FAILED_FETCH_EXCHANGE'
export function failedLoginExchange(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH EXCHANGE Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_EXCHANGE,
    error:e
  }
}

export const RECEIVE_EXCHANGE = 'RECEIVE_'
export function receiveExchange(Exchange, json) {
// alert('ExchangeAction.receivedExchange called for: ' +
// json.Exchange + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Exchange_unexpected_server_error)
    return failedCreateExchange(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Exchange, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchExchange(Exchange, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Exchange/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Exchange='+Exchange+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Exchange=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveExchange(json.Exchange, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginExchange(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutExchange(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Exchangeemail, password) {
  return {
    type: RESET_PASSWORD,
    Exchangeemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Exchangeemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Exchangeemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Exchange/'+Exchangeemail+'/password/initiate'

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
        dispatch(receiveExchange(Exchange, json))
      )
      .catch(e => e)
  }
}
