/*
 * Auto-generated Tag actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE TAG SECTION

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


export const CREATE_TAG = 'CREATE_TAG'
export function createTag(u,p,e) {
  return {
    type: CREATE_TAG,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_TAG_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_TAG = 'FAILED_CREATE_TAG'
export function failedCreateTag(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Tag_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Tag_unexpected_server_error);
  }
  // alert('CREATE TAG Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_TAG,
    error:e
  }
}

/*
 * @FormParam("Tag") String Tag,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateTag(Tag, password, email, navigator) {

  console.log('TagAction submitCreateTag: ' + Tag + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createTag(Tag, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Tag/-1/'

    try{
        var reqStr =
        'Tag='+Tag+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Tag=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('TagAction submitCreateTag: ' + url + reqStr)

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
        dispatch(receiveTag(json.Tag, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateTag(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_TAG = 'SETUP_TAG'
export function onboardTag(json){
  return{
    type:SETUP_TAG,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_TAG_LEVEL = 'SET_TAG_LEVEL'
export const SET_TAGNAME = 'SET_TAGNAME'

// BEGIN FETCH SECTION
export const FETCH_TAG = 'FETCH_TAG'
export function fetchTag(u,p) {
  return {
    type: FETCH_TAG,
    Tag:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_TAG = 'FAILED_FETCH_TAG'
export function failedLoginTag(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH TAG Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_TAG,
    error:e
  }
}

export const RECEIVE_TAG = 'RECEIVE_'
export function receiveTag(Tag, json) {
// alert('TagAction.receivedTag called for: ' +
// json.Tag + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Tag_unexpected_server_error)
    return failedCreateTag(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Tag, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchTag(Tag, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Tag/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Tag='+Tag+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Tag=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveTag(json.Tag, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginTag(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutTag(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Tagemail, password) {
  return {
    type: RESET_PASSWORD,
    Tagemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Tagemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Tagemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Tag/'+Tagemail+'/password/initiate'

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
        dispatch(receiveTag(Tag, json))
      )
      .catch(e => e)
  }
}
