import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import COLOR from '../../constants/colors';
import moment from 'moment';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const DateLister = (props) => {
    const { type, date } = props;
    const { dateWrapper } = styles;
    return <View>
        <View>
            <Text>{type}</Text>
        </View>
        <View>
            <Text>{date}</Text>
        </View>
    </View>;
};

export default function CustomCalendar() {

    var date = new Date();
    date.setDate(date.getDate() + 1);
    const [dates, setdates] = useState({});

    const selectDate = (day) => {

        let selectedDate = day.dateString;
        let newDates = dates;
        if (dates[selectedDate]) {
            delete newDates[selectedDate];
        } else {
            newDates[selectedDate] = {
                selected: true, marked: true, color: COLOR.compGreen,
                textColor: 'white',
            };
        }
        setdates({ ...newDates });

    };

    let firstDate = Object.keys(dates)[0];
    let lastDate = Object.keys(dates)[Object.keys(dates).length - 1];
    let rentStartDate;
    let dueDate;

    if (new Date(lastDate) > new Date(firstDate)) {
        dueDate = lastDate;
        rentStartDate = firstDate;
    } else {
        rentStartDate = lastDate;
        dueDate = firstDate;
    }

    const createDateRange = (startDate, endDate) => {
        const dateRange = {
            [startDate]: { selected: true, startingDay: true, color: COLOR.compGreen },
            [endDate]: { selected: true, endingDay: true, color: COLOR.compGreen },
        };
        if (startDate && endDate) {
            let start = moment(startDate).startOf('day').add(1, 'days');
            const end = moment(endDate).startOf('day');
            while (end.isAfter(start)) {
                Object.assign(dateRange, { [start.format('YYYY-MM-DD')]: { selected: true, color: COLOR.compGreen } });
                start = start.add(1, 'days');
            }
        }
        return dateRange;
    };

    useEffect(() => {

        const setrentStartDate = () => {
            console.log("RENT START DATE", rentStartDate);
        };

        const setDueDate = () => {
            console.log("RENT DUE DATE", dueDate);
        };

        setrentStartDate();
        setDueDate();

    }, [dates]);

    const { listerWrapper } = styles;

    let rentDisplayStartDate;
    if (rentStartDate) {
        console.log("RSD", new Date(rentStartDate));
        // let date = new Date(rentStartDate);
        // let next_date = new Date(date.setDate(date.getDate() - 1));
        // rentDisplayStartDate = next_date;

    }
    let dueDisplayDate;
    if (dueDate) {
        console.log("RSD", dueDate);

        // let date = new Date(dueDate);
        // let next_date = new Date(date.setDate(date.getDate() + 1));
        // dueDisplayDate = next_date;
    }


    return (
        <View>
            <Calendar
                minDate={date.toISOString().split('T')[0]}
                markingType={'period'}
                markedDates={createDateRange(rentStartDate, dueDate)}
                onDayPress={day => {
                    selectDate(day);
                }}
            />
            <View style={listerWrapper}>
                <DateLister type={"배송도착 예정일"} date={rentDisplayStartDate} />
                <DateLister type={"반납수거 예정일"} date={dueDisplayDate} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listerWrapper: {
        marginVertical: heightPercentageToDP("10%"),
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-around"
    },
    dateWrapper: {

    }
});

