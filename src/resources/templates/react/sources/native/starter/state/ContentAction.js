/*
 * Auto-generated Content actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE CONTENT SECTION

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


export const CREATE_CONTENT = 'CREATE_CONTENT'
export function createContent(u,p,e) {
  return {
    type: CREATE_CONTENT,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_CONTENT_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_CONTENT = 'FAILED_CREATE_CONTENT'
export function failedCreateContent(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Content_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Content_unexpected_server_error);
  }
  // alert('CREATE CONTENT Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_CONTENT,
    error:e
  }
}

/*
 * @FormParam("Content") String Content,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateContent(Content, password, email, navigator) {

  console.log('ContentAction submitCreateContent: ' + Content + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createContent(Content, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Content/-1/'

    try{
        var reqStr =
        'Content='+Content+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Content=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('ContentAction submitCreateContent: ' + url + reqStr)

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
        dispatch(receiveContent(json.Content, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateContent(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_CONTENT = 'SETUP_CONTENT'
export function onboardContent(json){
  return{
    type:SETUP_CONTENT,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_CONTENT_LEVEL = 'SET_CONTENT_LEVEL'
export const SET_CONTENTNAME = 'SET_CONTENTNAME'

// BEGIN FETCH SECTION
export const FETCH_CONTENT = 'FETCH_CONTENT'
export function fetchContent(u,p) {
  return {
    type: FETCH_CONTENT,
    Content:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_CONTENT = 'FAILED_FETCH_CONTENT'
export function failedLoginContent(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH CONTENT Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_CONTENT,
    error:e
  }
}

export const RECEIVE_CONTENT = 'RECEIVE_'
export function receiveContent(Content, json) {
// alert('ContentAction.receivedContent called for: ' +
// json.Content + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Content_unexpected_server_error)
    return failedCreateContent(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Content, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchContent(Content, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Content/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Content='+Content+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Content=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveContent(json.Content, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginContent(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutContent(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Contentemail, password) {
  return {
    type: RESET_PASSWORD,
    Contentemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Contentemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Contentemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Content/'+Contentemail+'/password/initiate'

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
        dispatch(receiveContent(Content, json))
      )
      .catch(e => e)
  }
}