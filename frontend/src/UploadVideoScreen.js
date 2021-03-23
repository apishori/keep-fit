import React,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions, Animated, TouchableOpacity} from 'react-native';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Input,Button } from 'react-native-elements';
import {useNavigation ,useTheme} from '@react-navigation/native';

const UploadVideoScreen = () => {
	const navigation = useNavigation();
  	return(
  	<View style={{flex:1}}>
		<View style={styles.videosWrapper}>
			<Text style = {styles.sectionTitle}>Upload Exercise</Text>
			<View style = {styles.form}>
			<Input
				label='Exercise Title'
				placeholder='Enter exercise title'
			/>
			<Input
				label='Category'
				placeholder='Enter category'
			/>
			<Button
			  title="Record Exercise"
			  type="clear"
			  onPress={()=>navigation.navigate('camera')}
			  >
			</Button>
			
			</View>
			<Button
			  title="Post Exercise"
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
	    paddingTop: 48,
	    paddingHorizontal: 16,
	},
	form:{
		paddingTop: 32,
		paddingBottom: 24,
		alignItems:"flex-start"
	}
})

export default UploadVideoScreen