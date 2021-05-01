import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Button } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const Stack = createStackNavigator();
const exerciseData = [
	{
		id: 0,
		label: 'Run',
		category: 'R',
		MET: 9.8
	},
	{
		id: 1,
		label: 'Yoga',
		category: 'Y',
		MET: 2.5
	},
	{
		id: 2,
		label: 'Home cardio',
		category: 'HC',
		MET: 4.0
	},
	{
		id: 3,
		label: 'Tennis',
		category: 'T',
		MET: 8.0
	},
	{
		id: 4,
		label: 'Swimming',
		category: 'S',
		MET: 5.8
	},
	{
		id: 5,
		label: 'Basketball',
		category: 'B',
		MET: 6.5
	},
	{
		id: 6,
		label: 'Jump rope',
		category: 'JR',
		MET: 8.0
	},
	{
		id: 7,
		label: 'Hiking',
		category: 'H',
		MET: 7.3
	},
	{
		id: 8,
		label: 'Other',
		category: 'O',
		MET: 4.0
	}
];

const ExerciseList = () => {
	const navigation = useNavigation();
	// const dispatch = useDispatch();
	const [exerciseID, setExerciseID] = useState(8);
	const [workoutLog, setWorkoutLog] = useState();

	const isFocused = useIsFocused();
	
	const token = useSelector(state => {
		return state.loginToken.token;
	});

	const getWorkoutLog = () => {
		axios.get(`http://127.0.0.1:8000/workouts/getall/`, {
			headers: {
				"Authorization": `Token ${token}`
			}
		})
		.then(result => {
			// console.log(result.data);
			const newLog = [];
			for (let i = 0; i < result.data.length; i++) {
				const workout = result.data[i];
				// console.log(workout)
				const logText = workout.category + ', calories burnt: ' + workout.calories_burnt.toString();
				// console.log(logText)
				newLog.push({
					label: logText,
					value: 'log' + i,
				});
			}
			// console.log(newLog)
			setWorkoutLog(newLog);
			// console.log(workoutLog)
		})
		.catch((error) => {
			console.error(error);
		});
	};

	const clearWorkoutLog = () => {
		axios.delete(`http://127.0.0.1:8000/workouts/clean/`, {
			headers: {
				"Authorization": `Token ${token}`
			}
		})
		.then(result => {
			getWorkoutLog();
		})
		.catch((error) => {
			console.error(error);
		});
	};

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
				{item.label}
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

	// useEffect(() => {
	// 	getWorkoutLog();
	// }, []);

	useEffect (() => {
		getWorkoutLog();
	}, [isFocused])

	return (
        <>
			<View
				style={{paddingTop: '5%'}}
			>
				<DropDownPicker
					items={workoutLog}
					containerStyle={{height: 40}}
					style={{backgroundColor: '#fafafa'}}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					// onChangeItem={item => setSearchAmong(item.value)}
					dropDownStyle={{backgroundColor: '#fafafa'}}
				/>
				<Button
					title='Clear log'
					onPress={() => clearWorkoutLog()}		
				/>
			</View>			
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
		</View>
	);
};

const CalorieCounter = ({ route }) => {
	const navigation = useNavigation();
	const index = useState(route.params.id.exerciseID)
	const [MET, setMET] = useState(exerciseData[index[0]].MET);
	const [timeInHours, setTimeInHours] = useState(0); // dummy val
	const [weightLbs, setWeightLbs] = useState(0);
	const [caloriesBurned, setCaloriesBurned] = useState(0);

	const user = useSelector(state => {
		//console.log(state.loginData)
		return state.loginData.loginID;
	});
	const token = useSelector(state => {
		return state.loginToken.token;
	});

	const makeWorkoutLog = () => {
		const CREATE_LOG = `http://127.0.0.1:8000/workouts/create/`
		const newLog = {
			calories_burnt: caloriesBurned,
			category: exerciseData[index[0]].category
		}
		axios.post(CREATE_LOG, newLog, { 
			headers: {
				"Authorization": `Token ${token}`
			}
		})
		.then(result => {
			// console.log(result)
		})
		.catch(error => {
			console.error(error);
		});
	};

	useEffect(() => {
		setCaloriesBurned(MET * timeInHours);
	});

	return (
		<View
			style={styles.counter}
		>
			<Timer
				timeInHours={timeInHours}
				setTimeInHours={setTimeInHours}
			/>
			<Text>
				Exercise: {exerciseData[index[0]].label}
			</Text>
			<Text>
				Calories burnt so far: {caloriesBurned.toFixed(4)}
			</Text>
			<Button
				title='Log workout'
				onPress={() => makeWorkoutLog()}
				type="clear"
			/>
		</View>
	);
};

const Cals = () => {
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