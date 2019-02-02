/*
 * Auto-generated WorkFlows actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE WORKFLOWS SECTION

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


export const CREATE_WORKFLOWS = 'CREATE_WORKFLOWS'
export function createWorkFlows(u,p,e) {
  return {
    type: CREATE_WORKFLOWS,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_WORKFLOWS_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_WORKFLOWS = 'FAILED_CREATE_WORKFLOWS'
export function failedCreateWorkFlows(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_WorkFlows_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_WorkFlows_unexpected_server_error);
  }
  // alert('CREATE WORKFLOWS Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_WORKFLOWS,
    error:e
  }
}

/*
 * @FormParam("WorkFlows") String WorkFlows,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateWorkFlows(WorkFlows, password, email, navigator) {

  console.log('WorkFlowsAction submitCreateWorkFlows: ' + WorkFlows + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createWorkFlows(WorkFlows, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/WorkFlows/-1/'

    try{
        var reqStr =
        'WorkFlows='+WorkFlows+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'WorkFlows=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('WorkFlowsAction submitCreateWorkFlows: ' + url + reqStr)

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
        dispatch(receiveWorkFlows(json.WorkFlows, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateWorkFlows(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_WORKFLOWS = 'SETUP_WORKFLOWS'
export function onboardWorkFlows(json){
  return{
    type:SETUP_WORKFLOWS,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_WORKFLOWS_LEVEL = 'SET_WORKFLOWS_LEVEL'
export const SET_WORKFLOWSNAME = 'SET_WORKFLOWSNAME'

// BEGIN FETCH SECTION
export const FETCH_WORKFLOWS = 'FETCH_WORKFLOWS'
export function fetchWorkFlows(u,p) {
  return {
    type: FETCH_WORKFLOWS,
    WorkFlows:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_WORKFLOWS = 'FAILED_FETCH_WORKFLOWS'
export function failedLoginWorkFlows(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH WORKFLOWS Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_WORKFLOWS,
    error:e
  }
}

export const RECEIVE_WORKFLOWS = 'RECEIVE_'
export function receiveWorkFlows(WorkFlows, json) {
// alert('WorkFlowsAction.receivedWorkFlows called for: ' +
// json.WorkFlows + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_WorkFlows_unexpected_server_error)
    return failedCreateWorkFlows(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(WorkFlows, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchWorkFlows(WorkFlows, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/WorkFlows/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'WorkFlows='+WorkFlows+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'WorkFlows=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveWorkFlows(json.WorkFlows, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginWorkFlows(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutWorkFlows(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(WorkFlowsemail, password) {
  return {
    type: RESET_PASSWORD,
    WorkFlowsemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(WorkFlowsemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(WorkFlowsemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/WorkFlows/'+WorkFlowsemail+'/password/initiate'

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
        dispatch(receiveWorkFlows(WorkFlows, json))
      )
      .catch(e => e)
  }
}
