/*
 * Auto-generated Data actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE DATA SECTION

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


export const CREATE_DATA = 'CREATE_DATA'
export function createData(u,p,e) {
  return {
    type: CREATE_DATA,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_DATA_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_DATA = 'FAILED_CREATE_DATA'
export function failedCreateData(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Data_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Data_unexpected_server_error);
  }
  // alert('CREATE DATA Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_DATA,
    error:e
  }
}

/*
 * @FormParam("Data") String Data,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateData(Data, password, email, navigator) {

  console.log('DataAction submitCreateData: ' + Data + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createData(Data, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Data/-1/'

    try{
        var reqStr =
        'Data='+Data+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Data=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('DataAction submitCreateData: ' + url + reqStr)

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
        dispatch(receiveData(json.Data, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateData(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_DATA = 'SETUP_DATA'
export function onboardData(json){
  return{
    type:SETUP_DATA,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_DATA_LEVEL = 'SET_DATA_LEVEL'
export const SET_DATANAME = 'SET_DATANAME'

// BEGIN FETCH SECTION
export const FETCH_DATA = 'FETCH_DATA'
export function fetchData(u,p) {
  return {
    type: FETCH_DATA,
    Data:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_DATA = 'FAILED_FETCH_DATA'
export function failedLoginData(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH DATA Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_DATA,
    error:e
  }
}

export const RECEIVE_DATA = 'RECEIVE_'
export function receiveData(Data, json) {
// alert('DataAction.receivedData called for: ' +
// json.Data + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Data_unexpected_server_error)
    return failedCreateData(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Data, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchData(Data, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Data/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Data='+Data+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Data=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveData(json.Data, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginData(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutData(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Dataemail, password) {
  return {
    type: RESET_PASSWORD,
    Dataemail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Dataemail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Dataemail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Data/'+Dataemail+'/password/initiate'

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
        dispatch(receiveData(Data, json))
      )
      .catch(e => e)
  }
}
