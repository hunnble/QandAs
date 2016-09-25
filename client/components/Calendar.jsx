import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

class Calendar extends Component {
  componentDidMount () {
    this.props.setCalendar(year, month);
  }
  decreaseYear = () => {
    const { setCalendar, calendar } = this.props;
    if (calendar.year === year + 1 && calendar.month < month) {
      setCalendar(calendar.year - 1, month);
    } else if (calendar.year > year) {
      setCalendar(calendar.year - 1, calendar.month);
    }
  }
  increaseYear = () => {
    const { setCalendar, calendar } = this.props;
    setCalendar(calendar.year + 1, calendar.month);
  }
  decreaseMonth = () => {
    const { setCalendar, calendar } = this.props;
    if (calendar.year == year && calendar.month == month) {
      return;
    }
    let newYear = calendar.year;
    let newMonth = calendar.month - 1;
    if (newMonth === 0) {
      newMonth = 12;
      newYear -= 1;
    }
    setCalendar(newYear, newMonth);
  }
  increaseMonth = () => {
    const { setCalendar, calendar } = this.props;
    let year = calendar.year;
    let month = calendar.month + 1;
    if (month === 13) {
      month = 1;
      year += 1;
    }
    setCalendar(year, month);
  }
  onToggleVisible = () => {
    this.props.changeCalendarVisible(!this.props.time.visible);
  }
  handleClickDay = (event) => {
    const { changeCalendar, changeCalendarVisible, calendar } = this.props;
    let date = parseInt(event.target.innerHTML, 10);
    if (date >= 1 && date <= 31) {
      changeCalendar({
        year: calendar.year,
        month: calendar.month,
        date: date,
        visible: false
      });
      changeCalendarVisible(false);
    }
  }
  render () {
    const { calendar, time, title } = this.props;
    const monthTitles = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
    const weekdays = weekTitles.map((weekTitle, index) => {
      return (
        <span key={'week'+index} className='day'>{weekTitle}</span>
      );
    });
    const days = calendar.days.map((day, index) => {
      const { calendar } = this.props;
      if (calendar.year === year && calendar.month === month && day < date) {
        day = 0;
      }
      let dayClassName = 'day';
      if (day < 1 || day > 31) {
        dayClassName = 'day emptyDay';
      }
      return (
        <span key={index} className={dayClassName} onClick={this.handleClickDay}>
          {day}
        </span>
      );
    });
    // const timeVisibleStyle = {
    //   display: time.visible ? 'block' : 'none'
    // };
    const dateMap = new Map([
      [1, 'st'],
      [2, 'nd'],
      [3, 'rd']
    ]);
    const formatDate = time.date + '' + (dateMap.has(time.date % 10) ? dateMap.get(time.date % 10) : 'th');
    return (
      <div className='calendar'>
        <p className='calendarTitle'>{title}</p>
        <div className='calendarRow timeRow' onClick={this.onToggleVisible}>
          <span>{monthTitles[time.month - 1]}</span>
          <span>{time.year}</span>
          <span>{formatDate}</span>
        </div>
        <Dialog open={time.visible} onRequestClose={() => {
          this.props.changeCalendarVisible(false);
        }}>
          <div className='calendarDialog'>
            <div className='calendarRow controlRow'>
              <span onClick={this.decreaseYear}>-</span>
              <span>{calendar.year}</span>
              <span onClick={this.increaseYear}>+</span>
            </div>
            <div className='calendarRow controlRow'>
              <span onClick={this.decreaseMonth}>-</span>
              <span>{calendar.month}</span>
              <span onClick={this.increaseMonth}>+</span>
            </div>
            <div>{weekdays}</div>
            <div className='daysWrapper'>{days}</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

Calendar.PropTypes = {
  calendar: PropTypes.object,
  time: PropTypes.objectOf(PropTypes.number),
  title: PropTypes.string,
  setCalendar: PropTypes.func,
  changeCalendar: PropTypes.func,
  changeCalendarVisible: PropTypes.func
}

export default Calendar;
