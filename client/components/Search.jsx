import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { white, grey900 } from 'material-ui/styles/colors';
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
    const { className, keywords, children, fetching } = this.props;
    const whiteStyle = {
      color: white,
      borderColor: white
    };
    return (
      <div className={className}>
        <TextField
          onChange={this.handleChange}
          value={keywords}
          inputStyle={whiteStyle}
          hintStyle={whiteStyle}
          underlineFocusStyle={whiteStyle}
          name='keywords'
        />
        <RaisedButton
          onClick={this.handleSubmit}
          label='搜索问卷'
          icon={<ActionSearch />}
          disabled={fetching}
        />
        {children}
      </div>
    );
  }
}

Search.PropTypes = {
  user: PropTypes.object,
  keywords: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  changeKeywords: PropTypes.func,
  searchPaper: PropTypes.func,
  fetching: PropTypes.boolean
};

export default Search;
