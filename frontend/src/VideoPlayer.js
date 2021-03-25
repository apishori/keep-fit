import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View,Dimensions, Animated} from 'react-native';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import {Button} from 'react-native-elements';
import axios from 'axios';

// import { useState } from 'React';

const VideoPlayer = ({route})=>{

  const [buttonText, setButtonText] = useState("Like Exercise ❤️");
  var {videoId,title,postId} = route.params

  const changeText = (text) => {
    setButtonText(text)
    const postIdInt = parseInt(postId)
    const ToggleLikeView = `http://localhost:8000/posts/like/${postIdInt}/`;

    axios.get(ToggleLikeView)
    .then(res => {
    })
    .catch(error => {
      // console.log(error);
    });
  };

  return(

    <View style={{ flex:1}}>
      <View style={{width:"100%", height:"40%"}}>
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
        <Button
          buttonStyle={{borderColor:"#ef476f", borderWidth:2, backgroundColor:'white'}}
          titleStyle={{color:"#ef476f"}}
          type="outline"
          title={buttonText}
          onPress={() => changeText(buttonText === 'Like Exercise ❤️' ? 'Unlike Exercise 💔' : 'Like Exercise ❤️')}>
        </Button>
      </View>

    </View>
   )
}

export default VideoPlayer