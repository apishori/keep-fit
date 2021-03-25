import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View,Dimensions, Animated} from 'react-native';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import {Button} from 'react-native-elements';
import axios from 'axios';

// import { useState } from 'React';

const StreamPlayer = ({route})=>{

  var {videoId,title,postId} = route.params

  return(

    <View style={{ flex:1}}>
      <View style={{width:"100%", height:"40%", flex:1}}>
        <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
         source={{uri:`https://www.youtube.com/embed/${videoId}`}}
        />
      </View>

      <Text style={{
           fontSize:20,
           width:Dimensions.get("screen").width - 50,
           margin:9
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
        >
         {title}
      </Text>

      <View style={{borderBottomWidth:1}}>
        <Text></Text>
      </View>
           
      <View style={{align:"center", margin: 16}}>
      </View>

    </View>
   )
}

export default StreamPlayer