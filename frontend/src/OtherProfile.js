import React, {useState, useEffect} from 'react';
import VideoCard from './components/VideoCard'
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet, Image, FlatList, Text, View, Button } from 'react-native';

const OtherProfile = () =>{
	const [value,setValue] = useState("")
	const [name,setName] = useState("")

	return(
		<View style={{flex:1}}>
			<View style={styles.profileSection}>
				<Image source={{uri: 'https://media-exp1.licdn.com/dms/image/C5603AQFaXMkVGB7_mg/profile-displayphoto-shrink_400_400/0/1589559563580?e=1622073600&v=beta&t=_ghYQzgpKxc4OLaU1hKmoi1WwKcQ233i-kvYG0SUC3I'}}
       			style={styles.circular} />
				<Text style = {styles.profileTitle}>Abhaya Krishnan-Jha</Text>
				<Text style = {styles.followersTitle}>50000 Followers | 2900Following</Text>
				<Button
                    buttonStyle={{borderColor:"#ef476f", borderWidth:2, backgroundColor:'white'}}
                    titleStyle={{color:"#ef476f"}}
                    type="outline"
                    title={buttonText}
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
		marginRight: 500,
		marginLeft: 500,
		borderRadius: 20
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