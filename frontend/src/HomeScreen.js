import React, {useState, useEffect} from 'react';
import VideoCard from './components/VideoCard'
import Constant from 'expo-constants'
import Streams from './components/Streams'
import {StyleSheet, Text, View, SafeAreaView, FlatList, Image, ScrollView, Animated, TouchableOpacity} from "react-native";
import {useSelector,useDispatch} from 'react-redux'
import StreamButton from './components/StreamButton'


const HomeScreen = () => {
	const [value,setValue] = useState("")
	//const dispatch = useDispatch()
	//const cardData = useSelector(state=>{
    //    return state.cardData
    //  })
	//const [loading,setLoading] = useState(false)

	const API_KEY = `AIzaSyDD-5omLZO04LGwOytAAIeRGFxa5Xqa5CE`
	const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJ4gkVC6NrvII8umztf0Ow&eventType=live&type=video&key=${API_KEY}`

/*	const fetchData = () =>{
		setLoading(true)
		fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=ab%workout&type=video&key=${API_KEY}`)
		.then(res=>res.json())
		.then(data=>{
			setLoading(false)
            dispatch({type:"add",payload:data.items})
		})
	}*/
	
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

	/*const fetchStream = () =>{
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
    }, [])*/

	return (
		<View style={{flex:1}}>
			<View style={styles.streamsWrapper}>
				<Text style = {styles.sectionTitle}>Livestreams</Text>
				
				<View style={{flexDirection: 'row', paddingTop:16, flex:1}}>
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
		</View>
		</View>

		
	)
	
}



const styles = StyleSheet.create({
	sectionTitle: {
	    fontSize: 24,
	    fontWeight: 'bold'
 	},
 	videosWrapper: {
		flex: 1,
	    paddingTop: 24,
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