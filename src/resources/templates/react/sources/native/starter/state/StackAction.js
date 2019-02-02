/*
 * Auto-generated Stack actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE STACK SECTION

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


export const CREATE_STACK = 'CREATE_STACK'
export function createStack(u,p,e) {
  return {
    type: CREATE_STACK,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_STACK_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_STACK = 'FAILED_CREATE_STACK'
export function failedCreateStack(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Stack_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Stack_unexpected_server_error);
  }
  // alert('CREATE STACK Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_STACK,
    error:e
  }
}

/*
 * @FormParam("Stack") String Stack,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateStack(Stack, password, email, navigator) {

  console.log('StackAction submitCreateStack: ' + Stack + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createStack(Stack, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Stack/-1/'

    try{
        var reqStr =
        'Stack='+Stack+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Stack=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('StackAction submitCreateStack: ' + url + reqStr)

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
        dispatch(receiveStack(json.Stack, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateStack(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_STACK = 'SETUP_STACK'
export function onboardStack(json){
  return{
    type:SETUP_STACK,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_STACK_LEVEL = 'SET_STACK_LEVEL'
export const SET_STACKNAME = 'SET_STACKNAME'

// BEGIN FETCH SECTION
export const FETCH_STACK = 'FETCH_STACK'
export function fetchStack(u,p) {
  return {
    type: FETCH_STACK,
    Stack:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_STACK = 'FAILED_FETCH_STACK'
export function failedLoginStack(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH STACK Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_STACK,
    error:e
  }
}

export const RECEIVE_STACK = 'RECEIVE_'
export function receiveStack(Stack, json) {
// alert('StackAction.receivedStack called for: ' +
// json.Stack + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Stack_unexpected_server_error)
    return failedCreateStack(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Stack, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchStack(Stack, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Stack/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Stack='+Stack+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Stack=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveStack(json.Stack, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginStack(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutStack(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Stackemail, password) {
  return {
    type: RESET_PASSWORD,
    Stackemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Stackemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Stackemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Stack/'+Stackemail+'/password/initiate'

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
        dispatch(receiveStack(Stack, json))
      )
      .catch(e => e)
  }
}
