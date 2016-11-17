import React, { Component } from 'react';
import '../scss/base.scss';

class App extends Component {
  render () {
    return (
      <div className='container'>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
