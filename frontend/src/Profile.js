import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet, Image, FlatList, Text, View,ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import ChangePassword from './ChangePassword'
import UpdateProfile from './UpdateProfile'

import VideoCard from './components/VideoCard'
import VideoFeed from './components/VideoFeed'
import VideoPlayer from './VideoPlayer';
import {Button, BottomSheet,ListItem} from 'react-native-elements';


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

	const navigation = useNavigation()
	const dispatch = useDispatch()

	const isFocused = useIsFocused()

	// -------
	const cardData2 = useSelector(state=>{
        return state.cardData2
      })
	const API_KEY = `AIzaSyBwd-mFKhqlx0BbbH1YlH6dpaofQpuQ7E4`
	const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJ4gkVC6NrvII8umztf0Ow&eventType=live&type=video&key=${API_KEY}`
	const [id_mapping,setid_mapping] = useState(new Map())
	const [name_mapping,setname_mapping] = useState(new Map())
	const [author_mapping,setauthor_mapping] = useState(new Map())
	const [category_mapping,setcategory_mapping] = useState(new Map())
	const [likes_mapping,setlikes_mapping] = useState(new Map())
	const [loading,setLoading] = useState(false)

 	const category_dict = new Map()
 	category_dict.set("R","Running")
 	category_dict.set("Y","Yoga")
 	category_dict.set("HC","Home cardio")
 	category_dict.set("T","Tennis")
 	category_dict.set("S","Swimming")
 	category_dict.set("B","Basketball")
 	category_dict.set("C","Cycling")
 	category_dict.set("J","Jump rope")
 	category_dict.set("H","Hiking")
 	category_dict.set("O","Other")

 	const fetchData = (url) => {
		// const POST_LIST = `http://127.0.0.1:8000/posts/`; 
		const POST_LIST = url; 
		

		// look into this error: TypeError: Field 'id' expected a number but got <django.contrib.auth.models.AnonymousUser object at 0x7fdf71e9d0a0>.
		axios.get(POST_LIST
				,
				{headers: {
					"Authorization": `Token ${token}`
				}}
				)
		.then(res => {
			var videoId
			for(var ids of res.data){
				name_mapping.set(ids.video, ids.title)
				id_mapping.set( ids.video, ids.id)
				author_mapping.set( ids.video, ids.author.username)
				category_mapping.set( ids.video, ids.category)
				likes_mapping.set( ids.video, ids.likes)
				var result = res.data.map(function(val) {
					return val.video;
				}).join('%2C');
			}
			const YOUTUBE_API_CALL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${result}&type=video&key=${API_KEY}`
			console.log(YOUTUBE_API_CALL)
			
			setLoading(true)
			fetch(YOUTUBE_API_CALL)
			.then(res2=>res2.json())
			.then(data=>{
				setLoading(false)
				console.log("HERE")
	            dispatch({type:"add2",payload:data.items})
			})	
		})
		.catch(error => {
			console.error("error displaying: " + error); 
		});
	}
	useEffect(() => {
		fetchData(`http://127.0.0.1:8000/posts/bylikes/`);
    }, [])

    const [isHistVisible, setIsHistVisible] = useState(false);
	const listHist = [
	  { title: 'View History',
	    onPress: () => showHistory()
	  },
	  {
	    title: 'Clear History',
	    containerStyle: { backgroundColor: 'red' },
	    titleStyle: { color: 'white' },
	    onPress: () => clearHistory(),
	  }]

	const showHistory = () => {
		fetchData(`http://127.0.0.1:8000/posts/getwatched/`)
		setIsHistVisible(false)
	}

	const clearHistory = () => {
		axios.delete(`http://127.0.0.1:8000/posts/cleanwatched/`,
	        {headers: {
	          "Authorization": `Token ${token}`
	        }}
	        )
	    .then(res => {
	    	fetchData(`http://127.0.0.1:8000/posts/getwatched/`)
	    })
	    .catch(error => {
	      // console.log(error);
	    });
		setIsHistVisible(false)
	}
	// -------

	const login = useSelector(state => {
		return state.loginData.loginID;
	})
	const token = useSelector(state => {
		return state.loginToken.token
	})
	// console.log(token)

	

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
						setHeight(data.profile.height)
						setWeight(data.profile.weight)
						setBirthday(data.profile.birthday)
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
		const USER_DELETE = `http://127.0.0.1:8000/users/${username}/`
		axios.delete(USER_DELETE, {
			headers: {
				"Authorization": `Token ${token}`
			}
		})
		.then(result => {
            console.log('deleted')
			// clear login id and token
			logOut()
        })
		.catch((error) => {
			console.error(error);
		})
	}

	const logOut = () => {
		dispatch({ type: 'clearLogin' })
		dispatch({ type: 'clearToken' })
		dispatch({ type: 'clearResult' })
		navigation.navigate(
			'login',
			{ screen: 'login' }
		)
	}

	useEffect (() => {
		loadProfile();
	}, [isFocused])
	
	return(
		<ScrollView style={{flex:1}}>
			<BottomSheet
				  isVisible={isHistVisible}
				  containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
				>
				  {listHist.map((l, i) => (
				    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
				      <ListItem.Content>
				        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
				      </ListItem.Content>
				    </ListItem>
				  ))}
				</BottomSheet>
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
					type="clear"
					onPress={() => deleteProfile()}
				></Button>
				<Button
					title='Update Profile'
					type="clear"
					onPress={() => navigation.navigate('update')}
				></Button>
				<Button
					title='Change Password'
					type="clear"
					onPress={() => navigation.navigate('changepw')}
				></Button>
				<Button
					title='Sign Out'
					type="clear"
					onPress={() => logOut()}
				></Button>
			</View>
			<View style={styles.videosWrapper}>
				<View style={styles.buttonContainer}>
					<Button 
						// type="clear"
						title="Liked Posts"
						onPress={()=>fetchData(`http://127.0.0.1:8000/posts/bylikes/`)}
						style={styles.buttonOption}
					/>
					<Button 
						// type="clear"
						title="Uploads"
						onPress={()=>fetchData(`http://127.0.0.1:8000/posts/byauthor/`)}
						style={styles.buttonOption}
					/>
					<Button 
						// type="clear"
						title="History"
						onPress={()=>setIsHistVisible(true)}
						style={styles.buttonOption}
					/>
				</View>
				<FlatList
				   data={cardData2}
				   renderItem={({item})=>{
					   return <VideoCard 
						videoId={item.id}
						title= {name_mapping.get(item.id)} // {item.snippet.title}
						channel={author_mapping.get(item.id)}
						category = {category_dict.get(category_mapping.get(item.id))}
						postId = {id_mapping.get(item.id)}
						likes = {likes_mapping.get(item.id)}
					   />
					   }}
				   keyExtractor={(item, index) => index.toString()}
				   style={{paddingTop:16}}
				/>
				
			</View>
		</ScrollView>
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
				component={ChangePassword}
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
	videosWrapper: {
		flex: 1,
	    paddingHorizontal: 16,
	    alignItems:"flex-start"
	},
	items: {
	    marginTop: 16,
	},
	buttonContainer:{
		flex: 0,
	    flexDirection: 'row',
	    justifyContent: 'space-between',
	    marginTop: 16,
	    marginBottom: -8
	},
	buttonOption:{
		marginRight:8,
		marginTop: 16,
		marginBottom: 8,
	},
	sectionTitle: {
	    fontSize: 24,
	    fontWeight: 'bold',
	    paddingTop: 24,
 	},
})

export default Profile
