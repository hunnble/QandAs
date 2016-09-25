import React, { Component, PropTypes } from 'react';
import '../scss/homePage.scss';
import { Link } from 'react-router';
import Search from './Search.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

function renderPapers (papers) {
  return
}

class HomePage extends Component {
  handleCloseSearchResults = () => {
    this.props.changeSearchStep(this.props.stepIndex);
  }
  handleClickPaper = (index) => {
    this.props.changePaperIndex(index);
  }
  render () {
    const {
      keywords,
      user,
      stepIndex,
      papers,
      changeKeywords,
      searchPaper
    } = this.props;
    const paperItems = papers.map((paper, index) => {
      return (
        <TableRow key={'paper' + index}>
          <TableRowColumn>
            {paper.title}
          </TableRowColumn>
          <TableRowColumn>
            {paper.creator}
          </TableRowColumn>
          <TableRowColumn>
            <Link to='/papers/paper'>
              <RaisedButton onTouchTap={() => {
                this.handleClickPaper(index)
              }} label='去答卷' />
            </Link>
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div>
        <div className='fullPage-1'>
          <div className='homePageWrapper'>
            <h1 className='homePageTitle'>卷吧，在这里爱上学习</h1>
            <Link to='/papers/create'>
              <RaisedButton
                className='homePageBtn'
                label='我要出题'
              />
            </Link>
            <RaisedButton className='homePageBtn' label='我要写题' />
          </div>
        </div>
        <div className='fullPage-2 homePageSearch'>
          {
            stepIndex === 0 &&
            <Search
              user={user}
              className='homePageWrapper'
              keywords={keywords}
              changeKeywords={changeKeywords}
              searchPaper={searchPaper}
            />
          }
          {
            stepIndex === 1 &&
            <div className='fullPage-3'>
              <div className='homePagePapers'>
                <RaisedButton
                  className='homePageBackBtn fr'
                  label='返回'
                  onTouchTap={this.handleCloseSearchResults}
                />
                <Table selectable={false} fixedHeader={true} fixedFooter={true}>
                  <TableHeader displaySelectAll={false}>
                    <TableHeaderColumn>试卷名</TableHeaderColumn>
                    <TableHeaderColumn>出题人</TableHeaderColumn>
                    <TableHeaderColumn>操作</TableHeaderColumn>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {paperItems}
                  </TableBody>
                </Table>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

HomePage.PropTypes = {
  user: PropTypes.object,
  keywords: PropTypes.string,
  stepIndex: PropTypes.number,
  papers: PropTypes.arrayOf(PropTypes.object),
  changeKeywords: PropTypes.func,
  searchPaper: PropTypes.func,
  changeSearchStep: PropTypes.func,
  changePaperIndex: PropTypes.func
};

export default HomePage;
