import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

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
    const emptyDayChar = '×';
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
      if (day > 31 || day < 1 || calendar.year === year && calendar.month === month && day < date) {
        day = emptyDayChar;
      }
      let dayClassName = 'day';
      if (day === emptyDayChar) {
        dayClassName = 'day emptyDay';
      }
      return (
        <span key={index} className={dayClassName} onClick={this.handleClickDay}>
          {day}
        </span>
      );
    });
    const dateMap = new Map([
      [1, 'st'],
      [2, 'nd'],
      [3, 'rd']
    ]);
    const formatDate = time.date + '' + (dateMap.has(time.date % 10) ? dateMap.get(time.date % 10) : 'th');
    const iconButtonStyle = {
      padding: 0
    };
    return (
      <div className='calendar'>
        <p className='calendarTitle'>{title}</p>
        <p className='timeRow'>
          <span>{monthTitles[time.month - 1]}</span>
          <span>{time.year}</span>
          <span>{formatDate}</span>
        </p>
        <RaisedButton
          className='createBtn'
          label='更改'
          onClick={this.onToggleVisible}
        />
        <Dialog
          open={time.visible}
          title='选择试卷截止日期'
          onRequestClose={() => {
            this.props.changeCalendarVisible(false);
          }}
          actions={[
            <RaisedButton
              label='取消'
              onTouchTap={() => {
                this.props.changeCalendarVisible(false);
              }}
            />
          ]}
        >
          <div className='calendarDialog'>
            <div className='calendarRow controlRow'>
              <span>
                <IconButton onTouchTap={this.decreaseYear}>
                  <HardwareKeyboardArrowLeft />
                </IconButton>
              </span>
              <span>
                {calendar.year}年
              </span>
              <span>
                <IconButton onTouchTap={this.increaseYear}>
                  <HardwareKeyboardArrowRight />
                </IconButton>
              </span>
            </div>
            <div className='calendarRow controlRow'>
              <span>
                <IconButton onTouchTap={this.decreaseMonth}>
                  <HardwareKeyboardArrowLeft />
                </IconButton>
              </span>
              <span>
                {calendar.month}月
              </span>
              <span>
                <IconButton onTouchTap={this.increaseMonth}>
                  <HardwareKeyboardArrowRight />
                </IconButton>
              </span>
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
