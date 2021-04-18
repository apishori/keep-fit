import React, {useState, useEffect} from 'react';
import VideoCard from './components/VideoCard'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios';
import { StyleSheet, Image, FlatList, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const OtherProfile = ({ route }) => {
	const [profilePicSrc, setProfilePic] = useState("")
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [username, setUsername] = useState("")
	const [numFollowers, setNumFollowers] = useState(0)
	const [numFollowing, setNumFollowing] = useState(0)
	const [height, setHeight] = useState(0)
	const [weight, setWeight] = useState(0)
	const [birthday, setBirthday] = useState("")
	const otherUser = route.params.otherUser.otherUser

	const navigation = useNavigation()
	const dispatch = useDispatch()

	const loadProfile = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${otherUser}`

		axios.get(USER_SEARCH)
			.then(result => {
				for (let i = 0; i < result.data.length; i++) {
					if (result.data[i].username == otherUser) {
						const data = result.data[i]
						console.log(data)
						setUsername(data.username)
						setHeight(data.height)
						setWeight(data.weight)
						setBirthday(data.birthday)
						setFirstName(data.first_name)
						setLastName(data.last_name)
						setNumFollowers(1200)
						setNumFollowing(200)
						setProfilePic(data.profile.profile_pic.image)
						//setNumFollowers(data.)
						//setNumFollowing(data.)
						i = result.data.length
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect (() => {
		if (username == "") {
			loadProfile()
		}
	});

	return(
		<View style={{flex:1}}>
			<View style={styles.profileSection}>
				<Image source={{uri: profilePicSrc}}
       			style={styles.circular} />
				<Text style = {styles.profileTitle}>{first_name} {last_name}</Text>
				<Text style = {styles.followersTitle}>Nickname: {username}</Text>
				<Text style = {styles.followersTitle}>Height: {height} </Text>
				<Text style = {styles.followersTitle}>Weight: {weight} </Text>
				<Text style = {styles.followersTitle}>Birthday: {birthday} </Text>
				<Text style = {styles.followersTitle}>{numFollowers} Followers | {numFollowing} Following</Text>
				<Button
                    buttonStyle={{borderColor:"#ef476f", borderWidth:2, backgroundColor:'white'}}
                    titleStyle={{color:"#ef476f"}}
                    type='outline'
                    title='buttonText'
                    onPress={() => changeText(buttonText === 'Follow User' ? 'Unfollow User' : 'Follow User')}>
                    </Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
	sectionTitle: {
	    fontSize: 24,
	    fontWeight: 'bold'
	},
	videosWrapper: {
	flex: 1,
	    paddingTop: 24,
	    paddingHorizontal: 16,
	},
	streamsWrapper: {
	    paddingTop: 24,
	    paddingHorizontal: 16,
	},
	items: {
	    marginTop: 16,
	},
	sectionTitle: {
	fontSize: 24,
	fontWeight: 'bold'
	},
	items: {
	marginTop: 16,
	},
	profileSection:{
		alignItems:'center',
		justifyContent:'center',
		backgroundColor: '#fff',
		padding: 20,
		marginRight: '10%',
		marginLeft: '10%',
		borderRadius: 20,
		marginTop: '20%',
	},
	profileTitle: {
		textAlign:'center',
		alignItems:'center',
		justifyContent:'center',
		fontSize: 24,
		fontWeight: 'bold',
		padding: 7
	},
	followersTitle: {
		textAlign:'center',
		alignItems:'center',
		justifyContent:'center',
		fontSize: 18,
		paddingBottom: 5
	},
	searchInput: {
	//flex: 0.,
	},
	searchSubmit: {
	//flex: 1,
	},
})

export default OtherProfile