import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View,Dimensions, Animated,Pressable} from 'react-native';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import {Button} from 'react-native-elements';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const VideoPlayer = ({route})=>{
  var {videoId,title,postId, authorId,likes,category} = route.params
  const [buttonText, setButtonText] = useState("Like Exercise ❤️");
  const [likesAdd, setlikesAdd] = useState(1);
  const [likesCount, setLikesCount] = useState(likes);

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const ShowOtherProfile = ( otherUser ) => {
    // console.log(otherUser.otherUser)
    navigation.navigate('profile', {otherUser})
  }
  

  const token = useSelector(state => {
      return state.loginToken.token;
  })
  const author = useSelector(state => {
      return state.loginData.loginID;
  })

  const [newLikes,setNewLikes] = useState(`❤️: ${likes}`)
  const likesSet = new Set();

  const fetchLikes = () => {
    const POST_LIST = `http://127.0.0.1:8000/posts/bylikes/`; 

    axios.get(POST_LIST
        ,
        {headers: {
          "Authorization": `Token ${token}`
        }}
        )
    .then(res => {
      // get number of likes
      // console.log(res.data.likes)
      // this.setState({
      //   textValue: `❤️: ${res.data}`
      // })
    })
    .catch(error => {
      console.error("error getting likes: " + error); 
    });
  }

  const changeText = (text) => {
    if(text=='Like Exercise ❤️'){
      setLikesCount(likesCount-1)
    }
    else{
      setLikesCount(likesCount+1)
    }
    setButtonText(text)
    fetchLikes()
    const postIdInt = parseInt(postId)
    const ToggleLikeView = `http://localhost:8000/posts/like/${postIdInt}/`;

    axios.get(ToggleLikeView,
      {headers: {
          "Authorization": `Token ${token}`
        }}
        )
    .then(res => {
    })
    .catch(error => {
      // console.log(error);
    });
  };

  const deletePost = () => {
    
    const postIdInt = parseInt(postId)
    const deletePostURL = `http://localhost:8000/posts/${postIdInt}/`;

    // console.log(token)

    axios.delete(deletePostURL,
        {headers: {
          "Authorization": `Token ${token}`
        }}
        )
    .then(res => {
    })
    .catch(error => {
      // console.log(error);
    });
  };

  
  useEffect(() => {
    const postIdInt = parseInt(postId)

    axios.request({
      url: `http://127.0.0.1:8000/posts/watch/${postIdInt}/`,
      method: "post",
      headers: {
          "Authorization": `Token ${token}`
      },
      data:{}
    })

    // axios.post(`http://127.0.0.1:8000/posts/watch/${postIdInt}/`
    //     ,
    //     {headers: {
    //       "Authorization": `Token ${token}`
    //     }}
    //     )

    axios.get(`http://127.0.0.1:8000/posts/bylikes/`
        ,
        {headers: {
          "Authorization": `Token ${token}`
        }}
        )
    .then(res => {
      var videoId
      for(var ids of res.data){
        likesSet.add(ids.id)
        // console.log(ids.id)
      }

      if(likesSet.has(postIdInt)){
        setButtonText("Unlike Exercise ❤️")
        setlikesAdd(-1)
      }
    })

    
  }, [])


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

      <View style={{borderBottomWidth:1,width:Dimensions.get("screen").width - 50,
           margin:9}}>
        <Pressable
          onPress={() => ShowOtherProfile({otherUser: author})}
        >
        <Text style={{marginBottom:8}}>{author}</Text>
        </Pressable>
        <Text style={{marginBottom:8}}>Category: {category}</Text>
        <Text style={{marginBottom:8}}>❤️: {likesCount}</Text>
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

      <View style={{align:"center", margin: 16}}>
            {authorId == author ? 
            <Button
              buttonStyle={{backgroundColor:'#ef476f'}}
              title="Delete Post"
              onPress={() => {deletePost()}}
              >
          </Button>
            : null }
      </View>

    </View>
   )
}

export default VideoPlayer