import React from 'react';
import { StyleSheet, Text, View,Dimensions, Animated} from 'react-native';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Input,Button } from 'react-native-elements';
import axios from 'axios';

//mux token id: 7415d128-78b3-45d6-8b8d-44598e658c72


const UploadStreamScreen = () => {
	const API_KEY = `AIzaSyBwd-mFKhqlx0BbbH1YlH6dpaofQpuQ7E4`
	return(
    <View style={{flex:1}}>
		<View style={styles.videosWrapper}>
			<Text style = {styles.sectionTitle}>Stream</Text>
			<View style = {styles.form}>
			<Input
				label='Exercise Title'
				placeholder='Enter exercise title'
			/>
			<Input
				label='Category'
				placeholder='Enter category'
			/>
			</View>
			<Button
			  title="Start Stream"
			  // onPress={}
			/>
		</View>
    </View>
  )
}

const styles = StyleSheet.create({
	sectionTitle: {
	    fontSize: 24,
	    textAlign: "center",
	    fontWeight: 'bold',
	    
 	},
 	videosWrapper: {
	    paddingTop: 24,
	    paddingHorizontal: 16,
	},
	form:{
		paddingTop: 32,
		paddingBottom: 24,
		alignItems:"flex-start"
	}
})

export default UploadStreamScreen