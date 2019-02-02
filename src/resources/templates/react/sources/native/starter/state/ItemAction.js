/*
 * Auto-generated Item actions
 * 
*/

import ApiUtils from '../modules/ApiUtils'
var GLOBAL = require('../Global');
import strings from '../il8n/il8n'

// BEGIN CREATE ITEM SECTION

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


export const CREATE_ITEM = 'CREATE_ITEM'
export function createItem(u,p,e) {
  return {
    type: CREATE_ITEM,
    payload: { u },
    meta: {
        offline: {
        	// effect: ...,
          rollback: { type: 'CREATE_ITEM_ROLLBACK', meta: { u }}  
         }
      },
    fetching:true,
  }
}

export const FAILED_CREATE_ITEM = 'FAILED_CREATE_ITEM'
export function failedCreateItem(e) {
  if(typeof(e.response) === 'undefined'){
    // fine? connectionFailed('No Response from Server')
  }else  if(typeof(e.response.status) === 'undefined'){
    showLoginFailed('No Status from Server');
  }else  if(e.response.status === 406){
    showLoginFailed(strings.SimpleCMS_Item_already_exists);
  } else if(e.response.status === 500){
    showLoginFailed(strings.SimpleCMS_Item_unexpected_server_error);
  }
  // alert('CREATE ITEM Failed:' + JSON.stringify(e));
  return {
    type: FAILED_CREATE_ITEM,
    error:e
  }
}

/*
 * @FormParam("Item") String Item,
 * @FormParam("password") String password, @FormParam("email") String email,
 * @FormParam("firstName") String firstName, @FormParam("lastName") String
 * lastName, @FormParam("state") String state, @FormParam("phone") String phone,
 * @FormParam("zip") String zip, @FormParam("preferences") String preferences,
 * @FormParam("hintText") String hintText, @FormParam("status") Integer status,
 * @FormParam("create_source") Integer create_source, @FormParam("signup")
 * Boolean signup,
 */

// big kahuna create code
export function submitCreateItem(Item, password, email, navigator) {

  console.log('ItemAction submitCreateItem: ' + Item + ' : ' + email + ' : ' + navigator)

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(createItem(Item, password, email))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Item/-1/'

    try{
        var reqStr =
        'Item='+Item+
        '&devicetoken='+'999'

        // var reqStrX =
		// 'Item=carboload&password=chukles&devicetoken=2123123'
    }catch(e){
      showLoginFailed(e);
      return null;
    }

    console.log('ItemAction submitCreateItem: ' + url + reqStr)

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
        dispatch(receiveItem(json.Item, json))
        .then(navigator.push({
            id: 'assessments'
        }))
      )
      .catch(e => failedCreateItem(e))
  }
}

// Step 2.. already signed up and now we gotta do some stuffs action creator
export const SETUP_ITEM = 'SETUP_ITEM'
export function onboardItem(json){
  return{
    type:SETUP_ITEM,
    payload:json
  }
}

// BEGIN UPDATE SECTION
export const SET_LAST_FETCH = 'SET_LAST_FETCH'
export const SET_AVATAR_IMAGE = 'SET_AVATAR_IMAGE'
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED'
export const SET_PREFERENCES = 'SET_PREFERENCES'
export const SET_ITEM_LEVEL = 'SET_ITEM_LEVEL'
export const SET_ITEMNAME = 'SET_ITEMNAME'

// BEGIN FETCH SECTION
export const FETCH_ITEM = 'FETCH_ITEM'
export function fetchItem(u,p) {
  return {
    type: FETCH_ITEM,
    Item:u,
    password:p
  }
}

function connectionFailed(msg){
  console.warn('Connection Failed: ' + msg)
}

function showLoginFailed(msg){
  alert('Login Failed. ' + msg); // TODO: do something useful
}

export const FAILED_FETCH_ITEM = 'FAILED_FETCH_ITEM'
export function failedLoginItem(e) {
  if(typeof(e.response) === 'undefined'){
    // is OK? connectionFailed('No Response from Server')
  }else if(typeof(e.response.status) === 'undefined'){
    connectionFailed('No Status from Server')
  }else if(e.response.status === 401){
    showLoginFailed(strings.SimpleCMS_incorrect_fetch_credentials);
  }
  // console.warn('FETCH ITEM Failed:' + JSON.stringify(e));
  return {
    type: FAILED_FETCH_ITEM,
    error:e
  }
}

export const RECEIVE_ITEM = 'RECEIVE_'
export function receiveItem(Item, json) {
// alert('ItemAction.receivedItem called for: ' +
// json.Item + ' : ' + JSON.stringify(json));

  // set the SESSION ID so that the client will stay logged in
  GLOBAL.JSESSIONID = json.JSESSIONID
  if(GLOBAL.JSESSIONID === null){
    let error = new Error(strings.SimpleCMS_Item_unexpected_server_error)
    return failedCreateItem(error)
  }

  return {
    type: RECEIVE_,
    payload:  json,
    // receivedAt: Date.now()
  }
}

// This method creates a THUNK callback that executes 2 ACTIONS
export function submitLogin(Item, password, navigator) {

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(fetchItem(Item, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Item/-1/fetch'

    // alert('fetch: ' + JSON.stringify(url));
    try{
        var reqStr = 'Item='+Item+'&password='+password+'&devicetoken='+Date().now
        // var reqStrX =
		// 'Item=carboload&password=chukles&devicetoken=2123123'
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
        dispatch(receiveItem(json.Item, json))
        .then(navigator.push({
            id: 'assessments',
            passProps:{
              assessments:json
            }
        }))
      )
      .catch(e => failedLoginItem(e))
  }
}


export const LOGOUT_ = 'LOGOUT_'
export function logoutItem(id, text) {
  return {
    type: LOGOUT_,
    id,
    text
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword(Itememail, password) {
  return {
    type: RESET_PASSWORD,
    Itememail,
    password,
  }
}

/**
 * initiate password reset
 */
export function submitResetPassword(Itememail, password) {
  console.log('resetPassword ACTION called');

  // Thunk middleware knows how to handle functions.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform

    dispatch(resetPassword(Itememail, password))
    var url = GLOBAL.API_HOST + GLOBAL.API_VERSION + '/Item/'+Itememail+'/password/initiate'

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
        dispatch(receiveItem(Item, json))
      )
      .catch(e => e)
  }
}
