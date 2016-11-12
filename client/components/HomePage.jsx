import React, { Component, PropTypes } from 'react';
import '../scss/homePage.scss';
import { Link, browserHistory } from 'react-router';
import Search from './Search.jsx';
import Page from './Page.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionInput from 'material-ui/svg-icons/action/input';
import ActionBookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import EditorBorderColor from 'material-ui/svg-icons/editor/border-color';
import {
  red500,
  deepPurple500,
  blue500,
  green500,
  deepOrange500,
  amber500,
  cyan500,
  blueGrey500
} from 'material-ui/styles/colors';
import moment from 'moment';

const palette = [
  red500,
  deepPurple500,
  blue500,
  green500,
  deepOrange500,
  amber500,
  cyan500
];

class HomePage extends Component {
  handleCloseSearchResults = () => {
    this.props.changeSearchStep(this.props.stepIndex);
  }
  handleClickPaper = (index) => {
    this.props.changePaper(this.props.papers[index]);
    browserHistory.push('/papers/paper');
  }
  render () {
    const {
      keywords,
      user,
      stepIndex,
      papers,
      searchedPaperPage,
      changeKeywords,
      searchPaper,
      changePage
    } = this.props;
    const paperItems = papers.map((paper, index) => {
      return (
        <Paper className='paper' key={'paper' + index}>
          <h3>{paper.title}</h3>
          <Subheader>发布者: {paper.creator}</Subheader>
          <Link to='/papers/paper'>
            <RaisedButton onTouchTap={() => {
              this.handleClickPaper(index)
            }} label='填写问卷' />
          </Link>
        </Paper>
      );
    });
    return (
      <div style={{
        position: 'relative',
        minHeight: '100%'
      }}>
        {
          stepIndex === 0 &&
          <div className='homePageWrapper'>
            <div className='bgIcon'></div>
            <Search
              user={user}
              keywords={keywords}
              changeKeywords={changeKeywords}
              searchPaper={searchPaper}
              children={
                <Link to='/papers/create'>
                  <RaisedButton
                    className='homePageBtn'
                    label='新建问卷'
                    icon={<EditorBorderColor />}
                  />
                </Link>
            }
            />
          </div>
        }
        {
          stepIndex === 1 &&
          <div>
            <FloatingActionButton
              className='homePageBackBtn'
              onTouchTap={this.handleCloseSearchResults}
            >
              <ContentUndo />
            </FloatingActionButton>
            <Page
              page={searchedPaperPage}
              perPage={Infinity}
              items={papers}
              pageItemsClassName='homePagePapers'
              pageBarClassName='homePagePageBar'
              pageClassName='homePagePageNum'
              renderItem={(item, index) => {
                let randomNumber = Math.floor(Math.random() * palette.length, 10);
                return (
                  <Paper className='paper' key={'paper' + index}>
                    <ActionBookmarkBorder
                      style={{
                        width: 60,
                        height: 60
                      }}
                      color={palette[randomNumber]}
                    />
                    <h3 style={{ color: blueGrey500 }}>
                      {item.title}
                    </h3>
                    <Subheader>
                      发布者: {item.creator}
                    </Subheader>
                    <Subheader>
                      截止日期:{moment(new Date(item.closingDate)).format('YYYY-M-D')}
                    </Subheader>
                    <FloatingActionButton mini={true} onTouchTap={() => {
                      this.handleClickPaper(index)
                    }} backgroundColor={palette[randomNumber]}>
                      <ActionInput />
                    </FloatingActionButton>
                  </Paper>
                );
              }}
              changePage={changePage}
            />
          </div>
        }
      </div>
    );
  }
}

HomePage.PropTypes = {
  user: PropTypes.object,
  keywords: PropTypes.string,
  stepIndex: PropTypes.number,
  papers: PropTypes.arrayOf(PropTypes.object),
  searchedPaperPage: PropTypes.number,
  changeKeywords: PropTypes.func,
  searchPaper: PropTypes.func,
  changeSearchStep: PropTypes.func,
  changePaper: PropTypes.func,
  changePage: PropTypes.func
};

export default HomePage;
