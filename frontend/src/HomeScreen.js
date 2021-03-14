import React, {useState, useEffect} from 'react';
import VideoCard from './components/VideoCard'
import Constant from 'expo-constants'
import Streams from './components/Streams'
import {StyleSheet, Text, View, SafeAreaView, FlatList, Image, ScrollView, Animated} from "react-native";
import {useSelector,useDispatch} from 'react-redux'
import Header from './components/Header'

const HomeScreen = () => {
	const scrollY = new Animated.Value(0)
	  const diffClamp = Animated.diffClamp(scrollY,0,45)
	  const translateY = diffClamp.interpolate({
	    inputRange:[0,45],
	    outputRange:[0,-45]
	  })
	const [value,setValue] = useState("")
	const dispatch = useDispatch()

	const cardData = useSelector(state=>{
        return state.cardData
      })

	const [loading,setLoading] = useState(false)

	const fetchData = () =>{
		setLoading(true)
		fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=ab%workout&type=video&key=[ADD API KEY HERE]`)
		.then(res=>res.json())
		.then(data=>{
			setLoading(false)
            dispatch({type:"add",payload:data.items})
		})
	}
	useEffect(() => {
        fetchData();
    }, [])

	return (
		<View style={{flex:1,marginTop:Constant.statusBarHeight}}>
			<Animated.View
		        style={{
		          transform:[
		            {translateY:translateY }
		          ],
		          elevation:4,
		          zIndex:100,
		        }}>
		        <Header />
		    </Animated.View>
			<View style={styles.streamsWrapper}>
				<Text style = {styles.sectionTitle}>Livestreams</Text>
				<View style={{flexDirection: 'row',}}>
					<Streams />
					<Streams />
					<Streams />
				</View>
			</View>

		<View style={styles.videosWrapper}>
			<Text style = {styles.sectionTitle}>Videos</Text>
			<FlatList
	           data={cardData}
	           renderItem={({item})=>{
	               return <VideoCard 
	                videoId={item.id.videoId}
	                title={item.snippet.title}
	                channel={item.snippet.channelTitle}
	               />
		           }}
		       keyExtractor={item=>item.id.videoId}
		       style={{paddingTop:16}}
		    />
		</View>
		</View>

		
	)
	
}



const styles = StyleSheet.create({
	sectionTitle: {
	    fontSize: 24,
	    fontWeight: 'bold'
 	},
 	videosWrapper: {
	    paddingTop: 32,
	    paddingHorizontal: 16,
	},
	streamsWrapper: {
	    paddingTop: 64,
	    paddingHorizontal: 16,
	},
	items: {
	    marginTop: 16,
	},
})

export default HomeScreen