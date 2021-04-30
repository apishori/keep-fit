import React, {useState, useEffect} from 'react';
import VideoCard from './components/VideoCard'
import VideoFeed from './components/VideoFeed'
import Streams from './components/Streams'
import {StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity} from "react-native";
import {useSelector,useDispatch} from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import StreamPlayer from './StreamPlayer';
import VideoPlayer from './VideoPlayer';
import UploadStreamScreen from './UploadStreamScreen';
import StreamButton from './components/StreamButton';
import RecordCameraScreen from './RecordCameraScreen';
import axios from 'axios';
import {Button,BottomSheet,ListItem,ButtonGroup} from 'react-native-elements';

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
	const [name_mapping,setname_mapping] = useState(new Map())
	const [author_mapping,setauthor_mapping] = useState(new Map())
	const [category_mapping,setcategory_mapping] = useState(new Map())
	const [likes_mapping,setlikes_mapping] = useState(new Map())

 	const category_dict = new Map()
 	category_dict.set("R","Running")
 	category_dict.set("Y","Yoga")
 	category_dict.set("HC","Home cardio")
 	category_dict.set("T","Tennis")
 	category_dict.set("S","Swimming")
 	category_dict.set("B","Basketball")
 	category_dict.set("C","Cycling")
 	category_dict.set("J","Jump rope")
 	category_dict.set("H","Hiking")
 	category_dict.set("O","Other")

	const token = useSelector(state => {
			return state.loginToken.token;
	})

	

	const [isVisible, setIsVisible] = useState(false);
	const list = [
	  { title: 'All categories',
	    onPress: () => fetchData(`http://127.0.0.1:8000/posts/reco/`)
	  },
	  { title: 'Running',
	    onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=R`) // change to category filter endpoint later
	  },
	  { title: 'Yoga',
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=Y`)
	  },
	  { title: 'Home Cardio',
		onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=HC`),
	  },
	  { title: 'Tennis', 
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=T`)
	  },
	  { title: 'Swimming', 
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=S`)
	  },
	  { title: 'Basketball', 
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=B`)
	  },
	  { title: 'Cycling',
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=C`)
	  },
	  { title: 'Jump rope', 
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=J`)
	  },
	  { title: 'Hiking', 
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=H`)
	  },
	  { title: 'Other', 
	  	onPress: () => fetchData(`http://127.0.0.1:8000/posts/?category=O`)
	  },
	  {
	    title: 'Cancel',
	    containerStyle: { backgroundColor: 'red' },
	    titleStyle: { color: 'white' },
	    onPress: () => setIsVisible(false),
	  },
	];

	const [isHistVisible, setIsHistVisible] = useState(false);
	const listHist = [
	  { title: 'View History',
	    onPress: () => showHistory()
	  },
	  {
	    title: 'Clear History',
	    containerStyle: { backgroundColor: 'red' },
	    titleStyle: { color: 'white' },
	    onPress: () => clearHistory(),
	  }]

	const showHistory = () => {
		fetchData(`http://127.0.0.1:8000/posts/getwatched/`)
		setIsHistVisible(false)
	}

	const clearHistory = () => {
		axios.delete(`http://127.0.0.1:8000/posts/cleanwatched/`,
	        {headers: {
	          "Authorization": `Token ${token}`
	        }}
	        )
	    .then(res => {
	    })
	    .catch(error => {
	      // console.log(error);
	    });
		setIsHistVisible(false)
	}

	const fetchData = (url) => {
		setIsVisible(false)
		// const POST_LIST = `http://127.0.0.1:8000/posts/`; 
		const POST_LIST = url; 
		

		// look into this error: TypeError: Field 'id' expected a number but got <django.contrib.auth.models.AnonymousUser object at 0x7fdf71e9d0a0>.
		axios.get(POST_LIST
				,
				{headers: {
					"Authorization": `Token ${token}`
				}}
				)
		.then(res => {
			var videoId
			for(var ids of res.data){
				name_mapping.set(ids.video, ids.title)
				id_mapping.set( ids.video, ids.id)
				author_mapping.set( ids.video, ids.author.username)
				category_mapping.set( ids.video, ids.category)
				likes_mapping.set( ids.video, ids.likes)
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
			console.error("error displaying: " + error); 
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
		fetchData(`http://127.0.0.1:8000/posts/reco`);
    }, [])

    const selectCategory = () => {
    	setIsVisible(true);
    }

    const selectHist = () => {
    	setIsHistVisible(true);
    }

	const Home = () => {
		return (
			
			<View style={{flex:1}}>
				<BottomSheet
				  isVisible={isVisible}
				  containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
				>
				  {list.map((l, i) => (
				    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
				      <ListItem.Content>
				        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
				      </ListItem.Content>
				    </ListItem>
				  ))}
				</BottomSheet>
				<BottomSheet
				  isVisible={isHistVisible}
				  containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
				>
				  {listHist.map((l, i) => (
				    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
				      <ListItem.Content>
				        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
				      </ListItem.Content>
				    </ListItem>
				  ))}
				</BottomSheet>
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
				<View style={styles.buttonContainer}>
					<Button 
						// type="clear"
						title="Show All"
						onPress={()=>fetchData(`http://127.0.0.1:8000/posts/reco`)}
						style={styles.buttonOption}
					/>
					<Button 
						// type="clear"
						title="By Category"
						onPress={()=>setIsVisible(true)}
						style={styles.buttonOption}
					/>
					
					<Button 
						// type="clear"
						title="View History"
						onPress={()=>setIsHistVisible(true)}
						style={styles.buttonOption}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button 
						// type="clear"
						title="My Liked Posts"
						onPress={()=>fetchData(`http://127.0.0.1:8000/posts/bylikes/`)}
						style={styles.buttonOption}
					/>
					<Button 
						// type="clear"
						title="My Uploads"
						onPress={()=>fetchData(`http://127.0.0.1:8000/posts/byauthor/`)}
						style={styles.buttonOption}
					/>
				</View>
				<FlatList
				   data={cardData}
				   renderItem={({item})=>{
					   return <VideoCard 
						videoId={item.id}
						title= {name_mapping.get(item.id)} // {item.snippet.title}
						channel={author_mapping.get(item.id)}
						category = {category_dict.get(category_mapping.get(item.id))}
						postId = {id_mapping.get(item.id)}
						likes = {likes_mapping.get(item.id)}
					   />
					   }}
				   keyExtractor={(item, index) => index.toString()}
				   style={{paddingTop:16}}
				/>
				
			</View>
			</View>
		)
	}
	
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='home'
				component={Home}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='streamplayer'
				component={StreamPlayer}
				options={{ title: 'Watch Stream' }}
			/>
			<Stack.Screen
				name='videoplayer'
				options={{ title: 'Watch Exercise' }}
				component={VideoPlayer}
			/>
			<Stack.Screen
				name='stream'
				options={{ title: 'Start Stream' }}
				component={UploadStreamScreen}
			/>
			<Stack.Screen
				name='camera'
				options={{ title: 'Record Exercise' }}
				component={RecordCameraScreen}
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
	    alignItems:"flex-start"
	},
	streamsWrapper: {
	    paddingTop: 24,
	    paddingHorizontal: 16,
	},
	items: {
	    marginTop: 16,
	},
	buttonContainer:{
		flex: 0,
	    flexDirection: 'row',
	    justifyContent: 'space-between',
	    marginTop: -8,
	    marginBottom: -8
	},
	buttonOption:{
		marginRight:8,
		marginTop: 16,
		marginBottom: 8,
	}
})

export default HomeScreen