import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, FlatList, View, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from './components/VideoCard';
import OtherProfile from './OtherProfile';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import VideoPlayer from './VideoPlayer';
import StreamPlayer from './StreamPlayer';

const Stack = createStackNavigator();

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

const SearchStatus = ({ status }) => {
	return <Text>{status}</Text>;
};

const PostResult = () => {
	const [id_mapping,setid_mapping] = useState(new Map())
	const [name_mapping,setname_mapping] = useState(new Map())
	const [author_mapping,setauthor_mapping] = useState(new Map())
	const [category_mapping,setcategory_mapping] = useState(new Map())
	const [likes_mapping,setlikes_mapping] = useState(new Map())

	const dispatch = useDispatch();
	const resultData = useSelector(state => {
		return state.result.result;
	});
	const cardData = useSelector(state => {
		return state.cardData;
	})
	console.log(resultData)
	// for(var ids of resultData){
	// 	name_mapping.set(ids.video, ids.title)
	// 	id_mapping.set( ids.video, ids.id)
	// 	author_mapping.set( ids.video, ids.author.username)
	// 	category_mapping.set( ids.video, ids.category)
	// 	likes_mapping.set( ids.video, ids.likes)
	// 	var result = res.data.map(function(val) {
	// 		return val.video;
	// 	}).join('%2C');
	// }
	// const API_KEY = `AIzaSyDD-5omLZO04LGwOytAAIeRGFxa5Xqa5CE`;
	// const YOUTUBE_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${result}&type=video&key=${API_KEY}`
	  
	// const [loading,setLoading] = useState(false)

	// const fetchVideo = () =>{
	// 	setLoading(true)
	// 	fetch(YOUTUBE_API)
	// 	.then(res=>res.json())
	// 	.then(data => {
	// 		if (loading) {
	// 			dispatch({type:"add",payload:data.items})
	// 		}
	// 		setLoading(false)
	// 	})
	// }

	const renderItem = ({ item }) => {
		console.log(item)
			// fetchVideo();
			// console.log('display video result')
			// return (
			// 	<VideoCard 
			// 		videoId={item.id.videoId}
			// 		title={item.snippet.title}
			// 		channel={item.snippet.channelTitle}
			// 	/>
			// );
		return (
			<View>
				<Text>
					{item.title + ', category: ' + item.category}
				</Text>
				{/* <Text>
					{item.category}
				</Text> */}
			</View>			
		);
	}

	return (
		<View
			style={{flex:1}}
		>
			<FlatList
				data={resultData}
				renderItem={renderItem}
				keyExtractor={item=>item.id}
				   style={{paddingTop:0, flex:1}}
			/>	
		</View>
	);
};

const UserResult = () => {
	const resultData = useSelector(state => {
		console.log(state)
		return state.result;
	})

	const navigation = useNavigation()
	const dispatch = useDispatch()

	const ShowOtherProfile = ( otherUser ) => {
		// console.log(otherUser.otherUser)
		navigation.navigate('profile', {otherUser})
	}

	const renderItem = ({ item }) => {
		let profilePic = '../../backend/media/profile_default.jpg'
		if (item.profile) {
			profilePic = item.profile.profile_pic.image
		}

		return (
			<>
				<Pressable
					onPress={() => ShowOtherProfile({otherUser: item.username})}
				>
					{/* <View> */}
						<Image
							source={{uri: profilePic}}
							style={styles.circular}
						/>
						<Text
						>
							{item.username}
						</Text>
					{/* </View> */}
				</Pressable>
			</>
		);
	}

	if (resultData != null) {
		return (
				<FlatList
					data={resultData.result}
					renderItem={renderItem}
					keyExtractor={item=>item.username}
					style={{paddingTop:0, flex:1}}
				/>
		);
	}
	else {
		return null;
	}
};

