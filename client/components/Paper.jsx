import React, { Component, PropTypes } from 'react';
import Editor from '../containers/Editor';
import AnswerBar from '../containers/AnswerBar';
import NotFound from './NotFound.jsx';

class Paper extends Component {
  render () {
    const { user, paper, actions } = this.props;
    const isCreator = (user.account === paper.creator);
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
          !isCreator &&
          // !answered &&
          <AnswerBar
            paper={paper}
            user={user}
            submitAnswer={actions.submitAnswer}
            changeErrMsg={actions.changeErrMsg}
          />
        }
      </div>
    );
  }
}

Paper.PropTypes = {
  user: PropTypes.object,
  paper: PropTypes.object,
  actions: PropTypes.object
};

export default Paper;
