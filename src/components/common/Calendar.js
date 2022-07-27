import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import COLOR from '../../constants/colors';
import moment from 'moment';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setReturnDate, setStartDate} from '../../redux/actions/common';

const DateLister = props => {
  const {type, date} = props;
  const {dateWrapper} = styles;
  return (
    <View style={dateWrapper}>
      <View>
        <Text style={{textAlign: 'center', color: '#1B1D1F'}}>{type}</Text>
      </View>
      <View>
        <Text style={{textAlign: 'center', color: '#1B1D1F'}}>{date}</Text>
      </View>
    </View>
  );
};

export default function CustomCalendar({screenType}) {
  var date = new Date();
  date.setDate(date.getDate() + 1);
  const [dates, setdates] = useState({});
  const dispatch = useDispatch();

  const rentingDate = useSelector(st => st.common.start_date);
  const returningDate = useSelector(st => st.common.return_date);

  const selectDate = day => {
    let selectedDate = day.dateString;
    let newDates = dates;
    if (dates[selectedDate]) {
      delete newDates[selectedDate];
    } else {
      newDates[selectedDate] = {
        selected: true,
        marked: true,
        color: COLOR.compGreen,
        textColor: 'white',
      };
    }
    setdates({...newDates});
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

  const createDateRange = (
    startDate = rentingDate,
    endDate = returningDate,
  ) => {
    const dateRange = {
      [startDate]: {selected: true, startingDay: true, color: COLOR.compGreen},
      [endDate]: {selected: true, endingDay: true, color: COLOR.compGreen},
    };
    if (startDate && endDate) {
      let start = moment(startDate).startOf('day').add(1, 'days');
      const end = moment(endDate).startOf('day');
      while (end.isAfter(start)) {
        Object.assign(dateRange, {
          [start.format('YYYY-MM-DD')]: {
            selected: true,
            color: COLOR.compGreen,
          },
        });
        start = start.add(1, 'days');
      }
    }
    return dateRange;
  };

  const {listerWrapper} = styles;

  let rentDisplayStartDate;
  if (rentStartDate) {
    rentDisplayStartDate = new Date(rentStartDate);
    rentDisplayStartDate.setDate(rentDisplayStartDate.getDate() - 1);
    if (rentDisplayStartDate) {
      rentDisplayStartDate = rentDisplayStartDate.toISOString().split('T')[0];
    }
  }

  let dueDisplayDate;
  if (dueDate) {
    dueDisplayDate = new Date(dueDate);
    dueDisplayDate.setDate(dueDisplayDate.getDate() + 1);
    if (dueDisplayDate) {
      dueDisplayDate = dueDisplayDate.toISOString().split('T')[0];
    }
  }

  useEffect(() => {
    const setrentStartDate = () => {
      if (screenType === 'LOCATION') {
        dispatch(setStartDate(rentStartDate));
      } else {
        dispatch(setStartDate(rentDisplayStartDate));
      }
    };
    const setDueDate = () => {
      if (screenType === 'LOCATION') {
        dispatch(setReturnDate(dueDate));
      } else {
        dispatch(setReturnDate(dueDisplayDate));
      }
    };
    setrentStartDate();
    setDueDate();
  }, [dates]);

  return (
    <View>
      <Calendar
        minDate={date.toISOString().split('T')[0]}
        markingType={'period'}
        markedDates={createDateRange(rentStartDate, dueDate)}
        onDayPress={day => {
          selectDate(day);
        }}
        onDayLongPress={day => {
          selectDate(day);
        }}
      />
      {rentingDate && returningDate && (
        <View style={listerWrapper}>
          <DateLister
            type={screenType === 'LOCATION' ? '체크인' : '배송도착 예정일'}
            date={
              screenType === 'LOCATION' ? rentStartDate : rentDisplayStartDate
            }
          />
          <DateLister
            type={screenType === 'LOCATION' ? '체크아웃' : '반납수거 예정일'}
            date={screenType === 'LOCATION' ? dueDate : dueDisplayDate}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listerWrapper: {
    marginVertical: heightPercentageToDP('5%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateWrapper: {
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('40%'),
    padding: 10,
    borderRadius: 1,
    elevation: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
