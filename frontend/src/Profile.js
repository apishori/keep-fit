import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet, Image, FlatList, Text, View, Button } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
//import DeleteProfile from './DeleteProfile'

const Stack = createStackNavigator()

const ProfileView = () => {
	const [profileData, setProfileData] = useState()
	const [profilePicSrc, setProfilePic] = useState("")
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [username, setUsername] = useState("")
	const [numFollowers, setNumFollowers] = useState(0)
	const [numFollowing, setNumFollowing] = useState(0)
	const [height, setHeight] = useState(0)
	const [weight, setWeight] = useState(0)
	const [birthday, setBirthday] = useState("")

	const login = useSelector(state => {
		return state.loginData.loginID;
	})
	const token = useSelector(state => {
		return state.loginToken.token
	})

	const navigation = useNavigation()
	const dispatch = useDispatch()

	const isFocused = useIsFocused()

	const loadProfile = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/search/?query=${login}`

		axios.request({
			url: USER_SEARCH,
			method: "get",
			headers: { 
				"Authorization": `Token ${token}`,
			}})
			.then(result => {
				for (let i = 0; i < result.data.length; i++) {
					if (result.data[i].username == login) {
						const data = result.data[i]
						// console.log(data)
						setNumFollowers(data.followers)
						setNumFollowing(data.followings)
						setUsername(data.username)
						setHeight(data.height)
						setWeight(data.weight)
						setBirthday(data.birthday)
						setFirstName(data.first_name)
						setLastName(data.last_name)
						setProfilePic(data.profile.profile_pic.image)
						i = result.data.length
					}
				}
				
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const deleteProfile = () => {
		const USER_SEARCH = `http://127.0.0.1:8000/users/${username}`
		axios.delete(USER_SEARCH).then(data => {
            console.log('deleted');
        })
		.catch((error) => {
			console.error(error);
		});
		navigation.navigate('login')
	}

	const updateProfile = async () => {
		navigation.navigate('update')
	}

	const logOut = () => {
		dispatch({ type: 'setLogin', payload: '' })
		navigation.navigate(
			'login',
			{ screen: 'login' }
		)
	}

	useEffect (() => {
		loadProfile();
	}, [isFocused])
	
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
					title='Delete Profile'
					onPress={() => deleteProfile()}
				></Button>
				<Button
					title='Update Profile'
					onPress={() => updateProfile()}
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