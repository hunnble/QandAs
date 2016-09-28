import React, { Component, PropTypes } from 'react';
import Editor from '../containers/Editor';
import AnswerBar from '../containers/AnswerBar';
import NotFound from './NotFound.jsx';

class Paper extends Component {
  render () {
    const { user, paper, actions } = this.props;
    const isCreator = (user.account === paper.creator);
    return (
      <div>
        {
          !paper &&
          <NotFound />
        }
        {
          paper &&
          isCreator &&
          <Editor paper={paper} />
        }
        {
          paper &&
          !isCreator &&
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
