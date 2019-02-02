// ./views/WorkFlowsView.js
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
 * Starter Ignite Auto-Generated WorkFlows 
 * 
 * Data Entry View
 * 
 */

/// BEGIN WorkFlows_upper

var WorkFlows:{
		: '',
		: 'Sparkyt',
		: 'DK$DFSJaraDD',
		: 'Sparkyt',
		: 'user',
		: 'userId:d290f1ee-6c54-4b01-90e6-d701748f0851',
		: '',
		: '{keyOwner:111, keySource:&#39;session | system&#39;}',
		: '',
		: '',
		: '',
}

// / END WorkFlows_upper

class WorkFlowsView extends React.Component {

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

      <Text>Update WorkFlows</Text>
        
        <Form model=".WorkFlows" onSubmit={(vals) => alert(JSON.stringify(vals))}>
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
			<Text style={styles.titleFormHeader}> : Sparkyt	</Text>
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
			<Text style={styles.titleFormHeader}> : DK$DFSJaraDD	</Text>
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
			<Text style={styles.titleFormHeader}> : Sparkyt	</Text>
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
			<Text style={styles.titleFormHeader}> : user	</Text>
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
			<Text style={styles.titleFormHeader}> : userId:d290f1ee-6c54-4b01-90e6-d701748f0851	</Text>
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


// module.exports = connect(mapStateToProps)(WorkFlowsView);
module.exports = WorkFlowsView
