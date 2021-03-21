import React, { useEffect } from 'react';
import { useState, useNavigation } from 'react';
import { StyleSheet, Text, TextInput, Button, FlatList, View, Pressable } from 'react-native';

const SearchResults = () => {
	//const navigation = useNavigation();
	const SEARCHRESULTDATA = [
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
	
	const renderItem = ({ item }) => {
		return (
            <>
                <Text>
					{item.title}
					{item.nickname}
					{item.exercise}
				</Text>
                <Button
                    title='Watch video/stream'
                    //onPress={() => navigation.goBack()} //navigate('counter')} // TODO: add params later
                />
            </>
		);
	};

	return (
        <>
            <FlatList
                data={SEARCHRESULTDATA}
                renderItem={renderItem}
            />	
        </>	
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
		<View style={{flex:1}}>
			<TextInput
				onChangeText={searchTerm => setSearchTerm(searchTerm)}
				placeholder='Search'
			>
			</TextInput>
			<Button
				onPress={() => SearchFor(searchTerm)}
			/>
			<SearchStatus
				status={status}
			/>
			<SearchResults/>
		</View>
	);
};

export default Search;