import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { red500 } from 'material-ui/styles/colors';

class Question extends Component {
  handleRemoveQuestion = () => {
    this.props.removeQuestion(false, this.props.index);
  }
  handleUpperQuestion = (i) => {
    this.props.changeQuestionIndex(i, i + 1);
  }
  handleLowerQuestion = (i) => {
    this.props.changeQuestionIndex(i, i - 1);
  }
  handleAddOption = () => {
    let items = this.props.items.concat();
    items.push('');
    this.props.editQuestion({
      type: this.props.type,
      content: this.props.content,
      items: items
    }, this.props.index);
  }
  handleRemoveOption = (index) => {
    let items = this.props.items.concat();
    items.splice(index, 1);
    this.props.editQuestion({
      type: this.props.type,
      content: this.props.content,
      items: items
    }, this.props.index);
  }
  handleChangeType = (event, index, value) => {
    this.props.editQuestion({
      type: value,
      content: this.props.content,
      items: value === 3 ? [] : this.props.items
    }, this.props.index);
  }
  handleChangeContent = (event) => {
    this.props.editQuestion({
      type: this.props.type,
      content: event.target.value,
      items: this.props.items
    }, this.props.index);
  }
  handleChangeItems = (event, index) => {
    let items = this.props.items.concat();
    items[index] = event.target.value;
    this.props.editQuestion({
      type: this.props.type,
      content: this.props.content,
      items: items
    }, this.props.index);
  }
  render () {
    const { type, content, items, answer, index, questionsLen } = this.props;
    const typeTitle = new Map([[1, '单选'], [2, '多选'], [3, '问答']]);
    const options = [1, 2, 3].map((optionType, index) => {
      return (
        <MenuItem
          key={'option' + index}
          value={optionType}
          primaryText={typeTitle.get(optionType)}
        />
      );
    });
    let createBtn = '';
    if (type !== 3) {
      createBtn = <IconButton onTouchTap={this.handleAddOption}>
                    <ContentAdd />
                  </IconButton>
    }
    const questionItems = items.map((item, index) => {
      return (
        <div key={'item' + index}>
          <TextField
            style={{
              width: '50%',
              minWidth: 170
            }}
            hintText='选项'
            value={item}
            multiLine={type === 3}
            onChange={(event) => {
              event.preventDefault();
              this.handleChangeItems(event, index);
            }}
          />
          <IconButton tooltip='删除选项' touch={true} onTouchTap={
            this.handleRemoveOption.bind(this, index)
          }>
            <ContentClear mini={true} />
          </IconButton>
        </div>
      );
    });
    let questionBar;
    return (
      <Card className='question'>
        <CardHeader children={
          <Toolbar style={{ backgroundColor: 'transparent' }} noGutter={true}>
            <ToolbarGroup>
              <SelectField
                style={{ width: 72 }}
                value={type}
                onChange={this.handleChangeType}
              >
                {options}
              </SelectField>
            </ToolbarGroup>
            <ToolbarGroup>
              {createBtn}
              <IconButton onTouchTap={this.handleRemoveQuestion}>
                <ContentClear />
              </IconButton>
              {
                index > 0 &&
                <IconButton onTouchTap={() => {
                  this.handleLowerQuestion(index);
                }}>
                  <HardwareKeyboardArrowUp />
                </IconButton>
              }
              {
                index < questionsLen - 1 &&
                <IconButton onTouchTap={() => {
                  this.handleUpperQuestion(index);
                }}>
                  <HardwareKeyboardArrowDown />
                </IconButton>
              }
            </ToolbarGroup>
          </Toolbar>
        }
      />
        <CardText>
          <TextField
            value={content}
            hintText='题目'
            style={{
              width: '50%',
              minWidth: 200
            }}
            onChange={(event) => {
              event.preventDefault();
              this.handleChangeContent(event);
            }}
          />
          {questionItems}
        </CardText>
      </Card>
    );
  }
}

Question.PropTypes = {
  index: PropTypes.number,
  type: PropTypes.number,
  content: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  questionsLen: PropTypes.number,
  editQuestion: PropTypes.func,
  removeQuestion: PropTypes.func,
  changeQuestionIndex: PropTypes.func
};

export default Question;
