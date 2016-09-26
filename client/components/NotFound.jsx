import React, { Component } from 'react';

class NotFound extends Component {
  render () {
    return (
      <div>
        <p>页面无效或已失效</p>
        <Link to='/'>
          <RaisedButton label='回主页' />
        </Link>
      </div>
    );
  }
}

export default NotFound;
