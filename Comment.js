"use strict";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
  } from 'react-native';

  var screenWidth=Dimensions.get('window').width;
  var DataRepository = require('./DataRepository');
  var DetailToolbar = require('./DetailToolbar');
 

  var Comment=React.createClass({
     getInitialState: function() {
         var dataSource = new ListView.DataSource({
             rowHasChanged: (row1, row2) => row1 !== row2,
         });
         return{
             dataSource:dataSource,
             isLoading:false,
         }
     },
     componentDidMount:function(){
        this.fetchComment(this.props.story.id);
     },
      fetchComment:function (storyID) {
        fetch("http://news-at.zhihu.com/api/4/story/"+storyID+"/short-comments")
              .then((response)=>response.json())
              .then((responseData)=>{
                  var shortComments=[];
                  for(var index in responseData.comments){
                      shortComments.push(responseData.comments[index]);
                  }
                  return shortComments;
              }).then((shortComments)=>{
                 fetch("http://news-at.zhihu.com/api/4/story/"+storyID+"/long-comments")
                     .then((response)=>response.json())
                     .then((responseData)=>{
                         for(var index in responseData.comments){
                             shortComments.push(responseData.comments[index]);
                         }
                         var dataSource=this.state.dataSource.cloneWithRows(shortComments);
                         this.setState({
                             isLoading:true,
                             dataSource:dataSource
                         });
                     })
                 .done();
            })
        
      },
      _getCommentTime:function (timeTicket) {
          function formatDate(now) {
              var year=now.getYear();
              var month=now.getMonth()+1;
              var date=now.getDate();
              var hour=now.getHours();
              var minute=now.getMinutes();
              var second=now.getSeconds();
              return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
          }
          var d=new Date(timeTicket);

          // var newDate = new Date();
         // newDate.setTime(timeTicket * 1000);
         // return newDate.toLocaleString();
          return formatDate(d);

      },
      _getPrise(likeCount){
         if(likeCount!="0"){
             return likeCount+" 赞";
         }
      },
      renderRow:function (
          comment: Object,
          sectionID: number | string,
          rowID: number | string,
          highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
      ) {
          return(
              <View style={styles.cellViewStyle}>
                  <Image source={{uri:comment.avatar}} style={styles.editorAvatar}/>
                  <View style={{width:screenWidth*0.75, marginLeft:8, justifyContent:"center"}}>
                      <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}>
                         <Text style={{paddingBottom:10,color:"#00a2ed"}}>{comment.author}</Text>
                         <View style={{marginRight:20}}>
                          <Text style={{color:"#00a2ed"}}>{this._getPrise(comment.likes)}</Text>
                      </View>
                      </View>
                      <Text style={{paddingBottom:10}}>{comment.content}</Text>
                      <Text>{this._getCommentTime(comment.time)}</Text>
                  </View>
              </View>
          );
      },
     onEndReached:function () {

     },
     render:function(){
        var toolbar = <DetailToolbar navigator={this.props.navigator} style={styles.toolbar} story={this.props.story} isNeedShare={false} isNeedCollect={false} isNeedComment={false} isNeedPraise={false}/>;
        if(!this.state.isLoading){
            return(
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }else {
        return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ListView
                    style={styles.listview}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    automaticallyAdjustContentInsets={true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    onEndReached={this.onEndReached}
                   />
                </ScrollView>
                {toolbar}
            </View>
        );
     }}
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
  listview: {
      paddingTop:56,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
},
  cellViewStyle:{
     flexDirection:'row',
     padding:10,
     borderBottomColor:'#e8e8e8',
     borderBottomWidth:0.5,
  },
  editorAvatar: {
     width: 40,
     height: 40,
     borderRadius: 18,
     borderWidth: 1,
     borderColor: '#AAAAAA',
     margin: 4,
     },

});
module.exports=Comment;
