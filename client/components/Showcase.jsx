import React, { Component, PropTypes } from 'react';
import '../scss/answerBar.scss';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import LinearProgress from 'material-ui/LinearProgress';
import ContentReport from 'material-ui/svg-icons/content/report';
import Header from './Header.jsx';
import {
  blueGrey700,
  red500,
  deepPurple500,
  blue500,
  green500,
  deepOrange500,
  amber500,
  cyan500
} from 'material-ui/styles/colors';

const palette = [
  red500,
  deepPurple500,
  blue500,
  green500,
  deepOrange500,
  amber500,
  cyan500
];

const itemStyle = {
  marginLeft: '10%',
  width: '40%',
  textAlign: 'left'
};

const linearProgressStyle = {
  float: 'right',
  marginTop: 22,
  marginRight: '10%',
  width: '40%'
};

const renderRadio = (items, answers, index) => {
  let answersResult = new Array(items.length);
  let sum = 0;
  for (let i = 0; i < answersResult.length; ++i) {
    answersResult[i] = 0;
  }
  for (let i = 0; i < answers.length; ++i) {
    sum += 1;
    answersResult[answers[i][index]] += 1;
  }
  return items.map((item, i) => {
    let randomNumber = Math.floor(Math.random() * palette.length, 10);
    return (
      <div key={index + '_' + i}>
        <LinearProgress
          style={linearProgressStyle}
          color={palette[randomNumber]}
          mode='determinate'
          value={answersResult[i]}
          max={sum}
        />
        <Subheader style={itemStyle}>
          {item}
          ({answersResult[i]}/{sum})
        </Subheader>
      </div>
    );
  });
};

const renderCheckbox = (items, answers, index) => {
  let answersResult = new Array(items.length);
  let sum = 0;
  for (let i = 0; i < answersResult.length; ++i) {
    answersResult[i] = 0;
  }
  for (let i = 0; i < answers.length; ++i) {
    sum += 1;
    let answer = answers[i][index];
    for (let j = 0; j < answer.length; ++j) {
      if (answer[j]) {
        answersResult[j] += 1;
      }
    }
  }
  return items.map((item, i) => {
    let randomNumber = Math.floor(Math.random() * palette.length, 10);
    return (
      <div key={index + '_' + i}>
        <LinearProgress
          style={linearProgressStyle}
          color={palette[randomNumber]}
          mode='determinate'
          value={answersResult[i]}
          max={sum}
        />
        <Subheader style={itemStyle}>
          {item}
          ({answersResult[i]}/{sum})
        </Subheader>
      </div>
    );
  });
};

function renderQuestions (paper) {
  const { questions, answers } = paper;
  if (!answers || answers.length === 0) {
    return (
      <div style={{
        textAlign: 'center'
      }}>
        <ContentReport
          style={{
            margin: 14,
            width: 72,
            height: 72,
            color: blueGrey700
          }}
        />
        <h3 style={{
          padding: 14,
          color: blueGrey700
        }}>
          你的问卷暂时无人问津
        </h3>
      </div>
    );
  }
  return questions.map((question, index) => {
    switch (question.type) {
      case 1:
        return (
          <div className='question' key={'question' + index}>
            <h3>
              {question.content}
            </h3>
            {renderRadio(question.items, paper.answers, index)}
          </div>
        );
      case 2:
        return (
          <div className='question' key={'question' + index}>
            <h3>
              {question.content}
            </h3>
            {renderCheckbox(question.items, paper.answers, index)}
          </div>
        );
      case 3:
        return (
          <div className='question' key={'question' + index}>
            <h3>
              {question.content}
            </h3>
          </div>
        );
      default:
        return null;
    }
  });
}

class Showcase extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { user, paper } = this.props;
    return (
      <div className='answerWrapper'>
        <Header user={user} />
        <Paper className='answerInner'>
          <h3 style={{ color: blueGrey700 }}>{paper.title}</h3>
          {
            paper.answers &&
            paper.answers.length > 0 &&
            <Subheader>{paper.answers.length}人填写了本问卷</Subheader>
          }
          {renderQuestions(paper)}
        </Paper>
      </div>
    );
  }
}

Showcase.PropTypes = {
  user: PropTypes.object,
  paper: PropTypes.object
};

export default Showcase;
