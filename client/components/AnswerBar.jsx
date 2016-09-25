import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import ErrMsg from '../containers/ErrMsg';
import { Field } from 'redux-form';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import '../scss/answerBar.scss';

const boxStyle = {
  marginLeft: '12.5%',
  width: '75%',
  textAlign: 'left'
};

const textStyle = {
  width: '75%'
};

const renderRadio = ({ input, name, index, items }) => {
  return (
    <RadioButtonGroup {...input} name={name} style={boxStyle}>
      {items.map((item, i) => {
        return (
          <RadioButton
            key={index + '_' + i}
            label={item}
            value={'' + i}
          />
        );
      })}
    </RadioButtonGroup>
  );
};

const renderCheckBox = ({ input, name, item }) => {
  return (
    <Checkbox {...input}
      name={name}
      label={item}
      style={boxStyle}
    />
  );
};

const renderText = ({ input, name, type, hint, value }) => {
  return (
    <TextField {...input}
      hintText={hint}
      name={name}
      style={textStyle}
    />
  );
};

function renderQuestions (questions) {
  return questions.map((question, index) => {
    switch (question.type) {
      case 1:
        return (
          <Paper className='question' key={'question' + index}>
            <h3 className='content'>{question.content}</h3>
            <Field
              name={'q' + index}
              index={index}
              items={question.items}
              component={renderRadio}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className='question' key={'question' + index}>
            <h3 className='content'>{question.content}</h3>
            {question.items.map((item, i) => {
              return (
                <Field
                  key={'item' + index + i}
                  name={'q' + index + '_' + i}
                  item={item}
                  component={renderCheckBox}
                />
              );
            })}
          </Paper>
        );
      case 3:
        return (
          <Paper className='question' key={'question' + index}>
            <h3 className='content'>{question.content}</h3>
            <Field
              type='text'
              name={'q' + index}
              hint='请在这里输入回答'
              component={renderText}
            />
          </Paper>
        );
      default:
        return (<div></div>);
    }
  });
}

class AnswerBar extends Component {
  onSubmit = (data) => {
    const { paper, user, submitAnswer } = this.props;
    data._id = paper._id;
    data.answerer = user.account;
    submitAnswer(data);
  }
  render () {
    const { paper, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Header />
        <div className='answerWrapper'>
          <h3>{paper.title}</h3>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            {renderQuestions(paper.questions)}
            <div className="fr">
              <RaisedButton type="submit" label="提交" disabled={submitting} />
            </div>
          </form>
        </div>
        <ErrMsg />
      </div>
    );
  }
}

AnswerBar.PropTypes = {
  user: PropTypes.object,
  paper: PropTypes.object,
  submitAnswer: PropTypes.func
};

export default AnswerBar;
