import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Streams = () => {
	return (
		<View style={{
						flexDirection:'column',
						alignItems:'center',
						justifyContent:'center',
						padding:8
					}}>
			<TouchableOpacity onPress={() => {Alert.alert('click')}}>
			<View style={styles.circular}></View>
			</TouchableOpacity>
			<Text style={{justifyContent:'center',alignItems:'center',fontSize:12}}>Username</Text>
		</View>
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

