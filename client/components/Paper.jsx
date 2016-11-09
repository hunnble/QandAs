import React, { Component, PropTypes } from 'react';
import Editor from '../containers/Editor';
import AnswerBar from '../containers/AnswerBar';
import NotFound from './NotFound.jsx';

class Paper extends Component {
  render () {
    const { paper, actions } = this.props;
    // const isCreator = (user.account === paper.creator);
    const isCreator = false;
    // const answered = paper.answers.some((a) => a.answerer === user.account);
    return (
      <div>
        {
          !paper &&
          <NotFound />
        }
        {
          paper &&
          isCreator &&
          paper.state === 0 &&
          <Editor
            paper={paper}
            refresh={this.refresh}
          />
        }
        {
          paper &&
          isCreator &&
          paper.state === 1 &&
          <div>制作并已经发布了的试卷</div>
        }
        {
          paper &&
          <AnswerBar
            paper={paper}
            submitAnswer={actions.submitAnswer}
            changeErrMsg={actions.changeErrMsg}
          />
        }
      </div>
    );
  }
}

Paper.PropTypes = {
  paper: PropTypes.object,
  actions: PropTypes.object
};

export default Paper;
