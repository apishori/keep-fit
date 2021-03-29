import React,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions, Animated, TouchableOpacity} from 'react-native';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Input,Button } from 'react-native-elements';
import {useNavigation ,useTheme} from '@react-navigation/native';
import RecordCameraScreen from './RecordCameraScreen';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const UploadVideoScreen = () => {
  	return (
		<Stack.Navigator>
			<Stack.Screen
				name='upload'
				options={{ title: 'Upload' }}
				component={Home}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='camera'
				options={{ title: 'Record Exercise' }}
				component={RecordCameraScreen}
				// options={{headerShown:false}}
			/>
		</Stack.Navigator>
	)
}

const Home = () => {
	const navigation = useNavigation();
	const [postCategory, setCategory] = useState('');
	const [postTitle, setTitle] = useState('');
	const post = () => {

	}
  	return(
  	<View style={{flex:1}}>
		<View style={styles.videosWrapper}>
			<Text style = {styles.sectionTitle}>Upload Exercise</Text>
			<View style = {styles.form}>
			<Input
				onChangeText={postTitle => setTitle(postTitle)}
				label='Exercise Info'
				placeholder='Enter exercise title'
				value={postTitle}
			/>
			<Input
				onChangeText={postCategory => setCategory(postCategory)}
				label='Category'
				placeholder='Enter category'
				value={postCategory}
			/>
			<Button 
				type="clear"
				title="Record Exercise"
				onPress={()=>navigation.navigate('camera',{title:postTitle,category:postCategory})}
			/>
			
			</View>
			<Button
			  title="Post Exercise"
			  onPress={()=>post}
			/>

		</View>
    </View>
  )}

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