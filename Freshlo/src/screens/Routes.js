import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './Home.js'
import Splash from './Splash'
import Details from './Details'
import Items from './Items'
import AllCategory from './AllCategory'
import Cart from './Cart' 
const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "Splash" component = {Splash} title = "Splash" initial = {true} hideNavBar={true}/>
         <Scene key = "home" component = {Home} title = "Home" hideNavBar={true} />
         <Scene key = "details" component = {Details} title = "Details" hideNavBar={true} />
         <Scene key = "items" component = {Items} title = "Items" hideNavBar={true} />
         <Scene key = "allcategory" component = {AllCategory} title = "AllCategory" hideNavBar={true} />
         <Scene key = "cart" component = {Cart} title = "Cart" hideNavBar={true} />
      </Scene>
   </Router>
)
export default Routes