import React, {useState, useEffect} from 'react';
import VideoCard from './components/VideoCard'
import Constant from 'expo-constants'
import Streams from './components/Streams'
import {StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity} from "react-native";
import {useSelector,useDispatch} from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import StreamPlayer from './StreamPlayer';
import VideoPlayer from './VideoPlayer';
import StreamButton from './components/StreamButton'
import axios from 'axios';

const Stack = createStackNavigator();

const HomeScreen = () => {
	const [value,setValue] = useState("")
	const dispatch = useDispatch()
	const cardData = useSelector(state=>{
        return state.cardData
      })
	const [loading,setLoading] = useState(false)

	const API_KEY = `AIzaSyBwd-mFKhqlx0BbbH1YlH6dpaofQpuQ7E4`
	const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJ4gkVC6NrvII8umztf0Ow&eventType=live&type=video&key=${API_KEY}`
	const [id_mapping,setid_mapping] = useState(new Map())

	const fetchData = () => {
		const POST_LIST = `http://localhost:8000/posts/`; 
		axios.get(POST_LIST)
		.then(res => {
			var videoId
			console.log(res.data)
			for(var ids of res.data){
				id_mapping.set( ids.video, ids.id)
				var result = res.data.map(function(val) {
					return val.video;
				}).join('%2C');
			}
			const YOUTUBE_API_CALL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${result}&type=video&key=${API_KEY}`
			
			console.log(YOUTUBE_API_CALL)
			
			setLoading(true)
			fetch(YOUTUBE_API_CALL)
			.then(res2=>res2.json())
			.then(data=>{
				setLoading(false)
	            dispatch({type:"add",payload:data.items})
			})	
		})
		.catch(error => {
			console.log(error); 
		});
	}

	
	const streamData = [
	  {
	      "kind": "youtube#searchResult",
	      "etag": "f-DJyUbk5bdYRDfiSUbzZ_mda1k",
	      "id": {
	        "kind": "youtube#video",
	        "videoId": "5qap5aO4i9A"
	      },
	      "snippet": {
	        "publishedAt": "2020-02-22T19:51:37Z",
	        "channelId": "UCSJ4gkVC6NrvII8umztf0Ow",
	        "title": "lofi hip hop radio - beats to relax/study to",
	        "description": "Thank you for listening, I hope you will have a good time here :) Listen to the playlist on Spotify, Apple music and more → https://bit.ly/chilledcow-playlists ...",
	        "thumbnails": {
	          "default": {
	            "url": "https://i.ytimg.com/vi/5qap5aO4i9A/default_live.jpg",
	            "width": 120,
	            "height": 90
	          },
	          "medium": {
	            "url": "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault_live.jpg",
	            "width": 320,
	            "height": 180
	          },
	          "high": {
	            "url": "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault_live.jpg",
	            "width": 480,
	            "height": 360
	          }
	        },
	        "channelTitle": "ChilledCow",
	        "liveBroadcastContent": "live",
	        "publishTime": "2020-02-22T19:51:37Z"
	      }
	    },
	    {
      "kind": "youtube#searchResult",
      "etag": "H8Dl3gIIC5qiAUqxCH6m9VqrdSE",
      "id": {
        "kind": "youtube#video",
        "videoId": "DWcJFNfaw9c"
      },
      "snippet": {
        "publishedAt": "2020-02-25T19:00:14Z",
        "channelId": "UCSJ4gkVC6NrvII8umztf0Ow",
        "title": "lofi hip hop radio - beats to sleep/chill to",
        "description": "Welcome to the sleepy lofi hip hop radio. This playlist contains the smoothest lofi hip hop beats, perfect to help you chill or fall asleep Listen to the playlist on ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/DWcJFNfaw9c/default_live.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/DWcJFNfaw9c/mqdefault_live.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/DWcJFNfaw9c/hqdefault_live.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "ChilledCow",
        "liveBroadcastContent": "live",
        "publishTime": "2020-02-25T19:00:14Z"
      }
    }
	];

	const fetchStream = () =>{
		setLoading(true)
		fetch(YOUTUBE_API)
		.then(res=>res.json())
		.then(data=>{
			setLoading(false)
            dispatch({type:"add",payload:data.items})
		})
	}

	useEffect(() => {
        fetchData();
    }, [])

	const Home = () => {
		return (
			<View style={{flex:1}}>
				<View style={styles.streamsWrapper}>
					<Text style = {styles.sectionTitle}>Livestreams</Text>
					
					<View style={{flexDirection: 'row', paddingTop:16}}>
						<StreamButton />
						<FlatList
							horizontal={true}
						   data={streamData}
						   renderItem={({item})=>{
							   return <Streams 
								videoId={item.id.videoId}
								title={item.snippet.title}
								channel={item.snippet.channelTitle}
							   />
							   }}
						   keyExtractor={item=>item.id.videoId}
						   style={{flexDirection: 'row'}}
						/>
					</View>
				</View>
	
			<View style={styles.videosWrapper}>
				<Text style = {styles.sectionTitle}>Videos</Text>
				<FlatList
				   data={cardData}
				   renderItem={({item})=>{
						   // console.log("map2" + id_mapping.get(item.id))
					   return <VideoCard 
						videoId={item.id}
						title={item.snippet.title}
						channel={item.snippet.channelTitle}
						postId = {id_mapping.get(item.id)}
					   />
					   }}
				   keyExtractor={item=>item.id}
				   style={{paddingTop:16}}
				/>
			</View>
			</View>
		)
	}
	
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='login'
				component={Login}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='home'
				component={Home}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='streamplayer'
				component={StreamPlayer}
				title="Watch Stream"
			/>
			<Stack.Screen
				name='videoplayer'
				component={VideoPlayer}
			/>
		</Stack.Navigator>
	)
}



const styles = StyleSheet.create({
	sectionTitle: {
	    fontSize: 24,
	    fontWeight: 'bold',
	    paddingTop: 24,
 	},
 	videosWrapper: {
		flex: 1,
	    paddingHorizontal: 16,
	},
	streamsWrapper: {
	    paddingTop: 24,
	    paddingHorizontal: 16,
	},
	items: {
	    marginTop: 16,
	},
})

export default HomeScreen