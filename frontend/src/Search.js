import React, { useEffect } from 'react';
import { useState, useNavigation } from 'react';
import { StyleSheet, Text, TextInput, Button, FlatList, View, Modal, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from './components/VideoCard';

const SearchResults = ({ searchAmong }) => { 
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

	const renderItemUser = ({ item }) => {
			console.log('display user result')
			return (
				<View>
					<Text>
						user stuff
					</Text>
				</View>
			);
	}

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

const SearchMenu = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [oldTerm, setOldTerm] = useState('');
	const [searchAmong, setSearchAmong] = useState('users');
	const [numOfResults, setNumOfResults] = useState(0);
	const [status, setStatus] = useState('No results');
	const [didSearch, setDidSearch] = useState(false);
	const [searchData, setSearchData] = useState();

	const fetchData = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${searchTerm}`;
		const POST_SEARCH = `http://127.0.0.1:8000/posts/search/?title=${searchTerm}`;
		const STREAM_SEARCH = `http://127.0.0.1:8000/streams/search/?title=${searchTerm}`;
/*
		const NEWPOST = {
			video: 'asdfvae',
			title: 'title',
			category: 'RUN'
		}
		axios.post(`http://127.0.0.1:8000/posts/create/`, NEWPOST)
		.then(data => {
			console.log(data);
		});
*/
		if (searchAmong === 'users') {
			axios.get(USER_SEARCH)
			.then(data => {
				//console.log(data);
				setSearchData(data.data);
				console.log(searchData)
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
				console.error(error);
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
				onPress={() => setSearchAmong(item.type)}
			>
				<Text>{item.type}</Text>
			</Pressable>
		);
	};

	function SearchFor() {
		fetchData();
		setDidSearch(true);
	};

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
		<SearchResults
			style={{flex: 0.8}}
			searchAmong={searchAmong}
		/>
		</>
	);
};

const Search = () => {
	return (
		<>
			<SearchMenu
				style={{flex:0.2}}
			/>
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