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
	];*/
	
	const renderItem = ({ item }) => {
		return (
			<VideoCard 
				videoId={item.id.videoId}
				title={item.snippet.title}
				channel={item.snippet.channelTitle}
			/>
		);
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

const RequestData = () => {

};

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
			style={{flex:0.5}}
		>
			<FlatList
				data={SEARCHTYPES}
				renderItem={renderItem}
			/>
			<Button
				onPress={() => setIsDropdownVisible(!isDropdownVisible)}
			/>
		</Modal>
		<Button
			onPress={() => setIsDropdownVisible(true)}
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
		setDidSearch(true);
		setNumOfResults(3);
	};

	return (
		<>
		<View style={styles.searchBar}>
			<TextInput
				onChangeText={searchTerm => setSearchTerm(searchTerm)}
				placeholder='Search'
				style={styles.searchInput}
			>
			</TextInput>
			<Text>
				in: {searchAmong}
			</Text>
			<DropdownMenu
				renderItem={renderItem}
			/>
			<Button
				onPress={() => SearchFor()}
				style={styles.searchSubmit}
			/>
		</View>
		<SearchStatus
			status={status}
		/>
		</>
	);
};

const Search = () => {
	return(
		<>
			<SearchMenu/>
			<SearchResults
				style={{flex: 0.7}}
			/>
		</>
	);
};

const styles = StyleSheet.create({
    searchBar: {
        //flex: 0.05,
		flex: 0.2,
		flexDirection: 'row',
		padding: 15
    },
    searchInput: {
        //flex: 0.,
    },
    searchSubmit: {
        //flex: 1,
    },
});

export default Search;