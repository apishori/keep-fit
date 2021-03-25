import React from 'react';
import {StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import {useNavigation ,useTheme} from '@react-navigation/native';

const Streams = (props) => {
	const navigation = useNavigation();
	
	return (
		<TouchableOpacity onPress={()=>navigation.navigate("streamplayer",{videoId:props.videoId,title:props.title})}>
			<View style={{
							flexDirection:'column',
							alignItems:'center',
							justifyContent:'center',
							padding:8
						}}>
				<View style={styles.circular}>
					<Image 
			           source={{uri:`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}}
			           style={{
			               width:"100%",
			               height:"100%",
			                borderRadius: 40
			           }} 
			        />
				</View>
				
				<Text style={{justifyContent:'center',alignItems:'center',fontSize:12}}>{props.channel}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor:'#fff',
		padding:15,
		borderRadius:10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20
	},
	circular: {
		width: 48,
		height: 48,
		borderColor: '#ddd',
		borderWidth: 2,
		borderRadius: 32
	}
});

export default Streams;

