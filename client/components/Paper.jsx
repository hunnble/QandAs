import React, { Component, PropTypes } from 'react';
import Editor from '../containers/Editor';
import AnswerBar from '../containers/AnswerBar';

class Paper extends Component {
  render () {
    const { user, paper, actions } = this.props;
    const isCreator = (user.account === paper.creator);
    return (
      <div>
      {
        isCreator &&
        <Editor paper={paper} />
      }
      {
        !isCreator &&
        <AnswerBar
          paper={paper}
          user={user}
          submitAnswer={actions.submitAnswer}
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
