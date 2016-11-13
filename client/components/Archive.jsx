import React, { Component, PropTypes } from 'react';
import '../scss/profile.scss';
import Header from './Header.jsx';
import Page from './Page.jsx';
import ErrMsg from '../containers/ErrMsg';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import { TOKEN_NAME } from '../../configs/config';
import moment from 'moment';

const paperStateMap = new Map([
  [0, '未发布'],
  [1, '已发布'],
  [2, '已截止']
]);

class Archive extends Component {
  constructor (props) {
    super(props);
  }
  handleChangePaper = (paper) => {
    this.props.actions.changePaper(paper);
  }
  handleRemovePaper = (paper) => {
    const { removePaper } = this.props.actions;
    const token = window.localStorage.getItem(TOKEN_NAME);
    removePaper(paper._id, token);
  }
  handlePublishPaper = (paper) => {
    const { changePaper, changePublishConfirm } = this.props.actions;
    changePaper(paper);
    changePublishConfirm(true);
  }
  renderPapers = (papers) => {
    if (!papers) {
      return null;
    }
    const { user, publishedPage, actions } = this.props;
    return (
      <Page
        page={publishedPage}
        perPage={10}
        divider={true}
        items={papers}
        pageItemsClassName='profileListItem'
        pageBarClassName='profilePageBar'
        renderItem={(paper, index) => {
          let paperState = paper.state;
          if (paperState === 1 && new Date(paper.closingDate) < new Date()) {
            paperState = 2;
          }
          return (
            <li
              key={index}
              className='profileListItem'
            >
              <div key={-1 * index} className='profileListNestedItem'>
                <span className={'profilePaperState' + paperState}>
                  {paperStateMap.get(paperState)}
                </span>
                <IconMenu
                  iconButtonElement={
                    <FlatButton
                      label=''
                      labelPosition='before'
                      icon={<HardwareKeyboardArrowDown />}
                    />
                  }
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  {
                    paper.state === 0 &&
                    <MenuItem
                      leftIcon={<ContentSend />}
                      primaryText='发布问卷'
                      onTouchTap={this.handlePublishPaper.bind(this, paper)}
                    />
                  }
                  {
                    paper.creator === user.account &&
                    paper.state === 0 &&
                    <Link to='/papers/create'>
                      <MenuItem
                        leftIcon={<ContentCreate />}
                        primaryText='编辑问卷'
                        onTouchTap={
                          this.handleChangePaper.bind(this, paper)
                        }
                      />
                    </Link>
                  }
                  {
                    paper.creator === user.account &&
                    paper.state === 1 &&
                    <Link to='/papers/paper'>
                      <MenuItem
                        leftIcon={<ImageRemoveRedEye />}
                        primaryText='查看统计'
                        onTouchTap={
                          this.handleChangePaper.bind(this, paper)
                        }
                      />
                    </Link>
                  }
                  <MenuItem
                    leftIcon={<ContentDeleteSweep />}
                    primaryText='删除问卷'
                    onTouchTap={
                      this.handleRemovePaper.bind(this, paper)
                    }
                  />
                </IconMenu>
              </div>
              <h3 className='profileListItemTitle'>
                {paper.title}
              </h3>
              <Subheader style={{
                display: 'inline-block',
                width: 'auto'
              }}>
                截止日期:{moment(new Date(paper.closingDate)).format('YYYY-M-D')}
              </Subheader>
              <Divider />
            </li>
          );
        }}
        changePage={actions.changePublishedPage}
      />
    );
  }
  render () {
    const {
      user,
      paper,
      publishConfirmOpen,
      actions
    } = this.props;
    return (
      <div>
        <Header user={user} />
        <div className='profile'>
          <Paper className='profileList'>
            <Subheader>
              问卷管理
              <Link to='/papers/create' style={{
                float: 'right',
                margin: 5
              }}>
                <RaisedButton
                  primary={true}
                  label='新建问卷'
                  onTouchTap={
                    this.handleChangePaper.bind(this, {})
                  }
                />
              </Link>
            </Subheader>
            <Divider />
            <ul>
              {this.renderPapers(user.publishedPapers)}
            </ul>
            <Dialog
              title='确认发布'
              actions={[
                <FlatButton
                  label='确认'
                  onTouchTap={() => {
                    const token = window.localStorage.getItem(TOKEN_NAME);
                    actions.publishPaper(paper._id, token);
                    actions.changePublishConfirm(false);
                  }}
                />,
                <FlatButton
                  label='取消'
                  onTouchTap={() => {
                    actions.changePublishConfirm(false);
                  }}
                />
              ]}
              modal={true}
              open={publishConfirmOpen}
              onRequestClose={() => {
                actions.changePublishConfirm(false);
              }}
            >
              问卷发布后不可修改或撤回,确认发布?
            </Dialog>
          </Paper>
        </div>
        <ErrMsg />
      </div>
    );
  }
}

Archive.PropTypes = {
  actions: PropTypes.object,
  user: PropTypes.object,
  paper: PropTypes.object,
  publishedPage: PropTypes.number,
  publishConfirmOpen: PropTypes.boolean
};

export default Archive;
