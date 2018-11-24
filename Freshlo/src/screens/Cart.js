import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SectionList,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Router, Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/AntDesign";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CardView from "react-native-cardview";
import Global from "./Global";
import Swipeout from "react-native-swipeout";
import * as Animatable from "react-native-animatable";
type Props = {};
var SQLite = require("react-native-sqlite-storage");
var db = SQLite.openDatabase({
  name: "Cart.db",
  createFromLocation: "~Cart.db"
});
export default class Cart extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      petname: "",
      demo: []
    };
  }
  componentDidMount() {
    // let d = Global.getInstance();
    // AsyncStorage.getItem("name").then(data => this.setState({ data }));
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM CartItem ", [], (tx, results) => {
        var len = results.rows.length;
        var demo = [];
        for (let i = 0; i < results.rows.length; ++i) {
          var row = results.rows.item(i);
          this.setState({ petname: row.ProductName });
          demo.push(row.ProductName);
          this.setState({
            demo: demo
          });
          alert(i)
        }
      });
    });
  }
  onImageLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    //   let d =Global.getInstance();
    //   let val =[d.getProductName(),d.getSellingPrice(),d.getProductMeasurement(),d.getProductWeight(),d.getMarketPrice(),d.getProductCategory()]
    //    if(val==",,,,,"){
    //     //  alert("empty")
    //      return(
    //        <View style={{height:Dimensions.get("window").height,width:Dimensions.get("window").width, backgroundColor:"white"}}>
    //         <View
    //           style={{
    //             height: 50,
    //             width: Dimensions.get("window").width,
    //             backgroundColor: "#387B5A",
    //             flexDirection: "row",
    //             paddingLeft: 15,
    //             paddingRight: 15
    //           }}
    //         >
    //           <Icon
    //             name="arrowleft"
    //             size={25}
    //             color="#fff"
    //             style={{ alignSelf: "center" }}
    //             onPress={() => Actions.home()}
    //           />
    //           <Text
    //             style={{
    //               flex: 1,
    //               alignSelf: "center",
    //               fontSize: 16,
    //               color: "white",
    //               paddingLeft: 15
    //             }}
    //           >
    //             Shopping Cart
    //           </Text>
    //         </View>
    //        <View style={{alignItems:"center",flexDirection:"column",margin:50,backgroundColor:"white"}}>
    //        <AntIcon name="shoppingcart" color="gray" size={40} />
    //        <Text style={{paddingTop:20,fontSize:20}}>CART IS EMPTY</Text>
    //        <View style={{marginTop:20,width:200,height:45,backgroundColor:"#206C2C",alignItems:"center",justifyContent:"center"}}>
    //        <Text style={{color:"white",fontSize:15}}>CONTINUE SHOPPING</Text>
    //        </View>
    //        </View>
    //       <View style={{flex:1}}>
    //  <Image
    //  style={{flex:1,height:Dimensions.get("window").height,width:Dimensions.get("window").width}}
    //    resizeMode="stretch"
    //    source={ require('../Image/emptyview.png')}
    //  />
    //       </View>
    //        </View>
    //      )
    //    }else{
    const swipeBtns = index => [
      {
        component: (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Animatable.View
              animation="tada"
              easing="ease-out"
              iterationCount="1"
              style={{ textAlign: "center" }}
            >
              <MaterialCommunityIcons
                animation="pulse"
                name="delete"
                size={30}
                style={{ color: "white" }}
              />
            </Animatable.View>
            <Text style={{ color: "white", fontSize: 15 }}>Remove</Text>
          </View>
        ),
        backgroundColor: "#C14646",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          db.transaction(tx => {
            tx.executeSql(
              "DELETE * FROM pet where owner=" + this.state.demo[index]
            );
            alert(this.state.demo[index]);
          });
        }
      }
    ];
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 50,
            width: Dimensions.get("window").width,
            backgroundColor: "#387B5A",
            flexDirection: "row",
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <Icon
            name="arrowleft"
            size={25}
            color="#fff"
            style={{ alignSelf: "center" }}
            onPress={() => Actions.home()}
          />
          <Text
            style={{
              flex: 1,
              alignSelf: "center",
              fontSize: 16,
              color: "white",
              paddingLeft: 15
            }}
          >
            Shopping Cart
          </Text>
        </View>
        <View
          style={{
            height: 50,
            width: Dimensions.get("window").width,
            backgroundColor: "#F9F3DE",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <Text style={{ fontSize: 18 }}>YOU PAY</Text>
          <Text style={{ fontSize: 18 }}>{"\u20B9"} 490</Text>
        </View>
        <CardView
          cardElevation={5}
          cardMaxElevation={5}
          style={{
            height: 120,
            margin: 1
          }}
        >
          <View>
            <View
              style={{
                height: 40,
                width: Dimensions.get("window").width,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 15,
                paddingRight: 15
              }}
            >
              <Text style={{ fontSize: 16 }}>items in cart</Text>
              <Text style={{ fontSize: 16 }}>1 items</Text>
            </View>
            <View
              style={{
                height: 40,
                width: Dimensions.get("window").width,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 15,
                paddingRight: 15
              }}
            >
              <Text style={{ fontSize: 16 }}>Sub Total</Text>
              <Text style={{ fontSize: 16 }}> {"\u20B9"} 1000</Text>
            </View>
            <View
              style={{
                height: 40,
                width: Dimensions.get("window").width,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 15,
                paddingRight: 15
              }}
            >
              <Text style={{ fontSize: 16 }}>Your Savings</Text>
              <Text style={{ fontSize: 16 }}> - {"\u20B9"} 60</Text>
            </View>
          </View>
        </CardView>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ flex: 1 }}>
            <SectionList
              style={{ flex: 1 }}
              scrollEnabled={true}
              sections={[{ title: this.state.demo, data: this.state.demo }]}
              renderSectionHeader={({ section }) => (
                <View
                  style={{
                    height: 50,
                    width: Dimensions.get("window").width,
                    backgroundColor: "#f2f2f2",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 15,
                    paddingRight: 15
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{section.title}</Text>
                  <Text style={{ fontSize: 16 }}>1 items</Text>
                </View>
              )}
              renderItem={({ item, index }) => (
                <Swipeout
                  right={swipeBtns(index)}
                  autoClose="true"
                  backgroundColor="transparent"
                >
                  <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    style={{
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      margin: 1
                    }}
                  >
                    <View
                      style={{
                        height: 120,
                        flex: 1,
                        alignSelf: "center",
                        margin: 5,
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",

                        justifyContent: "space-around"
                      }}
                    >
                      <Image
                        style={{ flex: 0.7, height: 100, width: 70 }}
                        source={{
                          uri: "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/icon/@name.png".replace(
                            "@name",
                            item.itemId
                          )
                        }}
                        defaultSource={require("../Image/ic_no_image.png")}
                        resizeMode="contain"
                      />
                      <View
                        style={{
                          flex: 1,
                          height: 120,
                          justifyContent: "space-around"
                        }}
                      >
                        <Text
                          style={{ color: "black", fontSize: 16 }}
                          ellipsizeMode="tail"
                          numberOfLines={1}
                        >
                          {item}
                        </Text>
                        <View
                          style={{
                            borderRadius: 15,
                            width: 60,
                            borderWidth: 0.5,
                            alignItems: "center",
                            height: 30,
                            justifyContent: "center"
                          }}
                        >
                          <Text style={{ color: "black" }}>
                            {item.weight}
                            {item.measurement}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              marginRight: 15,
                              fontSize: 15,
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >
                            {"\u20B9"}
                            {item.sellingPrice}
                          </Text>
                          <Text
                            style={{
                              textDecorationLine: "line-through",
                              textDecorationStyle: "solid",
                              color: "#F76969",
                              fontSize: 15,
                              fontWeight: "bold"
                            }}
                          >
                            {"\u20B9"}
                            {item.marketPrice}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              width: 80,
                              flex: 1,
                              justifyContent: "flex-end"
                            }}
                          >
                            <View
                              style={{
                                height: 30,
                                width: 30,
                                backgroundColor: "#387B5A",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <TouchableOpacity
                                style={{
                                  height: 30,
                                  width: 30,
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                              >
                                <Icon
                                  name="minus"
                                  size={15}
                                  style={{ color: "#fff" }}
                                />
                              </TouchableOpacity>
                            </View>
                            <Text
                              style={{
                                height: 30,
                                width: 30,
                                textAlign: "center",
                                fontSize: 15,
                                marginTop: 5
                              }}
                            >
                              1
                            </Text>
                            <View
                              style={{
                                height: 30,
                                width: 30,
                                backgroundColor: "#387B5A",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Icon
                                name="plus"
                                size={15}
                                style={{ color: "#fff" }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </CardView>
                </Swipeout>
              )}
              keyExtractor={(item, index) => index}
              ListEmptyComponent={this.ListEmptyComponent}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
