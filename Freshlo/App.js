
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,StatusBar} from 'react-native';
import Home from './src/screens/Home'
import Splash from './src/screens/Splash'
import Routes from './src/screens/Routes'
 
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
       
      <View style={styles.container}>
      <StatusBar  hidden = {true} backgroundColor = "#2B5C44" translucent = {true}/>
      <View style={{flex:1}}>
       <Routes />
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex:1
  }
});
