import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';

export default class Hello360 extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
      <View style={styles.greetingBox}>
        <Text style={styles.greeting}>
          kaden's vr box 
        </Text>
      </View>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Starter Ignite Control Panel
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <Text style={styles.greeting}>
            Create new API
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <Text style={styles.greeting}>
            Monitor Services
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 400,
    height: 1150,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: '#cccccc',
    borderWidth: 2,
  },
  buttonBox: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: '#cccccc',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
