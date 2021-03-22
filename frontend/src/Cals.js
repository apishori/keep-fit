import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable } from 'react-native';

const Stack = createStackNavigator();

const ExerciseList= () => {
	const navigation = useNavigation();
	const EXERCISEDATA = [
		{
			name: 'Swimming'
		},
		{
			name: 'Biking'
		},
		{
			name: 'Running'
		},
	];
	
	const ItemSeperator = () => (
			<View
				borderStyle='solid'
				style={styles.itemSeparator}
			/>
	);

	const Item = ({ item }) => (
		<Pressable
			style={styles.goTo}
		>
			<Text
					//styles={styles.}
			>
				{item.name}
			</Text>
            <Button
                title='Go to counter'
                onPress={() => navigation.navigate('counter')} // TODO: add params later
            />
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
        //<View style={styles.ExerciseList}>
            <FlatList
                data={EXERCISEDATA}
                renderItem={renderItem}
				ItemSeparatorComponent={ItemSeperator}
				style={styles.exerciseList}
            />	
        //</View>	
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
		<View>
			<Text>
				{timeFormat.format(hours)}:{timeFormat.format(minutes)}:{timeFormat.format(seconds)}
			</Text>
			<Button
				title='Start'
				onPress={() => setIsTiming(true)}
			/>
			<Button
				title='Pause'
				onPress={() => setIsTiming(false)}
			/>
			<Button
				title='Stop'
				onPress={() => resetTimer()}
			/>
		</View>
	);
};

const CalorieCounter = () => {
	const navigation = useNavigation();

	const [timeInHours, setTimeInHours] = useState(0); // dummy val
	// TODO: get MET values & might have to use gender as well
	const caloriesBurned = /*weight * MET **/ timeInHours;
	
	return (
		<>
			<Timer
				timeInHours={timeInHours}
				setTimeInHours={setTimeInHours}
			/>
			<Text>
				Exercise: {}
				Calories burnt so far: {caloriesBurned.toFixed(4)}
				<Button
					title='Reset calories'
					onPress={() => setTimeInHours(0)}
				/>
			</Text>
			<Button
				title='Back to exercise list'
				onPress={() => navigation.goBack()}
			/>
		</>
	);
};

function Cals() {
	const [exerciseID, setExercise] = useState(-1);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='exerciseList' component={ExerciseList} options={{headerShown:false}}
			/>
			<Stack.Screen
				name='counter' component={CalorieCounter} options={{headerShown:false}}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
    exerciseList: {
        flex: 6,
		padding: 15
    },
    itemSeparator: {
		height: 1,
        width: '95%'
    },
    entry: {
        /*flex: ,*/
		flexDirection: 'row'
    },
});

export default Cals;