import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
    const typeTitle = new Map([[1, '单选'], [2, '多选'], [3, '主观']]);
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
      createBtn = <RaisedButton className='createBtn' label='新增选项' onClick={this.handleAddOption} />;
    }
    const questionItems = items.map((item, index) => {
      return (
        <div key={'item' + index}>
          <RaisedButton
            className='createBtn'
            label='删除本选项'
            onClick={this.handleRemoveOption.bind(this, index)}
          />
          <TextField
            style={{
              marginLeft: '16px',
              width: '50%'
            }}
            hintText='请写选项'
            value={item}
            underlineShow={false}
            multiLine={type === 3}
            onChange={(event) => {
              event.preventDefault();
              this.handleChangeItems(event, index);
            }}
          />
        </div>
      );
    });
    let questionBar;
    return (
      <Paper className='question'>
        <h3 className='questionTitle'>第{index + 1}题</h3>
        <SelectField style={{ float: 'right' }} value={type} onChange={this.handleChangeType}>
          {options}
        </SelectField>
        {createBtn}
        <RaisedButton className='createBtn' label='删除本题' onClick={this.handleRemoveQuestion} />
        <TextField
          value={content}
          hintText='请把问题写到这里'
          multiLine={true}
          fullWidth={true}
          onChange={(event) => {
            event.preventDefault();
            this.handleChangeContent(event);
          }}
        />
        {questionItems}
      </Paper>
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
