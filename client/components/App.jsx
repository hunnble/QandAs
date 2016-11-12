import React, { Component } from 'react';
import '../scss/base.scss';

class App extends Component {
  render () {
    return (
      <div className='container'>{this.props.children}</div>
    );
  }
}

export default App;
