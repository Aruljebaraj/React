import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Alert,TouchableOpacity,TouchableWithoutFeedback
} from "react-native";
// import Image from "react-native-remote-svg";
import CardView from "react-native-cardview";
import Svg, { Circle } from "react-native-svg";
type Props = {};
import ImageSlider from "react-native-image-slider";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-material-dropdown";
import Global from "./Global";
import { Router, Actions } from "react-native-router-flux";
export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
    };

    // const datas =this.props.val;
    // alert(datas)
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === 2 ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  
  render() {
    let data = [
      {
        value: "Banana"
      },
      {
        value: "Mango"
      },
      {
        value: "Pear"
      }
    ];
    const GridViewItems = [
      { key: "Combo offer", src: require('../Image/gift.png'), code: "#EE6363" },
      { key: "Bulk offer",  src: require('../Image/gift.png'), code: "#206C2C" },
      { key: "Promotional offer", src: require('../Image/gift.png'), code: "#249C33" },
      { key: "Buy 1 Get 1",  src: require('../Image/gift.png'), code: "#6792EC" }
    ];
    let images = {
      profile: {
        image1: require("../Image/gift.png"),
        image2: require("../Image/gift.png"),
        image3: require("../Image/gift.png"),
        image4: require("../Image/gift.png")
      }
    };
    let g = Global.getInstance();
    let val = g.getCategory();
    let regular = g.getRegular();

const gotoSuccess = (index) =>()=> {
  
 Actions.details({Url:  "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/icon/@name.png".replace(
   "@name",
   regular[index].itemId


),weight:regular[index].weight,measurement:regular[index].measurement,marketPrice:regular[index].marketPrice,sellingPrice:regular[index].sellingPrice,ProductName:regular[index].pluName,Description:regular[index].description})

    };
  const GotoItems =(index) =>()=>{
    Actions.items({Product:val[index].split("_")[1]
    .trim(),Category:val[index].split("_")[0]})
  };

   const gotoallcategory=()=> {
    Actions.allcategory()
  }
    return (
      <View style={styles.container}>
        <View
          ref="toolbar"
          style={{
            height: 110,
            width: Dimensions.get("window").width,
            backgroundColor: "#387B5A",
            flexDirection: "column"
          }}
        >
          <View
            style={{
              height: 50,
              width: Dimensions.get("window").width,
              backgroundColor: "#387B5A",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              type="EvilIcons"
              name="navicon"
              size={30}
              style={{ color: "#fff", padding: 15 }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignContent: "center",
                marginRight: 160
              }}
            >
              <Dropdown
                label="YOUR PINCODE"
                data={data}
                baseColor="white"
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                style={{ color: "white" }}
              />
            </View>
            <View
              style={{
                height: 50,
                width: 50,
                marginRight: 15,
                alignItems: "center",
                justifyContent: "space-evenly"
              }}
            >
              <Icon name="shopping-cart" size={30} style={{ color: "#fff" }} onPress={()=> {
   Actions.cart()
    }}/>
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "red",
                  position: "absolute",
                  borderRadius: 10,
                  alignSelf: "flex-end",
                  marginBottom: 30,
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "white" }}>1</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 50,
              width: Dimensions.get("window").width,
              backgroundColor: "#387B5A",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="I am looking for..."
                onChangeText={searchString => {
                  this.setState({ searchString });
                }}
                underlineColorAndroid="transparent"
              />
              <Icon
                name="search"
                size={20}
                color="#4C4C4C"
                style={{ padding: 10 }}
              />
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: 180, flexDirection: "row",backgroundColor:"white" }}>
            <ImageSlider
              images={[
                "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/top-banner/1.png",
                "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/top-banner/2.png",
                "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/top-banner/3.png",
                "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/top-banner/4.png"
              ]}
              style={{ height: 180, aspectRatio: 2.5 }}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })}
            />
          </View>
          <View style={{ flexDirection: "column", backgroundColor: "white" , width:Dimensions.get("window").width,flex:1 }}>
            <Text style={{ alignSelf: "center", height: 30 }}>
              DISCOUNT OFFERS
            </Text>
            <View style={{ height: 100, backgroundColor: "#fff", width:Dimensions.get("window").width,flex:1,justifyContent:"space-around" }}>
              <CardView
                style={{
                  flex: 1,
                  margin: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center", width:Dimensions.get("window").width
                }}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={5}
              >
                <FlatList
                  data={GridViewItems}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        marginRight: 10,
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignSelf: "center"
                      }}
                    >
                      <View
                        style={[
                          styles.itemContainer,
                          {
                            backgroundColor: item.code,
                            marginBottom: 5,
                            alignItems: "center",
                            justifyContent: "center"
                          }
                        ]}
                      >
                        <Image
                          source={images.profile.image1}
                          style={{ margin: 10, height: 25, width: 25 }}
                        />
                      </View>
                      <Text>{item.key}</Text>
                    </View>
                  )}
                />
              </CardView>
            </View>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              height: 50,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontWeight: "bold", margin: 15, flex: 4 }}>
              SHOP BY CATEGORY
            </Text>
            <Text
              style={{
                color: "#206C2C",
                alignItems: "flex-end",
                alignContent: "flex-end",
                flex: 1
              }}
              onPress={gotoallcategory}
            >
              VIEW ALL
            </Text>
          </View>
          <View style={{ backgroundColor: "white" }}>
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                margin: 5
              }}
            >
              <FlatList
                data={val}
                showsVerticalScrollIndicator={false}
                renderItem={({ item,index }) => (
                 <TouchableOpacity onPress={GotoItems(index)}>
                  <View
                    style={{
                      height: 200,
                      width: 180,
                      alignSelf: "center",
                      margin: 5,
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "space-around"
                    }}
                  >
                    <Image
                      style={{ height: 70, width: 100 }}
                      source={{
                        uri: "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/category-images/CTG017.png".replace(
                          "CTG017",
                          item.split("_")[0].trim()
                        )
                      }}
                    />
                    <Text
                      style={{ color: "black", fontSize: 16 }}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {item
                        .split("_")[1]
                        .trim()
                        .toUpperCase()}
                    </Text>

                    <View
                      style={{
                        width: 100,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#fff",
                        margin: 10,
                        borderWidth: 1,
                        borderColor: "#206C2C",
                        borderStyle: "dashed",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        padding: 10,
                        padding: 10
                      }}
                    >
                      <Text
                        style={{
                          color: "#206C2C",
                          fontSize: 15,
                          fontWeight: "bold"
                        }}
                      >
                        {item.split("_")[3].trim()}
                      </Text>
                      <Text style={{ color: "#206C2C" }}>items</Text>
                      <Icon
                        type="EvilIcons"
                        name="angle-right"
                        size={20}
                        style={{ color: "#206C2C", marginLeft: 5 }}
                      />
                    </View>
                  </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
                numColumns={2}
                // initialNumToRender={10}
              />
            </CardView>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              height: 50,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontWeight: "bold", margin: 15, flex: 4 }}>
              FEATURED ITEMS
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
          <View style={{ backgroundColor: "white" }}>
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
                      <View  ref={()=>{this.View =this.ref}} style={{ flex: 1 }}  />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          paddingRight: 5
                        }}
                      >
                        <Icon name="plus" size={12} style={{ color: "#fff" }} />
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F3F3F2"
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 45,
    margin: 15
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    color: "#424242"
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "white",
    height: 100
  },
  itemContainer: {
    height: 50,
    width: 50,
    borderRadius: 30
  } ,hidden: {
    width: 0,
    height: 0,
  },
});
