import React, { useEffect } from 'react';
import { useState, useNavigation } from 'react';
import { StyleSheet, Text, TextInput, Button, FlatList, View, Pressable } from 'react-native';
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
		return <VideoCard 
				videoId={item.id.videoId}
				title={item.snippet.title}
				channel={item.snippet.channelTitle}
			   />;
		/*return (
            <>
				<View>
		<Text>Videos</Text>
		<FlatList
		   data={cardData}
		   renderItem={renderItem}
			   
			   }}
		   keyExtractor={item=>item.id.videoId}
		   style={{paddingTop:16}}
		/>
		</View>
		</>
		*/
		/*
                <Text>
					{item.title}
					{item.nickname}
					{item.exercise}
				</Text>
                <Button
                    title='Watch video/stream'
                    //onPress={() => navigation.goBack()} //navigate('counter')} // TODO: add params later
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

const SearchStatus = ({ status }) => {
	return <Text>{status}</Text>;
};

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [numOfResults, setNumOfResults] = useState(0);
	const [status, setStatus] = useState('No results');
	const [didSearch, setDidSearch] = useState(false);
	
	useEffect(() => {
		if (didSearch) {
			setStatus(numOfResults + ' results for "' + searchTerm + '"');
			
			setDidSearch(false);
		}
	});

	function SearchFor(searchTerm) {
		setDidSearch(true);
		setNumOfResults(3);
	};

	return(
		<>
		<View style={styles.searchBar}>
			<TextInput
				onChangeText={searchTerm => setSearchTerm(searchTerm)}
				placeholder='Search'
				style={styles.searchInput}
			>
			</TextInput>
			<Button
				onPress={() => SearchFor(searchTerm)}
				style={styles.searchSubmit}
			/>
		</View>
		<SearchStatus
			status={status}
			style={{flex: 0.1}}
		/>
		<SearchResults
			style={{flex: 0.7}}
		/>
		</>
		//<SearchResults/>
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