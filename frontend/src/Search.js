import React, { useEffect } from 'react';
import { useState, useNavigation } from 'react';
import { StyleSheet, Text, TextInput, Button, FlatList, View, Modal, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import VideoCard from './components/VideoCard';

const SearchResults = () => {
	const dispatch = useDispatch()
	const cardData = useSelector(state=>{
        return state.cardData
      })
	const [loading,setLoading] = useState(false)

	const API_KEY = `AIzaSyDD-5omLZO04LGwOytAAIeRGFxa5Xqa5CE`
	const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJ4gkVC6NrvII8umztf0Ow&eventType=live&type=video&key=${API_KEY}`
/*
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
*/
	/*const SEARCHRESULTDATA = [
		{
			title:	'title0',
			exercise: 'Swimming',
			nickname: 'nickname0'
		},
		{
			title: 'title1',
			exercise: 'Biking',
			nickname: 'nickname1'
		},
		{
			title: 'title2',
			exercise: 'Running',
			nickname: 'nickname2'
		},
	];
*/	
	const renderItem = ({ item }) => {
		return <View/>/*(
			<VideoCard 
				videoId={item.id.videoId}
				title={item.snippet.title}
				channel={item.snippet.channelTitle}
			/>
		);*/
	};

	return (
		
        <View
			style={{flex:1}}
		>
            <FlatList
                data={cardData}
                renderItem={renderItem}
				keyExtractor={item=>item.id.videoId}
		   		style={{paddingTop:16, flex:1}}
            />	
        </View>
	);
};
/*
const requestData = ({}) => {
	const dispatch = useDispatch();
	const cardData = useSelector(state=> {
        return state.cardData;
      });
	const [loading,setLoading] = useState(false);

	const API_KEY = `AIzaSyDD-5omLZO04LGwOytAAIeRGFxa5Xqa5CE`;
	const YOUTUBE_API = `http://127.0.0.1:8000/users/search/?query=${API_KEY}`;

	const fetchData = () => {
		setLoading(true)
		fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=ab%workout&type=video&key=${API_KEY}`)
		.then(res=>res.json())
		.then(data=> {
			setLoading(false)
            dispatch({type:"add", payload:data.items})
		});
	};

	useEffect(() => {
        
    }, []);
};
*/
const SearchStatus = ({ status }) => {
	return <Text>{status}</Text>;
};

const DropdownMenu = ({ renderItem }) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const SEARCHTYPES = [
		{
			type: 'user'
		},
		{
			type: 'title'
		},
		{
			type: 'exercise'
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
					onPress={() => setIsDropdownVisible(!isDropdownVisible)}
					style={styles.hideDDButton}
				/>
				</View>
			</View>
		</Modal>
		<Button
			onPress={() => setIsDropdownVisible(true)}
			style={styles.showDDButton}
		/>
		</>
	);
};

const SearchMenu = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchAmong, setSearchAmong] = useState('exercises');
	const [numOfResults, setNumOfResults] = useState(0);
	const [status, setStatus] = useState('No results');
	const [didSearch, setDidSearch] = useState(false);

	const dispatch = useDispatch();
	const cardData = useSelector(state=> {
        return state.cardData;
    });
	const [loading,setLoading] = useState(false);

	const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${searchTerm}`;
/*
	const adminLogin = () => {
		setLoading(true)
		fetch('http://127.0.0.1:8000/admin/')
		.then(res=>res.json())
		.then(data=> {
			setLoading(false)
            dispatch({type:"add", payload:data.items})
		})
		.catch((error) => {
			console.error(error);
		});
	};
*/
	const fetchData = () => {
		setLoading(true)
		fetch(USER_SEARCH)
		.then(res=>res.json())
		.then(data=> {
			setLoading(false)
            dispatch({type:"add", payload:data.items})
		})
		.catch((error) => {
			console.error(error);
		});
	};

	useEffect(() => {
		if (didSearch) {
			setStatus(numOfResults + ' results for "' + searchTerm + '" in ' + searchAmong);
			
			setDidSearch(false);
		}
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
		//adminLogin();
		fetchData();
		setDidSearch(true);
		setNumOfResults(3);
	};

	return (
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
					onPress={() => SearchFor()}
					style={styles.searchSubmitButton}
				/>
			</View>
			<SearchStatus
				status={status}
				style={styles.searchStatus}
			/>
		</View>
	);
};

const Search = () => {
	return(
		<>
			<SearchMenu
				style={{flex:0.2}}
			/>
			<SearchResults
				style={{flex: 0.8}}
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
        //flex: 0.,
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