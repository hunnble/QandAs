import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { TOKEN_NAME } from '../../configs/config';

class Search extends Component {
  handleChange = (event) => {
    const keywords = event.target.value;
    this.props.changeKeywords(keywords);
  }
  handleSubmit = () => {
    const { keywords, user, searchPaper } = this.props;
    searchPaper(keywords, window.localStorage.getItem(TOKEN_NAME));
  }
  render () {
    const { className, keywords } = this.props;
    return (
      <div className={className}>
        <TextField
          onChange={this.handleChange}
          value={keywords}
          name='keywords'
          hintText='在这里输入关键词'
          hintStyle={{ color: '#ffffff' }}
        />
        <RaisedButton onClick={this.handleSubmit} primary={true} label='查找试卷' />
      </div>
    );
  }
}

Search.PropTypes = {
  user: PropTypes.object,
  keywords: PropTypes.string,
  className: PropTypes.string,
  changeKeywords: PropTypes.func,
  searchPaper: PropTypes.func
};

export default Search;
