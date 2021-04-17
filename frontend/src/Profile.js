import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet, Image, FlatList, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
//import DeleteProfile from './DeleteProfile'

const Stack = createStackNavigator()

const ProfileView = () => {
	const [profileData, setProfileData] = useState()
	const [profilePicSrc, setProfilePic] = useState("")
	const [name, setName] = useState("")
	const [username, setUsername] = useState("")
	const [numFollowers, setNumFollowers] = useState(0)
	const [numFollowing, setNumFollowing] = useState(0)
	const login = useSelector(state => {
		return state.loginData.loginID;
	})

	const navigation = useNavigation()
	const dispatch = useDispatch()

	const loadProfile = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${login}`

		axios.get(USER_SEARCH)
			.then(result => {
				for (let i = 0; i < result.data.length; i++) {
					if (result.data[i].username == login) {
						const data = result.data[i]
						console.log(data)
						setUsername(data.username)
						setName(data.full_name)
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

	const logOut = () => {
		dispatch({ type: 'setLogin', payload: '' })
		navigation.navigate('login')
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
				<Text style = {styles.profileTitle}>{name}</Text>
				<Text>{username}</Text>
				<Text style = {styles.followersTitle}>{numFollowers} Followers | {numFollowing} Following</Text>
				<Button
					title='Delete Profile'
					onPress={() => navigation.navigate('delete')}
				></Button>
				<Button
					title='Update Profile'
					onPress={() => navigation.navigate('update')}
				></Button>
				<Button
					title='Change Password'
					onPress={() => navigation.navigate('changepw')}
				></Button>
				<Button
					title='Sign Out'
					onPress={() => logOut()}
				></Button>
			</View>
		</View>
	)
}

const Profile = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='profile'
				component={ProfileView}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='update'
				component={UpdateProfile}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='changepw'
				component={ForgotPassword}
				options={{headerShown:false}}
			/>
		</Stack.Navigator>
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
		padding: 32,
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

export default Profile