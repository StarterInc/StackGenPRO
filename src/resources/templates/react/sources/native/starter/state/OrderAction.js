/*
 * Auto-generated Order actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE ORDER SECTION

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


export const CREATE_ORDER = 'CREATE_ORDER'
export function createOrder(u,p,e) {
  return {
    type: CREATE_ORDER,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_ORDER_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_ORDER = 'FAILED_CREATE_ORDER'
export function failedCreateOrder(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Order_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Order_unexpected_server_error);
  }
  // alert('CREATE ORDER Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_ORDER,
    error:e
  }
}

/*
 * @FormParam("Order") String Order,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateOrder(Order, password, email, navigator) {

  console.log('OrderAction submitCreateOrder: ' + Order + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createOrder(Order, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Order/-1/'

    try{
        var reqStr =
        'Order='+Order+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Order=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('OrderAction submitCreateOrder: ' + url + reqStr)

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
        dispatch(receiveOrder(json.Order, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateOrder(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_ORDER = 'SETUP_ORDER'
export function onboardOrder(json){
  return{
    type:SETUP_ORDER,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_ORDER_LEVEL = 'SET_ORDER_LEVEL'
export const SET_ORDERNAME = 'SET_ORDERNAME'

// BEGIN FETCH SECTION
export const FETCH_ORDER = 'FETCH_ORDER'
export function fetchOrder(u,p) {
  return {
    type: FETCH_ORDER,
    Order:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_ORDER = 'FAILED_FETCH_ORDER'
export function failedLoginOrder(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH ORDER Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_ORDER,
    error:e
  }
}

export const RECEIVE_ORDER = 'RECEIVE_'
export function receiveOrder(Order, json) {
// alert('OrderAction.receivedOrder called for: ' +
// json.Order + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Order_unexpected_server_error)
    return failedCreateOrder(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Order, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchOrder(Order, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Order/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Order='+Order+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Order=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveOrder(json.Order, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginOrder(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutOrder(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Orderemail, password) {
  return {
    type: RESET_PASSWORD,
    Orderemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Orderemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Orderemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Order/'+Orderemail+'/password/initiate'

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
        dispatch(receiveOrder(Order, json))
      )
      .catch(e => e)
  }
}
