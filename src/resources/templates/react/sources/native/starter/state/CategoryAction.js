/*
 * Auto-generated Category actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE CATEGORY SECTION

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


export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export function createCategory(u,p,e) {
  return {
    type: CREATE_CATEGORY,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_CATEGORY_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_CATEGORY = 'FAILED_CREATE_CATEGORY'
export function failedCreateCategory(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Category_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Category_unexpected_server_error);
  }
  // alert('CREATE CATEGORY Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_CATEGORY,
    error:e
  }
}

/*
 * @FormParam("Category") String Category,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateCategory(Category, password, email, navigator) {

  console.log('CategoryAction submitCreateCategory: ' + Category + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createCategory(Category, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Category/-1/'

    try{
        var reqStr =
        'Category='+Category+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Category=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('CategoryAction submitCreateCategory: ' + url + reqStr)

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
        dispatch(receiveCategory(json.Category, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateCategory(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_CATEGORY = 'SETUP_CATEGORY'
export function onboardCategory(json){
  return{
    type:SETUP_CATEGORY,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_CATEGORY_LEVEL = 'SET_CATEGORY_LEVEL'
export const SET_CATEGORYNAME = 'SET_CATEGORYNAME'

// BEGIN FETCH SECTION
export const FETCH_CATEGORY = 'FETCH_CATEGORY'
export function fetchCategory(u,p) {
  return {
    type: FETCH_CATEGORY,
    Category:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_CATEGORY = 'FAILED_FETCH_CATEGORY'
export function failedLoginCategory(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH CATEGORY Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_CATEGORY,
    error:e
  }
}

export const RECEIVE_CATEGORY = 'RECEIVE_'
export function receiveCategory(Category, json) {
// alert('CategoryAction.receivedCategory called for: ' +
// json.Category + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Category_unexpected_server_error)
    return failedCreateCategory(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Category, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchCategory(Category, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Category/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Category='+Category+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Category=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveCategory(json.Category, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginCategory(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutCategory(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Categoryemail, password) {
  return {
    type: RESET_PASSWORD,
    Categoryemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Categoryemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Categoryemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Category/'+Categoryemail+'/password/initiate'

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
        dispatch(receiveCategory(Category, json))
      )
      .catch(e => e)
  }
}
