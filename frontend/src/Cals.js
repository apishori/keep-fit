import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Stack = createStackNavigator();
const exerciseData = [
	{
		id: 0,
		category: 'Run',
		MET: 9.8
	},
	{
		id: 1,
		category: 'Yoga',
		MET: 2.5
	},
	{
		id: 2,
		category: 'Home cardio',
		MET: 4.0
	},
	{
		id: 3,
		category: 'Tennis',
		MET: 8.0
	},
	{
		id: 4,
		category: 'Swimming',
		MET: 5.8
	},
	{
		id: 5,
		category: 'Basketball',
		MET: 6.5
	},
	{
		id: 6,
		category: 'Jump rope',
		MET: 8.0
	},
	{
		id: 7,
		category: 'Hiking',
		MET: 7.3
	},
	{
		id: 8,
		category: 'Other',
		MET: 4.0
	}
];

export const ExerciseList= () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [exerciseID, setExerciseID] = useState(8);
	//const exerciseID = useSelector(() => {})
	
	const ItemSeperator = () => (
			<View
				borderStyle='solid'
				style={styles.itemSeparator}
			/>
	);

	const Item = ({ item }) => (
		<Pressable
			style={styles.goTo}
			onPress={() => setExerciseID(item.id)}
		>
			<Text>
				{item.category}
			</Text>
		</Pressable>
	);

	const renderItem = ({ item }) => {
		return (
            <View
				//style={styles.entry}
			>
               <Item
			   	item={item}
			   />
            </View>
		);
	};

	return (
        <>
            <FlatList
                data={exerciseData}
                renderItem={renderItem}
				ItemSeparatorComponent={ItemSeperator}
				style={styles.exerciseList}
				keyExtractor={ (item, index) => index.toString() }
            />
			<Button
				title='Go to counter'
				style={{margin:24}}
				onPress={() => navigation.navigate('counter', {
					id: {exerciseID}
				})}
			/>
        </>	
	);
};

const Timer = ({ timeInHours, setTimeInHours }) => {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const [isTiming, setIsTiming] = useState(false);

	useEffect(() => {
		if (isTiming) {
			const updateTimer = setInterval(() => {
				if (seconds != 59) {
					setSeconds(seconds + 1);
				}
				else {
					setSeconds(0);
					if (minutes != 59) {
						setMinutes(minutes + 1);
					}
					else {
						setMinutes(0);
						if (hours != 24) {
							setHours(hours + 1);
						}
						else {
							// need to create a message about max time
						}
					}
				}
				setTimeInHours(timeInHours + 1/3600);
			}, 1000);
		
			return () => clearInterval(updateTimer);
		}
	});

	const resetTimer = () => {
		setIsTiming(false);
		setHours(0);
		setMinutes(0);
		setSeconds(0);
	}

	const timeFormat = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 });
	
	return (
		<View
			style={{flex:.5, margin:24}}
		>
			<Text
				style={styles.time}
			>
				{timeFormat.format(hours)}:{timeFormat.format(minutes)}:{timeFormat.format(seconds)}
			</Text>
			<Button
				title='Start'
				onPress={() => setIsTiming(true)}
				style={{marginTop:24}}
			/>
			<Button
				title='Pause'
				onPress={() => setIsTiming(false)}
				style={{marginTop:8}}
			/>
			<Button
				title='Stop'
				onPress={() => resetTimer()}
				style={{marginTop:8}}
			/>
		</View>
	);
};

const CalorieCounter = ({ route }) => {
	const navigation = useNavigation();
	const index = useState(route.params.id.exerciseID)
	const [MET, setMET] = useState(exerciseData[index[0]].MET);
	const [timeInHours, setTimeInHours] = useState(0); // dummy val
	const [weightLbs, setWeightLbs] = useState(0);
	const user = useSelector(state => {
		//console.log(state.loginData)
		return state.loginData.loginID;
	})

	const getProfileData = () => {
		axios.get(`http://127.0.0.1:8000/users/${user}`)
		.then(data => {
			console.log(data);
		})
		.catch((error) => {
			console.error(error);
		});
	};

	useEffect(() => {
		if (weightLbs == 0) {
			//getProfileData()
		}
	})

	const [caloriesBurned, setCaloriesBurned] = useState(MET * timeInHours);

	return (
		<View
			style={styles.counter}
		>
			<Timer
				timeInHours={timeInHours}
				setTimeInHours={setTimeInHours}
			/>
				<Text>
				Exercise: {exerciseData[index[0]].category}
				<Button
					title='Back to exercise list'
					onPress={() => navigation.navigate('exerciseList')}
					type="clear"
				/>
				</Text>
			<Text>
				Calories burnt so far: {caloriesBurned.toFixed(4)}
				<Button
					title='Reset calories'
					onPress={() => setTimeInHours(0)}
					type="clear"
				/>
			</Text>
		
		</View>
	);
};

function Cals() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='exerciseList'
				component={ExerciseList}
				options={{headerShown:false}}
			/>
			<Stack.Screen
				name='counter'
				component={CalorieCounter}
				options={{headerShown:false}}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
    exerciseList: {
        flex: 6,
		margin: 24,
    },
    itemSeparator: {
		height: 1,
        width: '95%'
    },
    entry: {
        /*flex: ,*/
		flexDirection: 'row'
    },
	counter: {
		flex: 1,
		marginTop: 64,
		padding:24,
	},
	timer: {
		flex: 1,
		flexDirection: 'column',
		padding: 24,
	},
	time: {
		flex: 0,
		fontSize: 24,
		textAlign: 'center',
		textAlignVertical: 'center'
	}
});

export default Cals;