import React, { Component, PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { white } from 'material-ui/styles/colors';

class FetchingProgress extends Component {
  render() {
    const { fetching } = this.props;
    return (
      <div>
        {
          fetching &&
          <LinearProgress
            mode='indeterminate'
            color={white}
          />
        }
      </div>
    );
  }
}

FetchingProgress.defaultProps = {
  fetching: false
};

FetchingProgress.PropTypes = {
  fetching: PropTypes.boolean
};

export default FetchingProgress;
