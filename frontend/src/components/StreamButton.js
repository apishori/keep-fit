import React from 'react';
import {StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {useNavigation ,useTheme} from '@react-navigation/native';

const StreamButton = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={()=>navigation.navigate('stream')}>
			<View style={{
							flexDirection:'column',
							alignItems:'center',
							justifyContent:'center',
							padding:8
						}}>
				<View style={styles.circular}>
					<Ionicons name="md-add" size={32}/>
				</View>
				
				<Text style={{justifyContent:'center',alignItems:'center',fontSize:12}}>Start Stream</Text>
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
		borderRadius: 32,
		alignItems:'center',
		justifyContent:'center',
	}
});

export default StreamButton;

