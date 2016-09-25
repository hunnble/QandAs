import React, { Component, PropTypes } from 'react';
import '../scss/editor.scss';
import Header from './Header.jsx';
import Calendar from './Calendar.jsx';
import Question from './Question.jsx';
import ErrMsg from '../containers/ErrMsg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Editor extends Component {
  constructor (props) {
    super(props);
  }
  handleChangeTitle = (event) => {
    this.props.actions.changeQuestionTitle(event.target.value);
  }
  handleCreateQuestion = () => {
    this.props.actions.createQuestion({
      type: 1,
      content: '',
      items: []
    })
  }
  handleRemoveAllQuestions = () => {
    this.props.actions.removeQuestion(true);
  }
  handleSubmit = () => {
    const { user, title, questions, time, paper } = this.props;
    const { year, month, date } = time;
    const { account } = user;
    const data = {
      creator: account,
      title,
      questions,
      time: {
        year,
        month,
        date
      }
    };
    if (paper) {
      Object.assign(data, paper._id);
    }
    this.props.actions.submitPaper(data);
  }
  renderDefaultPaper = () => {
    const { paper, actions } = this.props;
    const {
      title,
      questions,
      time
    } = paper;
    const {
      changeQuestionTitle,
      createQuestion
    } = actions;
    if (title) {
      changeQuestionTitle(title);
    }
    if (questions) {
      questions.forEach((q, i) => {
        createQuestion(q);
      });
    }
    if (time) {
      changeCalendar(Object.assign({}, time, { visible: false }));
    }
  }
  componentDidMount () {
    if (this.props.paper) {
      this.renderDefaultPaper();
    }
  }
  render () {
    const { title, questions, calendar, time, actions } = this.props;
    const qs = questions.map((q, index) => {
      return (
        <Question
          key={'Question' + index}
          index={index}
          type={q.type}
          content={q.content}
          items={q.items}
          editQuestion={actions.editQuestion}
          removeQuestion={actions.removeQuestion}
        />
      );
    });
    return (
      <div>
        <Header />
        <div className='create'>
          <TextField
            style={{ display: 'block' }}
            hintText='试卷名称'
            value={title}
            onChange={this.handleChangeTitle}
          />
          <RaisedButton
            className='createBtn'
            label='添加新问题'
            onClick={this.handleCreateQuestion}
          />
          <RaisedButton
            className='createBtn'
            label='全部删除'
            onClick={this.handleRemoveAllQuestions}
          />
          <RaisedButton
            backgroundColor='#2196F3'
            labelColor='#ffffff'
            className='createBtn'
            label='完成'
            onClick={this.handleSubmit}
          />
          <Calendar
            calendar={calendar}
            time={time}
            setCalendar={actions.setCalendar}
            changeCalendar={actions.changeCalendar}
            changeCalendarVisible={actions.changeCalendarVisible}
            title='截止日期'
          />
          {qs}
        </div>
        <ErrMsg />
      </div>
    );
  }
}

Editor.PropTypes = {
  actions: PropTypes.object,
  user: PropTypes.object,
  title: PropTypes.string,
  questions: PropTypes.array,
  calendar: PropTypes.object,
  time: PropTypes.objectOf(PropTypes.number),
  paper: PropTypes.object
}

Editor.defaultProps = {
  paper: null
};

export default Editor;
