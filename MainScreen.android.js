import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  Dimensions,
  TouchableNativeFeedback,
  TouchableHighlight,
  } from 'react-native';

  var StoriesList=require('./StoriesList');
  var ThemesList = require('./ThemesList');
  var SwipeRefreshLayoutAndroid = require('./SwipeRefreshLayout');

  var DRAWER_REF = 'drawer';
  var LIST_REF="storyList";
  var DRAWER_WIDTH_LEFT = 56;
  var toolbarActions=[
    {title:"提醒",icon:{uri:"ic_message_white"},show:"always"},
    {title:"夜间模式",show:"never"},
    {title:"设置选项",show:"never"}
  ];
  var MainScreen=React.createClass({
      getInitialState:function(){
          return({
              theme:null,
              userImage:"comment_avatar",
              logName:"请登录"
          });  
      },
      onSelectTheme:function(theme){
          this.refs[DRAWER_REF].closeDrawer();
          this.refs[LIST_REF].refs["listview"].scrollTo(0,0);
          this.setState({theme: theme});

      },
      _logOn:function(){
         if(this.state.userImage=="comment_avatar"){
             this.refs[DRAWER_REF].closeDrawer();
             this.props.navigator.push({
               name: 'logon',
               pageState:this.state
             });
         }
      },
      _renderNavigationView:function(){
          var TouchableElement=TouchableHighlight;
          if(Platform.OS==="android"){
              TouchableElement = TouchableNativeFeedback;
          }
          return(
              <View style={{flex:1}}>
                <View style={styles.header}>
                  <View style={styles.userInfo}>
                    <TouchableElement onPress={this._logOn}>
                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
                        <Image
                            source={{uri:this.state.userImage}}
                            style={{width: 40, height: 40, marginLeft: 8, marginRight: 8}} />
                        <Text style={styles.menuText}>{this.state.logName} </Text>
                      </View>
                     </TouchableElement>

                                <View style={styles.row}>
                                <TouchableElement>
                                  <View style={styles.menuContainer}>
                                    <Image
                                source={{uri:'ic_favorites_white'}}
                                style={{width: 30, height: 30}} />
                                <Text style={styles.menuText}>
                                    我的收藏
                                </Text>
                                </View>
                                </TouchableElement>
                                <TouchableElement>
                                <View style={styles.menuContainer}>
                                <Image
                                source={{uri:'ic_download_white'}}
                                style={{width: 30, height: 30}} />
                                <Text style={styles.menuText}>
                                  离线下载
                                </Text>
                                </View>
                                </TouchableElement>
                                </View>
                                </View>
                                <TouchableElement onPress={() => this.onSelectTheme()}>
                                  <View style={styles.themeItem}>
                                    <Image
                                        source={{uri:'home'}}
                                        style={{width: 30, height: 30, marginLeft: 10}} />
                                        <Text style={styles.homeTheme}>
                                          首页
                                        </Text>
                                 </View>
                            </TouchableElement>
                            </View>
              <ThemesList style={{flex:2.4}} onSelectItem={this.onSelectTheme}/>
            </View>
            );
  	},
  onRefresh: function() {
    this.onSelectTheme(this.state.theme);
  },
  onRefreshFinish: function() {
    this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
  },
  render:function(){
  	    var title=this.state.theme?this.state.theme.name:"首页";
  	   // var testrightcontent= this.state.theme?this.state.theme.name:"首页";
  		return(
            <DrawerLayoutAndroid
                ref={DRAWER_REF}
                drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
                keyboardDismissMode="on-drag"
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this._renderNavigationView}>
                 <View style={styles.container}>
                     <ToolbarAndroid
                        navIcon={{uri:'ic_menu_white'}}
                        title={title}
                        titleColor="white"
                        style={styles.toolbar}
                        actions={toolbarActions}
                        onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
                        onActionSelected={this.onActionSelected} />
                  <SwipeRefreshLayoutAndroid
                    ref={(swipeRefreshLayout) => { this.swipeRefreshLayout = swipeRefreshLayout; }}
                    onSwipeRefresh={this.onRefresh}>
                      <StoriesList theme={this.state.theme} ref={LIST_REF} navigator={this.props.navigator} onRefreshFinish={this.onRefreshFinish} />
                  </SwipeRefreshLayoutAndroid>
                 </View>
            </DrawerLayoutAndroid>
            );
  	}
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
    },
    toolbar: {
        backgroundColor: '#00a2ed',
        height: 56,
    },
    //----------
    header:{
        flex:1,
        flexDirection:"column"
    },
    userInfo:{
        flex:1,
        backgroundColor:"#00a2ed"
    },
    row:{
        flexDirection:'row',
        alignItems:"center"
    },
    menuContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        padding:8
    },
    menuText:{
        fontSize:14,
        color:"white"
    },
    homeTheme:{
        fontSize:16,
        marginLeft:16,
        color:"#00a2ed"
    },
    //----------
});

  module.exports=MainScreen;