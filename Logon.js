"use strict";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  BackAndroid,
   } from 'react-native';

  var HEADER_SIZE = 200;

  var Logon=React.createClass({
     getDefaultProps(){
       return{
       }
     },
     getInitialState: function() {
         return {};
     },
     componentDidMount:function(){
         return {};
     },
     componentWillMount:function(){
       BackAndroid.addEventListener('hardwareBackPress', this.goBack);
     },
     goBack:function(){
         if (this.props.navigator) {
          var routers =  this.props.navigator.getCurrentRoutes();
          if(routers.length>1){
               this.props.navigator.pop();
               return true;
            }
          }
     },
     _logon:function(){
        this.props.pageState.userImage="ic_praise_white";
        this.props.pageState.logName="张唯伟";
        this.props.navigator.pop();
     },
     render:function(){
        return(
            <View style={[styles.container, styles.center]}>
              <Text>Logon</Text>
              <TouchableHighlight onPress={this._logon}>
               <View>
               <Text>提 交</Text>
               </View>
              </TouchableHighlight>
            </View>
               
        );
     }
  });
 var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  header: {
    height: HEADER_SIZE,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 56,
  },
  headerImage: {
    height: HEADER_SIZE,
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:56,
  },
   myTextView:{
        width:300,
        height:50,
    },
});
  module.exports=Logon;

