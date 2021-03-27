import React, { useEffect } from 'react';
import { useState, useNavigation } from 'react';
import { StyleSheet, Text, TextInput, Button, FlatList, View, Modal, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from './components/VideoCard';
import OtherProfile from './OtherProfile';

const SearchStatus = ({ status }) => {
	return <Text>{status}</Text>;
};

const DropdownMenu = ({ renderItem }) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const SEARCHTYPES = [
		{
			type: 'users'
		},
		{
			type: 'posts'
		},
		{
			type: 'streams'
		}
	];

	return (
		<>
		<Modal
			animationType='slide'
			transparent={true}
			visible={isDropdownVisible}
			onRequestClose={() => setIsDropdownVisible(!isDropdownVisible)}
		>
			<View style={styles.modalView}>
				<View style={styles.dropdownView}>
				<FlatList
					data={SEARCHTYPES}
					renderItem={renderItem}
					style={styles.dropdownList}
				/>
				<Button
					title='Select'
					onPress={() => setIsDropdownVisible(!isDropdownVisible)}
					style={styles.hideDDButton}
				/>
				</View>
			</View>
		</Modal>
		<Button
			title="Show"
			onPress={() => setIsDropdownVisible(true)}
			style={styles.showDDButton}
		/>
		</>
	);
};

const Results = () => {
	const searchAmong = useSelector(state => {
		console.log(state)
		return state.searchType;
	})

	if (searchAmong === 'users') {
		return <UserResult/>;	
	}
	else if (searchAmong === 'posts' || searchAmong === 'streams') {
		return <PostResult/>;
	}
	else {
		return <View/>;
	}
}

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
	//useEffect(() => {
	
	/*const resultdata = [
		{
			username: 'jahn'
		}
	]*/

	//});
	const resultdata = useSelector(state => {
		console.log(state)
		setData(state.result)
		return state.result;
	})
	console.log(resultdata)
	
	const renderItem = ({ item }) => {
		//console.log('display user result')
			return (
				<View>
					<Text>
						{item.username}
					</Text>
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
				keyExtractor={item=>item.username}
				style={{paddingTop:0, flex:1}}
			/>		
		</View>
	);
};
	

const SearchMenu = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [oldTerm, setOldTerm] = useState('');
	const [searchAmong, setSearchAmong] = useState('users');
	const [numOfResults, setNumOfResults] = useState(0);
	const [status, setStatus] = useState('No results');
	const [didSearch, setDidSearch] = useState(false);
	//const [resultData, setData] = useState([]);

	const dispatch = useDispatch()

	const fetchData = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${searchTerm}`;
		const POST_SEARCH = `http://127.0.0.1:8000/posts/search/?query=${searchTerm}`;
		const STREAM_SEARCH = `http://127.0.0.1:8000/livestreams/search/?query=${searchTerm}`;

		if (searchAmong === 'users') {
			axios.get(USER_SEARCH)
			.then(data => {
				dispatch({ type: 'clearResult' })
				console.log(data.data);
				dispatch({ type: 'storeResult', payload: data.data })
				setNumOfResults(data.data.length);
			})
			.catch((error) => {
				//console.error(error);
			});
		}
		else if (searchAmong === 'posts') {
			axios.get(POST_SEARCH)
			.then(data => {
				console.log(data);
				setNumOfResults(data.data.length);
			})
			.catch((error) => {
				console.error(error);
			});
		}
		else if (searchAmong === 'streams') {
			axios.get(STREAM_SEARCH)
			.then(data => {
				console.log(data);
				setNumOfResults(data.data.length);
			})
			.catch((error) => {
				//console.error(error);
			});
		}
	};

	useEffect(() => {
		if (didSearch) {
			setOldTerm(searchTerm);
			setDidSearch(false);
		}
		setStatus(numOfResults + ' results for "' + oldTerm + '" in ' + searchAmong);
	});

	const renderItem = ({ item }) => {
		return (
			<Pressable
				//onPress={() => dispatch('')}
			>
				<Text>{item.type}</Text>
			</Pressable>
		);
	};

	function SearchFor() {
		fetchData();
		setDidSearch(true);
	};

/*<SearchResults
			style={{flex: 0.8}}
			searchAmong={searchAmong}
		/>*/
	return (
		<>
		<View
			style={styles.searchMenu}
		>
			<View style={styles.searchBar}>
				<TextInput
					onChangeText={searchTerm => setSearchTerm(searchTerm)}
					placeholder='Search'
					style={styles.searchInput}
				>
				</TextInput>
				<View
					style={{justifyContent: 'center'}}
				>
					<Text
						style={styles.searchType}
					>
						in: {searchAmong}
					</Text>
				</View>
				<DropdownMenu
					renderItem={renderItem}
				/>
				<Button
					title='Search'
					onPress={() => SearchFor()}
					style={styles.searchSubmitButton}
				/>
			</View>
			<SearchStatus
				status={status}
				style={styles.searchStatus}
			/>
		</View>
		
		</>
	);
};

const Search = () => {
	return (
		<>
			<SearchMenu
				style={{flex:0.2}}
			/>
			<Results/>
		</>
	);
};

const styles = StyleSheet.create({
	searchMenu: {
		flex: 1,
		margin: 15
	},
    searchBar: {
		flex: 0.2,
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 5,
    },
    searchInput: {
        flex: 0.3,
    },
	searchType: {
		// max width
		width: 85
	},
	modalView: {
		height: '20%',
		width: '75%',
		backgroundColor: 'gray',
		justifyContent: "center",
		alignItems: "center",
		margin: '2%',
		borderRadius: 4,
		borderColor: "rgba(0, 0, 0, 0.1)"
	},
	dropdownView: {
		flex: 1,
		margin: '2%',
	},
	dropdownList: {
		flex: 0.8,
	},
	showDDButton: {
		flex: 0.2,
		//maxHeight: '40%',
	},
	hideDDButton: {
		marginTop: 5,
		maxHeight: '40%',
	},
	searchSubmitButton: {
        maxHeight: '40%',
		marginLeft: 5
    },
	searchStatus: {
		margin: 3
	}
});

export default Search;