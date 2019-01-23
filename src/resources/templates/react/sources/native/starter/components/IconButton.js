var React = require("react");
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import styles from '../AppStyles';
// http://ionicframework.com/docs/v2/ionicons/
import Icon from 'react-native-vector-icons/Ionicons';

var AddButton = React.createClass({



  render: function() {
    return (
      <TouchableOpacity style={(styles.row, styles.buttonContainer)}
      onPress={this.props.onPress}
      >
          <Icon
            size={50}
            name={this.props.icon}
            onPress={this.props.onPress}
          />
          <TouchableOpacity
              onPress={this.props.onPress}
              underlayColor="#FFC107"
          >
          <Text
              // style={styles.buttonText}
             >{this.props.text}
            </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
});

module.exports = AddButton;
