// ./views/StackView.js
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
 * Starter Ignite Auto-Generated Stack 
 * 
 * Data Entry View
 * 
 */

/// BEGIN Stack_upper

var Stack:{
		: 'My Microservice API',
		: '',
		: 'localhost',
		: 'ignite',
		: 'starter',
		: '',
		: 'host name of the admin server',
		: 'port of the admin server',
		: 'db.mycompany.rds.us-west-2.rds.amazonaws.com',
		: '6969',
		: 'io.starter',
		: 'gen/src/',
		: 'gen/src/main/java/io/starter/ignite/model/',
		: '&#61;W34sdcwdsfwC34&#61;',
		: 'ignite',
		: 'igniteuser',
		: 'ABDCEDF',
		: 'true',
		: 'Complete OpenAPI Schema Contents...',
		: '',
		: '',
		: '{keyOwner:111, keySource:&#39;session | system&#39;}',
		: '',
		: '',
		: '',
}

// / END Stack_upper

class StackView extends React.Component {

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

      <Text>Update Stack</Text>
        
        <Form model=".Stack" onSubmit={(vals) => alert(JSON.stringify(vals))}>
        <View style={styles.row}>
			<Text style={styles.titleFormHeader}> : My Microservice API	</Text>
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
			<Text style={styles.titleFormHeader}> : localhost	</Text>
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
			<Text style={styles.titleFormHeader}> : ignite	</Text>
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
			<Text style={styles.titleFormHeader}> : starter	</Text>
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
			<Text style={styles.titleFormHeader}> : host name of the admin server	</Text>
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
			<Text style={styles.titleFormHeader}> : port of the admin server	</Text>
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
			<Text style={styles.titleFormHeader}> : db.mycompany.rds.us-west-2.rds.amazonaws.com	</Text>
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
			<Text style={styles.titleFormHeader}> : 6969	</Text>
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
			<Text style={styles.titleFormHeader}> : io.starter	</Text>
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
			<Text style={styles.titleFormHeader}> : gen/src/	</Text>
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
			<Text style={styles.titleFormHeader}> : gen/src/main/java/io/starter/ignite/model/	</Text>
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
			<Text style={styles.titleFormHeader}> : &#61;W34sdcwdsfwC34&#61;	</Text>
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
			<Text style={styles.titleFormHeader}> : ignite	</Text>
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
			<Text style={styles.titleFormHeader}> : igniteuser	</Text>
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
			<Text style={styles.titleFormHeader}> : ABDCEDF	</Text>
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
			<Text style={styles.titleFormHeader}> : true	</Text>
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
			<Text style={styles.titleFormHeader}> : Complete OpenAPI Schema Contents...	</Text>
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


// module.exports = connect(mapStateToProps)(StackView);
module.exports = StackView
