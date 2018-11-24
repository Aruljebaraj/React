import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import Global from "./Global";
export default class Splash extends Component<Props> {
  constructor(props) {
    super(props);
  }
  state = {
    animating: true,
    data: []
  };

  closeActivityIndicator() {
    setTimeout(() => {
      Actions.home(),
        this.setState({
          animating: false
        });
    }, 3000);
  }

  componentDidMount() {
    fetch("http://dailyfreshapi.cxengine.net/api/Values/GetDashData", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded" // <-- Specifying the Content-Type
      }),
      body: "param1=value1&param2=value2" // <-- Post parameters
    })
      .then(response => response.json())
      .then(ResponseJson => {
        this.setState({
          data: ResponseJson
        });
        let g = Global.getInstance();
        g.setCategory(this.state.data.category);
       g.setRegular(this.state.data.regular);
      })
      .catch(error => {
        console.error(error);
      });

    this.closeActivityIndicator();
  }

  render() {
  
    const animating = this.state.animating;
    return (
      <View style={styles.container}>
        <Image
          source={require("../Image/logo.png")}
          style={{}}
          style={{ alignContent: "center", alignSelf: "center", height: 80 }}
          resizeMode="contain"
        />
        <ActivityIndicator
          animating={animating}
          color="#226D2B"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"white"
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center"
  }
});
