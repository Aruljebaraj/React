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
  ActivityIndicator,Button,AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardView from "react-native-cardview";
import Global from './Global'
import Dialog, { DialogContent,SlideAnimation,DialogTitle } from 'react-native-popup-dialog';
type Props = {};
var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'Cart.db', createFromLocation: '~Cart.db'})
export default class Items extends Component<Props> {
  constructor(props) {
    super(props);
    
    this.state = {
      page: 10,
      data: "",
      GridColumnsValue: true,
      ButtonDefaultText: "appstore-o",
      // isLoading: true,
      showSoundImg: true,
      loading: false,
      show:false,
     CartItem:""
    };

  }

  componentDidMount(page) {
    const cat = this.props.Category;
    this.setState({ loading: true });
    fetch(
      "http://dailyfreshapi.cxengine.net/api/Values//GetRangeItem?start=0&end=" +
        this.state.page +
        "&Category=" +
        cat,
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
        this.componentDidMount(this.state.page);
      }
    );
  };
  gotoDetails = index => () => {
    Actions.details({
      Url: "https://freshlo.oss-ap-south-1.aliyuncs.com/freshlo-img/icon/@name.png".replace(
        "@name",
        this.state.data[index].itemId
      ),
      weight: this.state.data[index].weight,
      measurement: this.state.data[index].measurement,
      marketPrice: this.state.data[index].marketPrice,
      sellingPrice: this.state.data[index].sellingPrice,
      ProductName: this.state.data[index].pluName,
      Description: this.state.data[index].description
    });
  };
  _onPressButton = () => {
  const {show} = this.state;
  this.setState({
    show :!show
  })
  }
  sort= () =>{
    this.setState({ visible: true });
  }
 
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

    let Product = this.props.Product;
    var imgSource = this.state.showSoundImg ? "appstore-o" : "profile";

    const add=(index)=>()=>{
//    let g =Global.getInstance();
//    let name =g.setProductName(this.state.data[index].pluName);
//    let measurement =g.setProductMeasurement(this.state.data[index].measurement);
//    let sellingPrice =g.setSellingPrice(this.state.data[index].sellingPrice);
//    let marketPrice =g.setMarketPrice(this.state.data[index].marketPrice);
//    let weight =g.setProductWeight(this.state.data[index].weight);
//    let category =g.setProductCategory(Product);

//  var val =[this.state.data[index].pluName]
//    AsyncStorage.setItem('name',val);
//  alert(this.state.petname)



//   db.transaction((tx) => {
//     tx.executeSql('INSERT INTO pet (owner,petname) VALUES (?,?)', [this.state.data[index].pluName,this.state.data[index].measurement]);

// });
db.transaction((tx) => {
  tx.executeSql('INSERT INTO CartItem (ProductName,ProductWeight,ProductMeasurement,ProductSellingPrice,ProductMarketPrice,ProductCategory) VALUES (?,?,?,?,?,?)',
   [this.state.data[index].pluName,
  this.state.data[index].weight,
  this.state.data[index].measurement,
  this.state.data[index].sellingPrice,
  this.state.data[index].marketPrice,
  Product]);

});
   //alert(this.state.petname)
   
  }
  
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
            {Product}
          </Text>
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
              borderColor: "#dcdcdc",
              borderWidth:0.5,
              justifyContent: "center"
            }}
          >
           <TouchableOpacity style={{flexDirection: "row",
              alignItems: "center",
              flex: 1.5,   justifyContent: "center"}} onPress={this.sort}>
            <FontAwesome
              name="sort"
              size={20}
              color="gray"
              style={{ alignSelf: "center", padding: 10 }}
            />
            <Text>SORT</Text>
            </TouchableOpacity>
          </View>
          <View  style={{position:"absolute"}}>
          <Dialog
    visible={this.state.visible}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
   
  >
    <DialogContent>
     

     <Text>Sort</Text>
 
    </DialogContent>
  </Dialog>
  </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1.5,
              borderWidth: 0.5,
              borderColor: "#dcdcdc",
           
            }}
           
          >
       <TouchableOpacity style={{flexDirection: "row",
              alignItems: "center",
              flex: 1.5,   justifyContent: "center"}} onPress={this._onPressButton}>
            <FontAwesome
              name="filter"
              size={20}
              color="gray"
              style={{ alignSelf: "center", padding: 10 }}
            />
            <Text>FILTER</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ backgroundColor: "white" }}>
          <FlatList
            style={{ marginBottom: 100 }}
            data={this.state.data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={this.gotoDetails(index)}
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
                        <TouchableOpacity onPress={add(index)}>
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
            keyExtractor={item => item}
            numColumns={this.state.GridColumnsValue ? 1 : 2}
            onEndReached={this.onScrollHandler}
            renderFooter={this.renderFooter.bind(this)}
            ListFooterComponent={this.renderFooter(this.props.loading)}
            key={this.state.GridColumnsValue ? "ONE COLUMN" : "TWO COLUMN"}
          />
        </View>
    {this.state.show && <Filter/>}
      </View>
      
    );
    
  }
}

class Filter extends Component{
  render(){

    return(
 
      <View style={{width:250,marginTop:95,height:Dimensions.get("window").height,position:"absolute",backgroundColor:"#387B5A",alignSelf:"flex-end"}}>
<View style={{height:50,alignItems:"center",flexDirection:"row"}}>
  <FontAwesome
    name="filter"
    size={25}
    color="white"
    style={{padding:10}}
  />
  <Text style={{color:"white"}}>Filter by</Text>
</View>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
