import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const ExerciseCalendar = () => {
    return (
        <View
            style={ styles.calendarView }
        >
            <Calendar
        
            />
        </View>
    );
};

const styles = StyleSheet.create({
    calendarView: {
        flex: 1,
        paddingTop: '10%'
    },
});

export default ExerciseCalendar;