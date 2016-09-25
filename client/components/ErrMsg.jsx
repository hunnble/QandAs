import React, { Component, PropTypes } from 'react';
import SnackBar from 'material-ui/SnackBar';

class ErrMsg extends Component {
  handleMsgClose = () => {
    this.props.actions.changeMsgVisible(false);
  }
  render () {
    return (
      <SnackBar
        open={this.props.msgVisible}
        message={this.props.errMsg}
        onRequestClose={this.handleMsgClose}
      />
    );
  }
}

ErrMsg.PropTypes = {
  actions: PropTypes.object,
  msgVisible: PropTypes.boolean,
  errMsg: PropTypes.string
};

export default ErrMsg;
