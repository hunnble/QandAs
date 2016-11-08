import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';

class Question extends Component {
  handleRemoveQuestion = () => {
    this.props.removeQuestion(false, this.props.index);
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
    const { type, content, items, answer, index } = this.props;
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
      createBtn = <IconButton tooltip='新增选项' touch={true} onTouchTap={
                    this.handleAddOption
                  }>
                    <ContentAdd />
                  </IconButton>
    }
    const questionItems = items.map((item, index) => {
      return (
        <div key={'item' + index}>
          <TextField
            style={{
              marginLeft: '16px',
              width: '50%'
            }}
            hintText='请写选项'
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
            <ContentClear />
          </IconButton>
        </div>
      );
    });
    let questionBar;
    return (
      <Card className='question'>
        <CardTitle  />
        <CardHeader
          title={'第'+(index+1)+'题'}
          children={
            <div style={{ float: 'right' }}>
              {createBtn}
              <IconButton tooltip='删除' touch={true} onTouchTap={
                this.handleRemoveQuestion
              }>
                <ContentClear />
              </IconButton>
              <SelectField style={{ width: 96 }} value={type} onChange={
                  this.handleChangeType
              }>
                {options}
              </SelectField>
            </div>
          }
        />
        <CardText>
          <TextField
            value={content}
            hintText='题目'
            style={{
              width: '70%'
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
  editQuestion: PropTypes.func,
  removeQuestion: PropTypes.func
};

export default Question;
