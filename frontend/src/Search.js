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
	const API_KEY = `AIzaSyDD-5omLZO04LGwOytAAIeRGFxa5Xqa5CE`;
	const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJ4gkVC6NrvII8umztf0Ow&eventType=live&type=video&key=${API_KEY}`
	const dispatch = useDispatch()
	const cardData = useSelector(state=>{
		return state.cardData
	})
	  
	const [loading,setLoading] = useState(false)

	const fetchData = () =>{
		setLoading(true)
		fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=ab%workout&type=video&key=${API_KEY}`)
		.then(res=>res.json())
		.then(data => {
			setLoading(false)
			dispatch({type:"add",payload:data.items})
		})
	}

	useEffect(() => {
		fetchData;
	}, [])

	const renderItem = ({ item }) => {
			console.log('display video result')
			return (
				<VideoCard 
					videoId={item.id.videoId}
					title={item.snippet.title}
					channel={item.snippet.channelTitle}
				/>
			);
	}

	return (
		
		<View
			style={{flex:1}}
		>
			<FlatList
				data={cardData}
				renderItem={renderItem}
				keyExtractor={item=>item.id.videoId}
				   style={{paddingTop:0, flex:1}}
			/>	
		</View>
	);
};

const UserResult = () => {
	const resultdata = useSelector(state => {
		//console.log(state)
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
							// source={{uri: item.profile.profile_pic.image}}
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
	if (resultdata != null) {
		return (
				<FlatList
					data={resultdata.userResult}
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

const Results = () => {
	const searchAmong = useSelector(state => {
		return state.searchType;
	})
	if (searchAmong == 'users') {
		return (
			<View
				style={styles.results}
			>
				<UserResult/>
			</View>
		);
	}
	else { //if (searchAmong === 'posts' || searchAmong === 'streams') {
		//return <PostResult/>;
		return <View/>;
	}
}

const SearchMenu = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [oldTerm, setOldTerm] = useState('');
	const [searchAmong, setSearchAmong] = useState('users');
	const [oldSearchAmong, setOldSearchAmong] = useState('users');
	const [searchCounter, setSearchCounter] = useState(0);
	// const [result, setResult] = useState([]);
	const [numOfResults, setNumOfResults] = useState(0);
	const [status, setStatus] = useState('No results');
	const [didSearch, setDidSearch] = useState(false);
	const [searchLog, setSearchLog] = useState([]);

	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.loginData.loginID;
	});
	const token = useSelector(state => {
		return state.loginToken.token;
	});

	const fetchData = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${searchTerm}`;
		const POST_SEARCH = `http://127.0.0.1:8000/posts/search/?query=${searchTerm}`;
		const STREAM_SEARCH = `http://127.0.0.1:8000/livestreams/search/?query=${searchTerm}`;

		if (searchAmong === 'users') {
			axios.get(USER_SEARCH, { headers: {"Authorization": `Token ${token}`}})
			.then(result => {
				dispatch({ type: 'clearResult' });
				// console.log(result);
				dispatch({ type: 'storeUserResult', payload: result.data });
				// console.log(result.data.length)
				// setResult(result.data);
				setNumOfResults(result.data.length);
				// console.log(numOfResults)
			})
			.catch((error) => {
				console.error(error);
			});
		}
		else if (searchAmong === 'posts') {
			axios.get(POST_SEARCH)
			.then(data => {
			dispatch({ type: 'clearResult' });
			//console.log(data.data);
			//dispatch({ type: 'storeResult', payload: data.data });
			setNumOfResults(data.data.length);
			})
			.catch((error) => {
				console.error(error);
			});
		}
		else if (searchAmong === 'streams') {
			axios.get(STREAM_SEARCH)
			.then(data => {
			dispatch({ type: 'clearResult' });
			//console.log(data.data);
			//dispatch({ type: 'storeResult', payload: data.data });
			setNumOfResults(data.data.length);
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
			console.log(searchLog)
		})
		.catch(error => {
			console.error(error);
		});
	};
	// initial load of search history
	useEffect(() => {
		getSearchLog();
	}, []);
	// update state
	useEffect(() => {
		// if (didSearch) {
		// 	getSearchLog();
		// }
		// return () => setDidSearch(false)
		if (searchCounter != 0) {
			// setStatus(result.length + ' result(s) for "' + searchTerm + '" in ' + searchAmong);
			getSearchLog();
		}
	}, [searchCounter]);

	useEffect(() => {
		console.log('setNewResultLengths')
		if (searchCounter != 0) {
			setStatus(numOfResults + ' result(s) for "' + searchTerm + '" in ' + searchAmong);		
		}
		console.log(numOfResults)
	}, [numOfResults]);

	const search = async () => {
		// await setSearchTerm(searchTerm)
		await fetchData();
		setSearchCounter(searchCounter + 1);
	};

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
				<DropDownPicker
					items={searchLog}
					containerStyle={{height: 40}}
					style={{backgroundColor: '#fafafa'}}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					// onChangeItem={item => setSearchTerm(item.value)}
					dropDownStyle={{backgroundColor: '#fafafa'}}
				/>
				<DropDownPicker
					items={[
						{label: 'users', value: 'users', selected: true},
						{label: 'posts', value: 'posts'},
						{label: 'streams', value: 'streams'}
					]}
					containerStyle={{height: 40}}
					style={{backgroundColor: '#fafafa'}}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					onChangeItem={item => setSearchAmong(item.value)}
					dropDownStyle={{backgroundColor: '#fafafa'}}
				/>
				<DropDownPicker
					items={[
						{label: 'Home Cardio', value: 'HC'},
						{label: 'Swimming', value: 'S'},
						{label: 'Other', value: 'O'}
					]}
					placeholder='Select exercise category'
					containerStyle={{height: 40}}
					style={{backgroundColor: '#fafafa'}}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					dropDownStyle={{backgroundColor: '#fafafa'}}
				/>
				<Button
					title='Search'
					onPress={() => search()}
					style={styles.searchSubmitButton}
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
		margin: '2%'
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