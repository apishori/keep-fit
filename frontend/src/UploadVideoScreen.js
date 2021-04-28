import React,  { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { StyleSheet, Text, View,Dimensions, Animated, TouchableOpacity} from 'react-native';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Input,Button } from 'react-native-elements';
import {useNavigation ,useTheme} from '@react-navigation/native';
import RecordCameraScreen from './RecordCameraScreen';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import qs from 'query-string';
import * as ImagePicker from 'expo-image-picker'; // import image picker

const Stack = createStackNavigator();


const UploadVideoScreen = () => {

	

  	return (
		<Stack.Navigator>
			<Stack.Screen
				name='upload'
				options={{ title: 'Upload' }}
				component={Home}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='camera'
				options={{ title: 'Record Exercise' }}
				component={RecordCameraScreen}
				// options={{headerShown:false}}
			/>
		</Stack.Navigator>
	)
}

const Home = () => {
	const navigation = useNavigation();
	const [postCategory, setCategory] = useState('');
	const [postTitle, setTitle] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const token = useSelector(state => {
			return state.loginToken.token;
	})

	// create a state variable
	const [videoData, setVideoData] = useState()

	useEffect(() => {
	    (async () => {
	      if (Platform.OS !== 'web') {
	        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
	        if (status !== 'granted') {
	          alert('Sorry, we need camera roll permissions to make this work!');
	        }
	      }
	    })();
	}, []);

	const pickVideo = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
		  setVideoData(result.uri); // store video data
		}
	};

	const uploadVideo = async () => {
		await pickVideo()

		axios.request({
			url: "https://api.dailymotion.com/oauth/token",
			method: "post",
			headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: qs.stringify({
				"grant_type": "password",
				"client_id": "b24d0c3ae3c1c5c3e518",
				"client_secret":"333f0c5ad92d5ac01ee910d861cd6452fb00fc72",
				"username":"samantha.a.tripp@gmail.com",
				"password":"Juno1999!"
			})
		}).then(res2 => {
			// get upload url with access token
			console.log("access token:" + qs.stringify(res2.data.access_token));  
			const mytoken = res2.data.access_token;
			console.log(mytoken)
			axios.request({
				url: "https://api.dailymotion.com/file/upload",
				method: "get",
				headers: {
					"Authorization": `Bearer ${mytoken}`
				}
			})
			.then(res3 => {
				console.log("upload url:" + res3.data.upload_url)
				console.log("progress url:" + res3.data.progress_url)

				fetch('res3.data.upload_url', {
				    method: 'POST'
				})
				.then(res4 => {
					console.log("upload" + res4)
				})
				.catch(err4 => {
					console.log("error 4")
				})
			})
			.catch(err3 => {
				// console.log("error getting url: " + err3.data.data)
				console.log("error")
			})
			// return res2.data.access_token;
		})
		.catch(err => {
			// console.log("api error: " + err.data.data); 
			console.log("error")
		})                  
	}



	const post = () => {
		
    	
    	console.log("TOKEN: " + token)
			// send video id to server
        const POST_CREATE = `http://127.0.0.1:8000/posts/create/`; 
		axios.post(POST_CREATE, 
		{
			"video": "inpok4MKVLM",
			"title": postTitle,
			"category": postCategory
		},
		{headers: {
			"Authorization": `Token ${token}`
		}}
		)
		.then(res => {
			console.log(res.data)
			console.log("posted~!");
			setErrorMessage('');

			// api call
    		uploadVideo();
	
		})
		.catch(error => {
			setErrorMessage('Please add a title and category');
		})
		
		
	}
  	return(
  	<View style={{flex:1}}>
		<View style={styles.videosWrapper}>
			<Text style = {styles.sectionTitle}>Upload Exercise</Text>
			<View style = {styles.form}>
			<Input
				onChangeText={postTitle => setTitle(postTitle)}
				label='Exercise Title'
				placeholder='Enter exercise title'
				value={postTitle}
			/>
			<Input
				onChangeText={postCategory => setCategory(postCategory)}
				label='Category'
				placeholder='Enter category'
				value={postCategory}
			/>
		{/*	<Button 
				type="clear"
				title="Record Exercise"
				onPress={()=>navigation.navigate('camera',{title:postTitle,category:postCategory})}
			/>*/}
			
			</View>
			<Button
			  title="Post Exercise"
			  onPress={()=>post()}
			/>
			<Text style={{marginTop:16}}>{errorMessage && <Text className="error"> {errorMessage} </Text>}</Text>
		</View>
    </View>
  )}

const styles = StyleSheet.create({
	sectionTitle: {
	    fontSize: 24,
	    textAlign: "center",
	    fontWeight: 'bold',
	    
 	},
 	videosWrapper: {
	    paddingTop: 48,
	    paddingHorizontal: 16,
	},
	form:{
		paddingTop: 32,
		paddingBottom: 24,
		alignItems:"flex-start"
	}
})

export default UploadVideoScreen