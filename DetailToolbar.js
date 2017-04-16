import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  BackAndroid,
  ToastAndroid,
} from 'react-native';

var statusBarSize = Platform.OS == 'ios' ? 10 : 0;
var API_STROY_EXTRA = 'http://news-at.zhihu.com/api/4/story-extra/';


var DetailToolbar=React.createClass({
   getDefaultProps(){
      return {
        isNeedShare:true,
        isNeedCollect:true,
        isNeedComment:true,
        isNeedPraise:true,
      }
   },
   getInitialState:function(){
      return({
         isLoading:true,
         extra:null
      })
   },
   componentDidMount:function(){
       if(this.props.navigator.getCurrentRoutes().length<3){
          this.fetchStoryExtra();
       }
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
   fetchStoryExtra:function(){
      fetch(API_STROY_EXTRA+this.props.story.id)
        .then((response)=>response.json())
        .then((responseData)=>{
           this.setState({
              isLoading:false,
              extra:responseData
           });
        })
        .catch((error)=>{
         this.setState({
              isLoading:false,
              extra:null
           });
        })
        .done();
   },
   goToComment:function(story:Object){
     this.props.navigator.push({
            title: story.title,
            name: 'comment',
            story: story,
        });
   },
    _onPressBackButton: function() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  },
  _onPressShareButton: function() {
    // TODO:
    ToastAndroid.show('分享', ToastAndroid.SHORT);
  },
  _onPressCollectButton: function() {
    // TODO:
    ToastAndroid.show('收藏', ToastAndroid.SHORT);
  },
  _onPressCommentButton: function() {
    // TODO:
    this.goToComment(this.props.story);
  },
    _onPressPraiseButton: function() {
    // TODO:
    ToastAndroid.show('赞', ToastAndroid.SHORT);
  },
  render:function(){
     var TouchableElement= TouchableHighlight;
     if (Platform.OS === 'android') {
       TouchableElement = TouchableNativeFeedback;
     }
     var componentArray=[];
       componentArray.push(
          <TouchableElement onPress={this._onPressBackButton} key={0}>
            <View style={styles.actionItem}>
              <Image
                style={styles.backIcon}
                source={{uri:'ic_back_white'}}
                resizeMode='contain' />
            </View>
          </TouchableElement>
       )
       componentArray.push(
        <View style={{flex: 1}} key={1} />
       )
       if(this.props.isNeedShare){
         componentArray.push(
             <TouchableElement onPress={this._onPressShareButton} key={2} >
                <View style={styles.actionItem}>
                    <Image
                    style={styles.actionIcon}
                    source={{uri:'ic_share_white'}}
                    resizeMode='contain' />
                </View>
             </TouchableElement>
         )
       }
       if(this.props.isNeedCollect){
             componentArray.push(
                <TouchableElement onPress={this._onPressCollectButton} key={3} >
                    <View style={styles.actionItem}>
                      <Image
                        style={styles.actionIcon}
                        source={{uri:'ic_collect_white'}}
                        resizeMode='contain' />
                    </View>
                 </TouchableElement>
             )
       }
        if(this.props.isNeedComment){
            componentArray.push(
                 <TouchableElement onPress={this._onPressCommentButton} key={4}>
                    <View style={styles.actionItem}>
                      <Image
                        style={styles.actionIconWithCount}
                        source={{uri:'ic_comment_white'}}
                        resizeMode='contain' />
                      <Text style={styles.count}>
                        {(this.state.isLoading || !this.state.extra) ? '...' : this.state.extra.comments}
                      </Text>
                    </View>
                  </TouchableElement>
            )
         }
         if(this.props.isNeedPraise){
          componentArray.push(
             <TouchableElement onPress={this._onPressPraiseButton} key={5}>
                <View style={styles.actionItem}>
                  <Image
                    style={styles.actionIconWithCount}
                    source={{uri:'ic_praise_white'}}
                    resizeMode='contain' />
                  <Text style={styles.count}>
                    {(this.state.isLoading || !this.state.extra) ? '...' : this.state.extra.popularity}
                  </Text>
                </View>
              </TouchableElement>
          )
         }
     return (
       <View {...this.props}>
        <View style={styles.actionsContainer}>
        {componentArray}
        </View>
      </View>
     );
  }
});

var styles = StyleSheet.create({
  actionsContainer: {
    height: 56,
    paddingTop: statusBarSize,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
    marginLeft: 8,
    marginRight: 8,
  },
  actionItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
  },
  actionIconWithCount: {
    width: 32,
    height: 32,
    marginLeft: 5,
  },
  count: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
});

module.exports = DetailToolbar;
