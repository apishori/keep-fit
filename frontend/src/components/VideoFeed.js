import React, {useState, useEffect} from 'react';

import {MaterialIcons} from '@expo/vector-icons'
import {useNavigation ,useTheme} from '@react-navigation/native';

import VideoCard from './VideoCard'
import {StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity} from "react-native";
import {useSelector,useDispatch} from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import VideoPlayer from '../VideoPlayer';
import axios from 'axios';
import {Button,BottomSheet,ListItem,ButtonGroup} from 'react-native-elements';

//<VideoFeed url="http://127.0.0.1:8000/posts/" />


const VideoFeed = (props) => {
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
	const [isVisible, setIsVisible] = useState(false);

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

	// useEffect(() => {
	// 	fetchData(props.url);
 //    }, [])

	return (
		<View>
		<FlatList
				   data={cardData}
				   renderItem={({item})=>{
						   // console.log("map2" + id_mapping.get(item.id))
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
	    // padding: 10
	},
	buttonOption:{
		marginRight:8,
		marginTop: 16,
		marginBottom: 8,
	}
});

export default VideoFeed