import React, {useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet, Image, FlatList, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './Registration';
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
//import DeleteProfile from './DeleteProfile'

const Stack = createStackNavigator()

const ProfileView = () =>{
	const [value,setValue] = useState("")
	const [name,setName] = useState("")

	const navigation = useNavigation()
	const dispatch = useDispatch()
		
	const logOut = () => {
		dispatch({ type: 'setLogin', payload: '' })
		navigation.navigate('login')
	}

	return(
		<View style={{flex:1}}>
			<View style={styles.profileSection}>
				<Image source={{uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQFOExWHLp-fwA/profile-displayphoto-shrink_400_400/0/1610884484774?e=1622073600&v=beta&t=F3Cm5Pgcbt6HyQ-dJ7DGNyZ1OgklFU-5Crn1U1mf6BU'}}
       			style={styles.circular} />
				<Text style = {styles.profileTitle}>Ayushi Gupta</Text>
				<Text style = {styles.followersTitle}>6000 Followers | 2 Following</Text>
				<Button
					title='Delete Profile'
					onPress={() => navigation.navigate('delete')}
				></Button>
				<Button
					title='Update Profile'
					onPress={() => navigation.navigate('update')}
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
	const login = useSelector(state => {
		console.log(state)
		return state.loginData
	})
	console.log(login)
	/*if (login == '') {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name='login'
					component={Login}
					options={{headerShown:false}}
				/>
				<Stack.Screen
					name='profile'
					component={ProfileView}
					options={{headerShown:false}}
				/>
				<Stack.Screen
					name='register'
					component={Registration}
					options={{headerShown:false}}
				/>
				<Stack.Screen
					name='forgotpw'
					component={ForgotPassword}
					options={{headerShown:false}}
				/>
			</Stack.Navigator>
		)
	}*/
	//else {
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
				
			</Stack.Navigator>
		)
	//}
	/*
	<Stack.Screen
					name='delete'
					component={DeleteProfile}
					options={{headerShown:false}}
				/>*/
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