import React, { Component } from "react";
import { Router, Actions } from "react-native-router-flux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Divider,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardView from "react-native-cardview";
import MaterialTabs from "react-native-material-tabs";
import Global from "./Global";
type Props = {};
export default class AllCategory extends Component<Props> {
 
    state = {
      selectedTab: 0,
      tab: [],
      page: 10,
      data: "",
      GridColumnsValue: true,
      ButtonDefaultText: "appstore-o",
      // isLoading: true,
      showSoundImg: true,
      loading: false,
      Category:"",
      // show:false
    };

  setTab = selectedTab => {
    this.setState({ selectedTab });
    let val = Global.getInstance();
    let data = val.getCategory();

    // alert(selectedTab)
   alert(data[selectedTab].split("_")[0])
   this.setState({
    Category: data[selectedTab].split("_")[0]
   })
 this.fetch()
      
  }
  componentDidMount() {
    let val = Global.getInstance();
    let data = val.getCategory();
    const newRecords = [];
    for (var i = 0; i < data.length; i++) {
      newRecords.push(data[i].split("_")[1]);
    }

    let rec =newRecords
    this.setState({
      tab: rec
    });
    // alert(rec)
  }

  fetch(page) {

    this.setState({ loading: true });
    fetch(
      "http://dailyfreshapi.cxengine.net/api/Values//GetRangeItem?start=0&end=" +
        this.state.page +
        "&Category=" +
        this.state.Category,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded" // <-- Specifying the Content-Type
        }),
        body: "param1=value1&param2=value2" // <-- Post parameters
      }
    )
      .then(response => response.json())
      .then(ResponseJson => {
        const newRecords = [];
        for (
          var i = page * 10, il = i + 10;
          i < il && i < this.state.data.length;
          i++
        ) {
          newRecords.push(this.state.data[i], newRecords);
        }
        this.setState({
          // isLoading: false,
          data: ResponseJson,
          loading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });
      });
      // this._onPressButton()
  }

  renderFooter() {
    return this.state.loading ? (
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          height: 50,
          alignItems: "center"
        }}
      >
        <Text>Loading...</Text>
        <ActivityIndicator />
      </View>
    ) : null;
  }

  onScrollHandler = () => {
    this.setState(
      {
        page: this.state.page + 10
      },
      () => {
        this.fetch(this.state.page);
      }
    );
  };
  // ListEmpty = () => {
  //   return (
  //     //View to show when list is empty
  //     <View style={styles.MainContainer}>
  //       <Text style={{ textAlign: 'center' }}>No Data Found</Text>
  //     </View>
  //   );
  // };


  // _onPressButton = () => {
  //   const {show} = this.state;
  //   if(this.state.data.length==0){
  //     this.setState({
  //       show :true
  //     }) 
  //   }else if(this.state.data.length!=0){
  //     this.setState({
  //       show :false
  //     })
  //   }
   
  //   }
  render() {
    const test = () => {
      this.setState({ showSoundImg: !this.state.showSoundImg });

      if (this.state.GridColumnsValue === true) {
        this.setState({
          GridColumnsValue: false,
          ButtonDefaultText: "profile"
        });
      } else {
        this.setState({
          GridColumnsValue: true,
          ButtonDefaultText: "appstore-o"
        });
      }
    };

    var imgSource = this.state.showSoundImg ? "appstore-o" : "profile";

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
            All Category
          </Text>
        </View>
        <View>
          <MaterialTabs
            items={this.state.tab}
            selectedIndex={this.state.selectedTab}
            onChange={this.setTab}
            barColor="#387B5A"
            indicatorColor="white"
            activeTextColor="white"
            inactiveTextColor="#dcdc"
            scrollable={true}
            activeTextStyle={{ fontSize: 15 }}
          />
        </View>
        <View
          style={{
            height: 45,
            width: Dimensions.get("window").width,
            backgroundColor: "#fff",
            flexDirection: "row"
          }}
        >
          <View>
            <TouchableOpacity onPress={test}>
              <View
                style={{
                  alignContent: "center",
                  width: 50,
                  height: 45,
                  borderBottomWidth: 0.5,
                  borderRightWidth: 0.5,
                  borderBottomColor: "#dcdcdc",
                  borderRightColor: "#dcdcdc",
                  justifyContent: "center"
                }}
              >
                <Icon
                  name={imgSource}
                  size={20}
                  color="gray"
                  style={{ alignSelf: "center", flex: 0.5 }}
                />
                <Text style={{ height: 0, width: 0 }}>
                  {" "}
                  {this.state.ButtonDefaultText}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1.5,
              borderWidth: 0.5,
              borderColor: "#dcdcdc",
              justifyContent: "center"
            }}
          >
            <FontAwesome
              name="sort"
              size={20}
              color="gray"
              style={{ alignSelf: "center", padding: 10 }}
            />
            <Text>SORT</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1.5,
              borderWidth: 0.5,
              borderColor: "#dcdcdc",
              justifyContent: "center"
            }}
          >
            <FontAwesome
              name="filter"
              size={20}
              color="gray"
              style={{ alignSelf: "center", padding: 10 }}
            />
            <Text>FILTER</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <FlatList
            style={{ marginBottom: 140 }}
            data={this.state.data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
               
                style={{ height: 180, flex: 1 }}
              >
                <CardView
                  cardElevation={2}
                  cardMaxElevation={2}
                  cornerRadius={5}
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    margin: 5
                  }}
                >
                  <View
                    style={{
                      height: 150,
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
                      defaultSource={require("../Image/logo.png")}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        flex: 1,
                        height: 160,
                        justifyContent: "space-around"
                      }}
                    >
                      <Text
                        style={{ color: "black", fontSize: 16 }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {item.pluName.toUpperCase()}
                      </Text>

                      <Text style={{ color: "black", flexWrap: "wrap" }}>
                        {item.description}
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
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
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
                    </View>
                  </View>
                </CardView>
              </TouchableOpacity>
            )}
            // ListEmptyComponent={this.ListEmpty}
            keyExtractor={item => item}
            numColumns={this.state.GridColumnsValue ? 1 : 2}
            onEndReached={this.onScrollHandler}
            renderFooter={this.renderFooter.bind(this)}
            ListFooterComponent={this.renderFooter(this.props.loading)}
            key={this.state.GridColumnsValue ? "ONE COLUMN" : "TWO COLUMN"}
          />
        </View>
        {/* {this.state.show && <Empty/>} */}
    </View>
    );
  }
}
// class Empty extends Component{
//   render(){
    
//     return(
 
//       <View style={{width:Dimensions.get("window").width,marginTop:95,height:Dimensions.get("window").height,position:"absolute",backgroundColor:"#387B5A",alignSelf:"flex-end"}}>
// <View style={{height:50,alignItems:"center",flexDirection:"row"}}>
//   <FontAwesome
//     name="filter"
//     size={25}
//     color="white"
//     style={{padding:10}}
//   />
//   <Text style={{color:"white"}}>Filter by</Text>
// </View>
//      </View>
//     )
//   }
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor:"white"
  }
});