const Results = ({ searchAmong }) => {
	// return (
	// 	<View
	// 		style={styles.results}
	// 	>
	// 		{/* <Stack.Navigator>
	// 			<Stack.Screen
	// 				name='users'
	// 				component={UserResult}
	// 				options={{headerShown:false}}
	// 			/>
	// 			<Stack.Screen
	// 				name='posts'
	// 				component={PostResult}
	// 				options={{headerShown:false}}
	// 			/>
	// 		</Stack.Navigator>	 */}
	// 	</View>
	// );
	// console.log()
	if (searchAmong == 'users') {
		console.log("render user result")
		return (
			<View
				style={styles.results}
			>
				<UserResult/>
			</View>
		);
	}
	else if (searchAmong == 'posts') {
		console.log("render post result")
		return (
			<View
				style={styles.results}
			>
				<PostResult/>
			</View>
		);
	}
	else if (searchAmong == 'streams') {
		return <View></View>;
	}
	else {
		return <View/>;
	}
}

const SearchMenu = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchAmong, setSearchAmong] = useState('users');
	const [oldSearchAmong, setOldSearchAmong] = useState('users');
	const [searchCategory, setSearchCategory] = useState('A');
	const [searchCounter, setSearchCounter] = useState(0);
	// const [result, setResult] = useState([]);
	const [numOfResults, setNumOfResults] = useState(0);
	const [status, setStatus] = useState('No results');
	const [searchLog, setSearchLog] = useState([]);

	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.loginData.loginID;
	});
	const token = useSelector(state => {
		return state.loginToken.token;
	});
	const resultData = useSelector(state => {
		console.log(state)
		return state.result;
	})

	const fetchData = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${searchTerm}`;
		const STREAM_SEARCH = `http://127.0.0.1:8000/livestreams/search/?query=${searchTerm}`;

		if (searchAmong === 'users') {
			axios.get(USER_SEARCH, { headers: {"Authorization": `Token ${token}`}})
			.then(result => {
				dispatch({ type: 'clearResult' });
				dispatch({ type: 'storeResult', payload: result.data });
				// dispatch({ type: 'setType', payload: searchAmong });
				setNumOfResults(result.data.length);
			})
			.catch((error) => {
				console.error(error);
			});
		}
		else if (searchAmong === 'posts') {
			let POST_SEARCH = `http://127.0.0.1:8000/posts/search/?query=${searchTerm}`;

			if (searchCategory != 'A') {
				POST_SEARCH += `&category=${searchCategory}`;
			}
			console.log(POST_SEARCH)
			axios.get(POST_SEARCH, { headers: {"Authorization": `Token ${token}`}})
			.then(result => {
			dispatch({ type: 'clearResult' });
			// console.log(data.data);
			dispatch({ type: 'storeResult', payload: result.data });
			console.log(result)
			console.log(resultData)
			setNumOfResults(result.data.length);
			})
			.catch((error) => {
				console.error(error);
			});
		}
		else if (searchAmong === 'streams') {
			axios.get(STREAM_SEARCH, { headers: {"Authorization": `Token ${token}`}})
			.then(result => {
			dispatch({ type: 'clearResult' });
			//console.log(data.data);
			dispatch({ type: 'storeResult', payload: result.data });
			setNumOfResults(result.data.length);
			})
			.catch((error) => {
				console.error(error);
			});
		}
	};

	const getSearchLog = () => {
		const GET_LOG = `http://127.0.0.1:8000/users/searchterms/?query=${user}`;
		axios.get(GET_LOG, {
			headers: {
				"Authorization": `Token ${token}`
			}
		})
		.then(result => {
			// console.log(result.data)
			const newLog = [];
			for (let i = 0; i < result.data.length; i++) {
				const element = result.data[i];
				// console.log(element)
				newLog.push({
					label: element.term,
					value: element.term,
				});
			}
			setSearchLog(newLog);
			// console.log(searchLog)
		})
		.catch(error => {
			console.error(error);
		});
	};

	const clearSearchLog = () => {
		const CLEAR_LOG = `http://127.0.0.1:8000/users/searchterms/`;
		axios.delete(CLEAR_LOG, {
			headers: {
				"Authorization": `Token ${token}`
			}
		})
		.then(result => {
			// console.log(result.data)
			getSearchLog();
			// console.log(searchLog)
		})
		.catch(error => {
			console.error(error);
		});
	};

	const search = async () => {
		// await setSearchTerm(searchTerm)
		await fetchData();
		setSearchCounter(searchCounter + 1);
	};

	// initial load of search history
	useEffect(() => {
		getSearchLog();
	}, []);
	// update search state
	useEffect(() => {
		if (searchCounter != 0) {
			setOldSearchAmong(searchAmong);
			getSearchLog();
			// navigation.navigate(searchAmong);
		}
	}, [searchCounter]);
	// update search result status
	useEffect(() => {
		if (searchCounter != 0) {
			setStatus(numOfResults + ' result(s) for "' + searchTerm + '" in ' + searchAmong);		
		}
	}, [numOfResults]);

	return (
		<View
			// style={{zIndex: 10}}
			style={styles.searchMenu}
		>
			<View style={styles.searchBar}>
				<TextInput
					onChangeText={searchTerm => setSearchTerm(searchTerm)}
					placeholder='Search'
					style={styles.searchInput}
				/>
				<Button
					title='Search'
					onPress={() => search()}
					style={styles.searchSubmitButton}
				/>
			</View>
			<View
				style={styles.searchOptions}
			>
				<DropDownPicker
					items={searchLog}
					containerStyle={{height: 40, width: '30%'}}
					style={{backgroundColor: '#fafafa', width: '100%'}}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					// onChangeItem={item => setSearchTerm(item.value)}
					dropDownStyle={{backgroundColor: '#fafafa'}}
					placeholder='View history'
				/>				
				<DropDownPicker
					items={[
						{label: 'users', value: 'users', selected: true},
						{label: 'posts', value: 'posts'},
						{label: 'streams', value: 'streams'}
					]}
					containerStyle={{height: 40, width: '30%'}}
					style={{backgroundColor: '#fafafa', width: '100%'}}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					onChangeItem={item => setSearchAmong(item.value)}
					dropDownStyle={{backgroundColor: '#fafafa'}}
				/>
				<DropDownPicker
					items={[
						{label: 'Run', value: 'R'},
						{label: 'Yoga', value: 'Y'},
						{label: 'Home Cardio', value: 'HC'},
						{label: 'Tennis', value: 'T'},
						{label: 'Swimming', value: 'S'},
						{label: 'Basketball', value: 'B'},
						{label: 'Jump Rope', value: 'JR'},
						{label: 'Hiking', value: 'H'},
						{label: 'Other', value: 'O'},
						{label: 'All', value: 'A'}
					]}
					onChangeItem={item => setSearchCategory(item.value)}
					placeholder='Select category'
					containerStyle={{height: 40, width: '30%'}}
					style={{backgroundColor: '#fafafa', width: '100%'}}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					dropDownStyle={{backgroundColor: '#fafafa'}}
				/>
			</View>
			<View
				style={styles.searchStatus}
			>
				<SearchStatus
					status={status}
				/>
			</View>
			<Results
				searchAmong={oldSearchAmong}
				style={styles.results}
			/>
		</View>
	);
};

const Search = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='search'
				component={SearchMenu}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='profile'
				component={OtherProfile}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='video'
				component={VideoPlayer}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='stream'
				component={StreamPlayer}
				options={{headerShown:false}}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	searchMenu: {
		flex: 1,
		paddingTop: '10%',
		margin: '2%'
	},
	searchOptions: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		zIndex: 10
	},
    searchBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		zIndex: 10
    },
    searchInput: {
        flex: 0.5,
    },
	searchType: {
		flex: 0.15,
	},
	results: {
		flex: 0.8,
		margin: '2%',
		flexDirection: 'column',
	},
	circular: {
		width: 100,
		height: 100,
		borderColor: '#ddd',
		borderWidth: 2,
		borderRadius: 60,
		alignItems:'center',
		justifyContent:'center',
		padding: 7,
	},
	hideDDButton: {
		marginTop: 5,
	},
	searchSubmitButton: {
		flex: 0.1,
		marginLeft: 5
    },
	searchStatus: {
		flex: 0.1,
		margin: '2%'
	}
});

export default Search;