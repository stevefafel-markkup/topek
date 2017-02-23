import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { connectprops, PropMap } from "react-redux-propmap"
import Calendar from "react-native-calendar"
import moment from "moment"
import Styles, { Color, Dims } from "../styles"

const customDayHeadings = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const calendarStyle = {
    dayHeading: {
      color: "black",
      fontSize: 12
    },
    weekendHeading: {
      color: "black",
      fontSize: 12
    },
  }

class Props extends PropMap {
  map(props) {
    props.isAuthenticated = this.state.auth.isAuthenticated;
  }
}

@connectprops(Props)
export default class CalendarScreen extends Component {

  static navigationOptions = {
    title: "Calendar"
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format(),
    }
  }

  render() {
    return (
      <View style={Styles.screen}>
        <Calendar
          ref="calendar"
          customStyle={calendarStyle}
          eventDates={['2017-02-03', '2017-02-05', '2017-03-28', '2017-07-30']}
          events={[{date: '2016-07-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
          scrollEnabled
          showControls={false}
          dayHeadings={customDayHeadings}
          monthNames={customMonthNames}
          titleFormat={'MMMM YYYY'}
          prevButtonText={"Prev"}
          nextButtonText={"Next"}
          onDateSelect={(date) => this.setState({ selectedDate: date })}
          onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
          onTouchNext={(e) => console.log('onTouchNext: ', e)}
          onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
          onSwipeNext={(e) => console.log('onSwipeNext', e)}
        />
        <Text>Selected Date: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
