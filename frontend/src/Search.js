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
		.then(data=>{
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
		// console.log(item)
		return (
			<>
				<Pressable
					onPress={() => ShowOtherProfile({otherUser: item.username})}
				>
					{/* <View> */}
						<Image
							source={{uri: item.profile.profile_pic.image}}
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
	const [numOfResults, setNumOfResults] = useState(0);
	const [status, setStatus] = useState('No results');
	const [didSearch, setDidSearch] = useState(false);

	const dispatch = useDispatch()

	const fetchData = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${searchTerm}`;
		const POST_SEARCH = `http://127.0.0.1:8000/posts/search/?query=${searchTerm}`;
		const STREAM_SEARCH = `http://127.0.0.1:8000/livestreams/search/?query=${searchTerm}`;

		if (searchAmong === 'users') {
			axios.get(USER_SEARCH)
			.then(data => {
			dispatch({ type: 'clearResult' });
			//console.log(data.data);
			dispatch({ type: 'storeUserResult', payload: data.data });
			setNumOfResults(data.data.length);
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

	useEffect(() => {
		if (didSearch) {
			setOldTerm(searchTerm)
			setOldSearchAmong(searchAmong)
			setDidSearch(false)
		}
		setStatus(numOfResults + ' result(s) for "' + oldTerm + '" in ' + oldSearchAmong)
	});

	function SearchFor() {
		fetchData();
		setDidSearch(true);
	};

	return (
		<View
			style={{zIndex: 10}}
		>
			<View style={styles.searchBar}>
				<TextInput
					onChangeText={searchTerm => setSearchTerm(searchTerm)}
					placeholder='Search'
					style={styles.searchInput}
				>
				</TextInput>
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
				<Button
					title='Search'
					onPress={() => SearchFor()}
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
		</View>
	);
};

const SearchWrapper = () => {
	return (
		<View
			style={{flex:1}}
		>
			<SearchMenu
				style={styles.searchMenu}
			/>
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
				component={SearchWrapper}
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
		flex: 0.2,
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