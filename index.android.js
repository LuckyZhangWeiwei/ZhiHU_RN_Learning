/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,

  View,
  Navigator,
  StyleSheet,

  } from 'react-native';

var TimerMix=require("react-timer-mixin");
var MainScreen = require('./MainScreen');
var SplashScreen = require('./SplashScreen');
var StoryScreen=require("./StoryScreen");
var CommitScreen=require("./Comment");
var LogonScreen=require('./Logon');
var _navigator;
BackAndroid.addEventListener("hardBackPress",function(){
    if(_navigator && _navigator.getCurrentRoutes().lenght>1){
       _navigator.pop();
       return true;
    }
    return false;
});

var RTCZhihuDaily=React.createClass({
  mixins:[TimerMix],
  componentDidMount:function(){
     this.setTimeout(
        ()=>{
           this.setState({splashed:true});
        },2000
     );
  },
  RouteMapper:function(route,navigationOperations,onComponentRef){
     _navigator=navigationOperations;
     if(route.name==="home"){
      return(
        <View style={styles.container}>
           <MainScreen navigator={navigationOperations}/>
        </View>
        );
     }else if(route.name==="story"){
        return (
          <View style={styles.container}>
             <StoryScreen
                navigator={navigationOperations}
                story={route.story}/>
          </View>
        );
     }else if(route.name==="comment"){
        return(
        <View style={styles.container}>
            <CommitScreen 
                navigator={navigationOperations}
                story={route.story} />
        </View>
        );
     }else if("logon"===route.name){
       return(
        <View style={styles.container}>
            <LogonScreen 
                navigator={navigationOperations}
                pageState={route.pageState}
             />
        </View>
       );
     }
  },
  getInitialState:function(){
    return {
      splashed:false
    }
  },
  onActionSelected:function(positoin){
  
  },
  render:function(){
     if(this.state.splashed){
       var initialRoute={name:"home"};
       return(
         <Navigator
           style={styles.container}
           initialRoute={initialRoute}
           configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
           renderScene={this.RouteMapper}
         />
       );
     }else{
       return (
         <SplashScreen/>
       )
     }
  }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column"
    }
});

AppRegistry.registerComponent('ReactNativeLearning', () => RTCZhihuDaily);
