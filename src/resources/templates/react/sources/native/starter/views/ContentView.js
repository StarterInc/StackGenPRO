// ./views/ContentView.js
import React from 'react'

import { 
	Control,
	Field,
	Form,
	Errors,
	DatePickerIOS,
	PickerIOS,
	Switch,
	MapView,
	actions
} from 'react-redux-form/native'

import {
  View,
  Text,
  Button
} from 'react-native'

// import GLOBAL from '../Global'
import styles from '../AppStyles'
import strings from '../il8n/il8n'

// http://ionicframework.com/docs/v2/ionicons/
import Icon from 'react-native-vector-icons/Ionicons';
import IconButton from '../components/IconButton';

// TODO: move validations to a module
const required = (val) => val && val.length;
const maxLength = (len) => (val) => val.length <= len;
const isNumber = (val) => !isNaN(Number(val));

/**
 * Starter Ignite Auto-Generated Content 
 * 
 * Data Entry View
 * 
 */

/// BEGIN Content_upper

var Content:{
		: 'Widget Adapter',
		: '',
		: '',
		: '{keyOwner:111, keySource:&#39;session | system&#39;}',
		: '',
		: '',
		: '',
		: 'The full content',
		: '',
}

// / END Content_upper

class ContentView extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
	// alert(JSON.stringify(props.stateData))
  }	
  handleSubmit(user) {		
	  // dispatch(actions.submit('user', somePromise));
  }

  

  render() {
	//
    return (
      <View style={styles.loginContainer}>

      <Text>Update Content</Text>
        
        <Form model=".Content" onSubmit={(vals) => alert(JSON.stringify(vals))}>
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : Widget Adapter	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : 	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : 	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : {keyOwner:111, keySource:&#39;session | system&#39;}	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : 	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : 	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : 	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : The full content	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : 	</Text>
			<Control.TextInput
			    style={styles.formInput}
				model="."  
	        	validators=
	        />
			<Errors
				style={styles.formInput}
				model="."  
		        show="touched"
		        messages=
		     />
		</View>
		
	        
          <IconButton
	          icon='md-checkmark-circle-outline'
	          text={strings.SimpleCMS_camera_take_video}
	          // onPress={this.selectVideoTapped.bind(this)}
           />
          
          </Form>
      </View>
    )
  }

  
}


// module.exports = connect(mapStateToProps)(ContentView);
module.exports = ContentView