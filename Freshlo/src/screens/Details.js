import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import Global from "./Global";
import Home from "../screens/Home";
import CardView from "react-native-cardview";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/AntDesign";
import { Router, Actions } from "react-native-router-flux";
const Header_Maximum_Height = 300;
//Max Height of the Header
const Header_Minimum_Height = 0;
export default class Details extends Component {
  constructor() {
    super();
    this.AnimatedHeaderValue = new Animated.Value(0);
  }

  render() {
    const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: ["#fff", "#fff"],
      extrapolate: "clamp"
    });

    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: [Header_Maximum_Height, Header_Minimum_Height],
      extrapolate: "extend"
    });

    let g = Global.getInstance();
    let Url = this.props.Url;
    let regular = g.getRegular();
    let Weight = this.props.weight;
    let Measurement = this.props.measurement;
    let MarketPrice = this.props.marketPrice;
    let SellingPrice = this.props.sellingPrice;
    let ProductName = this.props.ProductName;
    let ProductDescription = this.props.Description;
    const gotoSuccess = index => () => {
      Actions.details({
        Url: "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/icon/@name.png".replace(
          "@name",
          regular[index].itemId
        ),
        weight: regular[index].weight,
        measurement: regular[index].measurement,
        marketPrice: regular[index].marketPrice,
        sellingPrice: regular[index].sellingPrice,
        ProductName: regular[index].pluName,
        Description: regular[index].description
      });
    };

    return (
      <View style={styles.MainContainer}>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } }
          ])}
          style={{ flexDirection: "column" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 10 }}>
              <CardView>
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 50,
                      alignItems: "center",
                      marginLeft: 15,
                      marginRight: 15
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 15,
                        fontSize: 15,
                        color: "#000",
                        fontWeight: "bold"
                      }}
                    >
                      {"\u20B9"}
                      {SellingPrice}
                    </Text>
                    <Text style={{ color: "black" }}>
                      {"("} {Weight}
                      {Measurement} {")"}
                    </Text>
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        color: "#F76969",
                        flex: 2,
                        marginLeft: 15,
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      {"\u20B9"}
                      {MarketPrice}
                    </Text>
                    <TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: "#387B5A",
                          height: 30,
                          width: 100,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-around"
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            marginLeft: 12
                          }}
                        >
                          <Text style={{ color: "#fff" }}>ADD</Text>
                        </View>
                        <View
                          ref={() => {
                            this.View = this.ref;
                          }}
                          style={{ flex: 1 }}
                        />
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            paddingRight: 5
                          }}
                        >
                          <Icon
                            name="plus"
                            size={12}
                            style={{ color: "#fff" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      height: 50,
                      marginLeft: 15,
                      marginBottom: 15,
                      marginRight: 15,
                      alignItems: "center"
                    }}
                  >
                    <Text>Handled By</Text>
                    <Image
                      source={require("../Image/logo.png")}
                      style={{ height: 30, width: 100 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      height: 50,
                      marginLeft: 15,
                      marginBottom: 15,
                      marginRight: 15
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "black" }}>
                      {ProductName}
                    </Text>
                    <Text>Regular item</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      flexWrap: "wrap",
                      marginLeft: 15,
                      marginBottom: 15,
                      marginRight: 15
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "black" }}>
                      {ProductDescription}
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>
            <View
              style={{
                width: Dimensions.get("window").width,
                height: 50,

                flexDirection: "row",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontWeight: "bold", margin: 15, flex: 4 }}>
                SIMILAR ITEMS
              </Text>
              <Text
                style={{
                  color: "#206C2C",
                  alignItems: "flex-end",
                  alignContent: "flex-end",
                  flex: 1
                }}
              >
                VIEW ALL
              </Text>
            </View>
            <View>
              <FlatList
                data={regular}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    style={{
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      margin: 10
                    }}
                  >
                    <View
                      style={{
                        height: 220,
                        width: 150,
                        alignSelf: "center",
                        margin: 5,
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-around"
                      }}
                    >
                      <Image
                        style={{ height: 100, width: 100 }}
                        source={{
                          uri: "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/icon/@name.png".replace(
                            "@name",
                            item.itemId
                          )
                        }}
                        defaultSource={require("../Image/logo.png")}
                      />

                      <Text
                        style={{ color: "black", fontSize: 16 }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {item.pluName.toUpperCase()}
                      </Text>
                      <Text style={{ color: "black" }}>
                        {item.weight}
                        {item.measurement}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                            color: "#F76969",
                            flex: 2,
                            marginLeft: 15,
                            fontSize: 15,
                            fontWeight: "bold"
                          }}
                        >
                          {"\u20B9"}
                          {item.marketPrice}
                        </Text>
                        <Text
                          style={{
                            alignItems: "flex-end",
                            alignSelf: "flex-end",
                            marginRight: 15,
                            fontSize: 15,
                            color: "#000",
                            fontWeight: "bold"
                          }}
                        >
                          {"\u20B9"}
                          {item.sellingPrice}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={gotoSuccess(index)}>
                        <View
                          style={{
                            backgroundColor: "#387B5A",
                            height: 30,
                            width: 100,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around"
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              marginLeft: 12
                            }}
                          >
                            <Text style={{ color: "#fff" }}>ADD</Text>
                          </View>
                          <View
                            ref={() => {
                              this.View = this.ref;
                            }}
                            style={{ flex: 1 }}
                          />
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              paddingRight: 5
                            }}
                          >
                            <Icon
                              name="plus"
                              size={12}
                              style={{ color: "#fff" }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </CardView>
                )}
                keyExtractor={item => item}

                // initialNumToRender={10}
              />
            </View>
          </View>
        </ScrollView>

        <Animated.View
          style={[
            styles.Header,
            {
              height: AnimateHeaderHeight,
              backgroundColor: AnimateHeaderBackgroundColor
            }
          ]}
        >
          <View>
            {/* <Icon
              name="arrowleft"
              size={24}
              color="#gray"
              style={{ marginTop: 30, marginLeft: 50, height: 20, width: 20 }}
              onPress={() => alert("link!")}
            /> */}
            <Image
              source={{ uri: Url }}
              style={{ flex: 1, aspectRatio: 1.9 }}
              resizeMode="contain"
              defaultSource={require("../Image/logo.png")}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Platform.OS == "ios" ? 20 : 0
  },

  Header: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: Platform.OS == "ios" ? 20 : 0
  },

  HeaderInsideText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },

  TextViewStyle: {
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    margin: 5,
    padding: 7
  }
});
