import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../scss/editor.scss';
import { browserHistory, Link } from 'react-router';
import Header from './Header.jsx';
import Calendar from './Calendar.jsx';
import Question from './Question.jsx';
import ErrMsg from '../containers/ErrMsg';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionRestorePage from 'material-ui/svg-icons/action/restore-page';
import ContentUnarchive from 'material-ui/svg-icons/content/unarchive';
import ContentSend from 'material-ui/svg-icons/content/send';
import { white } from 'material-ui/styles/colors';
import { TOKEN_NAME } from '../../configs/config';

class Editor extends Component {
  constructor (props) {
    super(props);
  }
  handleChangeTitle = (event) => {
    this.props.actions.changeQuestionTitle(event.target.value);
  }
  handleChangeDetail = (event) => {
    this.props.actions.changeQuestionDetail(event.target.value);
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
    const {
      user,
      title,
      detail,
      questions,
      time,
      paper,
      saved,
      actions
    } = this.props;
    const { year, month, date } = time;
    const { changeErrMsg } = actions;
    const data = {
      token: window.localStorage.getItem(TOKEN_NAME),
      title,
      detail,
      questions,
      closingDate: new Date(year, month - 1, date)
    };
    if (!title.trim()) {
      return changeErrMsg('保存失败, 问卷名不能为空');
    } else if (title.length > 30) {
      return changeErrMsg('保存失败, 问卷名过长');
    } else if (questions.length === 0) {
      return changeErrMsg('保存失败, 请添加问题和选项');
    }
    for (let i = 0, len = questions.length; i < len; ++i) {
      let question = questions[i];
      if (!question.content.trim()) {
        return changeErrMsg('保存失败, 问题题干不能为空');
      }
      if (question.type === 1 || question.type === 2) {
        if (question.items.length === 0) {
          return changeErrMsg('保存失败, 客观题不能没有选项');
        }
        if (question.items.indexOf('') > -1) {
          return changeErrMsg('保存失败, 问题选项不能为空');
        }
      }
    }
    if (paper) {
      Object.assign(data, { _id: paper._id });
    } else if (!saved) {
      actions.changePaperSaved(true);
    }
    actions.submitPaper(data);
  }
  renderDefaultPaper = () => {
    const { paper, actions } = this.props;
    const {
      title,
      detail,
      questions,
      time
    } = paper;
    const {
      changeQuestionTitle,
      changeQuestionDetail,
      createQuestion,
      changeCalendar
    } = actions;
    this.handleRemoveAllQuestions();
    if (title) {
      changeQuestionTitle(title);
    } else {
      changeQuestionTitle('');
    }
    if (detail) {
      changeQuestionDetail(detail);
    } else {
      changeQuestionDetail('');
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
    const {
      user,
      title,
      detail,
      questions,
      calendar,
      time,
      actions,
      paper,
      saved,
      fetching
    } = this.props;
    const qs = questions.map((q, index) => {
      return (
        <Question
          key={'Question' + index}
          index={index}
          type={q.type}
          content={q.content}
          items={q.items}
          questionsLen={questions.length}
          editQuestion={actions.editQuestion}
          removeQuestion={actions.removeQuestion}
          changeQuestionIndex={actions.changeQuestionIndex}
        />
      );
    });
    return (
      <div className='createWrapper'>
        <Header user={user} />
        <Paper className='create'>
          <TextField
            style={{ display: 'block' }}
            floatingLabelText='问卷名称'
            value={title}
            fullWidth={true}
            onChange={this.handleChangeTitle}
          />
          <TextField
            style={{ display: 'block' }}
            floatingLabelText='问卷详细信息'
            value={detail}
            fullWidth={true}
            onChange={this.handleChangeDetail}
          />
          <RaisedButton
            className='createBtn'
            secondary={true}
            containerElement={
              <Link to='/' />
            }
            label='返回主页'
          />
          <RaisedButton
            className='createBtn'
            label='全部删除'
            secondary={true}
            icon={<ActionRestorePage />}
            onClick={this.handleRemoveAllQuestions}
          />
          <Calendar
            calendar={calendar}
            time={time}
            setCalendar={actions.setCalendar}
            changeCalendar={actions.changeCalendar}
            changeCalendarVisible={actions.changeCalendarVisible}
            title='截止日期'
          />
          <RaisedButton
            className='createBtn'
            label='添加新问题'
            secondary={true}
            icon={<ActionNoteAdd />}
            onClick={this.handleCreateQuestion}
          />
          <RaisedButton
            className='createBtn'
            label='保存'
            secondary={true}
            icon={<ContentUnarchive />}
            onTouchTap={this.handleSubmit}
            disabled={fetching}
          />
          <ReactCSSTransitionGroup
            transitionName='question'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {qs}
          </ReactCSSTransitionGroup>
        </Paper>
        <ErrMsg />
      </div>
    );
  }
}

Editor.PropTypes = {
  actions: PropTypes.object,
  user: PropTypes.object,
  paper: PropTypes.object,
  title: PropTypes.string,
  questions: PropTypes.array,
  calendar: PropTypes.object,
  time: PropTypes.objectOf(PropTypes.number),
  saved: PropTypes.boolean,
  fetching: PropTypes.boolean
}

Editor.defaultProps = {
  paper: null
};

export default Editor;
